import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center border-2 border-foreground">
            <span className="font-mono text-xs font-bold">CX</span>
          </div>
          <span className="text-xl font-bold tracking-tight">CYRAX</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#platform" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Platform
          </a>
          <a href="#esg" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            ESG Pillars
          </a>
          <a href="#integrations" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Integrations
          </a>
          <a href="#frameworks" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Frameworks
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden sm:inline-flex">
            Sign In
          </Button>
          <Button>
            Request Demo
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
