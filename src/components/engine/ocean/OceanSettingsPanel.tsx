// Comprehensive ocean & weather settings panel
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  OceanSettings,
  BeaufortScale,
  BEAUFORT_PRESETS,
  DEFAULT_OCEAN_SETTINGS,
} from "@/lib/ocean/types";
import {
  ChevronRight,
  Waves,
  Wind,
  Sun,
  Droplets,
  Palette,
  Eye,
  Gauge,
  RotateCcw,
  Cloud,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

interface OceanSettingsPanelProps {
  settings: OceanSettings;
  onChange: (settings: OceanSettings) => void;
}

// ---- Reusable slider ----
function S({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <Label className="text-xs text-muted-foreground">{label}</Label>
        <span className="text-xs font-mono text-primary">
          {value.toFixed(step < 0.01 ? 4 : step < 1 ? 2 : 0)}
          {unit && ` ${unit}`}
        </span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([v]) => onChange(v)}
        className="w-full"
      />
    </div>
  );
}

// ---- Collapsible section ----
function Section({
  title,
  icon,
  children,
  defaultOpen = false,
  badge,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex items-center gap-2 w-full py-2 px-1 hover:bg-secondary/30 rounded transition-colors">
        <ChevronRight
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-90" : ""}`}
        />
        {icon}
        <span className="text-xs font-semibold flex-1 text-left">{title}</span>
        {badge && (
          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
            {badge}
          </Badge>
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-6 pr-1 pb-3 space-y-3">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

// ---- Color input ----
function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-6 h-6 rounded border border-border cursor-pointer"
        />
        <span className="text-[10px] font-mono text-muted-foreground">
          {value}
        </span>
      </div>
    </div>
  );
}

export function OceanSettingsPanel({
  settings: s,
  onChange,
}: OceanSettingsPanelProps) {
  const set = <K extends keyof OceanSettings>(
    key: K,
    val: OceanSettings[K]
  ) => {
    onChange({ ...s, [key]: val });
  };

  const applyBeaufort = (bf: BeaufortScale) => {
    const p = BEAUFORT_PRESETS[bf];
    onChange({
      ...s,
      globalWaveHeight: p.waveHeight * 0.5,
      primarySwell: {
        ...s.primarySwell,
        amplitude: p.waveHeight * 0.6,
        wavelength: Math.max(8, p.waveHeight * 8),
      },
      secondarySwell: {
        ...s.secondarySwell,
        amplitude: p.waveHeight * 0.25,
      },
      windSea: {
        ...s.windSea,
        speed: p.windSpeed,
        choppiness: Math.min(p.windSpeed / 10, 1.5),
      },
      fft: {
        ...s.fft,
        windSpeed: p.windSpeed,
        amplitude: 0.0001 + p.windSpeed * 0.00005,
      },
      foam: {
        ...s.foam,
        coverage: Math.min(bf / 8, 1),
        whitecapIntensity: Math.min(bf / 6, 1),
      },
      spray: {
        ...s.spray,
        intensity: Math.min(bf / 7, 1),
      },
    });
  };

  return (
    <div className="h-full overflow-y-auto scrollbar-hide">
      <div className="p-3 space-y-1">
        {/* Header with presets */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold flex items-center gap-2">
            <Waves className="w-4 h-4 text-primary" />
            Ocean & Weather
          </h3>
          <button
            onClick={() => onChange({ ...DEFAULT_OCEAN_SETTINGS })}
            className="p-1 hover:bg-secondary rounded"
            title="Reset to defaults"
          >
            <RotateCcw className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </div>

        {/* Beaufort preset selector */}
        <div className="space-y-1.5 pb-2">
          <Label className="text-xs text-muted-foreground">
            Beaufort Scale Preset
          </Label>
          <Select
            onValueChange={(v) => applyBeaufort(parseInt(v) as BeaufortScale)}
          >
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Select sea state..." />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(BEAUFORT_PRESETS).map(([k, v]) => (
                <SelectItem key={k} value={k} className="text-xs">
                  <span className="font-mono mr-1">BF{k}</span> {v.label} —{" "}
                  {v.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Master controls */}
        <div className="space-y-3 pb-1">
          <S
            label="Global Wave Height"
            value={s.globalWaveHeight}
            min={0}
            max={3}
            step={0.01}
            unit="m"
            onChange={(v) => set("globalWaveHeight", v)}
          />
          <S
            label="Time Scale"
            value={s.timeScale}
            min={0}
            max={3}
            step={0.01}
            onChange={(v) => set("timeScale", v)}
          />
        </div>

        <Separator className="my-1" />

        {/* Primary Swell */}
        <Section
          title="Primary Swell"
          icon={<Waves className="w-3.5 h-3.5 text-blue-400" />}
          defaultOpen
          badge={s.primarySwell.enabled ? "ON" : "OFF"}
        >
          <div className="flex items-center gap-2 mb-2">
            <Switch
              checked={s.primarySwell.enabled}
              onCheckedChange={(v) =>
                set("primarySwell", { ...s.primarySwell, enabled: v })
              }
            />
            <Label className="text-xs">Enabled</Label>
          </div>
          <S
            label="Direction"
            value={s.primarySwell.direction}
            min={0}
            max={360}
            step={1}
            unit="°"
            onChange={(v) =>
              set("primarySwell", { ...s.primarySwell, direction: v })
            }
          />
          <S
            label="Wavelength"
            value={s.primarySwell.wavelength}
            min={2}
            max={50}
            step={0.5}
            unit="m"
            onChange={(v) =>
              set("primarySwell", { ...s.primarySwell, wavelength: v })
            }
          />
          <S
            label="Amplitude"
            value={s.primarySwell.amplitude}
            min={0}
            max={3}
            step={0.01}
            unit="m"
            onChange={(v) =>
              set("primarySwell", { ...s.primarySwell, amplitude: v })
            }
          />
          <S
            label="Steepness"
            value={s.primarySwell.steepness}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) =>
              set("primarySwell", { ...s.primarySwell, steepness: v })
            }
          />
        </Section>

        {/* Secondary Swell */}
        <Section
          title="Secondary Swell (Cross-Sea)"
          icon={<Waves className="w-3.5 h-3.5 text-cyan-400" />}
          badge={s.secondarySwell.enabled ? "ON" : "OFF"}
        >
          <div className="flex items-center gap-2 mb-2">
            <Switch
              checked={s.secondarySwell.enabled}
              onCheckedChange={(v) =>
                set("secondarySwell", { ...s.secondarySwell, enabled: v })
              }
            />
            <Label className="text-xs">Enabled</Label>
          </div>
          <S
            label="Direction"
            value={s.secondarySwell.direction}
            min={0}
            max={360}
            step={1}
            unit="°"
            onChange={(v) =>
              set("secondarySwell", { ...s.secondarySwell, direction: v })
            }
          />
          <S
            label="Wavelength"
            value={s.secondarySwell.wavelength}
            min={2}
            max={40}
            step={0.5}
            unit="m"
            onChange={(v) =>
              set("secondarySwell", { ...s.secondarySwell, wavelength: v })
            }
          />
          <S
            label="Amplitude"
            value={s.secondarySwell.amplitude}
            min={0}
            max={2}
            step={0.01}
            unit="m"
            onChange={(v) =>
              set("secondarySwell", { ...s.secondarySwell, amplitude: v })
            }
          />
          <S
            label="Steepness"
            value={s.secondarySwell.steepness}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) =>
              set("secondarySwell", { ...s.secondarySwell, steepness: v })
            }
          />
        </Section>

        {/* Wind Sea */}
        <Section
          title="Wind Sea"
          icon={<Wind className="w-3.5 h-3.5 text-teal-400" />}
          badge={s.windSea.enabled ? "ON" : "OFF"}
        >
          <div className="flex items-center gap-2 mb-2">
            <Switch
              checked={s.windSea.enabled}
              onCheckedChange={(v) =>
                set("windSea", { ...s.windSea, enabled: v })
              }
            />
            <Label className="text-xs">Enabled</Label>
          </div>
          <S
            label="Wind Direction"
            value={s.windSea.direction}
            min={0}
            max={360}
            step={1}
            unit="°"
            onChange={(v) =>
              set("windSea", { ...s.windSea, direction: v })
            }
          />
          <S
            label="Wind Speed"
            value={s.windSea.speed}
            min={0}
            max={25}
            step={0.1}
            unit="m/s"
            onChange={(v) =>
              set("windSea", { ...s.windSea, speed: v })
            }
          />
          <S
            label="Fetch"
            value={s.windSea.fetch}
            min={1}
            max={200}
            step={1}
            unit="km"
            onChange={(v) =>
              set("windSea", { ...s.windSea, fetch: v })
            }
          />
          <S
            label="Spread Angle"
            value={s.windSea.spreadAngle}
            min={5}
            max={90}
            step={1}
            unit="°"
            onChange={(v) =>
              set("windSea", { ...s.windSea, spreadAngle: v })
            }
          />
          <S
            label="Choppiness"
            value={s.windSea.choppiness}
            min={0}
            max={2}
            step={0.01}
            onChange={(v) =>
              set("windSea", { ...s.windSea, choppiness: v })
            }
          />
        </Section>

        {/* Capillary Ripples */}
        <Section
          title="Capillary Ripples"
          icon={<Sparkles className="w-3.5 h-3.5 text-indigo-400" />}
          badge={s.capillary.enabled ? "ON" : "OFF"}
        >
          <div className="flex items-center gap-2 mb-2">
            <Switch
              checked={s.capillary.enabled}
              onCheckedChange={(v) =>
                set("capillary", { ...s.capillary, enabled: v })
              }
            />
            <Label className="text-xs">Enabled</Label>
          </div>
          <S
            label="Intensity"
            value={s.capillary.intensity}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) =>
              set("capillary", { ...s.capillary, intensity: v })
            }
          />
          <S
            label="Scale"
            value={s.capillary.scale}
            min={0.1}
            max={3}
            step={0.1}
            onChange={(v) =>
              set("capillary", { ...s.capillary, scale: v })
            }
          />
        </Section>

        {/* FFT Spectral Detail */}
        <Section
          title="FFT Spectral Detail"
          icon={<Gauge className="w-3.5 h-3.5 text-purple-400" />}
          badge={s.fft.enabled ? "ON" : "OFF"}
        >
          <div className="flex items-center gap-2 mb-2">
            <Switch
              checked={s.fft.enabled}
              onCheckedChange={(v) => set("fft", { ...s.fft, enabled: v })}
            />
            <Label className="text-xs">Enabled</Label>
          </div>
          <S
            label="Wind Speed"
            value={s.fft.windSpeed}
            min={0}
            max={25}
            step={0.1}
            unit="m/s"
            onChange={(v) => set("fft", { ...s.fft, windSpeed: v })}
          />
          <S
            label="Wind Direction"
            value={s.fft.windDirection}
            min={0}
            max={360}
            step={1}
            unit="°"
            onChange={(v) => set("fft", { ...s.fft, windDirection: v })}
          />
          <S
            label="Phillips Amplitude"
            value={s.fft.amplitude}
            min={0.0001}
            max={0.005}
            step={0.0001}
            onChange={(v) => set("fft", { ...s.fft, amplitude: v })}
          />
          <S
            label="Choppiness"
            value={s.fft.choppiness}
            min={0}
            max={2}
            step={0.01}
            onChange={(v) => set("fft", { ...s.fft, choppiness: v })}
          />
          <S
            label="Detail Blend"
            value={s.fft.detailBlend}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) => set("fft", { ...s.fft, detailBlend: v })}
          />
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Resolution</Label>
            <Select
              value={String(s.fft.resolution)}
              onValueChange={(v) =>
                set("fft", {
                  ...s.fft,
                  resolution: parseInt(v) as 64 | 128 | 256 | 512,
                })
              }
            >
              <SelectTrigger className="h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="64">64×64</SelectItem>
                <SelectItem value="128">128×128</SelectItem>
                <SelectItem value="256">256×256</SelectItem>
                <SelectItem value="512">512×512</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Section>

        <Separator className="my-1" />

        {/* Foam */}
        <Section
          title="Foam & Whitecaps"
          icon={<Cloud className="w-3.5 h-3.5 text-white" />}
          badge={s.foam.enabled ? "ON" : "OFF"}
        >
          <div className="flex items-center gap-2 mb-2">
            <Switch
              checked={s.foam.enabled}
              onCheckedChange={(v) => set("foam", { ...s.foam, enabled: v })}
            />
            <Label className="text-xs">Enabled</Label>
          </div>
          <S
            label="Steepness Threshold"
            value={s.foam.threshold}
            min={0.1}
            max={0.8}
            step={0.01}
            onChange={(v) => set("foam", { ...s.foam, threshold: v })}
          />
          <S
            label="Coverage"
            value={s.foam.coverage}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) => set("foam", { ...s.foam, coverage: v })}
          />
          <S
            label="Whitecap Intensity"
            value={s.foam.whitecapIntensity}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) =>
              set("foam", { ...s.foam, whitecapIntensity: v })
            }
          />
          <S
            label="Decay Time"
            value={s.foam.decay}
            min={0.5}
            max={10}
            step={0.1}
            unit="s"
            onChange={(v) => set("foam", { ...s.foam, decay: v })}
          />
          <S
            label="Wind Streak Length"
            value={s.foam.streakLength}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) => set("foam", { ...s.foam, streakLength: v })}
          />
          <ColorInput
            label="Foam Color"
            value={s.foam.color}
            onChange={(v) => set("foam", { ...s.foam, color: v })}
          />
        </Section>

        {/* Spray */}
        <Section
          title="Spray & Mist"
          icon={<Droplets className="w-3.5 h-3.5 text-sky-300" />}
          badge={s.spray.enabled ? "ON" : "OFF"}
        >
          <div className="flex items-center gap-2 mb-2">
            <Switch
              checked={s.spray.enabled}
              onCheckedChange={(v) =>
                set("spray", { ...s.spray, enabled: v })
              }
            />
            <Label className="text-xs">Enabled</Label>
          </div>
          <S
            label="Intensity"
            value={s.spray.intensity}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) => set("spray", { ...s.spray, intensity: v })}
          />
          <S
            label="Max Height"
            value={s.spray.height}
            min={0}
            max={3}
            step={0.1}
            onChange={(v) => set("spray", { ...s.spray, height: v })}
          />
          <S
            label="Wind Carry"
            value={s.spray.windEffect}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) => set("spray", { ...s.spray, windEffect: v })}
          />
          <S
            label="Mist Density"
            value={s.spray.mistDensity}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) => set("spray", { ...s.spray, mistDensity: v })}
          />
        </Section>

        <Separator className="my-1" />

        {/* Water Material */}
        <Section
          title="Water Material"
          icon={<Palette className="w-3.5 h-3.5 text-emerald-400" />}
        >
          <ColorInput
            label="Deep Color"
            value={s.material.deepColor}
            onChange={(v) =>
              set("material", { ...s.material, deepColor: v })
            }
          />
          <ColorInput
            label="Shallow Color"
            value={s.material.shallowColor}
            onChange={(v) =>
              set("material", { ...s.material, shallowColor: v })
            }
          />
          <S
            label="Absorption Red"
            value={s.material.absorptionR}
            min={0}
            max={2}
            step={0.01}
            onChange={(v) =>
              set("material", { ...s.material, absorptionR: v })
            }
          />
          <S
            label="Absorption Green"
            value={s.material.absorptionG}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) =>
              set("material", { ...s.material, absorptionG: v })
            }
          />
          <S
            label="Absorption Blue"
            value={s.material.absorptionB}
            min={0}
            max={0.5}
            step={0.01}
            onChange={(v) =>
              set("material", { ...s.material, absorptionB: v })
            }
          />
          <S
            label="Absorption Depth"
            value={s.material.absorptionDepth}
            min={0.5}
            max={20}
            step={0.1}
            unit="m"
            onChange={(v) =>
              set("material", { ...s.material, absorptionDepth: v })
            }
          />
          <S
            label="Clarity"
            value={s.material.clarity}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) =>
              set("material", { ...s.material, clarity: v })
            }
          />
          <S
            label="IOR"
            value={s.material.ior}
            min={1.0}
            max={1.6}
            step={0.001}
            onChange={(v) =>
              set("material", { ...s.material, ior: v })
            }
          />
          <S
            label="Roughness"
            value={s.material.roughness}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) =>
              set("material", { ...s.material, roughness: v })
            }
          />
        </Section>

        {/* SSS */}
        <Section
          title="Subsurface Scattering"
          icon={<Eye className="w-3.5 h-3.5 text-green-400" />}
          badge={s.sss.enabled ? "ON" : "OFF"}
        >
          <div className="flex items-center gap-2 mb-2">
            <Switch
              checked={s.sss.enabled}
              onCheckedChange={(v) => set("sss", { ...s.sss, enabled: v })}
            />
            <Label className="text-xs">Enabled</Label>
          </div>
          <S
            label="Intensity"
            value={s.sss.intensity}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) => set("sss", { ...s.sss, intensity: v })}
          />
          <S
            label="Power"
            value={s.sss.power}
            min={1}
            max={10}
            step={0.1}
            onChange={(v) => set("sss", { ...s.sss, power: v })}
          />
          <ColorInput
            label="SSS Color"
            value={s.sss.color}
            onChange={(v) => set("sss", { ...s.sss, color: v })}
          />
          <S
            label="Ambient Occlusion"
            value={s.sss.ambientOcclusion}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) => set("sss", { ...s.sss, ambientOcclusion: v })}
          />
        </Section>

        <Separator className="my-1" />

        {/* Atmosphere */}
        <Section
          title="Sun"
          icon={<Sun className="w-3.5 h-3.5 text-yellow-400" />}
        >
          <S
            label="Azimuth"
            value={s.atmosphere.sun.azimuth}
            min={0}
            max={360}
            step={1}
            unit="°"
            onChange={(v) =>
              set("atmosphere", {
                ...s.atmosphere,
                sun: { ...s.atmosphere.sun, azimuth: v },
              })
            }
          />
          <S
            label="Elevation"
            value={s.atmosphere.sun.elevation}
            min={-5}
            max={90}
            step={0.5}
            unit="°"
            onChange={(v) =>
              set("atmosphere", {
                ...s.atmosphere,
                sun: { ...s.atmosphere.sun, elevation: v },
              })
            }
          />
          <S
            label="Intensity"
            value={s.atmosphere.sun.intensity}
            min={0}
            max={5}
            step={0.1}
            onChange={(v) =>
              set("atmosphere", {
                ...s.atmosphere,
                sun: { ...s.atmosphere.sun, intensity: v },
              })
            }
          />
          <ColorInput
            label="Sun Color"
            value={s.atmosphere.sun.color}
            onChange={(v) =>
              set("atmosphere", {
                ...s.atmosphere,
                sun: { ...s.atmosphere.sun, color: v },
              })
            }
          />
        </Section>

        <Section
          title="Sky & Fog"
          icon={<Cloud className="w-3.5 h-3.5 text-blue-300" />}
        >
          <S
            label="Turbidity"
            value={s.atmosphere.sky.turbidity}
            min={1}
            max={10}
            step={0.1}
            onChange={(v) =>
              set("atmosphere", {
                ...s.atmosphere,
                sky: { ...s.atmosphere.sky, turbidity: v },
              })
            }
          />
          <S
            label="Rayleigh"
            value={s.atmosphere.sky.rayleigh}
            min={0}
            max={4}
            step={0.01}
            onChange={(v) =>
              set("atmosphere", {
                ...s.atmosphere,
                sky: { ...s.atmosphere.sky, rayleigh: v },
              })
            }
          />
          <S
            label="Mie Coefficient"
            value={s.atmosphere.sky.mieCoefficient}
            min={0}
            max={0.1}
            step={0.001}
            onChange={(v) =>
              set("atmosphere", {
                ...s.atmosphere,
                sky: { ...s.atmosphere.sky, mieCoefficient: v },
              })
            }
          />
          <div className="flex items-center gap-2 mt-2">
            <Switch
              checked={s.atmosphere.fog.enabled}
              onCheckedChange={(v) =>
                set("atmosphere", {
                  ...s.atmosphere,
                  fog: { ...s.atmosphere.fog, enabled: v },
                })
              }
            />
            <Label className="text-xs">Fog</Label>
          </div>
          {s.atmosphere.fog.enabled && (
            <>
              <ColorInput
                label="Fog Color"
                value={s.atmosphere.fog.color}
                onChange={(v) =>
                  set("atmosphere", {
                    ...s.atmosphere,
                    fog: { ...s.atmosphere.fog, color: v },
                  })
                }
              />
              <S
                label="Fog Near"
                value={s.atmosphere.fog.near}
                min={5}
                max={200}
                step={1}
                unit="m"
                onChange={(v) =>
                  set("atmosphere", {
                    ...s.atmosphere,
                    fog: { ...s.atmosphere.fog, near: v },
                  })
                }
              />
              <S
                label="Fog Far"
                value={s.atmosphere.fog.far}
                min={50}
                max={1000}
                step={5}
                unit="m"
                onChange={(v) =>
                  set("atmosphere", {
                    ...s.atmosphere,
                    fog: { ...s.atmosphere.fog, far: v },
                  })
                }
              />
            </>
          )}
          <div className="flex items-center gap-2 mt-2">
            <Switch
              checked={s.atmosphere.godRays}
              onCheckedChange={(v) =>
                set("atmosphere", { ...s.atmosphere, godRays: v })
              }
            />
            <Label className="text-xs">God Rays</Label>
          </div>
          {s.atmosphere.godRays && (
            <S
              label="God Ray Intensity"
              value={s.atmosphere.godRayIntensity}
              min={0}
              max={1}
              step={0.01}
              onChange={(v) =>
                set("atmosphere", { ...s.atmosphere, godRayIntensity: v })
              }
            />
          )}
        </Section>

        <Separator className="my-1" />

        {/* Underwater */}
        <Section
          title="Underwater Effects"
          icon={<Droplets className="w-3.5 h-3.5 text-blue-500" />}
        >
          <div className="flex items-center gap-2 mb-2">
            <Switch
              checked={s.underwater.causticsEnabled}
              onCheckedChange={(v) =>
                set("underwater", { ...s.underwater, causticsEnabled: v })
              }
            />
            <Label className="text-xs">Caustics</Label>
          </div>
          {s.underwater.causticsEnabled && (
            <>
              <S
                label="Caustics Intensity"
                value={s.underwater.causticsIntensity}
                min={0}
                max={1}
                step={0.01}
                onChange={(v) =>
                  set("underwater", {
                    ...s.underwater,
                    causticsIntensity: v,
                  })
                }
              />
              <S
                label="Caustics Scale"
                value={s.underwater.causticsScale}
                min={0.5}
                max={10}
                step={0.1}
                onChange={(v) =>
                  set("underwater", { ...s.underwater, causticsScale: v })
                }
              />
            </>
          )}
          <div className="flex items-center gap-2 mt-2">
            <Switch
              checked={s.underwater.depthFogEnabled}
              onCheckedChange={(v) =>
                set("underwater", { ...s.underwater, depthFogEnabled: v })
              }
            />
            <Label className="text-xs">Depth Fog</Label>
          </div>
          {s.underwater.depthFogEnabled && (
            <>
              <ColorInput
                label="Depth Fog Color"
                value={s.underwater.depthFogColor}
                onChange={(v) =>
                  set("underwater", { ...s.underwater, depthFogColor: v })
                }
              />
              <S
                label="Density"
                value={s.underwater.depthFogDensity}
                min={0}
                max={1}
                step={0.01}
                onChange={(v) =>
                  set("underwater", {
                    ...s.underwater,
                    depthFogDensity: v,
                  })
                }
              />
            </>
          )}
          <div className="flex items-center gap-2 mt-2">
            <Switch
              checked={s.underwater.particlesEnabled}
              onCheckedChange={(v) =>
                set("underwater", { ...s.underwater, particlesEnabled: v })
              }
            />
            <Label className="text-xs">Floating Particles</Label>
          </div>
        </Section>

        {/* Performance */}
        <Section
          title="Performance"
          icon={<Gauge className="w-3.5 h-3.5 text-orange-400" />}
        >
          <S
            label="Mesh Resolution"
            value={s.performance.meshResolution}
            min={128}
            max={1024}
            step={64}
            onChange={(v) =>
              set("performance", { ...s.performance, meshResolution: v })
            }
          />
          <S
            label="Ocean Size"
            value={s.performance.oceanSize}
            min={100}
            max={1000}
            step={50}
            unit="m"
            onChange={(v) =>
              set("performance", { ...s.performance, oceanSize: v })
            }
          />
          <S
            label="Max Particles"
            value={s.performance.maxParticles}
            min={10000}
            max={300000}
            step={10000}
            onChange={(v) =>
              set("performance", { ...s.performance, maxParticles: v })
            }
          />
          <S
            label="Target FPS"
            value={s.performance.targetFPS}
            min={30}
            max={120}
            step={5}
            onChange={(v) =>
              set("performance", { ...s.performance, targetFPS: v })
            }
          />
          <div className="flex items-center gap-2 mt-2">
            <Switch
              checked={s.performance.adaptiveQuality}
              onCheckedChange={(v) =>
                set("performance", {
                  ...s.performance,
                  adaptiveQuality: v,
                })
              }
            />
            <Label className="text-xs">Adaptive Quality</Label>
          </div>
        </Section>
      </div>
    </div>
  );
}
