const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center border-2 border-foreground">
              <span className="font-mono text-xs font-bold">CX</span>
            </div>
            <span className="text-xl font-bold tracking-tight">CYRAX</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Platform</a>
            <a href="#" className="hover:text-foreground transition-colors">Documentation</a>
            <a href="#" className="hover:text-foreground transition-colors">Security</a>
            <a href="#" className="hover:text-foreground transition-colors">Compliance</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>

          <div className="text-sm text-muted-foreground">
            © 2024 CYRAX. SOC-2 Ready.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
