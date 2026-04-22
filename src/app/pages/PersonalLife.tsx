import { motion } from "motion/react";
import { Heart, Volleyball, Gamepad2, TvMinimalPlay } from "lucide-react";
import { PageShell } from "../components/PageShell";
import { useLanguage } from "../contexts/LanguageContext";

export function PersonalLife() {
  const { t } = useLanguage();

  const interests = [
    {
      id: 1,
      icon: TvMinimalPlay,
      title: "Anime",
      description: t(
        "Apasionado del anime japonés, disfruto de historias épicas, mundos fantásticos y personajes memorables. El anime me ha enseñado valores como la perseverancia, la amistad y la superación personal.",
        "Passionate about Japanese anime, I enjoy epic stories, fantastic worlds and memorable characters. Anime has taught me values such as perseverance, friendship and personal growth."
      ),
      favorites: ["Shonen", "Seinen", "Isekai", t("Acción", "Action")],
      color: "#C4A57B"
    },
    {
      id: 2,
      icon: Volleyball,
      title: t("Voleibol", "Volleyball"),
      description: t(
        "El voleibol es más que un deporte para mí, es una forma de vida. Me encanta el trabajo en equipo, la estrategia y la emoción de cada partido. La disciplina y la coordinación que requiere este deporte me han ayudado a crecer tanto física como mentalmente.",
        "Volleyball is more than a sport for me, it's a way of life. I love teamwork, strategy and the excitement of each match. The discipline and coordination that this sport requires have helped me grow both physically and mentally."
      ),
      favorites: [t("Defensa", "Defense"), t("Remate", "Spike"), t("Trabajo en equipo", "Teamwork"), t("Competencia", "Competition")],
      color: "#8B7355"
    },
    {
      id: 3,
      icon: Gamepad2,
      title: t("Juegos de Mesa", "Board Games"),
      description: t(
        "Los juegos de mesa son mi refugio para conectar con amigos y familia. Disfruto de la estrategia, la toma de decisiones y la diversión compartida. Cada juego es una nueva aventura y un desafío intelectual.",
        "Board games are my refuge to connect with friends and family. I enjoy strategy, decision-making and shared fun. Each game is a new adventure and an intellectual challenge."
      ),
      favorites: [t("Estrategia", "Strategy"), t("Cooperativos", "Cooperative"), t("Rol", "Role-playing"), "Party games"],
      color: "#2C2416"
    }
  ];
  return (
    <PageShell>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Título */}
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-primary mb-4">
              {t("Conóceme Mejor", "Get to Know Me")}
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto md:mx-0 mb-4" />
            <p className="text-muted-foreground text-lg max-w-2xl text-justify">
              {t(
                "Más allá del código, estas son las pasiones que dan forma a mi vida y personalidad.",
                "Beyond code, these are the passions that shape my life and personality."
              )}
            </p>
          </div>

          {/* Introducción personal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white/50 tatami:bg-[#575357]/80 backdrop-blur-sm p-8 rounded-lg border-2 border-[#8B7355] shadow-lg mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-8 h-8 text-[#C4A57B]" />
              <h3 className="text-2xl md:text-3xl text-portfolio-strong">
                {t("Un vistazo a mi mundo personal", "A glimpse into my personal world")}
              </h3>
            </div>
            <p className="text-portfolio-soft text-lg leading-relaxed text-justify">
              {t(
                "Soy una persona que encuentra equilibrio entre el mundo digital y las experiencias reales. Me apasiona explorar historias a través del anime, mantenerme activo con el voleibol, y disfrutar de momentos estratégicos y divertidos con juegos de mesa. Cada una de estas pasiones me ha enseñado lecciones valiosas que aplico tanto en mi vida personal como en mi carrera profesional.",
                "I'm a person who finds balance between the digital world and real experiences. I'm passionate about exploring stories through anime, staying active with volleyball, and enjoying strategic and fun moments with board games. Each of these passions has taught me valuable lessons that I apply both in my personal life and in my professional career."
              )}
            </p>
          </motion.div>

          {/* Grid de intereses */}
          <div className="space-y-8">
            {interests.map((interest, index) => {
              const Icon = interest.icon;
              return (
                <motion.div
                  key={interest.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  className="bg-white/50 tatami:bg-[#575357]/80 backdrop-blur-sm p-8 rounded-lg border-2 border-[#8B7355] shadow-lg hover:shadow-2xl transition-all group"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Icono */}
                    <div className="flex-shrink-0">
                      <div
                        className="w-20 h-20 rounded-lg flex items-center justify-center border-3 border-[#8B7355] group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: interest.color }}
                      >
                        <Icon className="w-10 h-10 text-[#F5F1E8]" />
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="flex-1">
                      <h4 className="text-2xl md:text-3xl text-portfolio-strong mb-3">
                        {interest.title}
                      </h4>
                      <p className="text-portfolio-soft mb-4 leading-relaxed text-justify">
                        {interest.description}
                      </p>

                      {/* Tags de favoritos */}
                      <div className="flex flex-wrap gap-2">
                        {interest.favorites.map((fav) => (
                          <span
                            key={fav}
                            className="px-3 py-1.5 bg-[#2C2416] text-white text-sm rounded-full border border-[#8B7355]"
                          >
                            {fav}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Quote final */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="inline-block bg-[#2C2416] border-2 border-[#8B7355] rounded-lg p-8 shadow-lg">
              <p className="text-white text-xl md:text-2xl italic mb-2">
                {t(
                  '"La vida es un equilibrio entre pasión y dedicación"',
                  '"Life is a balance between passion and dedication"'
                )}
              </p>
              <p className="text-white">
                {t("— Mi filosofía personal", "— My personal philosophy")}
              </p>
            </div>
          </motion.div>
        </motion.div>
    </PageShell>
  );
}
