"use client";
import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
  color?: string;
}

export function GlowingEffect({
  blur = 0,
  inactiveZone = 0.7,
  proximity = 64,
  spread = 20,
  variant = "default",
  glow = false,
  className,
  movementDuration = 2,
  borderWidth = 1,
  disabled = false,
  color = "#00C2F0",
}: GlowingEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);

  const handleMove = useCallback(
    (e?: MouseEvent | { x: number; y: number }) => {
      if (!containerRef.current) return;
      if (animationFrameRef.current != null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(() => {
        const element = containerRef.current;
        if (!element) return;
        const { left, top, width, height } = element.getBoundingClientRect();
        const mouseX = e?.x ?? lastPositionRef.current.x;
        const mouseY = e?.y ?? lastPositionRef.current.y;
        if (e) { lastPositionRef.current = { x: mouseX, y: mouseY }; }

        const center = [left + width / 2, top + height / 2];
        const distanceFromCenter = Math.hypot(mouseX - center[0], mouseY - center[1]);
        const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

        if (distanceFromCenter < inactiveRadius) {
          element.style.setProperty("--active", "0");
          return;
        }
        const isActive = mouseX > left - proximity && mouseX < left + width + proximity
                      && mouseY > top  - proximity && mouseY < top + height + proximity;
        element.style.setProperty("--active", isActive ? "1" : "0");

        if (!isActive) return;
        const currentAngle = parseFloat(element.style.getPropertyValue("--start") || "0");
        let targetAngle = (180 / Math.PI) * Math.atan2(mouseY - center[1], mouseX - center[0]) + 90;
        const diff = ((targetAngle - currentAngle + 360) % 360 - 180 + 360) % 360 - 180;
        const newAngle = currentAngle + diff;
        element.style.setProperty("--start", `${newAngle}`);
      });
    },
    [inactiveZone, proximity]
  );

  useEffect(() => {
    if (disabled) return;
    const handleMouseMove = (e: MouseEvent) => handleMove(e);
    window.addEventListener("mousemove", handleMouseMove);
    return () => { window.removeEventListener("mousemove", handleMouseMove); };
  }, [disabled, handleMove]);

  return (
    <div
      ref={containerRef}
      style={
        {
          "--blur": `${blur}px`,
          "--spread": spread,
          "--start": "0",
          "--active": "0",
          "--glowingeffect-border-width": `${borderWidth}px`,
          "--repeating-conic-gradient-times": "5",
          "--gradient": disabled
            ? `none`
            : variant === "white"
            ? `repeating-conic-gradient(from calc(var(--start) * 1deg), #fff 0%, #fff calc(360deg / var(--repeating-conic-gradient-times) * 1 / 2), transparent calc(360deg / var(--repeating-conic-gradient-times) * 1 / 2) calc(360deg / var(--repeating-conic-gradient-times))) `
            : `radial-gradient(circle, ${color}, transparent 70%)`,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
        glow && "blur-[var(--blur)]",
        `after:content-[''] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))] after:[background:var(--gradient)] after:opacity-[var(--active)] after:transition-opacity after:duration-300`,
        className
      )}
      aria-hidden="true"
    />
  );
}
