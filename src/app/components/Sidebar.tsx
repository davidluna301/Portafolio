import { Link, useLocation } from "react-router";
import { Home, User, Briefcase, MessageSquare, GraduationCap, Mail, Heart, Languages } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function Sidebar() {
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();

  const navItems = [
    { path: "/", icon: Home, label: t("Inicio", "Home") },
    { path: "/about", icon: User, label: t("Acerca de mí", "About me") },
    { path: "/projects", icon: Briefcase, label: t("Proyectos", "Projects") },
    { path: "/testimonials", icon: MessageSquare, label: t("Testimonios", "Testimonials") },
    { path: "/experience", icon: GraduationCap, label: t("Experiencia", "Experience") },
    { path: "/personal", icon: Heart, label: t("Conóceme mejor", "Get to know me") },
    { path: "/contact", icon: Mail, label: t("Contacto", "Contact") },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-20 lg:w-24 bg-[#2C2416] border-r-4 border-[#8B7355] flex-col items-center py-8 z-50">
        <div className="flex-1 flex flex-col gap-6 items-center justify-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group relative p-3 rounded-lg transition-all hover:bg-[#8B7355] ${
                  isActive ? "bg-[#8B7355]" : "bg-[#3D3020]"
                }`}
                title={item.label}
              >
                <Icon className={`w-6 h-6 ${isActive ? "text-[#F5F1E8]" : "text-[#C4A57B]"}`} />

                {/* Tooltip */}
                <span className="absolute left-full ml-4 px-3 py-2 bg-[#2C2416] text-[#F5F1E8] text-sm rounded whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity border border-[#8B7355]">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Language Toggle Button */}
        <button
          onClick={toggleLanguage}
          className="group relative p-3 rounded-lg transition-all hover:bg-[#8B7355] bg-[#3D3020] mb-4"
          title={t("Cambiar idioma", "Change language")}
        >
          <Languages className="w-6 h-6 text-[#C4A57B]" />
          <span className="absolute top-1 right-1 text-[10px] font-bold text-[#F5F1E8]">
            {language.toUpperCase()}
          </span>

          {/* Tooltip */}
          <span className="absolute left-full ml-4 px-3 py-2 bg-[#2C2416] text-[#F5F1E8] text-sm rounded whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity border border-[#8B7355]">
            {t("Cambiar idioma", "Change language")}
          </span>
        </button>

        {/* Decorative element */}
        <div className="w-12 h-1 bg-[#8B7355] rounded-full" />
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#2C2416] border-t-4 border-[#8B7355] z-50">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                  isActive ? "bg-[#8B7355]" : ""
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-[#F5F1E8]" : "text-[#C4A57B]"}`} />
                <span className={`text-[10px] ${isActive ? "text-[#F5F1E8]" : "text-[#C4A57B]"}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
