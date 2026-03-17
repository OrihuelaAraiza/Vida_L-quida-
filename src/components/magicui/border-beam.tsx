import { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export function BorderBeam({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--anchor": anchor,
          "--border-width": borderWidth,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",
        "[background:linear-gradient(white,white)_padding-box,conic-gradient(from_calc(var(--anchor)*1deg),#0000_25%,var(--color-from)_50%,var(--color-to)_75%,#0000_100%)_border-box]",
        "[animation:border-beam_calc(var(--duration)*1s)_var(--delay)_linear_infinite]",
        "dark:[background:linear-gradient(black,black)_padding-box,conic-gradient(from_calc(var(--anchor)*1deg),#0000_25%,var(--color-from)_50%,var(--color-to)_75%,#0000_100%)_border-box]",
        className
      )}
      aria-hidden="true"
    />
  );
}
