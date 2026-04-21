import { useNavigate } from "react-router";
import { useState } from "react";
import { getNavigationLabel, navigationItems } from "../config/navigation";
import { useLanguage } from "../contexts/LanguageContext";

interface CircularMenuProps {
  position: { x: number; y: number };
  onClose: () => void;
}

export function CircularMenu({ position, onClose }: CircularMenuProps) {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { t } = useLanguage();
  
  const radius = 120;
  const angleStep = (2 * Math.PI) / navigationItems.length;

  const handleClick = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm">
      {/* Centro del menú */}
      <div
        className="absolute w-20 h-20 bg-[#2C2416] border-4 border-[#8B7355] rounded-full flex items-center justify-center shadow-2xl"
        style={{
          left: position.x - 40,
          top: position.y - 40,
        }}
      >
        <div className="w-3 h-3 bg-[#C4A57B] rounded-full" />
      </div>

      {/* Items del menú circular */}
      {navigationItems.map((item, index) => {
        const Icon = item.icon;
        const angle = index * angleStep - Math.PI / 2; // Comenzar desde arriba
        const x = position.x + radius * Math.cos(angle);
        const y = position.y + radius * Math.sin(angle);
        const isHovered = hoveredIndex === index;
        const label = getNavigationLabel(item, t);

        return (
          <div key={item.path}>
            {/* Línea conectora */}
            <svg
              className="absolute pointer-events-none"
              style={{
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <line
                x1={position.x}
                y1={position.y}
                x2={x}
                y2={y}
                stroke={isHovered ? "#C4A57B" : "#8B7355"}
                strokeWidth={isHovered ? "3" : "2"}
                strokeDasharray="5,5"
                className="transition-all"
              />
            </svg>

            {/* Botón del menú */}
            <button
              onClick={() => handleClick(item.path)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`absolute transition-all duration-300 ${
                isHovered ? "scale-125" : "scale-100"
              }`}
              style={{
                left: x - 30,
                top: y - 30,
              }}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-3 transition-all ${
                  isHovered
                    ? "bg-[#8B7355] border-[#C4A57B]"
                    : "bg-[#3D3020] border-[#8B7355]"
                }`}
              >
                <Icon
                  className={`w-7 h-7 transition-colors ${
                    isHovered ? "text-[#F5F1E8]" : "text-[#C4A57B]"
                  }`}
                />
              </div>
              
              {/* Label */}
              {isHovered && (
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#2C2416] text-[#F5F1E8] text-sm rounded whitespace-nowrap border border-[#8B7355]">
                  {label}
                </div>
              )}
            </button>
          </div>
        );
      })}

      {/* Instrucción para cerrar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#F5F1E8] text-sm bg-[#2C2416] px-4 py-2 rounded-full border border-[#8B7355]">
        Presiona <kbd className="px-2 py-1 bg-[#8B7355] rounded mx-1">ESC</kbd> o{" "}
        <kbd className="px-2 py-1 bg-[#8B7355] rounded mx-1">TAB</kbd> para cerrar
      </div>
    </div>
  );
}
