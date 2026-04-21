import { useState, type ComponentType } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Home } from "./Home";
import { About } from "./About";
import { Projects } from "./Projects";
import { Testimonials } from "./Testimonials";
import { Experience } from "./Experience";
import { PersonalLife } from "./PersonalLife";
import { Contact } from "./Contact";

type Stage = "wireframe" | "content" | "color";

type ProcessPage = {
  id: string;
  title: string;
  component: ComponentType;
  wireframeBlocks: string[];
};

const pages: ProcessPage[] = [
  {
    id: "home",
    title: "Home",
    component: Home,
    wireframeBlocks: ["Header principal", "Foto de perfil", "Nombre + rol", "CTA / descarga CV"],
  },
  {
    id: "about",
    title: "About",
    component: About,
    wireframeBlocks: ["Título de sección", "Foto secundaria", "Historia", "Bloques de enfoque"],
  },
  {
    id: "projects",
    title: "Projects",
    component: Projects,
    wireframeBlocks: ["Título", "Grid de proyectos", "Descripción por proyecto", "Acciones / enlaces"],
  },
  {
    id: "testimonials",
    title: "Testimonials",
    component: Testimonials,
    wireframeBlocks: ["Título", "Carrusel", "Tarjeta testimonio", "Calificación"],
  },
  {
    id: "experience",
    title: "Experience",
    component: Experience,
    wireframeBlocks: ["Título", "Timeline", "Habilidades", "Bloques de stack"],
  },
  {
    id: "personal",
    title: "Personal",
    component: PersonalLife,
    wireframeBlocks: ["Título", "Resumen personal", "Intereses", "Visual de apoyo"],
  },
  {
    id: "contact",
    title: "Contact",
    component: Contact,
    wireframeBlocks: ["Título", "Formulario", "Redes", "CTA"],
  },
];

const stageLabels: Record<Stage, string> = {
  wireframe: "Wireframe",
  content: "Texto e imágenes",
  color: "Colores",
};

const stageOrder: Stage[] = ["wireframe", "content", "color"];

function WireframeSection({ page }: { page: ProcessPage }) {
  return (
    <motion.section
      initial={{ opacity: 0.15, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.4, once: false }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="min-h-[78vh] rounded-2xl border border-[#5D6470] bg-[#10131A] p-6 md:p-10"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-2xl md:text-3xl font-semibold tracking-wide text-[#EAF2FF]">
          {page.title}
        </h3>
        <span className="rounded-full border border-[#5D6470] bg-[#0C0F15] px-3 py-1 text-sm text-[#AAB3C0]">
          {stageLabels.wireframe}
        </span>
      </div>

      <p className="mb-6 text-sm md:text-base text-[#B5BFCE]">
        Esquema estructural. Solo se muestra qué va en cada lugar de la página.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {page.wireframeBlocks.map((block, index) => (
          <motion.div
            key={block}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.8, once: false }}
            transition={{ duration: 0.3, delay: index * 0.06 }}
            className="h-24 rounded-xl border-2 border-dashed border-[#8B93A1] bg-transparent px-4 py-3 flex items-center"
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#8B93A1]">Zona</p>
              <p className="text-base md:text-lg text-[#EAF2FF]">{block}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function RenderPageByStage({ page, stage }: { page: ProcessPage; stage: Stage }) {
  if (stage === "wireframe") {
    return <WireframeSection page={page} />;
  }

  const PageComponent = page.component;
  const stageClass = stage === "content" ? "process-stage-content" : "process-stage-final";

  return (
    <motion.section
      initial={{ opacity: 0.15, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.3, once: false }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="rounded-2xl border border-[#2A2F39] overflow-hidden"
    >
      <div className="flex items-center justify-between gap-3 px-4 md:px-6 py-3 border-b border-[#2A2F39] bg-[#0D1118]">
        <h3 className="text-base md:text-lg text-[#EAF2FF]">{page.title}</h3>
        <span className="rounded-full border border-[#3F4755] bg-[#0E1117] px-3 py-1 text-xs md:text-sm text-[#AEB8C7]">
          {stageLabels[stage]}
        </span>
      </div>
      <div className={stageClass}>
        <PageComponent />
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
        className="fixed top-1/2 -translate-y-1/2 left-2 md:left-6 z-40 rounded-full border border-[#3E4656] bg-[#10141D] w-11 h-11 md:w-12 md:h-12 text-[#D7DEEB] flex items-center justify-center disabled:opacity-35 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goForward}
        disabled={stageIndex === stageOrder.length - 1}
        className="fixed top-1/2 -translate-y-1/2 right-2 md:right-6 z-40 rounded-full border border-[#3E4656] bg-[#10141D] w-11 h-11 md:w-12 md:h-12 text-[#D7DEEB] flex items-center justify-center disabled:opacity-35 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="mx-auto max-w-6xl">
        <header className="mb-8 md:mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#F2F6FF]">
            Process
          </h1>
          <p className="mt-4 text-sm md:text-base text-[#AEB8C7] max-w-3xl mx-auto leading-relaxed">
            Evolución del portafolio por etapas: wireframe, contenido y resultado final.
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
          {pages.map((page) => (
            <RenderPageByStage key={page.id} page={page} stage={stage} />
          ))}
        </div>
      </div>

      <style>{`
        .process-stage-content {
          filter: saturate(0.35) contrast(1.02) brightness(0.95);
        }

        .process-stage-content img,
        .process-stage-content svg {
          opacity: 0.9;
        }

        .process-stage-content * {
          transition: filter 220ms ease, opacity 220ms ease;
        }

        .process-stage-final {
          filter: none;
        }
      `}</style>
    </div>
  );
}
