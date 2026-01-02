import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 lg:py-32 bg-foreground text-background">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            CYRAX is Infrastructure
          </h2>
          <p className="text-lg opacity-80 mb-4 leading-relaxed">
            Once embedded, it's almost impossible to rip out.
          </p>
          <p className="text-lg opacity-80 mb-12 leading-relaxed max-w-xl mx-auto">
            ESG Operating System, not a tool. AI does real compliance work. 
            Framework-agnostic, regulation-proof. Designed for auditors.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              variant="secondary" 
              className="w-full sm:w-auto gap-2 bg-background text-foreground hover:bg-background/90"
            >
              Request Demo
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto border-background text-background hover:bg-background hover:text-foreground"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
