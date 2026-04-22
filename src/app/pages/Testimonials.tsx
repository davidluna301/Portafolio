import { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, AnimatePresence } from "motion/react";
import { Quote } from "lucide-react";
import { PageShell } from "../components/PageShell";
import { useLanguage } from "../contexts/LanguageContext";

export function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const sliderRef = useRef<Slider>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Soraida Pulido",
      position: t("Gerente Administrativa", "Administrative Manager"),
      company: "",
      text: t(
        "Eres una persona dinámica y orientada al detalle, con excelente trato al cliente. Nuestra experiencia contigo nos ha mostrado tu lado profesional y tu desempeño; destaco tu comunicación efectiva, tu trabajo eficaz y proactivo.",
        "You are a dynamic and detail-oriented person, with excellent customer service. Our experience with you has shown us your professional side and your performance; I highlight your effective communication, your efficient and proactive work."
      ),
      rating: 5,
    },
    {
      id: 2,
      name: "Francisco Micolta",
      position: t("Gerente", "Manager"),
      company: "Scolart SAS by Artesco",
      text: t(
        "Eres el tipo de trabajador hábil que se esfuerza en cumplir las tareas y metas establecidas; aprovechas las oportunidades que se te brindan y ejerces tu labor con entusiasmo, ganándote así nuestra confianza. Nos alegra que hayas conseguido aprender y acompañarnos todo este tiempo.",
        "You are the kind of skilled worker who strives to meet assigned tasks and goals; you make the most of the opportunities given to you and carry out your work with enthusiasm, earning our trust. We are glad you have learned and accompanied us all this time."
      ),
      rating: 5,
    },
    {
      id: 3,
      name: "Juan David Guerra",
      position: t("Jefe de Compras", "Purchasing Manager"),
      company: "Distribuciones El Dorado",
      text: t(
        "Te conozco como una persona persistente, trabajadora y enfocada en resultados, con un excelente trato a los clientes y un buen manejo comercial. Te considero una persona versátil y orientada al cumplimiento de metas desafiantes.",
        "I know you as a persistent, hardworking person focused on results, with excellent client relations and strong commercial skills. I consider you a versatile person, driven toward the achievement of challenging goals."
      ),
      rating: 5,
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "20%",
    autoplay: false,
    arrows: false,
    beforeChange: (_current: number, next: number) => setCurrentSlide(next),
    dotsClass: "slick-dots !bottom-8",
    customPaging: (i: number) => (
      <button className={`w-3 h-3 rounded-full transition-all ${
        i === currentSlide ? "bg-[#C4A57B] scale-125" : "bg-[#8B7355]"
      }`} />
    ),
  };

  const handleSlideClick = (index: number) => {
    sliderRef.current?.slickGoTo(index);
  };

  const goTo = (next: number) => {
    const bounded = (next + testimonials.length) % testimonials.length;
    setDirection(next > currentSlide ? 1 : -1);
    setCurrentSlide(bounded);
  };

  /* ── Shared card renderer ───────────────────────────────── */
  const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[number] }) => (
    <div className="bg-white/50 tatami:bg-[#575357]/80 backdrop-blur-sm rounded-lg border-4 border-[#8B7355] shadow-2xl overflow-hidden">
      <div className="px-6 md:px-16 py-8 md:py-20 flex flex-col justify-center">
        {/* Quote icon */}
        <div className="flex justify-center mb-5 md:mb-8">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-[#2C2416] rounded-full flex items-center justify-center border-2 border-[#8B7355]">
            <Quote className="w-6 h-6 md:w-8 md:h-8 text-[#C4A57B]" />
          </div>
        </div>

        {/* Texto */}
        <blockquote className="text-center mb-6 md:mb-10">
          <p className="text-base md:text-2xl lg:text-3xl text-portfolio-strong leading-relaxed italic text-justify">
            "{testimonial.text}"
          </p>
        </blockquote>

        {/* Info cliente */}
        <div className="text-center">
          <h3 className="text-xl md:text-3xl text-portfolio-strong mb-1 md:mb-2">
            {testimonial.name}
          </h3>
          <p className="text-sm md:text-lg text-portfolio-soft mb-1">
            {testimonial.position}
          </p>
          <p className="text-sm md:text-base text-portfolio-accent">
            {testimonial.company}
          </p>

          {/* Rating */}
          <div className="flex gap-1 justify-center mt-4 md:mt-6">
            {[...Array(testimonial.rating)].map((_, i) => (
              <svg key={i} className="w-4 h-4 md:w-6 md:h-6 text-[#C4A57B]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <PageShell>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Título */}
          <div className="mb-10 md:mb-16 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-primary mb-4">
              {t("Testimonios", "Testimonials")}
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </div>

          {/* ── MOBILE: carrusel vertical con loop ─────────────── */}
          {isMobile ? (
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentSlide}
                  custom={direction}
                  initial={{ y: direction > 0 ? 80 : -80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: direction > 0 ? -80 : 80, opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                >
                  <TestimonialCard testimonial={testimonials[currentSlide]} />
                </motion.div>
              </AnimatePresence>

              {/* Dots + counter */}
              <div className="mt-5 flex items-center justify-center gap-4">
                <button
                  onClick={() => goTo(currentSlide - 1)}
                  className="w-8 h-8 bg-[#2C2416] border-2 border-[#8B7355] rounded-full flex items-center justify-center text-portfolio-accent hover:bg-[#8B7355] transition-colors"
                  aria-label="Anterior"
                >
                  ▲
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        i === currentSlide ? "bg-[#C4A57B] scale-125" : "bg-[#8B7355]"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => goTo(currentSlide + 1)}
                  className="w-8 h-8 bg-[#2C2416] border-2 border-[#8B7355] rounded-full flex items-center justify-center text-portfolio-accent hover:bg-[#8B7355] transition-colors"
                  aria-label="Siguiente"
                >
                  ▼
                </button>
              </div>
            </div>
          ) : (
          /* ── DESKTOP: slider horizontal ───────────────────── */
            <div className="max-w-7xl mx-auto">
              <div className="relative">
                <div className="testimonials-slider">
                  <Slider ref={sliderRef} {...sliderSettings}>
                    {testimonials.map((testimonial, index) => (
                      <div key={testimonial.id} className="px-2 md:px-4">
                        <div
                          onClick={() => handleSlideClick(index)}
                          className={`transition-all duration-500 cursor-pointer ${
                            index === currentSlide
                              ? 'scale-100 opacity-100'
                              : 'scale-90 opacity-40 hover:opacity-60'
                          }`}
                        >
                          <TestimonialCard testimonial={testimonial} />
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>

                {/* Contador de slides */}
                <div className="mt-6 text-center">
                  <span className="inline-block px-4 py-2 bg-[#2C2416] border-2 border-[#8B7355] rounded-full text-portfolio-accent">
                    {currentSlide + 1} / {testimonials.length}
                  </span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
    </PageShell>
  );
}