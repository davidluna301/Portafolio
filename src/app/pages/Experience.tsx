import { motion } from "motion/react";
import { GraduationCap, Calendar, Award } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function Experience() {
  const { t } = useLanguage();

  const education = [
    {
      id: 1,
      degree: t("Ingeniería de Software", "Software Engineering"),
      institution: "Universidad Cooperativa de Colombia",
      period: t("Cursando", "In Progress"),
      description: t(
        "Formación universitaria en ingeniería de software con enfoque en desarrollo de aplicaciones modernas, arquitectura de software, bases de datos y metodologías ágiles. Aplicando conocimientos en proyectos reales y tecnologías de vanguardia.",
        "University training in software engineering focused on modern application development, software architecture, databases, and agile methodologies. Applying knowledge in real projects and cutting-edge technologies."
      ),
      honors: ""
    },
    {
      id: 2,
      degree: t("Técnico en Sistemas", "Systems Technician"),
      institution: "Instituto Técnico Surcolombiano",
      period: t("Completado", "Completed"),
      description: t(
        "Formación técnica especializada en sistemas informáticos, desarrollo de software y gestión de tecnologías de la información. Base sólida en programación y administración de sistemas.",
        "Specialized technical training in computer systems, software development, and information technology management. Strong foundation in programming and systems administration."
      ),
      honors: ""
    },
  ];

  const skills = [
    {
      category: t("Desarrollo Web", "Web Development"),
      items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind CSS"]
    },
    {
      category: t("Inteligencia Artificial", "Artificial Intelligence"),
      items: [
        t("Integración de IA", "AI Integration"),
        t("Procesamiento de Datos", "Data Processing"),
        "Machine Learning",
        t("APIs de IA", "AI APIs")
      ]
    },
    {
      category: t("Gestión de Datos", "Data Management"),
      items: [
        t("Bases de Datos", "Databases"),
        t("Sistemas de Gestión", "Management Systems"),
        "SQL",
        "MongoDB",
        t("Optimización de Datos", "Data Optimization")
      ]
    },
    {
      category: t("Herramientas", "Tools"),
      items: ["Git", "GitHub", "Vercel", "VS Code", t("Control de Versiones", "Version Control")]
    }
  ];
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
              {t("Experiencia", "Experience")}
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto md:mx-0 mb-4" />
            <p className="text-muted-foreground text-lg max-w-2xl">
              {t("Mi formación académica y habilidades técnicas.", "My academic background and technical skills.")}
            </p>
          </div>

          <div className="space-y-16">
            {/* Formación Académica */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="w-8 h-8 text-[#8B7355]" />
                <h3 className="text-3xl text-[#2C2416]">{t("Formación Académica", "Academic Background")}</h3>
              </div>

              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="bg-white/50 backdrop-blur-sm p-8 rounded-lg border-2 border-[#8B7355] shadow-lg"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <h4 className="text-xl md:text-2xl text-[#2C2416]">
                        {edu.degree}
                      </h4>
                      <div className="flex items-center gap-2 text-[#8B7355] text-sm mt-2 md:mt-0">
                        <Calendar className="w-4 h-4" />
                        {edu.period}
                      </div>
                    </div>

                    <p className="text-[#C4A57B] mb-3">{edu.institution}</p>
                    <p className="text-[#8B7355] leading-relaxed">
                      {edu.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Habilidades Técnicas */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <Award className="w-8 h-8 text-[#8B7355]" />
                <h3 className="text-3xl text-[#2C2416]">{t("Habilidades Técnicas", "Technical Skills")}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skillGroup, index) => (
                  <motion.div
                    key={skillGroup.category}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                    className="bg-white/50 backdrop-blur-sm p-6 rounded-lg border-2 border-[#8B7355] shadow-lg"
                  >
                    <h4 className="text-xl text-[#2C2416] mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#C4A57B] rounded-full" />
                      {skillGroup.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 bg-[#2C2416] text-[#C4A57B] text-sm rounded-full border border-[#8B7355]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}