import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useOutletContext } from "react-router";
import { FolderOpen, Repeat, Repeat1, Shuffle, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";

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

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background: `radial-gradient(circle at 20% 20%, ${vibe.gradientA}, transparent 44%), radial-gradient(circle at 80% 72%, ${vibe.gradientB}, transparent 42%), linear-gradient(125deg, ${vibe.gradientC}, #060608 72%)`,
      }}
    >
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

      <div
        className="pointer-events-none absolute -left-16 -top-20 h-[45vh] w-[45vh] rounded-full opacity-80 blur-2xl"
        style={{
          background: `radial-gradient(circle, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0) ${vibe.pulseSize}%)`,
          animation: `musicPulse ${vibe.speed}s ease-in-out infinite alternate`,
        }}
      />

      <div
        className="pointer-events-none absolute -right-20 -bottom-24 h-[50vh] w-[50vh] rounded-full opacity-70 blur-2xl"
        style={{
          background: `radial-gradient(circle, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) ${vibe.pulseSize + 8}%)`,
          animation: `musicPulse ${Math.max(0.65, vibe.speed - 0.35)}s ease-in-out infinite alternate-reverse`,
        }}
      />

      {!hideChrome && (
        <button
          type="button"
          onClick={pickMusicFolder}
          className="absolute right-5 top-5 z-20 rounded-xl border border-white/25 bg-black/30 p-3 text-white backdrop-blur-md transition hover:bg-white/15 md:right-7 md:top-7"
          aria-label="Choose music folder"
        >
          <FolderOpen className="h-5 w-5" />
        </button>
      )}

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <button
          type="button"
          onClick={() => setHideChrome((prev) => !prev)}
          className="mb-10 h-16 w-16 rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-md transition hover:scale-105 hover:bg-black/35"
          aria-label="Toggle immersive mode"
        >
          {hideChrome ? "◉" : "◎"}
        </button>

        {currentTrack && (
          <div className="mb-8 w-full max-w-5xl">
            <h1 className="relative mx-auto w-fit max-w-full text-center text-2xl font-semibold tracking-wide text-white/35 md:text-4xl">
              {currentTrack.name}
              <span
                className="pointer-events-none absolute left-0 top-0 overflow-hidden whitespace-nowrap text-white"
                style={{ width: `${progressPercent}%` }}
              >
                {currentTrack.name}
              </span>
            </h1>
          </div>
        )}

        <div className="mb-8 flex w-full max-w-sm items-center justify-center gap-4 lg:hidden">
          <div className="flex h-64 w-16 items-center justify-center rounded-2xl border border-white/25 bg-black/35 backdrop-blur-xl">
            <div className="relative h-52 w-2 overflow-hidden rounded-full bg-white/20">
              <div
                className="absolute bottom-0 left-0 w-full rounded-full bg-white transition-[height] duration-150"
                style={{ height: `${progressPercent}%` }}
              />
              <input
                type="range"
                min={0}
                max={duration > 0 ? duration : 100}
                step={0.1}
                value={duration > 0 ? Math.min(currentTime, duration) : 0}
                onChange={(e) => handleSeek(Number(e.target.value))}
                className="absolute left-1/2 top-1/2 h-52 w-8 -translate-x-1/2 -translate-y-1/2 rotate-[-90deg] cursor-pointer opacity-0"
                aria-label="Track progress"
                disabled={noMusicLoaded || duration <= 0}
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/20 bg-black/25 px-3 py-4 backdrop-blur-xl">
            <button
              type="button"
              onClick={goPrev}
              className="rounded-xl border border-white/25 bg-black/30 p-3 text-white transition hover:bg-white/15"
              aria-label="Previous track"
              disabled={noMusicLoaded}
            >
              <SkipBack className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={toggleShuffle}
              className={`rounded-xl border p-3 transition ${isShuffle ? "border-emerald-300 bg-emerald-500/30 text-white" : "border-white/25 bg-black/30 text-white hover:bg-white/15"}`}
              aria-label="Shuffle"
              disabled={noMusicLoaded}
            >
              <Shuffle className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => setIsPlaying((prev) => !prev)}
              className="min-w-24 rounded-xl border border-white/30 bg-white/15 px-4 py-3 text-lg font-semibold text-white transition hover:bg-white/25"
              disabled={noMusicLoaded}
            >
              {isPlaying ? "||" : ">"}
            </button>

            <button
              type="button"
              onClick={toggleRepeat}
              className={`rounded-xl border p-3 transition ${repeatMode === "one" ? "border-amber-300 bg-amber-500/30 text-white" : "border-white/25 bg-black/30 text-white hover:bg-white/15"}`}
              aria-label="Repeat mode"
              disabled={noMusicLoaded}
            >
              {repeatMode === "one" ? <Repeat1 className="h-5 w-5" /> : <Repeat className="h-5 w-5" />}
            </button>

            <button
              type="button"
              onClick={goNext}
              className="rounded-xl border border-white/25 bg-black/30 p-3 text-white transition hover:bg-white/15"
              aria-label="Next track"
              disabled={noMusicLoaded}
            >
              <SkipForward className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-black/30 px-2 py-2 text-white">
              {volume <= 0.01 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="h-1 w-16 accent-white"
                aria-label="Volume"
                disabled={noMusicLoaded}
              />
            </div>
          </div>
        </div>

        <div className="mb-8 hidden w-full max-w-3xl rounded-full border border-white/25 bg-black/35 px-4 py-3 backdrop-blur-xl lg:block">
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/20">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-white transition-[width] duration-150"
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
              aria-label="Track progress"
              disabled={noMusicLoaded || duration <= 0}
            />
          </div>
        </div>

        <div className="hidden flex-wrap items-center justify-center gap-3 rounded-2xl border border-white/20 bg-black/25 px-4 py-3 backdrop-blur-xl lg:flex">
          <button
            type="button"
            onClick={goPrev}
            className="rounded-xl border border-white/25 bg-black/30 p-3 text-white transition hover:bg-white/15"
            aria-label="Previous track"
            disabled={noMusicLoaded}
          >
            <SkipBack className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={toggleShuffle}
            className={`rounded-xl border p-3 transition ${isShuffle ? "border-emerald-300 bg-emerald-500/30 text-white" : "border-white/25 bg-black/30 text-white hover:bg-white/15"}`}
            aria-label="Shuffle"
            disabled={noMusicLoaded}
          >
            <Shuffle className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => setIsPlaying((prev) => !prev)}
            className="min-w-28 rounded-xl border border-white/30 bg-white/15 px-5 py-3 text-lg font-semibold text-white transition hover:bg-white/25"
            disabled={noMusicLoaded}
          >
            {isPlaying ? "||" : ">"}
          </button>

          <button
            type="button"
            onClick={toggleRepeat}
            className={`rounded-xl border p-3 transition ${repeatMode === "one" ? "border-amber-300 bg-amber-500/30 text-white" : "border-white/25 bg-black/30 text-white hover:bg-white/15"}`}
            aria-label="Repeat mode"
            disabled={noMusicLoaded}
          >
            {repeatMode === "one" ? <Repeat1 className="h-5 w-5" /> : <Repeat className="h-5 w-5" />}
          </button>

          <button
            type="button"
            onClick={goNext}
            className="rounded-xl border border-white/25 bg-black/30 p-3 text-white transition hover:bg-white/15"
            aria-label="Next track"
            disabled={noMusicLoaded}
          >
            <SkipForward className="h-5 w-5" />
          </button>

          <div className="ml-2 flex items-center gap-2 rounded-xl border border-white/20 bg-black/30 px-3 py-2 text-white">
            {volume <= 0.01 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="h-1 w-24 accent-white md:w-36"
              aria-label="Volume"
              disabled={noMusicLoaded}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes musicPulse {
          0% { transform: scale(0.92) translate3d(0, 0, 0); opacity: 0.35; }
          100% { transform: scale(1.12) translate3d(0, -1.6%, 0); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}
