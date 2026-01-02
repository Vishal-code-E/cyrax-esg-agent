import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center border-b border-border pt-16">
      <div className="container py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 border border-border px-4 py-2 mb-8">
            <Shield className="h-4 w-4 text-accent" />
            <span className="text-sm font-mono uppercase tracking-wider">
              ESG Operating System
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            AI-Native ESG Intelligence
            <br />
            <span className="text-muted-foreground">for Global Logistics</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Transform fragmented ESG data into audit-ready compliance reports. 
            CSRD, CSDDD, UK Modern Slavery Act — automated.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button size="lg" className="w-full sm:w-auto gap-2">
              Request Demo
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              View Documentation
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="border border-border p-6 text-left">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-accent" />
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Speed</span>
              </div>
              <p className="text-3xl font-bold">80%</p>
              <p className="text-sm text-muted-foreground">Reduction in reporting time</p>
            </div>
            <div className="border border-border p-6 text-left">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-accent" />
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Coverage</span>
              </div>
              <p className="text-3xl font-bold">Tier-N</p>
              <p className="text-sm text-muted-foreground">Supply chain visibility</p>
            </div>
            <div className="border border-border p-6 text-left">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-4 w-4 flex items-center justify-center text-accent font-bold text-xs">✓</span>
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Compliance</span>
              </div>
              <p className="text-3xl font-bold">100%</p>
              <p className="text-sm text-muted-foreground">Audit trail integrity</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </section>
  );
};

export default Hero;
