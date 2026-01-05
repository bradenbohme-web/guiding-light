// Rigging Parameter Panel - Controls for mast, boom, sail, rudder, etc.
// Features: hover-to-glow, tooltips with part descriptions, position controls
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { LaserRiggingParams } from "@/lib/parametric/laserRigging";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Anchor, Wind, Navigation, Sailboat, Move, Info, RotateCcw, Eye } from "lucide-react";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import * as THREE from "three";

interface RiggingPanelProps {
  rigging: LaserRiggingParams;
  onChange: (rigging: LaserRiggingParams) => void;
  boomAngle: number;
  onBoomAngleChange: (angle: number) => void;
  rudderAngle: number;
  onRudderAngleChange: (angle: number) => void;
  windAngle: number;
  onWindAngleChange: (angle: number) => void;
  windStrength: number;
  onWindStrengthChange: (strength: number) => void;
  boatSpeed: number;
  onBoatSpeedChange: (speed: number) => void;
  onHoverTargetChange?: (target: string | null) => void;
}

// Part descriptions for tooltips
const PART_INFO: Record<string, { name: string; description: string; location: string }> = {
  mast: {
    name: "Mast",
    description: "Vertical spar that supports the sail. Made of aluminum, it flexes under load to depower the sail.",
    location: "Steps into deck near bow, supported by mast partner"
  },
  boom: {
    name: "Boom",
    description: "Horizontal spar at foot of sail. Attaches to mast via gooseneck fitting.",
    location: "Pivots at gooseneck ~0.9m above deck, extends aft"
  },
  sail: {
    name: "Mainsail",
    description: "Dacron sail with reinforced corners (head, tack, clew). Has battens on leech to maintain shape.",
    location: "Luff along mast, foot along boom, leech is free edge"
  },
  battens: {
    name: "Sail Battens",
    description: "Flexible fiberglass strips inserted in pockets on the LEECH (outer edge). Provide shape support.",
    location: "4 battens on leech edge, NOT on mast edge"
  },
  window: {
    name: "Sail Window",
    description: "Clear vinyl panel for visibility under sail.",
    location: "Lower portion of sail, allows seeing to leeward"
  },
  centerboard: {
    name: "Centerboard (Daggerboard)",
    description: "Foil that pivots/slides down through trunk to prevent sideways drift.",
    location: "Through trunk forward of cockpit center"
  },
  rudder: {
    name: "Rudder Blade",
    description: "Steerable foil at stern for directional control.",
    location: "Mounted on transom via gudgeons/pintles"
  },
  tiller: {
    name: "Tiller",
    description: "Wooden arm connected to rudder head for steering.",
    location: "Extends forward from rudder into cockpit"
  },
  extension: {
    name: "Tiller Extension",
    description: "Hinged stick allowing sailor to steer while hiking.",
    location: "Hinges at forward end of tiller"
  },
  traveler: {
    name: "Traveler",
    description: "Track across stern deck allowing mainsheet block to slide athwartships.",
    location: "Aft deck, spans port to starboard"
  },
  transom: {
    name: "Transom",
    description: "Flat stern plate closing hull. Has drain hole and rudder mounts.",
    location: "Aft end of hull - WIDE and FLAT (not pointed like bow)"
  },
  cockpit: {
    name: "Cockpit",
    description: "Open area where sailor sits. Has floor, side tanks/seats, centerboard trunk.",
    location: "Center of boat, between forward deck and stern deck"
  },
  hull: {
    name: "Hull",
    description: "Main body of boat. Pointed bow, wide flat transom at stern.",
    location: "Entire boat body below deck"
  }
};

interface ParamSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
  hoverTarget?: string;
  onHoverTargetChange?: (target: string | null) => void;
  tooltip?: string;
}

function ParamSlider({ label, value, min, max, step, unit, onChange, hoverTarget, onHoverTargetChange, tooltip }: ParamSliderProps) {
  const partInfo = hoverTarget ? PART_INFO[hoverTarget] : null;
  
  return (
    <TooltipProvider delayDuration={300}>
      <div
        className="space-y-1.5 group"
        onMouseEnter={() => onHoverTargetChange?.(hoverTarget ?? null)}
        onMouseLeave={() => onHoverTargetChange?.(null)}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Label className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
              {label}
            </Label>
            {(tooltip || partInfo) && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-3 h-3 text-muted-foreground/50 hover:text-primary cursor-help" />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  {partInfo ? (
                    <div className="space-y-1">
                      <p className="font-semibold">{partInfo.name}</p>
                      <p className="text-xs">{partInfo.description}</p>
                      <p className="text-xs text-muted-foreground">📍 {partInfo.location}</p>
                    </div>
                  ) : (
                    <p className="text-xs">{tooltip}</p>
                  )}
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          <span className="text-xs font-mono text-primary">
            {value.toFixed(step < 0.1 ? 3 : 2)}{unit && ` ${unit}`}
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
    </TooltipProvider>
  );
}

// Position control (X, Y, Z sliders)
interface PositionControlProps {
  label: string;
  position: THREE.Vector3;
  onChange: (pos: THREE.Vector3) => void;
  hoverTarget?: string;
  onHoverTargetChange?: (target: string | null) => void;
  ranges?: { x: [number, number]; y: [number, number]; z: [number, number] };
}

function PositionControl({ label, position, onChange, hoverTarget, onHoverTargetChange, ranges }: PositionControlProps) {
  const defaultRange: [number, number] = [-3, 3];
  const xRange = ranges?.x ?? defaultRange;
  const yRange = ranges?.y ?? [-1, 2];
  const zRange = ranges?.z ?? [-1, 1];
  
  const partInfo = hoverTarget ? PART_INFO[hoverTarget] : null;
  
  return (
    <TooltipProvider delayDuration={300}>
      <div 
        className="space-y-2 p-2 rounded bg-secondary/30 group"
        onMouseEnter={() => onHoverTargetChange?.(hoverTarget ?? null)}
        onMouseLeave={() => onHoverTargetChange?.(null)}
      >
        <div className="flex items-center gap-2">
          <Move className="w-3 h-3 text-muted-foreground" />
          <Label className="text-xs font-medium group-hover:text-primary transition-colors">{label} Position</Label>
          {partInfo && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-3 h-3 text-muted-foreground/50 hover:text-primary cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <div className="space-y-1">
                  <p className="font-semibold">{partInfo.name}</p>
                  <p className="text-xs">{partInfo.description}</p>
                  <p className="text-xs text-muted-foreground">📍 {partInfo.location}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-0.5">
            <Label className="text-[10px] text-muted-foreground">X (fore/aft)</Label>
            <Slider
              value={[position.x]}
              min={xRange[0]}
              max={xRange[1]}
              step={0.01}
              onValueChange={([v]) => onChange(new THREE.Vector3(v, position.y, position.z))}
            />
            <span className="text-[10px] font-mono text-center block">{position.x.toFixed(2)}</span>
          </div>
          <div className="space-y-0.5">
            <Label className="text-[10px] text-muted-foreground">Y (up/down)</Label>
            <Slider
              value={[position.y]}
              min={yRange[0]}
              max={yRange[1]}
              step={0.01}
              onValueChange={([v]) => onChange(new THREE.Vector3(position.x, v, position.z))}
            />
            <span className="text-[10px] font-mono text-center block">{position.y.toFixed(2)}</span>
          </div>
          <div className="space-y-0.5">
            <Label className="text-[10px] text-muted-foreground">Z (port/stbd)</Label>
            <Slider
              value={[position.z]}
              min={zRange[0]}
              max={zRange[1]}
              step={0.01}
              onValueChange={([v]) => onChange(new THREE.Vector3(position.x, position.y, v))}
            />
            <span className="text-[10px] font-mono text-center block">{position.z.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

function SectionHeader({ icon: Icon, title, open, onToggle, info }: { 
  icon: React.ElementType; 
  title: string; 
  open: boolean;
  onToggle: () => void;
  info?: string;
}) {
  return (
    <TooltipProvider delayDuration={300}>
      <CollapsibleTrigger 
        onClick={onToggle}
        className="flex items-center justify-between w-full py-2 text-sm font-medium hover:bg-secondary/50 px-2 rounded"
      >
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary" />
          <span>{title}</span>
          {info && (
            <Tooltip>
              <TooltipTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Info className="w-3 h-3 text-muted-foreground/50 hover:text-primary" />
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <p className="text-xs">{info}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
    </TooltipProvider>
  );
}

export function RiggingPanel({
  rigging,
  onChange,
  boomAngle,
  onBoomAngleChange,
  rudderAngle,
  onRudderAngleChange,
  windAngle,
  onWindAngleChange,
  windStrength,
  onWindStrengthChange,
  boatSpeed,
  onBoatSpeedChange,
  onHoverTargetChange,
}: RiggingPanelProps) {
  const [openSections, setOpenSections] = useState({
    controls: true,
    mast: false,
    boom: false,
    sail: false,
    centerboard: false,
    rudder: false,
    tiller: false,
    traveler: false,
    transom: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updateMast = (key: string, value: number) => {
    onChange({
      ...rigging,
      mast: { ...rigging.mast, [key]: value }
    });
  };

  const updateBoom = (key: string, value: number) => {
    onChange({
      ...rigging,
      boom: { ...rigging.boom, [key]: value }
    });
  };

  const updateSail = (key: string, value: number) => {
    onChange({
      ...rigging,
      sail: { ...rigging.sail, [key]: value }
    });
  };

  const updateCenterboard = (key: string, value: number) => {
    onChange({
      ...rigging,
      centerboard: { ...rigging.centerboard, [key]: value }
    });
  };

  return (
    <div className="space-y-2">
      {/* Legend */}
      <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-2 px-2">
        <Eye className="w-3 h-3" />
        <span>Hover controls to highlight 3D parts</span>
      </div>

      {/* Active Controls */}
      <Collapsible open={openSections.controls}>
        <SectionHeader 
          icon={Navigation} 
          title="Active Controls" 
          open={openSections.controls}
          onToggle={() => toggleSection('controls')}
          info="Real-time sailing controls - wind, trim, and steering"
        />
        <CollapsibleContent className="px-2 space-y-3 pt-2">
          <ParamSlider
            label="Wind Angle"
            value={(windAngle * 180) / Math.PI}
            min={-180}
            max={180}
            step={5}
            unit="°"
            hoverTarget="sail"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => onWindAngleChange((v * Math.PI) / 180)}
            tooltip="Apparent wind direction relative to boat"
          />
          <ParamSlider
            label="Wind Strength"
            value={windStrength}
            min={0}
            max={1}
            step={0.05}
            hoverTarget="sail"
            onHoverTargetChange={onHoverTargetChange}
            onChange={onWindStrengthChange}
            tooltip="Wind force affecting sail shape"
          />
          <ParamSlider
            label="Boat Speed"
            value={boatSpeed}
            min={0}
            max={8}
            step={0.1}
            unit="m/s"
            hoverTarget="hull"
            onHoverTargetChange={onHoverTargetChange}
            onChange={onBoatSpeedChange}
            tooltip="Forward speed - affects spray and wake"
          />
          <Separator className="my-2" />
          <ParamSlider
            label="Traveler Car"
            value={rigging.traveler.carZ}
            min={-rigging.traveler.trackHalfSpan}
            max={rigging.traveler.trackHalfSpan}
            step={0.01}
            unit="m"
            hoverTarget="traveler"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => onChange({ ...rigging, traveler: { ...rigging.traveler, carZ: v } })}
          />
          <Separator className="my-2" />
          <ParamSlider
            label="Boom Angle"
            value={(boomAngle * 180) / Math.PI}
            min={-90}
            max={90}
            step={1}
            unit="°"
            hoverTarget="boom"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => onBoomAngleChange((v * Math.PI) / 180)}
          />
          <ParamSlider
            label="Rudder Angle"
            value={rudderAngle}
            min={-35}
            max={35}
            step={1}
            unit="°"
            hoverTarget="rudder"
            onHoverTargetChange={onHoverTargetChange}
            onChange={onRudderAngleChange}
          />
          <ParamSlider
            label="Vang Tension"
            value={rigging.vangTension}
            min={0}
            max={1}
            step={0.01}
            hoverTarget="sail"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => onChange({ ...rigging, vangTension: v })}
            tooltip="Controls boom rise - more tension flattens sail"
          />
          <ParamSlider
            label="Cunningham"
            value={rigging.cunninghamTension}
            min={0}
            max={1}
            step={0.01}
            hoverTarget="sail"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => onChange({ ...rigging, cunninghamTension: v })}
            tooltip="Luff tension - moves draft forward"
          />
          <ParamSlider
            label="Outhaul"
            value={rigging.outhaulTension}
            min={0}
            max={1}
            step={0.01}
            hoverTarget="sail"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => onChange({ ...rigging, outhaulTension: v })}
            tooltip="Foot tension - flattens lower sail"
          />
          <ParamSlider
            label="Mainsheet"
            value={rigging.mainsheetTension}
            min={0}
            max={1}
            step={0.01}
            hoverTarget="traveler"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => onChange({ ...rigging, mainsheetTension: v })}
            tooltip="Primary sail control line"
          />
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Mast */}
      <Collapsible open={openSections.mast}>
        <SectionHeader 
          icon={Anchor} 
          title="Mast" 
          open={openSections.mast}
          onToggle={() => toggleSection('mast')}
          info={PART_INFO.mast.description}
        />
        <CollapsibleContent className="px-2 space-y-3 pt-2">
          <PositionControl
            label="Mast"
            position={rigging.mast.position}
            onChange={(pos) => onChange({ ...rigging, mast: { ...rigging.mast, position: pos } })}
            hoverTarget="mast"
            onHoverTargetChange={onHoverTargetChange}
            ranges={{ x: [-1, 1], y: [0, 0.5], z: [-0.5, 0.5] }}
          />
          <ParamSlider
            label="Height"
            value={rigging.mast.height}
            min={4}
            max={8}
            step={0.1}
            unit="m"
            hoverTarget="mast"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => updateMast('height', v)}
          />
          <ParamSlider
            label="Base Radius"
            value={rigging.mast.baseRadius}
            min={0.01}
            max={0.05}
            step={0.001}
            unit="m"
            hoverTarget="mast"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => updateMast('baseRadius', v)}
          />
          <ParamSlider
            label="Tip Radius"
            value={rigging.mast.tipRadius}
            min={0.005}
            max={0.03}
            step={0.001}
            unit="m"
            hoverTarget="mast"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => updateMast('tipRadius', v)}
          />
          <ParamSlider
            label="Bend"
            value={rigging.mast.bend}
            min={0}
            max={0.1}
            step={0.005}
            unit="m"
            hoverTarget="mast"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => updateMast('bend', v)}
            tooltip="Pre-bend affects sail shape and power"
          />
          <ParamSlider
            label="Taper"
            value={rigging.mast.taper}
            min={0}
            max={1}
            step={0.05}
            hoverTarget="mast"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => updateMast('taper', v)}
          />
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Boom */}
      <Collapsible open={openSections.boom}>
        <SectionHeader 
          icon={Wind} 
          title="Boom" 
          open={openSections.boom}
          onToggle={() => toggleSection('boom')}
          info={PART_INFO.boom.description}
        />
        <CollapsibleContent className="px-2 space-y-3 pt-2">
          <PositionControl
            label="Boom"
            position={rigging.boom.position}
            onChange={(pos) => onChange({ ...rigging, boom: { ...rigging.boom, position: pos } })}
            hoverTarget="boom"
            onHoverTargetChange={onHoverTargetChange}
            ranges={{ x: [-0.5, 0.5], y: [0.5, 1.5], z: [-0.3, 0.3] }}
          />
          <ParamSlider
            label="Length"
            value={rigging.boom.length}
            min={1.5}
            max={3.5}
            step={0.05}
            unit="m"
            hoverTarget="boom"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => updateBoom('length', v)}
          />
          <ParamSlider
            label="Radius"
            value={rigging.boom.radius}
            min={0.01}
            max={0.03}
            step={0.001}
            unit="m"
            hoverTarget="boom"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => updateBoom('radius', v)}
          />
          <ParamSlider
            label="Gooseneck Height"
            value={rigging.boom.gooseneckHeight}
            min={0.5}
            max={1.5}
            step={0.05}
            unit="m"
            hoverTarget="boom"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => updateBoom('gooseneckHeight', v)}
            tooltip="Height where boom attaches to mast"
          />
          <ParamSlider
            label="Vang Attach Point"
            value={rigging.boom.vanAttach}
            min={0.1}
            max={0.5}
            step={0.01}
            hoverTarget="boom"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => updateBoom('vanAttach', v)}
            tooltip="Where vang connects (fraction along boom)"
          />
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Sail */}
      <Collapsible open={openSections.sail}>
        <SectionHeader 
          icon={Sailboat} 
          title="Sail" 
          open={openSections.sail}
          onToggle={() => toggleSection('sail')}
          info={PART_INFO.sail.description}
        />
        <CollapsibleContent className="px-2 space-y-3 pt-2">
          <ParamSlider
            label="Luff Length"
            value={rigging.sail.luffLength}
            min={3}
            max={7}
            step={0.01}
            unit="m"
            hoverTarget="sail"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => updateSail('luffLength', v)}
            tooltip="Leading edge length (along mast)"
          />
          <ParamSlider
            label="Foot Length"
            value={rigging.sail.footLength}
            min={1.5}
            max={3.5}
            step={0.01}
            unit="m"
            hoverTarget="sail"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => updateSail('footLength', v)}
            tooltip="Bottom edge length (along boom)"
          />
          <ParamSlider
            label="Head Width"
            value={rigging.sail.headWidth}
            min={0.05}
            max={0.5}
            step={0.005}
            unit="m"
            hoverTarget="sail"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => updateSail('headWidth', v)}
          />
          <ParamSlider
            label="Leech Curve (Roach)"
            value={rigging.sail.leechCurve}
            min={0}
            max={0.15}
            step={0.005}
            hoverTarget="sail"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => updateSail('leechCurve', v)}
            tooltip="Curvature of trailing edge"
          />
          <ParamSlider
            label="Cloth Opacity"
            value={rigging.sail.opacity}
            min={0.5}
            max={1}
            step={0.01}
            hoverTarget="sail"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => updateSail('opacity', v)}
          />
          
          <Separator className="my-2" />
          <div className="flex items-center gap-2">
            <Label className="text-xs font-medium">Battens</Label>
            <Info className="w-3 h-3 text-muted-foreground/50" />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Enabled</Label>
            <Switch 
              checked={rigging.sail.battens.enabled}
              onCheckedChange={(checked) => onChange({
                ...rigging,
                sail: {
                  ...rigging.sail,
                  battens: { ...rigging.sail.battens, enabled: checked }
                }
              })}
            />
          </div>
          <ParamSlider
            label="Batten Stiffness"
            value={rigging.sail.battens.stiffness}
            min={0}
            max={1}
            step={0.01}
            hoverTarget="battens"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => onChange({
              ...rigging,
              sail: {
                ...rigging.sail,
                battens: { ...rigging.sail.battens, stiffness: v }
              }
            })}
            tooltip="Rigidity added to leech edge"
          />
          
          <Separator className="my-2" />
          <Label className="text-xs font-medium">Vinyl Window</Label>
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Enabled</Label>
            <Switch 
              checked={rigging.sail.window.enabled}
              onCheckedChange={(checked) => onChange({
                ...rigging,
                sail: {
                  ...rigging.sail,
                  window: { ...rigging.sail.window, enabled: checked }
                }
              })}
            />
          </div>
          <ParamSlider
            label="Window U (across)"
            value={rigging.sail.window.position.u}
            min={0.2}
            max={0.7}
            step={0.01}
            hoverTarget="window"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => onChange({
              ...rigging,
              sail: {
                ...rigging.sail,
                window: { 
                  ...rigging.sail.window, 
                  position: { ...rigging.sail.window.position, u: v }
                }
              }
            })}
          />
          <ParamSlider
            label="Window V (up)"
            value={rigging.sail.window.position.v}
            min={0.15}
            max={0.5}
            step={0.01}
            hoverTarget="window"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => onChange({
              ...rigging,
              sail: {
                ...rigging.sail,
                window: { 
                  ...rigging.sail.window, 
                  position: { ...rigging.sail.window.position, v: v }
                }
              }
            })}
          />
          <ParamSlider
            label="Window Width"
            value={rigging.sail.window.size.width}
            min={0.1}
            max={0.6}
            step={0.01}
            unit="m"
            hoverTarget="window"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => onChange({
              ...rigging,
              sail: {
                ...rigging.sail,
                window: { 
                  ...rigging.sail.window, 
                  size: { ...rigging.sail.window.size, width: v }
                }
              }
            })}
          />
          <ParamSlider
            label="Window Height"
            value={rigging.sail.window.size.height}
            min={0.1}
            max={0.7}
            step={0.01}
            unit="m"
            hoverTarget="window"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => onChange({
              ...rigging,
              sail: {
                ...rigging.sail,
                window: { 
                  ...rigging.sail.window, 
                  size: { ...rigging.sail.window.size, height: v }
                }
              }
            })}
          />
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Centerboard */}
      <Collapsible open={openSections.centerboard}>
        <SectionHeader 
          icon={Anchor} 
          title="Centerboard" 
          open={openSections.centerboard}
          onToggle={() => toggleSection('centerboard')}
          info={PART_INFO.centerboard.description}
        />
        <CollapsibleContent className="px-2 space-y-3 pt-2">
          <PositionControl
            label="Centerboard Trunk"
            position={rigging.centerboard.position}
            onChange={(pos) => onChange({ ...rigging, centerboard: { ...rigging.centerboard, position: pos } })}
            hoverTarget="centerboard"
            onHoverTargetChange={onHoverTargetChange}
            ranges={{ x: [-0.5, 0.5], y: [-0.2, 0.2], z: [-0.1, 0.1] }}
          />
          <ParamSlider
            label="Deployment"
            value={rigging.centerboard.deployment}
            min={0}
            max={1}
            step={0.01}
            hoverTarget="centerboard"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => updateCenterboard('deployment', v)}
            tooltip="0 = fully up, 1 = fully down"
          />
          <ParamSlider
            label="Chord"
            value={rigging.centerboard.chord}
            min={0.1}
            max={0.4}
            step={0.01}
            unit="m"
            hoverTarget="centerboard"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => updateCenterboard('chord', v)}
            tooltip="Width of foil"
          />
          <ParamSlider
            label="Span"
            value={rigging.centerboard.span}
            min={0.5}
            max={1.2}
            step={0.01}
            unit="m"
            hoverTarget="centerboard"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => updateCenterboard('span', v)}
            tooltip="Length when fully deployed"
          />
          <ParamSlider
            label="Thickness"
            value={rigging.centerboard.thickness}
            min={0.01}
            max={0.04}
            step={0.001}
            unit="m"
            hoverTarget="centerboard"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => updateCenterboard('thickness', v)}
          />
          <ParamSlider
            label="Tip Taper"
            value={rigging.centerboard.tipChordScale}
            min={0.3}
            max={1}
            step={0.01}
            hoverTarget="centerboard"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => updateCenterboard('tipChordScale', v)}
          />
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Rudder */}
      <Collapsible open={openSections.rudder}>
        <SectionHeader 
          icon={Navigation} 
          title="Rudder Blade" 
          open={openSections.rudder}
          onToggle={() => toggleSection('rudder')}
          info={PART_INFO.rudder.description}
        />
        <CollapsibleContent className="px-2 space-y-3 pt-2">
          <PositionControl
            label="Rudder"
            position={rigging.rudder.blade.position}
            onChange={(pos) => onChange({ 
              ...rigging, 
              rudder: { ...rigging.rudder, blade: { ...rigging.rudder.blade, position: pos } }
            })}
            hoverTarget="rudder"
            onHoverTargetChange={onHoverTargetChange}
            ranges={{ x: [-2.5, -1.5], y: [-0.1, 0.2], z: [-0.1, 0.1] }}
          />
          <ParamSlider
            label="Chord"
            value={rigging.rudder.blade.chord}
            min={0.1}
            max={0.35}
            step={0.005}
            unit="m"
            hoverTarget="rudder"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => onChange({
              ...rigging,
              rudder: {
                ...rigging.rudder,
                blade: { ...rigging.rudder.blade, chord: v }
              }
            })}
          />
          <ParamSlider
            label="Span"
            value={rigging.rudder.blade.span}
            min={0.3}
            max={0.9}
            step={0.01}
            unit="m"
            hoverTarget="rudder"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => onChange({
              ...rigging,
              rudder: {
                ...rigging.rudder,
                blade: { ...rigging.rudder.blade, span: v }
              }
            })}
          />
          <ParamSlider
            label="Thickness"
            value={rigging.rudder.blade.thickness}
            min={0.008}
            max={0.03}
            step={0.001}
            unit="m"
            hoverTarget="rudder"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => onChange({
              ...rigging,
              rudder: {
                ...rigging.rudder,
                blade: { ...rigging.rudder.blade, thickness: v }
              }
            })}
          />
          <ParamSlider
            label="Tip Taper"
            value={rigging.rudder.blade.tipChordScale}
            min={0.4}
            max={1}
            step={0.01}
            hoverTarget="rudder"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => onChange({
              ...rigging,
              rudder: {
                ...rigging.rudder,
                blade: { ...rigging.rudder.blade, tipChordScale: v }
              }
            })}
          />
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Tiller */}
      <Collapsible open={openSections.tiller}>
        <SectionHeader 
          icon={Anchor} 
          title="Tiller & Extension" 
          open={openSections.tiller}
          onToggle={() => toggleSection('tiller')}
          info={PART_INFO.tiller.description + " " + PART_INFO.extension.description}
        />
        <CollapsibleContent className="px-2 space-y-3 pt-2">
          <PositionControl
            label="Tiller Offset"
            position={rigging.rudder.tiller.offset}
            onChange={(pos) => onChange({ 
              ...rigging, 
              rudder: { ...rigging.rudder, tiller: { ...rigging.rudder.tiller, offset: pos } }
            })}
            hoverTarget="tiller"
            onHoverTargetChange={onHoverTargetChange}
            ranges={{ x: [-0.1, 0.2], y: [-0.1, 0.1], z: [-0.1, 0.1] }}
          />
          <ParamSlider
            label="Tiller Length"
            value={rigging.rudder.tiller.length}
            min={0.5}
            max={1.2}
            step={0.01}
            unit="m"
            hoverTarget="tiller"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => onChange({
              ...rigging,
              rudder: {
                ...rigging.rudder,
                tiller: { ...rigging.rudder.tiller, length: v }
              }
            })}
          />
          <ParamSlider
            label="Tiller Width"
            value={rigging.rudder.tiller.width}
            min={0.02}
            max={0.08}
            step={0.002}
            unit="m"
            hoverTarget="tiller"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => onChange({
              ...rigging,
              rudder: {
                ...rigging.rudder,
                tiller: { ...rigging.rudder.tiller, width: v }
              }
            })}
          />
          <Separator className="my-2" />
          <ParamSlider
            label="Extension Length"
            value={rigging.rudder.extension.length}
            min={0.4}
            max={1.2}
            step={0.01}
            unit="m"
            hoverTarget="extension"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => onChange({
              ...rigging,
              rudder: {
                ...rigging.rudder,
                extension: { ...rigging.rudder.extension, length: v }
              }
            })}
          />
          <ParamSlider
            label="Extension Hinge Angle"
            value={rigging.rudder.extension.hingeAngle}
            min={0}
            max={90}
            step={1}
            unit="°"
            hoverTarget="extension"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => onChange({
              ...rigging,
              rudder: {
                ...rigging.rudder,
                extension: { ...rigging.rudder.extension, hingeAngle: v }
              }
            })}
          />
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Traveler */}
      <Collapsible open={openSections.traveler}>
        <SectionHeader 
          icon={Move} 
          title="Traveler System" 
          open={openSections.traveler}
          onToggle={() => toggleSection('traveler')}
          info={PART_INFO.traveler.description}
        />
        <CollapsibleContent className="px-2 space-y-3 pt-2">
          <ParamSlider
            label="Track Position X"
            value={rigging.traveler.x}
            min={-1}
            max={0}
            step={0.01}
            unit="m"
            hoverTarget="traveler"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => onChange({ ...rigging, traveler: { ...rigging.traveler, x: v } })}
            tooltip="Fore/aft position of track"
          />
          <ParamSlider
            label="Track Height Y"
            value={rigging.traveler.y}
            min={0}
            max={0.3}
            step={0.01}
            unit="m"
            hoverTarget="traveler"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => onChange({ ...rigging, traveler: { ...rigging.traveler, y: v } })}
            tooltip="Height above deck"
          />
          <ParamSlider
            label="Track Half-Span"
            value={rigging.traveler.trackHalfSpan}
            min={0.2}
            max={0.6}
            step={0.01}
            unit="m"
            hoverTarget="traveler"
            onHoverTargetChange={onHoverTargetChange}
            onChange={(v) => onChange({ ...rigging, traveler: { ...rigging.traveler, trackHalfSpan: v } })}
            tooltip="Half-width of track (each side from center)"
          />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}