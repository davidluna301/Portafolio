import type { CSSProperties, ReactNode } from "react";

const tatamiPatternStyle: CSSProperties = {
  backgroundImage: `repeating-linear-gradient(
    0deg,
    #2C2416,
    #2C2416 2px,
    transparent 2px,
    transparent 40px
  ),
  repeating-linear-gradient(
    90deg,
    #2C2416,
    #2C2416 2px,
    transparent 2px,
    transparent 80px
  )`,
};

interface PageShellProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export function PageShell({
  children,
  className = "py-20 md:py-32 px-4 pb-24 md:pb-32",
  containerClassName = "max-w-7xl",
}: PageShellProps) {
  return (
    <div className={`min-h-screen relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={tatamiPatternStyle} />
      </div>

      <div className={`container mx-auto relative z-10 ${containerClassName}`}>
        {children}
      </div>
    </div>
  );
}