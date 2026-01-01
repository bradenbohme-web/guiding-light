import { Ship, Car, Plane, Building, TreePine, Cog } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const templates = [
  {
    icon: <Ship className="w-8 h-8" />,
    title: "BoatHullTemplate",
    description: "Curve-first hull shells with V-depth, bilge, chine, and rail shaping",
    features: ["B/K/D Curves", "Section Law", "Rocker Envelopes"],
    status: "Production",
  },
  {
    icon: <Car className="w-8 h-8" />,
    title: "CarBodyTemplate",
    description: "Vehicle bodies with width distribution, floor line, and roofline curves",
    features: ["Wheel Arches", "Hood Scoops", "Panel Gaps"],
    status: "Production",
  },
  {
    icon: <Plane className="w-8 h-8" />,
    title: "FuselageTemplate",
    description: "Lengthwise bodies with cross-section families for aircraft and helicopters",
    features: ["VectorWarp", "CreaseLine", "Canopy Shaping"],
    status: "Beta",
  },
  {
    icon: <Building className="w-8 h-8" />,
    title: "BuildingShellTemplate",
    description: "Floor stacks with façade charts, windows, and balconies as feature nodes",
    features: ["Material Stacks", "MEP Routing", "Framing"],
    status: "Beta",
  },
  {
    icon: <TreePine className="w-8 h-8" />,
    title: "GraphTemplate",
    description: "Node-edge structures for trees, skeletons, spokes, pipes, and trusses",
    features: ["Growth Operators", "Junction Shells", "Sweep Profiles"],
    status: "Alpha",
  },
  {
    icon: <Cog className="w-8 h-8" />,
    title: "WheelGraphPreset",
    description: "32-spoke wheels with 2-cross/3-cross lacing patterns",
    features: ["RadialArray", "Hub Flanges", "Spoke Routing"],
    status: "Alpha",
  },
];

const TemplateGallery = () => {
  return (
    <section className="py-24">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Template <span className="text-accent">Library</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Universal base classes that all share the same curve/feature architecture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {templates.map((template) => (
            <Card
              key={template.title}
              className="group relative overflow-hidden border-border bg-card hover:border-primary/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                    {template.icon}
                  </div>
                  <Badge
                    variant={
                      template.status === "Production"
                        ? "default"
                        : template.status === "Beta"
                        ? "secondary"
                        : "outline"
                    }
                    className={
                      template.status === "Production"
                        ? "bg-accent/20 text-accent border-accent/30"
                        : template.status === "Beta"
                        ? "bg-primary/20 text-primary border-primary/30"
                        : ""
                    }
                  >
                    {template.status}
                  </Badge>
                </div>
                <CardTitle className="font-mono text-lg">{template.title}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex flex-wrap gap-2">
                  {template.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-2 py-1 text-xs font-mono rounded bg-muted text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TemplateGallery;
