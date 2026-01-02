import { ArrowDown } from "lucide-react";

const layers = [
  {
    name: "Integration Layer",
    items: ["Slack", "Jira", "GitHub", "Docs", "Confluence", "Sheets", "Forms"],
  },
  {
    name: "ESG Data Layer",
    items: ["Environment", "Social", "Governance", "Normalized Canonical Model"],
  },
  {
    name: "AI Orchestration Layer",
    items: ["LangChain + LangGraph Agents"],
  },
  {
    name: "Reporting & Compliance Layer",
    items: ["GRI (Primary)", "TCFD", "SASB"],
  },
];

const Architecture = () => {
  return (
    <section className="py-24 lg:py-32 border-b border-border">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block font-mono text-xs uppercase tracking-wider text-accent mb-4">
            System Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            End-to-End Pipeline
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From raw operational data to audit-ready ESG disclosures. 
            Every step traceable, explainable, and immutable.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-4">
          {layers.map((layer, index) => (
            <div key={layer.name}>
              <div className="border-2 border-foreground p-6">
                <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  {layer.name}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {layer.items.map((item) => (
                    <span
                      key={item}
                      className="inline-block border border-border px-3 py-1 text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              {index < layers.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowDown className="h-6 w-6 text-accent" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Architecture;
