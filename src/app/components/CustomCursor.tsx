import { useEffect, useRef, useState } from "react";

interface CustomCursorProps {
  forceLight?: boolean;
  hideUntilMove?: boolean;
}

export function CustomCursor({ forceLight = false, hideUntilMove = false }: CustomCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isInLightZone, setIsInLightZone] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const hideTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const updateDeviceMode = (event: MediaQueryList | MediaQueryListEvent) => {
      setIsDesktop(event.matches);
    };

    updateDeviceMode(mediaQuery);

    const handleViewportChange = (event: MediaQueryListEvent) => {
      updateDeviceMode(event);
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleViewportChange);
      return () => mediaQuery.removeEventListener("change", handleViewportChange);
    }

    mediaQuery.addListener(handleViewportChange);
    return () => mediaQuery.removeListener(handleViewportChange);
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      setIsHovering(false);
      return;
    }

    if (!hideUntilMove) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const pointedElement = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      setIsInLightZone(Boolean(pointedElement?.closest("[data-cursor-light-zone='true']")));

      if (hideUntilMove) {
        setIsVisible(true);
        if (hideTimerRef.current) {
          window.clearTimeout(hideTimerRef.current);
        }
        hideTimerRef.current = window.setTimeout(() => {
          setIsVisible(false);
        }, 3000);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.getAttribute("role") === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.getAttribute("role") === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateCursorPosition);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };
  }, [isDesktop, hideUntilMove]);

  if (!isDesktop) {
    return null;
  }

  return (
    <>
      <div
        className={`custom-cursor ${isHovering ? "hover" : ""} ${forceLight || isInLightZone ? "force-light" : ""}`}
        style={{
          transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
          opacity: isVisible ? 1 : 0,
        }}
      />
      <div
        className={`custom-cursor-ring ${isHovering ? "hover" : ""} ${forceLight || isInLightZone ? "force-light" : ""}`}
        style={{
          transform: `translate(${position.x - 16}px, ${position.y - 16}px)`,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
