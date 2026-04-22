import { Mail, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      data-cursor-light-zone="true"
      className="bg-[#2C2416] border-t-4 border-[#8B7355] py-8 md:ml-20 lg:ml-24 mt-16"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-portfolio-accent text-lg mb-2">David Alejandro Luna Martinez</h3>
            <p className="text-portfolio-soft-on-dark text-sm">
              {t("Programador Web | Gestión de Datos", "Web Developer | Data Management")}
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <a
              href="mailto:davidalejandrolunam@hotmail.com"
              className="inline-flex items-center gap-2 text-portfolio-accent hover:text-portfolio-contrast transition-colors text-sm"
            >
              <Mail className="w-4 h-4" />
              davidalejandrolunam@hotmail.com
            </a>
            <a
              href="tel:+573184351819"
              className="inline-flex items-center gap-2 text-portfolio-accent hover:text-portfolio-contrast transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              +57 318 435 1819
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[#8B7355] text-center text-portfolio-soft-on-dark text-sm">
          <p>
            © 2026 - Colombia, Nariño - {t("Todos los derechos reservados", "All rights reserved")}
          </p>
        </div>
      </div>
    </motion.footer>
  );
}