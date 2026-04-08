import { motion } from "motion/react";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function Contact() {
  const { t } = useLanguage();

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
              {t("Contacto", "Contact")}
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto md:mx-0 mb-4" />
            <p className="text-muted-foreground text-lg max-w-2xl">
              {t(
                "¿Tienes un proyecto en mente? No dudes en contactarme.",
                "Have a project in mind? Don't hesitate to contact me."
              )}
            </p>
          </div>

          {/* Información de contacto - Centrado */}
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-6 w-full max-w-2xl"
            >
              <div className="bg-white/50 backdrop-blur-sm p-8 rounded-lg border-2 border-[#8B7355] shadow-lg">
                <h3 className="text-2xl text-[#2C2416] mb-6">
                  {t("Información de Contacto", "Contact Information")}
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#2C2416] rounded-lg border-2 border-[#8B7355]">
                      <Mail className="w-5 h-5 text-[#C4A57B]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#2C2416] mb-1">{t("Email Personal", "Personal Email")}</p>
                      <a href="mailto:davidalejandrolunam@hotmail.com" className="text-[#8B7355] hover:text-[#C4A57B] transition-colors break-all">
                        davidalejandrolunam@hotmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#2C2416] rounded-lg border-2 border-[#8B7355]">
                      <Mail className="w-5 h-5 text-[#C4A57B]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#2C2416] mb-1">{t("Email Institucional", "Institutional Email")}</p>
                      <a href="mailto:david.lunamar@campusucc.edu.co" className="text-[#8B7355] hover:text-[#C4A57B] transition-colors break-all">
                        david.lunamar@campusucc.edu.co
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#2C2416] rounded-lg border-2 border-[#8B7355]">
                      <Phone className="w-5 h-5 text-[#C4A57B]" />
                    </div>
                    <div>
                      <p className="text-[#2C2416] mb-1">{t("Teléfono / WhatsApp", "Phone / WhatsApp")}</p>
                      <a href="tel:+573184351819" className="text-[#8B7355] hover:text-[#C4A57B] transition-colors">
                        +57 318 435 1819
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#2C2416] rounded-lg border-2 border-[#8B7355]">
                      <MapPin className="w-5 h-5 text-[#C4A57B]" />
                    </div>
                    <div>
                      <p className="text-[#2C2416] mb-1">{t("Ubicación", "Location")}</p>
                      <p className="text-[#8B7355]">Colombia, Nariño</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Disponibilidad */}
              <div className="bg-[#2C2416] p-6 rounded-lg border-2 border-[#8B7355] text-center">
                <p className="text-[#C4A57B] text-lg mb-2">
                  {t(
                    "Actualmente disponible para nuevos proyectos",
                    "Currently available for new projects"
                  )}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-[#8B7355] text-sm">{t("Respondiendo en 24h", "Responding within 24h")}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}