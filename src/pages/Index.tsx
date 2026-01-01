import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SystemDiagram from "@/components/SystemDiagram";
import PipelineStages from "@/components/PipelineStages";
import TemplateGallery from "@/components/TemplateGallery";
import FeatureNodes from "@/components/FeatureNodes";
import OutputsSection from "@/components/OutputsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main>
        <HeroSection />
        
        <div id="architecture">
          <SystemDiagram />
        </div>
        
        <div id="pipeline">
          <PipelineStages />
        </div>
        
        <div id="templates">
          <TemplateGallery />
        </div>
        
        <div id="features">
          <FeatureNodes />
        </div>
        
        <div id="outputs">
          <OutputsSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
