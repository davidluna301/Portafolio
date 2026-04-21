import { useMemo, useState } from "react";
import { motion } from "motion/react";

type Stage = "wireframe" | "content" | "color";

type SectionBlueprint = {
  id: string;
  title: string;
  description: string;
  blocks: string[];
};

const sections: SectionBlueprint[] = [
  {
    id: "home",
    title: "Home",
    description: "Presentación inicial, foto principal y llamada a la acción.",
    blocks: ["Header", "Foto Perfil", "Nombre + Rol", "Botón CV"],
  },
  {
    id: "about",
    title: "About",
    description: "Contexto personal y profesional con narrativa resumida.",
    blocks: ["Título", "Foto Secundaria", "Historia", "Cards de enfoque"],
  },
  {
    id: "projects",
    title: "Projects",
    description: "Galería de proyectos con resumen técnico y resultado.",
    blocks: ["Título", "Grid de Proyectos", "Descripción", "Enlaces"],
  },
  {
    id: "testimonials",
    title: "Testimonials",
    description: "Opiniones de clientes con foco en credibilidad.",
    blocks: ["Título", "Carrusel", "Tarjeta Testimonio", "Rating"],
  },
  {
    id: "experience",
    title: "Experience",
    description: "Trayectoria, estudios y habilidades técnicas.",
    blocks: ["Título", "Timeline", "Habilidades", "Bloques de stack"],
  },
  {
    id: "personal",
    title: "Personal",
    description: "Intereses y dimensión personal para humanizar el perfil.",
    blocks: ["Título", "Resumen Personal", "Intereses", "Visual de apoyo"],
  },
  {
    id: "contact",
    title: "Contact",
    description: "Canales de contacto y conversión final.",
    blocks: ["Título", "Formulario", "Redes", "CTA"],
  },
];

const stageLabels: Record<Stage, string> = {
  wireframe: "Wireframe",
  content: "Texto e imágenes",
  color: "Colores",
};

const stageOrder: Stage[] = ["wireframe", "content", "color"];

function ProcessSection({
  section,
  stage,
}: {
  section: SectionBlueprint;
  stage: Stage;
}) {
  const stageHint = useMemo(() => {
    if (stage === "wireframe") {
      return "Vista estructural: solo jerarquía y contenedores.";
    }

    if (stage === "content") {
      return "Vista de contenido: textos, imágenes y mensajes clave.";
    }

    return "Vista visual final: aplicación de color, contraste y estilo.";
  }, [stage]);

  const blockStyle =
    stage === "wireframe"
      ? "border-2 border-dashed border-[#8A8F99] bg-transparent text-[#E5E7EB]"
      : stage === "content"
        ? "border border-[#8A8F99] bg-[#171A20] text-[#E5E7EB]"
        : "border border-[#37D1BE] bg-[#1C2C2A] text-[#D9FFF9]";

  return (
    <motion.section
      initial={{ opacity: 0.2, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.45, once: false }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="min-h-[82vh] rounded-2xl border border-[#2A2F39] bg-[#12151B] p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-2xl md:text-3xl font-semibold tracking-wide text-[#EAF2FF]">
          {section.title}
        </h3>
        <span className="rounded-full border border-[#3F4755] bg-[#0E1117] px-3 py-1 text-sm text-[#AEB8C7]">
          {stageLabels[stage]}
        </span>
      </div>

      <p className="mb-8 text-sm md:text-base leading-relaxed text-[#BBC4D2]">
        {section.description}
      </p>

      <p className="mb-5 text-xs md:text-sm uppercase tracking-[0.2em] text-[#8A95A8]">
        {stageHint}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {section.blocks.map((block, index) => (
          <motion.div
            key={block}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.7, once: false }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`h-24 rounded-xl px-4 py-3 flex items-center ${blockStyle}`}
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] opacity-70">Contenedor</p>
              <p className="text-base md:text-lg">{block}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export function Process() {
  const [stageIndex, setStageIndex] = useState(0);
  const stage = stageOrder[stageIndex];

  const goBack = () => {
    setStageIndex((prev) => Math.max(0, prev - 1));
  };

  const goForward = () => {
    setStageIndex((prev) => Math.min(stageOrder.length - 1, prev + 1));
  };

  return (
    <div
      className="min-h-screen px-4 md:px-8 pb-28 md:pb-20 pt-24"
      style={{
        background: "linear-gradient(180deg, #0D0F14 0%, #0B0D12 100%)",
        color: "#EAF2FF",
      }}
    >
      <button
        onClick={goBack}
        disabled={stageIndex === 0}
        className="fixed top-5 left-3 md:left-8 z-40 rounded-lg border border-[#3E4656] bg-[#10141D] px-3 md:px-4 py-2 text-sm md:text-base text-[#D7DEEB] disabled:opacity-40 disabled:cursor-not-allowed"
      >
        ← Back
      </button>

      <button
        onClick={goForward}
        disabled={stageIndex === stageOrder.length - 1}
        className="fixed top-5 right-3 md:right-8 z-40 rounded-lg border border-[#3E4656] bg-[#10141D] px-3 md:px-4 py-2 text-sm md:text-base text-[#D7DEEB] disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Forward →
      </button>

      <div className="mx-auto max-w-6xl">
        <header className="mb-8 md:mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#F2F6FF]">
            Process
          </h1>
          <p className="mt-4 text-sm md:text-base text-[#AEB8C7] max-w-3xl mx-auto leading-relaxed">
            Ruta de construcción del portafolio, página por página. Esta vista muestra
            el avance por etapas: estructura, contenido y acabado visual.
          </p>
        </header>

        <div className="mb-10 flex items-center justify-center gap-3">
          {stageOrder.map((item, index) => {
            const active = index === stageIndex;
            return (
              <button
                key={item}
                onClick={() => setStageIndex(index)}
                className={`rounded-full px-4 py-2 text-sm border transition-colors ${
                  active
                    ? "bg-[#37D1BE] text-[#0B0D12] border-[#37D1BE]"
                    : "bg-[#11151E] text-[#AEB8C7] border-[#3E4656]"
                }`}
              >
                {stageLabels[item]}
              </button>
            );
          })}
        </div>

        <div className="space-y-8 md:space-y-12">
          {sections.map((section) => (
            <ProcessSection key={section.id} section={section} stage={stage} />
          ))}
        </div>
      </div>
    </div>
  );
}
