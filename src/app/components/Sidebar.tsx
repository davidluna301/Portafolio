import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Languages, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getNavigationLabel, navigationItems } from "../config/navigation";
import { useLanguage } from "../contexts/LanguageContext";

export function Sidebar() {
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside data-cursor-light-zone="true" className="hidden md:flex fixed left-0 top-0 h-screen w-20 lg:w-24 bg-[#2C2416] border-r-4 border-[#8B7355] flex-col items-center py-8 z-50">
        <div className="flex-1 flex flex-col gap-6 items-center justify-center">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const label = getNavigationLabel(item, t);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group relative p-3 rounded-lg transition-all hover:bg-[#8B7355] ${
                  isActive ? "bg-[#8B7355]" : "bg-[#3D3020]"
                }`}
                title={label}
              >
                <Icon className={`w-6 h-6 ${isActive ? "text-[#F5F1E8]" : "text-[#C4A57B]"}`} />
                <span className="absolute left-full ml-4 px-3 py-2 bg-[#2C2416] text-[#F5F1E8] text-sm rounded whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity border border-[#8B7355]">
                  {label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="group relative p-3 rounded-lg transition-all hover:bg-[#8B7355] bg-[#3D3020] mb-4"
          title={t("Cambiar idioma", "Change language")}
        >
          <Languages className="w-6 h-6 text-[#C4A57B]" />
          <span className="absolute top-1 right-1 text-[10px] font-bold text-[#F5F1E8]">
            {language.toUpperCase()}
          </span>
          <span className="absolute left-full ml-4 px-3 py-2 bg-[#2C2416] text-[#F5F1E8] text-sm rounded whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity border border-[#8B7355]">
            {t("Cambiar idioma", "Change language")}
          </span>
        </button>

        <div className="w-12 h-1 bg-[#8B7355] rounded-full" />
      </aside>

      {/* ── Mobile: hamburger button ── */}
      <button
        type="button"
        onClick={() => setMobileOpen((prev) => !prev)}
        aria-label={mobileOpen ? t("Cerrar menú", "Close menu") : t("Abrir menú", "Open menu")}
        className="md:hidden fixed top-4 left-4 z-[60] p-3 rounded-lg bg-[#2C2416] border-2 border-[#8B7355] text-[#C4A57B] transition-all active:scale-95"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* ── Mobile: fullscreen overlay menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden fixed inset-0 z-[55] bg-[#2C2416]/97 backdrop-blur-md flex flex-col items-center justify-center gap-0"
          >
            {/* Decorative top bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#8B7355]" />

            <nav className="flex flex-col items-center gap-3 w-full px-10">
              {navigationItems.map((item, i) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                const label = getNavigationLabel(item, t);

                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ delay: i * 0.055, duration: 0.25 }}
                    className="w-full"
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center gap-5 w-full px-6 py-4 rounded-xl border-2 transition-all text-lg font-medium ${
                        isActive
                          ? "bg-[#8B7355] border-[#8B7355] text-[#F5F1E8]"
                          : "bg-[#3D3020] border-[#3D3020] text-[#C4A57B] hover:border-[#8B7355] hover:text-[#F5F1E8]"
                      }`}
                    >
                      <Icon className="w-6 h-6 shrink-0" />
                      {label}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Language toggle inside menu */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ delay: navigationItems.length * 0.055, duration: 0.25 }}
                className="w-full mt-2"
              >
                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="flex items-center gap-5 w-full px-6 py-4 rounded-xl border-2 border-[#3D3020] bg-[#3D3020] text-[#C4A57B] hover:border-[#8B7355] hover:text-[#F5F1E8] transition-all text-lg font-medium"
                >
                  <Languages className="w-6 h-6 shrink-0" />
                  {t("Cambiar idioma", "Change language")}
                  <span className="ml-auto text-sm font-bold">{language.toUpperCase()}</span>
                </button>
              </motion.div>
            </nav>

            {/* Decorative bottom bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#8B7355]" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
