import { ArrowRight, ArrowDown } from "lucide-react";

const SystemDiagram = () => {
  return (
    <section className="py-24 relative">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            System <span className="text-primary">Architecture</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The complete pipeline from reference images to game-ready assets
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main diagram */}
          <div className="relative">
            {/* Top row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <DiagramNode
                title="ReferencePack Images"
                subtitle="Top, Side, Front, Rear"
                color="primary"
              />
              <DiagramNode
                title="Calibrate + Extract"
                subtitle="pxPerMeter, anchors, curves"
                color="accent"
              />
              <DiagramNode
                title="Targets B, K, D"
                subtitle="Beam, Keel, Deck curves"
                color="primary"
              />
            </div>

            {/* Arrows */}
            <div className="hidden md:flex justify-between px-20 mb-8">
              <ArrowRight className="text-primary/50 w-8 h-8" />
              <ArrowRight className="text-primary/50 w-8 h-8" />
            </div>

            {/* Middle row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <DiagramNode
                title="SVG Diagram Editors"
                subtitle="Interactive spline editing"
                color="accent"
                large
              />
              <DiagramNode
                title="Param Graph + Feature Nodes"
                subtitle="Cockpit, Trunk, Rails, Bosses"
                color="primary"
                large
              />
            </div>

            {/* Center connector */}
            <div className="flex justify-center mb-8">
              <div className="flex flex-col items-center gap-2">
                <ArrowDown className="text-accent w-8 h-8" />
                <div className="px-4 py-2 rounded-lg border border-accent/30 bg-accent/5">
                  <span className="text-sm font-mono text-accent">Compile Pipeline</span>
                </div>
                <ArrowDown className="text-accent w-8 h-8" />
              </div>
            </div>

            {/* Bottom row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <DiagramNode
                title="Build Base Mesh"
                subtitle="Nu × Nv surface grid"
                color="muted"
              />
              <DiagramNode
                title="Apply Deforms"
                subtitle="Stage-ordered passes"
                color="muted"
              />
              <DiagramNode
                title="Generate Outputs"
                subtitle="LOD, Colliders, Proxies"
                color="primary"
              />
              <DiagramNode
                title="Export Bundle"
                subtitle="GLB + metadata JSON"
                color="accent"
              />
            </div>

            {/* Feedback loop */}
            <div className="border border-dashed border-primary/30 rounded-lg p-6 bg-primary/5">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
                <DiagramNode
                  title="Ortho Render"
                  subtitle="Binary silhouette"
                  color="muted"
                  small
                />
                <ArrowRight className="text-primary/50 w-6 h-6 hidden md:block" />
                <DiagramNode
                  title="Error Metrics"
                  subtitle="eB, eK, eD curves"
                  color="muted"
                  small
                />
                <ArrowRight className="text-primary/50 w-6 h-6 hidden md:block" />
                <DiagramNode
                  title="Bounded Patch"
                  subtitle="Human + LLM proposals"
                  color="accent"
                  small
                />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4 font-mono">
                Fitting Loop: Converge until rms {"<"} tolerance
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DiagramNode = ({
  title,
  subtitle,
  color,
  large,
  small,
}: {
  title: string;
  subtitle: string;
  color: "primary" | "accent" | "muted";
  large?: boolean;
  small?: boolean;
}) => {
  const colorClasses = {
    primary: "border-primary/40 bg-primary/5 hover:border-primary/60",
    accent: "border-accent/40 bg-accent/5 hover:border-accent/60",
    muted: "border-border bg-card hover:border-muted-foreground/30",
  };

  return (
    <div
      className={`
        rounded-lg border transition-all duration-300 cursor-default
        ${colorClasses[color]}
        ${large ? "p-6" : small ? "p-3" : "p-4"}
      `}
    >
      <h4 className={`font-semibold ${small ? "text-sm" : large ? "text-lg" : "text-base"}`}>
        {title}
      </h4>
      <p className={`text-muted-foreground font-mono ${small ? "text-xs" : "text-sm"}`}>
        {subtitle}
      </p>
    </div>
  );
};

export default SystemDiagram;
