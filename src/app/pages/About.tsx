import { motion } from "motion/react";
import profileImage from "../../imports/photo.png";
import { PageShell } from "../components/PageShell";
import { useLanguage } from "../contexts/LanguageContext";

export function About() {
  const { t } = useLanguage();

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
              {t("Acerca de mí", "About me")}
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto md:mx-0" />
          </div>

          {/* Grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Slider de imágenes */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="order-2 lg:order-1 w-full"
            >
              <div className="relative rounded-lg overflow-hidden border-4 border-[#8B7355] shadow-2xl bg-[#2C2416] h-full min-h-[430px]">
                <img
                  src={profileImage}
                  alt="David Alejandro Luna Martinez"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Contenido de texto */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="bg-white/50 tatami:bg-[#575357]/80 backdrop-blur-sm p-8 rounded-lg border-2 border-[#8B7355] shadow-lg h-full min-h-[430px] flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl text-portfolio-strong mb-4">
                  {t("Mi Historia", "My Story")}
                </h3>
                <p className="text-portfolio-soft text-base md:text-lg leading-relaxed mb-4 text-justify">
                  {t(
                    "Soy un programador web apasionado por crear soluciones prácticas y funcionales. Mi enfoque principal es el desarrollo de sistemas robustos para la gestión eficiente de datos.",
                    "I am a web developer passionate about creating practical and functional solutions. My main focus is developing robust systems for efficient data management."
                  )}
                </p>
                <p className="text-portfolio-soft text-base md:text-lg leading-relaxed mb-4 text-justify">
                  {t(
                    "Me especializo en crear aplicaciones que combinan funcionalidad avanzada con interfaces intuitivas, siempre buscando optimizar procesos y mejorar la experiencia del usuario a través de soluciones innovadoras.",
                    "I specialize in creating applications that combine advanced functionality with intuitive interfaces, always seeking to optimize processes and improve user experience through innovative solutions."
                  )}
                </p>
                <p className="text-portfolio-soft text-base md:text-lg leading-relaxed text-justify">
                  {t(
                    "Cada proyecto representa un desafío único donde aplico las mejores prácticas de desarrollo, implemento arquitecturas escalables y creo herramientas que realmente marquen la diferencia.",
                    "Each project represents a unique challenge where I apply best development practices, implement scalable architectures, and build tools that truly make a difference."
                  )}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
    </PageShell>
  );
}