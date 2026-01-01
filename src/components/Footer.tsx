import { Cpu, Github, FileText, MessageSquare } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-primary" />
            </div>
            <span className="font-mono font-bold">Universal Parametric Asset Engine</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span className="text-sm">Documentation</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="text-sm">GitHub</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm">Discord</span>
            </a>
          </div>

          <div className="text-sm text-muted-foreground">
            <span className="font-mono">v1.0.0</span> • Built with determinism
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
