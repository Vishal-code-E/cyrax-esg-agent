const frameworks = [
  {
    name: "GRI",
    fullName: "Global Reporting Initiative",
    tag: "Primary",
    description: "Impact-focused, globally accepted. The canonical data backbone for CYRAX.",
    standards: ["GRI 302", "GRI 305", "GRI 403", "GRI 404", "GRI 205"],
  },
  {
    name: "TCFD",
    fullName: "Task Force on Climate-related Financial Disclosures",
    tag: "Climate",
    description: "Climate risk & financial exposure. Governance, Strategy, Risk, Metrics.",
    standards: ["Governance", "Strategy", "Risk Management", "Metrics & Targets"],
  },
  {
    name: "SASB",
    fullName: "Sustainability Accounting Standards Board",
    tag: "Industry",
    description: "Industry-specific (77 industries). Investor-focused materiality. Auto-selected.",
    standards: ["Transportation", "Air Freight", "Marine", "Road Freight"],
  },
];

const Frameworks = () => {
  return (
    <section id="frameworks" className="py-24 lg:py-32 border-b border-border bg-secondary">
      <div className="container">
        <div className="max-w-3xl mb-16">
          <span className="inline-block font-mono text-xs uppercase tracking-wider text-accent mb-4">
            Reporting Frameworks
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Framework-Agnostic,
            <br />
            Regulation-Proof
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            One data model. Multiple framework outputs. Automatic regulatory mapping 
            keeps you compliant as standards evolve.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-border bg-background">
          {frameworks.map((framework, index) => (
            <div
              key={framework.name}
              className={`p-8 lg:p-10 ${
                index < frameworks.length - 1 ? "border-b lg:border-b-0 lg:border-r border-border" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl font-bold">{framework.name}</span>
                <span className="font-mono text-xs uppercase tracking-wider border border-accent text-accent px-2 py-1">
                  {framework.tag}
                </span>
              </div>

              <h3 className="font-medium text-sm text-muted-foreground mb-4">
                {framework.fullName}
              </h3>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {framework.description}
              </p>

              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block mb-3">
                  Supported Standards
                </span>
                <div className="flex flex-wrap gap-2">
                  {framework.standards.map((standard) => (
                    <span
                      key={standard}
                      className="inline-block bg-secondary px-3 py-1 text-xs font-mono"
                    >
                      {standard}
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

export default Frameworks;
