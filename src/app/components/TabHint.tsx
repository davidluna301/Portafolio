import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

export function TabHint() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Verificar si el usuario ya ha cerrado el hint
    const dismissed = localStorage.getItem("tabHintDismissed");
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Mostrar el hint después de 3 segundos solo en desktop
    const timer = setTimeout(() => {
      if (window.innerWidth >= 768) {
        setIsVisible(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem("tabHintDismissed", "true");
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 right-8 z-50 hidden md:block"
        >
          <div className="bg-[#2C2416] border-2 border-[#8B7355] rounded-lg p-4 shadow-2xl max-w-xs">
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 text-[#8B7355] hover:text-[#C4A57B] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="pr-6">
              <p className="text-[#C4A57B] mb-2">
                💡 <span className="font-semibold">Consejo</span>
              </p>
              <p className="text-[#8B7355] text-sm">
                Presiona <kbd className="px-2 py-1 bg-[#8B7355] text-[#F5F1E8] rounded text-xs mx-1">TAB</kbd> 
                para abrir el menú circular de navegación
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
