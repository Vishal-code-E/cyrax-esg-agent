import { MessageSquare, Trello, Github, FileSpreadsheet, FileText, CheckSquare } from "lucide-react";

const integrations = [
  { name: "Slack", icon: MessageSquare, purpose: "ESG incidents, discussions" },
  { name: "Jira", icon: Trello, purpose: "Risk issues & remediation" },
  { name: "GitHub", icon: Github, purpose: "Policy-as-code, audit evidence" },
  { name: "Sheets/Excel", icon: FileSpreadsheet, purpose: "Legacy ESG data" },
  { name: "Confluence", icon: FileText, purpose: "Policies, SOPs" },
  { name: "Forms", icon: CheckSquare, purpose: "Supplier questionnaires" },
];

const Integrations = () => {
  return (
    <section id="integrations" className="py-24 lg:py-32 border-b border-border">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <span className="inline-block font-mono text-xs uppercase tracking-wider text-accent mb-4">
              Integration Layer
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Connect Your
              <br />
              Enterprise Stack
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              OAuth-based connectors. Event-driven ingestion. Read-only by default. 
              Full audit logging on every data access.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 bg-accent" />
                <span className="text-sm">OAuth-based secure authentication</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 bg-accent" />
                <span className="text-sm">Real-time event-driven sync</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 bg-accent" />
                <span className="text-sm">Complete audit trail for all operations</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {integrations.map((integration) => (
              <div
                key={integration.name}
                className="border border-border p-6 hover:border-foreground transition-colors"
              >
                <integration.icon className="h-8 w-8 mb-4" />
                <h3 className="font-bold mb-1">{integration.name}</h3>
                <p className="text-xs text-muted-foreground">{integration.purpose}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Integrations;
