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
  onRudderAngleChange
}: RiggingPanelProps) {
  const [openSections, setOpenSections] = useState({
    controls: true,
    mast: false,
    boom: false,
    sail: false,
    centerboard: false,
    rudder: false
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
            step={0.1}
            unit="m"
            onChange={(v) => updateSail('luffLength', v)}
          />
          <ParamSlider
            label="Foot Length"
            value={rigging.sail.footLength}
            min={1.5}
            max={3.5}
            step={0.1}
            unit="m"
            onChange={(v) => updateSail('footLength', v)}
          />
          <ParamSlider
            label="Head Width"
            value={rigging.sail.headWidth}
            min={0.05}
            max={0.5}
            step={0.01}
            unit="m"
            onChange={(v) => updateSail('headWidth', v)}
          />
          <ParamSlider
            label="Leech Curve"
            value={rigging.sail.leechCurve}
            min={0}
            max={0.15}
            step={0.01}
            onChange={(v) => updateSail('leechCurve', v)}
          />
          <div className="flex items-center justify-between">
            <Label className="text-xs">Battens</Label>
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
          <div className="flex items-center justify-between">
            <Label className="text-xs">Window</Label>
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
            step={0.05}
            unit="m"
            onChange={(v) => updateCenterboard('span', v)}
          />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
