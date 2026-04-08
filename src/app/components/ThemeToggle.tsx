import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  const isActive = theme === "tatami";

  return (
    <button
      onClick={toggleTheme}
      className={`fixed top-6 right-6 z-50 p-4 rounded-lg transition-all border-2 shadow-xl group hover:scale-110 ${
        isActive
          ? "bg-[#43494D] border-[#AA866D]"
          : "bg-[#2C2416] border-[#8B7355] hover:bg-[#8B7355]"
      }`}
      title={t("Modo Tatami Oscuro", "Dark Tatami Mode")}
    >
      <div className="relative">
        {isActive ? (
          <Moon className="w-6 h-6 text-[#AA866D] group-hover:rotate-12 transition-transform" />
        ) : (
          <Sun className="w-6 h-6 text-[#C4A57B] group-hover:rotate-90 transition-transform" />
        )}
      </div>

      {/* Tooltip */}
      <span className="absolute top-full right-0 mt-2 px-3 py-2 bg-[#2C2416] text-[#F5F1E8] text-sm rounded whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity border border-[#8B7355]">
        {isActive
          ? t("Modo Normal", "Normal Mode")
          : t("Modo Tatami Oscuro", "Dark Tatami Mode")}
      </span>
    </button>
  );
}
