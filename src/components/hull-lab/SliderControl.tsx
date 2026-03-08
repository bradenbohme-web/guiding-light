import { ChangeEvent } from "react";

import { Input } from "@/components/ui/input";

interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

export function SliderControl({ label, value, min, max, step, onChange }: SliderControlProps) {
  const decimals = step < 0.01 ? 3 : 2;

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const parsed = Number(event.target.value);
    if (Number.isFinite(parsed)) {
      const next = Math.min(max, Math.max(min, parsed));
      onChange(next);
    }
  };

  return (
    <label className="block space-y-3 rounded-xl border border-border bg-background/70 p-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/90">{label}</span>
        <Input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value.toFixed(decimals)}
          onChange={handleNumberChange}
          className="h-8 w-24 bg-card text-right font-mono text-xs"
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleRangeChange}
        className="w-full accent-primary"
      />
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>{min.toFixed(decimals)}</span>
        <span>{max.toFixed(decimals)}</span>
      </div>
    </label>
  );
}
