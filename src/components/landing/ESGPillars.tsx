import { Leaf, Users, Building2 } from "lucide-react";

const pillars = [
  {
    id: "environment",
    label: "E",
    title: "Environment",
    icon: Leaf,
    description: "Logistics-specific environmental impact tracking with automated carbon accounting.",
    dataInputs: [
      "Fuel consumption",
      "Fleet composition (EV/ICE)",
      "Route efficiency",
      "Scope 1, 2, 3 emissions",
      "Warehouse energy use",
      "Packaging & waste",
    ],
    frameworks: ["GRI 302, 305", "TCFD Metrics", "SASB Transport"],
  },
  {
    id: "social",
    label: "S",
    title: "Social",
    icon: Users,
    description: "Human rights and workforce integrity across your entire supply chain.",
    dataInputs: [
      "Health & safety incidents",
      "Training hours",
      "Labor declarations",
      "Forced/child labor risk",
      "Wage compliance",
      "Grievance systems",
    ],
    frameworks: ["GRI 403, 404, 408", "UK Modern Slavery", "SASB Labor"],
  },
  {
    id: "governance",
    label: "G",
    title: "Governance",
    icon: Building2,
    description: "Accountability, compliance control, and transparent decision-making.",
    dataInputs: [
      "Board ESG oversight",
      "Ethics policies",
      "Supplier contracts",
      "Audit remediation",
      "Cybersecurity incidents",
      "Regulatory tracking",
    ],
    frameworks: ["GRI 205, 206", "TCFD Governance", "CSDDD Due Diligence"],
  },
];

const ESGPillars = () => {
  return (
    <section id="esg" className="py-24 lg:py-32 border-b border-border">
      <div className="container">
        <div className="max-w-3xl mb-16">
          <span className="inline-block font-mono text-xs uppercase tracking-wider text-accent mb-4">
            Core Data Layers
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Unified ESG Data Model
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every metric normalized into a canonical schema. Every data point traceable to its source. 
            Every output auditor-ready.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-border">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.id}
              className={`p-8 lg:p-10 ${
                index < pillars.length - 1 ? "border-b lg:border-b-0 lg:border-r border-border" : ""
              }`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center border-2 border-foreground">
                  <span className="text-xl font-bold">{pillar.label}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{pillar.title}</h3>
                  <pillar.icon className="h-4 w-4 text-muted-foreground mt-1" />
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {pillar.description}
              </p>

              <div className="mb-6">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block mb-3">
                  Data Inputs
                </span>
                <ul className="space-y-2">
                  {pillar.dataInputs.map((input) => (
                    <li key={input} className="flex items-center gap-2 text-sm">
                      <span className="h-1.5 w-1.5 bg-accent flex-shrink-0" />
                      {input}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block mb-3">
                  Framework Outputs
                </span>
                <div className="flex flex-wrap gap-2">
                  {pillar.frameworks.map((framework) => (
                    <span
                      key={framework}
                      className="inline-block border border-border px-3 py-1 text-xs font-mono"
                    >
                      {framework}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ESGPillars;
