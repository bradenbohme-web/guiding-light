// Rigging Parameter Panel - Controls for mast, boom, sail, rudder, etc.
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { LaserRiggingParams } from "@/lib/parametric/laserRigging";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Anchor, Wind, Navigation, Sailboat } from "lucide-react";
import { useState } from "react";

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
}

interface ParamSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
}

function ParamSlider({ label, value, min, max, step, unit, onChange }: ParamSliderProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <Label className="text-xs text-muted-foreground">{label}</Label>
        <span className="text-xs font-mono text-primary">
          {value.toFixed(2)}{unit && ` ${unit}`}
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

function SectionHeader({ icon: Icon, title, open, onToggle }: { 
  icon: React.ElementType; 
  title: string; 
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <CollapsibleTrigger 
      onClick={onToggle}
      className="flex items-center justify-between w-full py-2 text-sm font-medium hover:bg-secondary/50 px-2 rounded"
    >
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-primary" />
        <span>{title}</span>
      </div>
      <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
    </CollapsibleTrigger>
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
  onWindStrengthChange
}: RiggingPanelProps) {
  const [openSections, setOpenSections] = useState({
    controls: true,
    mast: false,
    boom: false,
    sail: false,
    centerboard: false,
    rudder: false,
    tiller: false
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
      {/* Active Controls */}
      <Collapsible open={openSections.controls}>
        <SectionHeader 
          icon={Navigation} 
          title="Active Controls" 
          open={openSections.controls}
          onToggle={() => toggleSection('controls')}
        />
        <CollapsibleContent className="px-2 space-y-3 pt-2">
          <ParamSlider
            label="Wind Angle"
            value={(windAngle * 180) / Math.PI}
            min={-180}
            max={180}
            step={5}
            unit="°"
            onChange={(v) => onWindAngleChange((v * Math.PI) / 180)}
          />
          <ParamSlider
            label="Wind Strength"
            value={windStrength}
            min={0}
            max={1}
            step={0.05}
            onChange={onWindStrengthChange}
          />
          <Separator className="my-2" />
          <ParamSlider
            label="Boom Angle"
            value={(boomAngle * 180) / Math.PI}
            min={-90}
            max={90}
            step={1}
            unit="°"
            onChange={(v) => onBoomAngleChange((v * Math.PI) / 180)}
          />
          <ParamSlider
            label="Rudder Angle"
            value={rudderAngle}
            min={-35}
            max={35}
            step={1}
            unit="°"
            onChange={onRudderAngleChange}
          />
          <ParamSlider
            label="Vang Tension"
            value={rigging.vangTension}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) => onChange({ ...rigging, vangTension: v })}
          />
          <ParamSlider
            label="Cunningham"
            value={rigging.cunninghamTension}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) => onChange({ ...rigging, cunninghamTension: v })}
          />
          <ParamSlider
            label="Outhaul"
            value={rigging.outhaulTension}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) => onChange({ ...rigging, outhaulTension: v })}
          />
          <ParamSlider
            label="Mainsheet"
            value={rigging.mainsheetTension}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) => onChange({ ...rigging, mainsheetTension: v })}
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
        />
        <CollapsibleContent className="px-2 space-y-3 pt-2">
          <ParamSlider
            label="Height"
            value={rigging.mast.height}
            min={4}
            max={8}
            step={0.1}
            unit="m"
            onChange={(v) => updateMast('height', v)}
          />
          <ParamSlider
            label="Base Radius"
            value={rigging.mast.baseRadius}
            min={0.01}
            max={0.05}
            step={0.001}
            unit="m"
            onChange={(v) => updateMast('baseRadius', v)}
          />
          <ParamSlider
            label="Tip Radius"
            value={rigging.mast.tipRadius}
            min={0.005}
            max={0.03}
            step={0.001}
            unit="m"
            onChange={(v) => updateMast('tipRadius', v)}
          />
          <ParamSlider
            label="Bend"
            value={rigging.mast.bend}
            min={0}
            max={0.1}
            step={0.005}
            unit="m"
            onChange={(v) => updateMast('bend', v)}
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
        />
        <CollapsibleContent className="px-2 space-y-3 pt-2">
          <ParamSlider
            label="Length"
            value={rigging.boom.length}
            min={1.5}
            max={3.5}
            step={0.05}
            unit="m"
            onChange={(v) => updateBoom('length', v)}
          />
          <ParamSlider
            label="Radius"
            value={rigging.boom.radius}
            min={0.01}
            max={0.03}
            step={0.001}
            unit="m"
            onChange={(v) => updateBoom('radius', v)}
          />
          <ParamSlider
            label="Gooseneck Height"
            value={rigging.boom.gooseneckHeight}
            min={0.5}
            max={1.5}
            step={0.05}
            unit="m"
            onChange={(v) => updateBoom('gooseneckHeight', v)}
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
        />
        <CollapsibleContent className="px-2 space-y-3 pt-2">
          <ParamSlider
            label="Luff Length"
            value={rigging.sail.luffLength}
            min={3}
            max={7}
            step={0.01}
            unit="m"
            onChange={(v) => updateSail('luffLength', v)}
          />
          <ParamSlider
            label="Foot Length"
            value={rigging.sail.footLength}
            min={1.5}
            max={3.5}
            step={0.01}
            unit="m"
            onChange={(v) => updateSail('footLength', v)}
          />
          <ParamSlider
            label="Head Width"
            value={rigging.sail.headWidth}
            min={0.05}
            max={0.5}
            step={0.005}
            unit="m"
            onChange={(v) => updateSail('headWidth', v)}
          />
          <ParamSlider
            label="Leech Curve (Roach)"
            value={rigging.sail.leechCurve}
            min={0}
            max={0.15}
            step={0.005}
            onChange={(v) => updateSail('leechCurve', v)}
          />
          <ParamSlider
            label="Cunningham Effect"
            value={rigging.sail.cunningham}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) => updateSail('cunningham', v)}
          />
          <ParamSlider
            label="Cloth Opacity"
            value={rigging.sail.opacity}
            min={0.5}
            max={1}
            step={0.01}
            onChange={(v) => updateSail('opacity', v)}
          />
          
          <Separator className="my-2" />
          <Label className="text-xs font-medium">Battens</Label>
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
            onChange={(v) => onChange({
              ...rigging,
              sail: {
                ...rigging.sail,
                battens: { ...rigging.sail.battens, stiffness: v }
              }
            })}
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
            label="Window U Position"
            value={rigging.sail.window.position.u}
            min={0.2}
            max={0.7}
            step={0.01}
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
            label="Window V Position"
            value={rigging.sail.window.position.v}
            min={0.2}
            max={0.6}
            step={0.01}
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
        />
        <CollapsibleContent className="px-2 space-y-3 pt-2">
          <ParamSlider
            label="Deployment"
            value={rigging.centerboard.deployment}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) => updateCenterboard('deployment', v)}
          />
          <ParamSlider
            label="Chord"
            value={rigging.centerboard.chord}
            min={0.1}
            max={0.4}
            step={0.01}
            unit="m"
            onChange={(v) => updateCenterboard('chord', v)}
          />
          <ParamSlider
            label="Span"
            value={rigging.centerboard.span}
            min={0.5}
            max={1.2}
            step={0.01}
            unit="m"
            onChange={(v) => updateCenterboard('span', v)}
          />
          <ParamSlider
            label="Thickness"
            value={rigging.centerboard.thickness}
            min={0.01}
            max={0.04}
            step={0.001}
            unit="m"
            onChange={(v) => updateCenterboard('thickness', v)}
          />
          <ParamSlider
            label="Tip Taper"
            value={rigging.centerboard.tipChordScale}
            min={0.3}
            max={1}
            step={0.01}
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
        />
        <CollapsibleContent className="px-2 space-y-3 pt-2">
          <ParamSlider
            label="Chord"
            value={rigging.rudder.blade.chord}
            min={0.1}
            max={0.35}
            step={0.005}
            unit="m"
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
        />
        <CollapsibleContent className="px-2 space-y-3 pt-2">
          <ParamSlider
            label="Tiller Length"
            value={rigging.rudder.tiller.length}
            min={0.5}
            max={1.2}
            step={0.01}
            unit="m"
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
            onChange={(v) => onChange({
              ...rigging,
              rudder: {
                ...rigging.rudder,
                tiller: { ...rigging.rudder.tiller, width: v }
              }
            })}
          />
          <ParamSlider
            label="Extension Length"
            value={rigging.rudder.extension.length}
            min={0.4}
            max={1.2}
            step={0.01}
            unit="m"
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
    </div>
  );
}
