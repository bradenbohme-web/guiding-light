// Ocean & Weather subsystem editor (wraps existing OceanSettingsPanel)
import { OceanSettings } from "@/lib/ocean/types";
import { OceanSettingsPanel } from "@/components/engine/ocean/OceanSettingsPanel";
import { OceanEnvironment } from "@/components/engine/OceanEnvironment";
import { SubsystemViewport } from "../SubsystemViewport";

interface OceanEditorProps {
  settings: OceanSettings;
  onChange: (s: OceanSettings) => void;
}

export function OceanEditor({ settings, onChange }: OceanEditorProps) {
  return (
    <div className="flex h-full">
      <div className="w-80 border-r border-border overflow-y-auto scrollbar-hide bg-card">
        <OceanSettingsPanel settings={settings} onChange={onChange} />
      </div>
      <div className="flex-1">
        <SubsystemViewport title="Ocean & Weather" cameraDistance={15} cameraTarget={[0, 0, 0]} showGrid={false}>
          <OceanEnvironment enabled={true} oceanSettings={settings} />
        </SubsystemViewport>
      </div>
    </div>
  );
}
