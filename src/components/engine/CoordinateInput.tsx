import { useCallback } from "react";
import { Label } from "@/components/ui/label";

interface CoordinateInputProps {
  label: string;
  x: number;
  y: number;
  z: number;
  step?: number;
  onChange: (x: number, y: number, z: number) => void;
  selected?: boolean;
  onSelect?: () => void;
}

const axisColors = {
  X: "text-red-400",
  Y: "text-green-400",
  Z: "text-blue-400",
};

export function CoordinateInput({
  label, x, y, z, step = 0.01, onChange, selected, onSelect,
}: CoordinateInputProps) {
  const handleChange = useCallback(
    (axis: "x" | "y" | "z", raw: string) => {
      const v = parseFloat(raw);
      if (isNaN(v)) return;
      if (axis === "x") onChange(v, y, z);
      else if (axis === "y") onChange(x, v, z);
      else onChange(x, y, v);
    },
    [x, y, z, onChange]
  );

  return (
    <div
      className={`p-2 rounded border cursor-pointer transition-colors ${
        selected
          ? "border-primary bg-primary/10"
          : "border-border bg-secondary/20 hover:border-primary/40"
      }`}
      onClick={onSelect}
    >
      <Label className="text-[10px] font-semibold text-muted-foreground block mb-1.5 truncate">
        {label}
      </Label>
      <div className="grid grid-cols-3 gap-1">
        {(["X", "Y", "Z"] as const).map((axis) => {
          const val = axis === "X" ? x : axis === "Y" ? y : z;
          return (
            <div key={axis} className="flex flex-col gap-0.5">
              <span className={`text-[9px] font-mono font-bold ${axisColors[axis]}`}>
                {axis}
              </span>
              <input
                type="number"
                step={step}
                value={val}
                onChange={(e) => handleChange(axis.toLowerCase() as "x" | "y" | "z", e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="w-full h-6 px-1 text-[11px] font-mono bg-background border border-border rounded text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
