import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "motion/react";
import profileImage from "../../imports/photo.png";
import { useLanguage } from "../contexts/LanguageContext";

const images = [
  {
    url: "https://images.unsplash.com/photo-1722510154425-abad1f97b362?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHRhdGFtaSUyMHJvb20lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzQzMTUxMTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Espacio de trabajo 1"
  },
  {
    url: "https://images.unsplash.com/photo-1644337540803-2b2fb3cebf12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwd29ya3NwYWNlJTIwZGVza3xlbnwxfHx8fDE3NzQzMDY2NTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Espacio de trabajo 2"
  },
  {
    url: "https://images.unsplash.com/photo-1656613031370-7d2af1275810?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6ZW4lMjBnYXJkZW4lMjBzdG9uZXN8ZW58MXx8fHwxNzc0MzE1MTEyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Espacio zen"
  },
];

export function About() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useLanguage();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    beforeChange: (_current: number, next: number) => setCurrentSlide(next),
    dotsClass: "slick-dots !bottom-4",
    customPaging: (i: number) => (
      <button className={`w-2 h-2 rounded-full transition-all ${
        i === currentSlide ? "bg-[#C4A57B] scale-125" : "bg-[#8B7355]"
      }`} />
    ),
  };

  return (
    <div className="min-h-screen py-20 md:py-32 px-4 pb-24 md:pb-32 relative overflow-hidden">
      {/* Fondo decorativo estilo tatami */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            #2C2416,
            #2C2416 2px,
            transparent 2px,
            transparent 40px
          ),
          repeating-linear-gradient(
            90deg,
            #2C2416,
            #2C2416 2px,
            transparent 2px,
            transparent 80px
          )`
        }} />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Título */}
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              {t("Acerca de mí", "About me")}
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto md:mx-0" />
          </div>

          {/* Grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Slider de imágenes */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="relative rounded-lg overflow-hidden border-4 border-[#8B7355] shadow-2xl bg-[#2C2416]">
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
              className="order-1 lg:order-2 space-y-6"
            >
              <div className="bg-white/50 backdrop-blur-sm p-8 rounded-lg border-2 border-[#8B7355] shadow-lg">
                <h3 className="text-2xl md:text-3xl text-[#2C2416] mb-4">
                  {t("Mi Historia", "My Story")}
                </h3>
                <p className="text-[#8B7355] text-base md:text-lg leading-relaxed mb-4">
                  {t(
                    "Soy un programador web apasionado por integrar tecnologías de inteligencia artificial en soluciones prácticas y funcionales. Mi enfoque principal es el desarrollo de sistemas robustos para la gestión eficiente de datos.",
                    "I am a web developer passionate about integrating artificial intelligence technologies into practical and functional solutions. My main focus is developing robust systems for efficient data management."
                  )}
                </p>
                <p className="text-[#8B7355] text-base md:text-lg leading-relaxed mb-4">
                  {t(
                    "Me especializo en crear aplicaciones que combinan funcionalidad avanzada con interfaces intuitivas, siempre buscando optimizar procesos y mejorar la experiencia del usuario a través de soluciones innovadoras.",
                    "I specialize in creating applications that combine advanced functionality with intuitive interfaces, always seeking to optimize processes and improve user experience through innovative solutions."
                  )}
                </p>
                <p className="text-[#8B7355] text-base md:text-lg leading-relaxed">
                  {t(
                    "Cada proyecto representa un desafío único donde aplico las mejores prácticas de desarrollo, implemento arquitecturas escalables y aprovecho las capacidades de la inteligencia artificial para crear herramientas que realmente marquen la diferencia.",
                    "Each project represents a unique challenge where I apply best development practices, implement scalable architectures, and leverage artificial intelligence capabilities to create tools that truly make a difference."
                  )}
                </p>
              </div>

              {/* Habilidades destacadas */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#2C2416] p-6 rounded-lg border-2 border-[#8B7355] text-center">
                  <div className="text-3xl md:text-4xl text-[#C4A57B] mb-2">{t("IA", "AI")}</div>
                  <div className="text-[#8B7355] text-sm md:text-base">
                    {t("Desarrollo con IA", "AI Development")}
                  </div>
                </div>
                <div className="bg-[#2C2416] p-6 rounded-lg border-2 border-[#8B7355] text-center">
                  <div className="text-3xl md:text-4xl text-[#C4A57B] mb-2">Web</div>
                  <div className="text-[#8B7355] text-sm md:text-base">
                    {t("Gestores de Datos", "Data Managers")}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}