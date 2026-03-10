"use client";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { formatMXN } from "@/lib/utils";
import type { Presentation } from "@/types";

interface SizeSelectorProps {
  presentations: Presentation[];
  selected: string;
  onChange: (size: string) => void;
}

export function SizeSelector({ presentations, selected, onChange }: SizeSelectorProps) {
  return (
    <div>
      <p className="text-sm font-medium mb-2" id="size-selector-label">Presentación:</p>
      <ToggleGroup
        type="single"
        value={selected}
        onValueChange={(val) => val && onChange(val)}
        aria-labelledby="size-selector-label"
      >
        {presentations.map((p) => (
          <ToggleGroupItem key={p.size} value={p.size} aria-label={`${p.size} — ${formatMXN(p.price * 1.16)}`}>
            <span className="flex flex-col items-center gap-0.5">
              <span>{p.size}</span>
              <span className="text-xs opacity-70">{formatMXN(p.price * 1.16)}</span>
            </span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
