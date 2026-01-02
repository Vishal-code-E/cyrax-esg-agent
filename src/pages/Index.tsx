import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import ESGPillars from "@/components/landing/ESGPillars";
import AIOrchestration from "@/components/landing/AIOrchestration";
import Integrations from "@/components/landing/Integrations";
import Frameworks from "@/components/landing/Frameworks";
import Architecture from "@/components/landing/Architecture";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <AIOrchestration />
        <ESGPillars />
        <Integrations />
        <Frameworks />
        <Architecture />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
