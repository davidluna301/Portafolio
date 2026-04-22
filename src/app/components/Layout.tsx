import { Outlet, useLocation } from "react-router";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { CircularMenu } from "./CircularMenu";
import { TabHint } from "./TabHint";
import { ThemeToggle } from "./ThemeToggle";
import { CustomCursor } from "./CustomCursor";
import { useEffect, useState } from "react";

export function Layout() {
  const [showCircularMenu, setShowCircularMenu] = useState(false);
  const [hideChrome, setHideChrome] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const location = useLocation();
  const isMusicPage = location.pathname === "/music";

  useEffect(() => {
    setHideChrome(false);
  }, [location.pathname]);

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
      {(!hideChrome || isMusicPage) && (
        <CustomCursor forceLight={isMusicPage} hideUntilMove={isMusicPage && hideChrome} />
      )}

      {/* Theme Toggle */}
      {!hideChrome && <ThemeToggle />}

      {/* Sidebar */}
      {!hideChrome && <Sidebar />}

      {/* Main Content */}
      <main className={hideChrome ? "transition-all" : "md:ml-20 lg:ml-24 transition-all"}>
        <Outlet context={{ hideChrome, setHideChrome }} />
      </main>

      {/* Footer */}
      {!hideChrome && <Footer />}

      {/* Circular Menu (solo desktop) */}
      {showCircularMenu && !hideChrome && (
        <CircularMenu
          position={menuPosition}
          onClose={() => {
            setShowCircularMenu(false);
            document.body.style.cursor = "auto";
          }}
        />
      )}

      {/* Tab Hint */}
      {!showCircularMenu && !hideChrome && <TabHint />}
    </div>
  );
}