import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { CircularMenu } from "./CircularMenu";
import { TabHint } from "./TabHint";
import { ThemeToggle } from "./ThemeToggle";
import { CustomCursor } from "./CustomCursor";
import { useEffect, useState } from "react";

export function Layout() {
  const [showCircularMenu, setShowCircularMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab" && !e.shiftKey && window.innerWidth >= 768) {
        e.preventDefault();
        if (!showCircularMenu) {
          setMenuPosition({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
          });
          setShowCircularMenu(true);
          document.body.style.cursor = "none";
        } else {
          setShowCircularMenu(false);
          document.body.style.cursor = "auto";
        }
      } else if (e.key === "Escape" && showCircularMenu) {
        setShowCircularMenu(false);
        document.body.style.cursor = "auto";
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.cursor = "auto";
    };
  }, [showCircularMenu]);

  return (
    <div className="min-h-screen bg-background relative transition-colors duration-300">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="md:ml-20 lg:ml-24 transition-all">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Circular Menu (solo desktop) */}
      {showCircularMenu && (
        <CircularMenu
          position={menuPosition}
          onClose={() => {
            setShowCircularMenu(false);
            document.body.style.cursor = "auto";
          }}
        />
      )}

      {/* Tab Hint */}
      {!showCircularMenu && <TabHint />}
    </div>
  );
}