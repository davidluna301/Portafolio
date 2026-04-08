import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Theme = "default" | "tatami";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("default");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "default" ? "tatami" : "default"));
  };

  useEffect(() => {
    if (theme === "tatami") {
      document.documentElement.classList.add("tatami");
    } else {
      document.documentElement.classList.remove("tatami");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
