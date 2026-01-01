import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeBlock from "./CodeBlock";

const stages = [
  {
    id: "base",
    name: "BASE",
    description: "Build base shell from curves + section law",
    code: `export interface BaseFormSpec {
  L: number;             // meters
  B: Curve1D;            // half-beam curve
  K: Curve1D;            // keel/underside
  D: Curve1D;            // deck/roofline
  sectionAt(u: number): SectionParams;
  Nu: number;
  Nv: number;
}

// Surface height formula:
// y(u,z) = K(u) + (D(u) - K(u)) · F(s; P(u))
// where s = |z| / B(u)`,
  },
  {
    id: "macro",
    name: "MACRO",
    description: "Recesses, major cut impressions (cockpit, wheel wells)",
    code: `{
  "id": "cockpit_recess",
  "type": "RecessCut",
  "stage": "MACRO",
  "targetRegions": ["deck"],
  "mask": { 
    "kind": "roundedRect", 
    "uMin": 0.24, "uMax": 0.52,
    "sMin": 0.02, "sMax": 0.42,
    "r": 0.04, "pow": 1.2 
  },
  "params": { 
    "depth": 0.10, 
    "rimWidth": 0.025,
    "rimHeight": 0.010
  }
}`,
  },
  {
    id: "edge",
    name: "EDGE",
    description: "Crease language, rail seams, lips",
    code: `{
  "id": "rail_seam_crease",
  "type": "CreaseLine",
  "stage": "EDGE",
  "targetRegions": ["rail"],
  "mask": { 
    "kind": "curveBand", 
    "curveId": "railCurve",
    "width": 0.020, 
    "sharpness": 2.2 
  },
  "params": { 
    "depth": 0.006, 
    "bias": 0.0, 
    "direction": "normal" 
  }
}`,
  },
  {
    id: "micro",
    name: "MICRO",
    description: "Bosses, mounts, small pads",
    code: `{
  "id": "rudder_gudgeon_pad",
  "type": "BossHole",
  "stage": "MICRO",
  "targetRegions": ["hull"],
  "placement": { "mode": "UV", "u0": 0.06, "s0": 0.0 },
  "mask": { 
    "kind": "ellipse",
    "u": 0.06, "s": 0.08,
    "ru": 0.02, "rs": 0.10
  },
  "params": { 
    "bossHeight": 0.006, 
    "bossProfile": "plateau" 
  }
}`,
  },
  {
    id: "finish",
    name: "FINISH",
    description: "Normals, smoothing groups, bevel approximation",
    code: `// Finish pass responsibilities:
// 1. Recompute vertex normals
// 2. Apply smoothing groups
// 3. Optional normal-based bevel hints
// 4. UV unwrap for material regions

function finishPass(mesh: SurfaceMesh): void {
  computeVertexNormals(mesh);
  applySmoothingGroups(mesh, regions);
  generateUVCharts(mesh, chartSpec);
  bakeMicroBevels(mesh, bevelParams);
}`,
  },
];

const PipelineStages = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Execution <span className="text-primary">Pipeline</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Fixed-order deterministic stages ensure composability and reproducibility
          </p>
        </div>

        <Tabs defaultValue="base" className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-5 w-full mb-8">
            {stages.map((stage, idx) => (
              <TabsTrigger
                key={stage.id}
                value={stage.id}
                className="flex flex-col gap-1 py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                <span className="text-xs text-muted-foreground">Stage {idx + 1}</span>
                <span className="font-mono text-sm">{stage.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {stages.map((stage) => (
            <TabsContent key={stage.id} value={stage.id} className="space-y-6">
              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-xl font-semibold mb-2">{stage.name} Stage</h3>
                <p className="text-muted-foreground">{stage.description}</p>
              </div>
              <CodeBlock
                code={stage.code}
                language={stage.id === "finish" ? "typescript" : "json"}
                title={`${stage.name.toLowerCase()}_example`}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default PipelineStages;
