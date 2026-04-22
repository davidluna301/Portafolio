import { ExternalLink, Github, Video } from "lucide-react";
import { motion } from "motion/react";
import totalPaperImage from "../../imports/total-paper-logo.png";
import totalGrafic3DImage from "../../imports/image-1.png";
import muLiImage from "../../imports/muli-logo.png";
import { PageShell } from "../components/PageShell";
import { useLanguage } from "../contexts/LanguageContext";

export function Projects() {
  const { t } = useLanguage();

  const projects = [
    {
      id: 1,
      title: "TotalPaper",
      description: t(
        "Sistema de Gestión de Papelería completo con control de inventario, ventas y administración. Desarrollado con tecnologías modernas para optimizar procesos de negocio.",
        "Complete Stationery Management System with inventory control, sales and administration. Developed with modern technologies to optimize business processes."
      ),
      technologies: ["Next.js", "TypeScript", t("Gestión de Datos", "Data Management")],
      github: "https://github.com/migueltovarb/ISWDISENO202502-1davidluna301/wiki/1.-TotalPaper",
      demo: "https://www.youtube.com/watch?v=vUZlvRNKDbA",
      videoDemo: true,
      image: totalPaperImage,
    },
    {
      id: 2,
      title: "TotalGrafic3D",
      description: t(
        "Aplicación web 3D interactiva para visualización y gestión de gráficos tridimensionales. Implementa tecnologías de renderizado avanzado y manipulación de objetos 3D.",
        "Interactive 3D web application for visualization and management of three-dimensional graphics. Implements advanced rendering technologies and 3D object manipulation."
      ),
      technologies: ["React", "Three.js", "Vercel"],
      github: "https://github.com/davidluna301/TotalGrafic3D",
      demo: "https://totalgrafic3d.vercel.app/",
      videoDemo: false,
      image: totalGrafic3DImage,
    },
    {
      id: 3,
      title: "MuLi",
      description: t(
        "Plataforma web moderna diseñada para gestión y organización eficiente. Interfaz limpia y funcional que prioriza la experiencia del usuario.",
        "Modern web platform designed for efficient management and organization. Clean and functional interface that prioritizes user experience."
      ),
      technologies: ["React", "Next.js", "Tailwind CSS"],
      github: "https://github.com/davidluna301/MuLi",
      demo: "https://mu-li.vercel.app/",
      videoDemo: false,
      image: muLiImage,
    },
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
              {t("Mis Proyectos", "My Projects")}
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto md:mx-0 mb-4" />
            <p className="text-muted-foreground text-lg max-w-2xl text-justify">
              {t(
                "Una selección de proyectos que demuestran mi experiencia y habilidades en desarrollo web.",
                "A selection of projects that demonstrate my experience and skills in web development."
              )}
            </p>
          </div>

          {/* Grid de proyectos */}
          <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group bg-white/50 tatami:bg-[#575357]/80 backdrop-blur-sm rounded-lg overflow-hidden border-2 border-[#8B7355] shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02]"
              >
                {/* Imagen del proyecto */}
                <div className="relative h-64 overflow-hidden bg-[#2C2416]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C2416]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <h3 className="text-2xl text-portfolio-strong mb-3">
                    {project.title}
                  </h3>
                  <p className="text-portfolio-soft mb-4 leading-relaxed text-justify">
                    {project.description}
                  </p>

                  {/* Tecnologías */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-[#2C2416] text-white text-sm rounded-full border border-[#8B7355]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Enlaces */}
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-[#2C2416] text-portfolio-contrast rounded-lg border-2 border-[#8B7355] hover:bg-[#8B7355] transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-[#8B7355] text-portfolio-contrast rounded-lg border-2 border-[#8B7355] hover:bg-[#A68968] transition-colors"
                    >
                      {project.videoDemo ? (
                        <Video className="w-4 h-4" />
                      ) : (
                        <ExternalLink className="w-4 h-4" />
                      )}
                      {project.videoDemo ? t("Video Demo", "Video Demo") : "Demo"}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
    </PageShell>
  );
}