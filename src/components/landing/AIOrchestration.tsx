import { Bot, Database, Map, FileText, Shield } from "lucide-react";

const agents = [
  {
    name: "Data Ingestion Agent",
    icon: Database,
    description: "Parses structured/unstructured data. Normalizes into ESG schema. Flags gaps.",
  },
  {
    name: "Supplier Intelligence Agent",
    icon: Map,
    description: "Maps Tier-1 → Tier-N suppliers. Assigns risk scores. Geo/industry overlays.",
  },
  {
    name: "Regulatory Mapping Agent",
    icon: FileText,
    description: "Maps data to GRI, TCFD, SASB. Identifies compliance gaps automatically.",
  },
  {
    name: "Reporting Agent",
    icon: FileText,
    description: "Generates PDF, DOCX, XBRL. Framework-specific language & methodology.",
  },
  {
    name: "Audit & Integrity Agent",
    icon: Shield,
    description: "Immutable audit trail. Data lineage. AI explainability & governance.",
  },
];

const AIOrchestration = () => {
  return (
    <section id="platform" className="py-24 lg:py-32 border-b border-border bg-secondary">
      <div className="container">
        <div className="max-w-3xl mb-16">
          <span className="inline-block font-mono text-xs uppercase tracking-wider text-accent mb-4">
            AI Orchestration Layer
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Multi-Agent Intelligence
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            LangChain + LangGraph powered agents with deterministic workflows, 
            hand-offs, and full explainability — critical for audits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, index) => (
            <div
              key={agent.name}
              className="border border-border bg-background p-6 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center border border-border">
                  <agent.icon className="h-5 w-5" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-bold mb-2">{agent.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {agent.description}
              </p>
            </div>
          ))}

          {/* Architecture diagram placeholder */}
          <div className="border border-border bg-background p-6 flex flex-col items-center justify-center">
            <Bot className="h-12 w-12 text-accent mb-4" />
            <span className="font-mono text-xs uppercase tracking-wider text-center text-muted-foreground">
              Orchestrated by
              <br />
              LangGraph
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIOrchestration;
