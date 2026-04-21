import { Download, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import cvFileEs from "../../imports/CV_David_Luna.pdf";
import cvFileEn from "../../imports/CV_David_Luna_English.pdf";
import logoImage from "../../imports/logoDM.png";
import logoImageLight from "../../imports/image-0.png";
import profileImage from "../../imports/photo.png";
import { PageShell } from "../components/PageShell";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

export function Home() {
  const { language, t } = useLanguage();
  const { theme } = useTheme();
  const handleDownloadCV = () => {
    const cvFile = language === "en" ? cvFileEn : cvFileEs;
    const cvFileName = language === "en" ? "CV_David_Luna_English.pdf" : "CV_David_Luna.pdf";

    // Crear un enlace temporal para descargar el CV
    const link = document.createElement('a');
    link.href = cvFile;
    link.download = cvFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <PageShell
      className="flex items-center justify-center px-4 py-20 md:py-0 pb-24 md:pb-0"
      containerClassName="max-w-6xl"
    >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <img
              src={theme === "tatami" ? logoImageLight : logoImage}
              alt="Logo David Luna"
              className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.18, duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <img
              src={profileImage}
              alt="Foto de David Luna"
              className="w-36 h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 object-cover rounded-full border-4 border-[#8B7355] shadow-xl"
            />
          </motion.div>

          {/* Badge decorativo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-6 px-6 py-2 bg-[#2C2416] border-2 border-[#8B7355] rounded-full"
          >
            <span className="text-sm tracking-widest text-portfolio-contrast">
              {t("PORTAFOLIO PERSONAL", "PERSONAL PORTFOLIO")}
            </span>
          </motion.div>

          {/* Nombre */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-5xl md:text-7xl lg:text-8xl mb-6 text-foreground"
          >
            David Alejandro Luna Martinez
          </motion.h1>

          {/* Descripción */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl md:text-2xl lg:text-3xl text-primary mb-4 max-w-3xl mx-auto"
          >
            {t("Programador Web", "Web Developer")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto text-justify"
          >
            {t(
              "Enfocado en el desarrollo de funcionalidades y gestores de datos con diseño minimalista inspirado en la estética japonesa",
              "Focused on developing functionality and data managers with minimalist design inspired by Japanese aesthetics"
            )}
          </motion.p>

          {/* Botón de descarga CV */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadCV}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#2C2416] text-portfolio-contrast rounded-lg border-2 border-[#8B7355] hover:bg-[#8B7355] transition-all shadow-lg group"
          >
            <Download className="w-5 h-5 group-hover:animate-bounce" />
            {t("Descargar CV", "Download CV")}
          </motion.button>

          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 flex items-center justify-center gap-4"
          >
            <div className="h-px w-20 bg-primary" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="h-px w-20 bg-primary" />
          </motion.div>
        </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </div>
      </motion.div>
    </PageShell>
  );
}