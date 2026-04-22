import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useOutletContext } from "react-router";
import { Disc3, FolderOpen, Repeat, Repeat1, Shuffle, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { PageShell } from "../components/PageShell";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

type LayoutOutletContext = {
  hideChrome: boolean;
  setHideChrome: React.Dispatch<React.SetStateAction<boolean>>;
};

type RepeatMode = "all" | "one";

type Track = {
  src: string;
  name: string;
};

const AUDIO_FILE_REGEX = /\.(mp3|wav|ogg|m4a|aac|flac)$/i;

const tracksModules = import.meta.glob("../../imports/music/*.{mp3,wav,ogg,m4a,aac,flac}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const importedPlaylist: Track[] = Object.entries(tracksModules)
  .map(([path, src]) => {
    const rawName = path.split("/").pop() ?? "track";
    const cleaned = decodeURIComponent(rawName).replace(/\.[^/.]+$/, "");

    return {
      src,
      name: cleaned,
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

export function Music() {
  const { hideChrome, setHideChrome } = useOutletContext<LayoutOutletContext>();
  const { t } = useLanguage();
  const { theme } = useTheme();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const frameRef = useRef<number | null>(null);
  const isPlayingRef = useRef(false);
  const objectUrlsRef = useRef<string[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [playlist, setPlaylist] = useState<Track[]>(importedPlaylist);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("all");
  const [volume, setVolume] = useState(0.8);
  const [energy, setEnergy] = useState(0.06);
  const [rhythm, setRhythm] = useState(0.08);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentTrack = playlist[currentIndex] ?? null;
  const isTatami = theme === "tatami";

  const randomIndex = useCallback((exceptIndex: number) => {
    if (playlist.length <= 1) return exceptIndex;

    let next = exceptIndex;
    while (next === exceptIndex) {
      next = Math.floor(Math.random() * playlist.length);
    }

    return next;
  }, []);

  const goNext = useCallback(() => {
    if (playlist.length === 0) return;

    setCurrentIndex((prev) => {
      if (isShuffle) return randomIndex(prev);
      return (prev + 1) % playlist.length;
    });
  }, [isShuffle, randomIndex, playlist.length]);

  const goPrev = useCallback(() => {
    if (playlist.length === 0) return;

    setCurrentIndex((prev) => {
      if (isShuffle) return randomIndex(prev);
      return (prev - 1 + playlist.length) % playlist.length;
    });
  }, [isShuffle, randomIndex, playlist.length]);

  const clearObjectUrls = useCallback(() => {
    objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    objectUrlsRef.current = [];
  }, []);

  const buildTracksFromFiles = useCallback((files: File[]) => {
    const audioFiles = files.filter((file) => AUDIO_FILE_REGEX.test(file.name));
    const createdTracks = audioFiles
      .map((file) => {
        const url = URL.createObjectURL(file);
        return {
          src: url,
          name: file.name.replace(/\.[^/.]+$/, ""),
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    return createdTracks;
  }, []);

  const setPlaylistFromFiles = useCallback(
    (files: File[]) => {
      const nextTracks = buildTracksFromFiles(files);
      if (nextTracks.length === 0) {
        return;
      }

      clearObjectUrls();
      objectUrlsRef.current = nextTracks.map((track) => track.src);
      setPlaylist(nextTracks);
      setCurrentIndex(0);
      setCurrentTime(0);
      setDuration(0);
    },
    [buildTracksFromFiles, clearObjectUrls],
  );

  const collectFilesFromDirectoryHandle = useCallback(async (handle: any): Promise<File[]> => {
    const files: File[] = [];

    const walk = async (entry: any) => {
      if (entry.kind === "file") {
        const file = await entry.getFile();
        files.push(file);
        return;
      }

      for await (const child of entry.values()) {
        await walk(child);
      }
    };

    await walk(handle);
    return files;
  }, []);

  const pickMusicFolder = useCallback(async () => {
    const picker = (window as Window & { showDirectoryPicker?: () => Promise<any> }).showDirectoryPicker;

    if (picker) {
      try {
        const directoryHandle = await picker();
        const files = await collectFilesFromDirectoryHandle(directoryHandle);
        setPlaylistFromFiles(files);
      } catch {
        // User cancelled folder selection
      }
      return;
    }

    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = ".mp3,.wav,.ogg,.m4a,.aac,.flac,audio/*";
    (input as HTMLInputElement & { webkitdirectory?: boolean }).webkitdirectory = true;

    input.addEventListener("change", () => {
      const files = Array.from(input.files ?? []);
      setPlaylistFromFiles(files);
    });

    input.click();
  }, [collectFilesFromDirectoryHandle, setPlaylistFromFiles]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    if (!currentTrack || !audioRef.current) return;

    const audio = audioRef.current;
    audio.src = currentTrack.src;
    setCurrentTime(0);
    setDuration(0);

    if (isPlayingRef.current) {
      void audio.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      void audio.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    const onEnded = () => {
      if (repeatMode === "one") {
        audio.currentTime = 0;
        void audio.play();
        return;
      }

      goNext();
    };

    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, [repeatMode, goNext, currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isPlaying || !currentTrack) return;

    if (!contextRef.current) {
      contextRef.current = new AudioContext();
    }

    const context = contextRef.current;

    if (context.state === "suspended") {
      void context.resume();
    }

    if (!sourceRef.current) {
      sourceRef.current = context.createMediaElementSource(audio);
    }

    if (!analyserRef.current) {
      analyserRef.current = context.createAnalyser();
      analyserRef.current.fftSize = 1024;
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(context.destination);
    }

    const analyser = analyserRef.current;
    const data = new Uint8Array(analyser.frequencyBinCount);

    const tick = () => {
      analyser.getByteFrequencyData(data);
      let sum = 0;
      let weightedIndex = 0;

      for (let i = 0; i < data.length; i += 1) {
        const normalized = data[i] / 255;
        sum += normalized;
        weightedIndex += normalized * i;
      }

      const avg = sum / data.length;
      const centroid = sum > 0 ? weightedIndex / sum / data.length : 0;

      setEnergy((prev) => prev * 0.75 + avg * 0.25);
      setRhythm((prev) => prev * 0.75 + centroid * 0.25);

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    return () => {
      clearObjectUrls();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (contextRef.current) {
        void contextRef.current.close();
      }
    };
  }, [clearObjectUrls]);

  const vibe = useMemo(() => {
    const pulseSize = 24 + energy * 120;
    const speed = Math.max(0.85, 2.8 - energy * 3 - rhythm * 1.2);

    const gradientA = `hsl(${Math.round(280 + rhythm * 70)}, 95%, ${Math.max(18, 30 + energy * 38)}%)`;
    const gradientB = `hsl(${Math.round(180 + energy * 120)}, 88%, ${Math.max(12, 22 + rhythm * 32)}%)`;
    const gradientC = `hsl(${Math.round(10 + energy * 70)}, 90%, ${Math.max(14, 24 + energy * 30)}%)`;

    return {
      pulseSize,
      speed,
      gradientA,
      gradientB,
      gradientC,
    };
  }, [energy, rhythm]);

  const toggleRepeat = () => {
    setRepeatMode((prev) => {
      const nextMode = prev === "all" ? "one" : "all";
      if (nextMode === "one") {
        setIsShuffle(false);
      }
      return nextMode;
    });
  };

  const toggleShuffle = () => {
    setIsShuffle((prev) => {
      const nextShuffle = !prev;
      if (nextShuffle) {
        setRepeatMode("all");
      }
      return nextShuffle;
    });
  };

  const handleSeek = (value: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(value)) return;

    audio.currentTime = value;
    setCurrentTime(value);
  };

  const noMusicLoaded = playlist.length === 0;
  const progressPercent = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;
  const activeTrackNumber = playlist.length === 0 ? 0 : currentIndex + 1;

  const formatTime = (value: number) => {
    if (!Number.isFinite(value) || value <= 0) return "0:00";

    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  return (
    <PageShell className="px-4 py-16 md:py-20 pb-24 md:pb-32" containerClassName="max-w-6xl">
      <audio
        ref={audioRef}
        preload="metadata"
        onLoadedMetadata={(e) => {
          const mediaDuration = e.currentTarget.duration;
          setDuration(Number.isFinite(mediaDuration) ? mediaDuration : 0);
        }}
        onTimeUpdate={(e) => {
          setCurrentTime(e.currentTarget.currentTime);
        }}
      />

      <div className="relative">
        <div
          className="pointer-events-none absolute -left-12 top-8 h-52 w-52 rounded-full blur-3xl"
          style={{
            background: isTatami ? "rgba(170, 134, 109, 0.20)" : "rgba(196, 165, 123, 0.22)",
            animation: `musicPulse ${vibe.speed}s ease-in-out infinite alternate`,
          }}
        />
        <div
          className="pointer-events-none absolute -right-10 bottom-10 h-64 w-64 rounded-full blur-3xl"
          style={{
            background: isTatami ? "rgba(212, 196, 176, 0.12)" : "rgba(139, 115, 85, 0.16)",
            animation: `musicPulse ${Math.max(0.8, vibe.speed - 0.3)}s ease-in-out infinite alternate-reverse`,
          }}
        />

        <div className="relative z-10 space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-primary mb-4">
                {t("Música", "Music")}
              </h2>
              <div className="w-20 h-1 bg-primary mb-4" />
              <p className="text-muted-foreground text-lg text-justify">
                {t(
                  "Un reproductor integrado con la estética del portafolio para acompañar la navegación con una atmósfera más personal.",
                  "A player integrated with the portfolio aesthetic to accompany browsing with a more personal atmosphere."
                )}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={pickMusicFolder}
                className="inline-flex items-center gap-2 rounded-lg border-2 border-[#8B7355] bg-[#2C2416] px-4 py-3 text-portfolio-contrast transition-colors hover:bg-[#8B7355]"
                aria-label={t("Seleccionar carpeta de música", "Choose music folder")}
              >
                <FolderOpen className="h-5 w-5" />
                {t("Cargar música", "Load music")}
              </button>

              <button
                type="button"
                onClick={() => setHideChrome((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-lg border-2 border-[#8B7355] bg-white/50 px-4 py-3 text-portfolio-strong backdrop-blur-sm transition-colors hover:bg-[#8B7355] hover:text-portfolio-contrast tatami:bg-[#575357]/80"
                aria-label={t("Alternar modo inmersivo", "Toggle immersive mode")}
              >
                <span className="text-lg leading-none">{hideChrome ? "◉" : "◎"}</span>
                {hideChrome ? t("Salir de inmersivo", "Exit immersive") : t("Modo inmersivo", "Immersive mode")}
              </button>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.9fr)]">
            <section className="bg-white/50 tatami:bg-[#575357]/80 backdrop-blur-sm rounded-2xl border-2 border-[#8B7355] shadow-lg p-6 md:p-8">
              <div className="flex flex-col items-center text-center">
                <div
                  className="relative mb-8 flex h-64 w-64 items-center justify-center rounded-full border-4 border-[#8B7355] bg-[#2C2416] shadow-2xl md:h-72 md:w-72"
                  style={{ transform: `scale(${1 + energy * 0.08})` }}
                >
                  <div
                    className="absolute inset-6 rounded-full border border-[#C4A57B]/50"
                    style={{ transform: `scale(${1 + rhythm * 0.12})` }}
                  />
                  <div
                    className="absolute inset-12 rounded-full border border-[#C4A57B]/35"
                    style={{ transform: `scale(${1 + energy * 0.16})` }}
                  />
                  <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center text-[#F5F1E8]">
                    <Disc3
                      className="h-12 w-12 text-[#C4A57B]"
                      style={{ transform: `rotate(${currentTime * 18}deg)` }}
                    />
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-[#C4A57B]">
                        {noMusicLoaded ? t("Sin pistas", "No tracks") : t("Reproduciendo", "Now playing")}
                      </p>
                      <h3 className="mt-3 text-xl md:text-2xl font-medium leading-snug">
                        {currentTrack?.name ?? t("Carga una carpeta para comenzar", "Load a folder to begin")}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="w-full max-w-3xl">
                  <div className="mb-3 flex items-center justify-between text-sm text-portfolio-soft">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                  <div className="relative h-3 w-full overflow-hidden rounded-full bg-[#2C2416]/20 tatami:bg-[#2C2416]/40">
                    <div
                      className="absolute left-0 top-0 h-full rounded-full bg-[#8B7355] transition-[width] duration-150"
                      style={{ width: `${progressPercent}%` }}
                    />
                    <input
                      type="range"
                      min={0}
                      max={duration > 0 ? duration : 100}
                      step={0.1}
                      value={duration > 0 ? Math.min(currentTime, duration) : 0}
                      onChange={(e) => handleSeek(Number(e.target.value))}
                      className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
                      aria-label={t("Progreso de la pista", "Track progress")}
                      disabled={noMusicLoaded || duration <= 0}
                    />
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="rounded-xl border-2 border-[#8B7355] bg-[#2C2416] p-3 text-portfolio-contrast transition-colors hover:bg-[#8B7355] disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label={t("Pista anterior", "Previous track")}
                    disabled={noMusicLoaded}
                  >
                    <SkipBack className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    onClick={toggleShuffle}
                    className={`rounded-xl border-2 p-3 transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${isShuffle ? "border-[#C4A57B] bg-[#8B7355] text-[#F5F1E8]" : "border-[#8B7355] bg-white/60 text-portfolio-strong hover:bg-[#8B7355] hover:text-portfolio-contrast tatami:bg-[#575357]"}`}
                    aria-label={t("Modo aleatorio", "Shuffle mode")}
                    disabled={noMusicLoaded}
                  >
                    <Shuffle className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsPlaying((prev) => !prev)}
                    className="min-w-28 rounded-xl border-2 border-[#8B7355] bg-[#2C2416] px-6 py-3 text-lg font-semibold text-portfolio-contrast transition-colors hover:bg-[#8B7355] disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={noMusicLoaded}
                  >
                    {isPlaying ? t("Pausa", "Pause") : t("Reproducir", "Play")}
                  </button>

                  <button
                    type="button"
                    onClick={toggleRepeat}
                    className={`rounded-xl border-2 p-3 transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${repeatMode === "one" ? "border-[#C4A57B] bg-[#8B7355] text-[#F5F1E8]" : "border-[#8B7355] bg-white/60 text-portfolio-strong hover:bg-[#8B7355] hover:text-portfolio-contrast tatami:bg-[#575357]"}`}
                    aria-label={t("Modo repetición", "Repeat mode")}
                    disabled={noMusicLoaded}
                  >
                    {repeatMode === "one" ? <Repeat1 className="h-5 w-5" /> : <Repeat className="h-5 w-5" />}
                  </button>

                  <button
                    type="button"
                    onClick={goNext}
                    className="rounded-xl border-2 border-[#8B7355] bg-[#2C2416] p-3 text-portfolio-contrast transition-colors hover:bg-[#8B7355] disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label={t("Siguiente pista", "Next track")}
                    disabled={noMusicLoaded}
                  >
                    <SkipForward className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </section>

            <aside className="space-y-6">
              <div className="bg-white/50 tatami:bg-[#575357]/80 backdrop-blur-sm rounded-2xl border-2 border-[#8B7355] shadow-lg p-6">
                <h3 className="text-2xl text-portfolio-strong mb-4">
                  {t("Detalle de reproducción", "Playback details")}
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-portfolio-accent mb-2">
                      {t("Pista actual", "Current track")}
                    </p>
                    <p className="text-lg text-portfolio-strong break-words">
                      {currentTrack?.name ?? t("Ninguna pista cargada", "No track loaded")}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#8B7355] bg-[#2C2416] p-4 text-[#F5F1E8]">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#C4A57B] mb-2">{t("Pista", "Track")}</p>
                      <p className="text-lg">{activeTrackNumber}/{playlist.length}</p>
                    </div>
                    <div className="rounded-xl border border-[#8B7355] bg-[#2C2416] p-4 text-[#F5F1E8]">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#C4A57B] mb-2">{t("Modo", "Mode")}</p>
                      <p className="text-sm leading-relaxed">
                        {isShuffle
                          ? t("Aleatorio", "Shuffle")
                          : repeatMode === "one"
                            ? t("Repetir una", "Repeat one")
                            : t("Lista completa", "Full playlist")}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 flex items-center justify-between text-sm text-portfolio-soft">
                      <span>{t("Volumen", "Volume")}</span>
                      <span>{Math.round(volume * 100)}%</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl border border-[#8B7355] bg-white/60 px-4 py-3 tatami:bg-[#575357]">
                      {volume <= 0.01 ? <VolumeX className="h-5 w-5 text-portfolio-strong" /> : <Volume2 className="h-5 w-5 text-portfolio-strong" />}
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="h-1 w-full accent-[#8B7355]"
                        aria-label={t("Volumen", "Volume")}
                        disabled={noMusicLoaded}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#2C2416] rounded-2xl border-2 border-[#8B7355] shadow-lg p-6 text-[#F5F1E8]">
                <h3 className="text-xl text-[#C4A57B] mb-3">
                  {t("Ambiente del portafolio", "Portfolio atmosphere")}
                </h3>
                <p className="text-sm leading-relaxed text-[#F5F1E8]">
                  {t(
                    "La experiencia musical ahora comparte la misma estética del resto del sitio y responde al modo normal o tatami oscuro sin romper la navegación.",
                    "The music experience now shares the same aesthetic as the rest of the site and responds to normal or dark tatami mode without breaking navigation."
                  )}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes musicPulse {
          0% { transform: scale(0.94) translate3d(0, 0, 0); opacity: 0.35; }
          100% { transform: scale(1.08) translate3d(0, -2%, 0); opacity: 0.88; }
        }
      `}</style>
    </PageShell>
  );
}
