import { 
  CircleDot, 
  Square, 
  Minus, 
  Move3d, 
  Circle,
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import CodeBlock from "./CodeBlock";

const featureTypes = [
  {
    id: "patch",
    icon: <CircleDot className="w-5 h-5" />,
    name: "PatchDisplace",
    subtitle: "Bulge / Scoop / Flare",
    description: "Push vertices along surface normal with amplitude profiles",
    uses: ["Hood scoop bump", "Fender flare", "Deck crown enhancement", "Bow shoulder fattening"],
    code: `{
  "type": "PatchDisplace",
  "mask": { "kind": "ellipse", "u": 0.6, "s": 0.3, "ru": 0.08, "rs": 0.15 },
  "params": {
    "height": 0.025,
    "profile": "bell",      // bell | ridge | plateau
    "edgeSharpness": 1.4,
    "normalMode": "surface" // surface | up | forward
  }
}`,
  },
  {
    id: "recess",
    icon: <Square className="w-5 h-5" />,
    name: "RecessCut",
    subtitle: "Cockpit / Vent / Well",
    description: "Push inward with optional rim shaping. No triangle booleans needed.",
    uses: ["Laser cockpit", "Centerboard trunk", "Car window cuts", "Vent cutouts"],
    code: `{
  "type": "RecessCut",
  "mask": { "kind": "roundedRect", "uMin": 0.22, "uMax": 0.48, "sMin": 0.0, "sMax": 0.42, "r": 0.04 },
  "params": {
    "depth": 0.12,
    "rimWidth": 0.03,
    "rimHeight": 0.01,
    "rimRoundness": 0.7
  }
}`,
  },
  {
    id: "crease",
    icon: <Minus className="w-5 h-5" />,
    name: "CreaseLine",
    subtitle: "Chines / Panel Breaks",
    description: "Locally pinch normals or displace around a curve for edge definition",
    uses: ["Hull chine", "Deck/hull seam", "Car door panel lines", "Aircraft fairing edges"],
    code: `{
  "type": "CreaseLine",
  "mask": { "kind": "curveBand", "curveId": "railCurve", "width": 0.020, "sharpness": 2.2 },
  "params": {
    "depth": 0.006,
    "bias": 0.0,
    "direction": "normal"  // normal | tangent | binormal
  }
}`,
  },
  {
    id: "warp",
    icon: <Move3d className="w-5 h-5" />,
    name: "VectorWarp",
    subtitle: "Mirror Shaping / Twist / Sculpt",
    description: "Warp vertices by a vector field, not necessarily along the normal",
    uses: ["Mirror backside curve", "Bow tip alignment", "Subtle asymmetries", "Canopy shaping"],
    code: `{
  "type": "VectorWarp",
  "mask": { "kind": "ellipse", "u": 0.97, "s": 0.08, "ru": 0.05, "rs": 0.18 },
  "params": {
    "dir": "forward",        // forward | up | right | custom
    "amp": 0.008,
    "profile": "bell",
    "fieldMode": "constant"  // constant | radial | flow
  }
}`,
  },
  {
    id: "boss",
    icon: <Circle className="w-5 h-5" />,
    name: "BossHole",
    subtitle: "Mounts / Rivets / Antenna Bases",
    description: "Build a bump (boss) with optional hole depression, plus hardpoint",
    uses: ["Rigging attachments", "Rudder gudgeon pads", "Car antenna mount", "Bolt heads"],
    code: `{
  "type": "BossHole",
  "placement": { "mode": "UV", "u0": 0.06, "s0": 0.0 },
  "mask": { "kind": "ellipse", "u": 0.06, "s": 0.08, "ru": 0.02, "rs": 0.10 },
  "params": {
    "bossHeight": 0.006,
    "bossProfile": "plateau",
    "holeRadius": 0.004,
    "holeDepth": 0.003,
    "addHardpoint": true
  }
}`,
  },
];

const FeatureNodes = () => {
  const [activeFeature, setActiveFeature] = useState(featureTypes[0].id);

  const active = featureTypes.find((f) => f.id === activeFeature)!;

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Core <span className="text-primary">Feature Types</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Five primitives that compose into any local surface modification
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Feature list */}
          <div className="space-y-2">
            {featureTypes.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(feature.id)}
                className={`
                  w-full p-4 rounded-lg border text-left transition-all duration-200
                  ${
                    activeFeature === feature.id
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-muted-foreground/30"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`
                      w-10 h-10 rounded-lg flex items-center justify-center
                      ${activeFeature === feature.id ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}
                    `}
                  >
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-mono font-semibold">{feature.name}</div>
                    <div className="text-sm text-muted-foreground">{feature.subtitle}</div>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 transition-transform ${
                      activeFeature === feature.id ? "rotate-90 text-primary" : "text-muted-foreground"
                    }`}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Feature details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  {active.icon}
                </div>
                <div>
                  <h3 className="text-xl font-mono font-semibold">{active.name}</h3>
                  <p className="text-muted-foreground">{active.subtitle}</p>
                </div>
              </div>
              <p className="text-foreground/80 mb-4">{active.description}</p>
              <div className="flex flex-wrap gap-2">
                {active.uses.map((use) => (
                  <span
                    key={use}
                    className="px-3 py-1 text-sm rounded-full bg-accent/10 text-accent border border-accent/20"
                  >
                    {use}
                  </span>
                ))}
              </div>
            </div>

            <CodeBlock
              code={active.code}
              language="json"
              title={`${active.name}_spec.json`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureNodes;
