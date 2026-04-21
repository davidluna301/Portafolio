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
      name: "María González",
      position: t("CEO, Tech Innovations", "CEO, Tech Innovations"),
      company: "Tech Innovations Inc.",
      text: t(
        "Trabajar con este desarrollador fue una experiencia excepcional. Su atención al detalle y capacidad para transformar ideas en realidad es impresionante. El proyecto se entregó a tiempo y superó todas nuestras expectativas.",
        "Working with this developer was an exceptional experience. His attention to detail and ability to transform ideas into reality is impressive. The project was delivered on time and exceeded all our expectations."
      ),
      rating: 5,
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      position: t("Director de Producto", "Product Director"),
      company: "Digital Solutions",
      text: t(
        "Su dominio de las tecnologías modernas y su enfoque en la experiencia del usuario hacen que cada proyecto sea un éxito. La comunicación fue fluida y siempre estuvo dispuesto a adaptarse a nuestras necesidades cambiantes.",
        "His mastery of modern technologies and focus on user experience make every project a success. Communication was smooth and he was always willing to adapt to our changing needs."
      ),
      rating: 5,
    },
    {
      id: 3,
      name: "Ana Martínez",
      position: t("Fundadora", "Founder"),
      company: "StartUp Creative",
      text: t(
        "No solo cumplió con los requisitos técnicos, sino que también aportó ideas creativas que mejoraron significativamente nuestro producto. Su profesionalismo y dedicación son excepcionales. Definitivamente volveremos a trabajar juntos.",
        "He not only met the technical requirements, but also provided creative ideas that significantly improved our product. His professionalism and dedication are exceptional. We will definitely work together again."
      ),
      rating: 5,
    },
    {
      id: 4,
      name: "David López",
      position: "CTO",
      company: "Enterprise Systems",
      text: t(
        "Un verdadero profesional que entiende tanto el lado técnico como el empresarial del desarrollo. Su código es limpio, bien documentado y fácil de mantener. Una colaboración excelente de principio a fin.",
        "A true professional who understands both the technical and business side of development. His code is clean, well documented and easy to maintain. An excellent collaboration from start to finish."
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