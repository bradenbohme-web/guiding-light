// Hull subsystem editor with full parameter controls
import { HullV2Params } from "@/lib/parametric/v2/types";
import { HullMeshV2 } from "@/components/engine/HullMeshV2";
import { HullV2SettingsPanel } from "@/components/engine/HullV2SettingsPanel";
import { SubsystemViewport } from "../SubsystemViewport";

interface HullEditorProps {
  params: HullV2Params;
  onChange: (params: HullV2Params) => void;
  showWireframe: boolean;
  resolution: "low" | "medium" | "high";
}

export function HullEditor({ params, onChange, showWireframe, resolution }: HullEditorProps) {
  return (
    <div className="flex h-full">
      {/* Controls */}
      <div className="w-80 border-r border-border overflow-y-auto scrollbar-hide bg-card">
        <HullV2SettingsPanel 
          params={params} 
          onChange={onChange} 
          onHoverPart={() => {}} 
        />
      </div>
      {/* Viewport */}
      <div className="flex-1">
        <SubsystemViewport title="Hull" cameraDistance={5} cameraTarget={[0, 0, 0]}>
          <HullMeshV2
            params={params}
            resolution={resolution}
            showWireframe={showWireframe}
            highlightTarget={null}
          />
        </SubsystemViewport>
      </div>
    </div>
  );
}
