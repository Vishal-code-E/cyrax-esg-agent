import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { LogOut, User, LayoutDashboard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const roleLabels: Record<string, string> = {
  esg_manager: 'ESG Manager',
  auditor: 'Auditor',
  supplier: 'Supplier',
};

const Header = () => {
  const { user, role, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

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
          {loading ? (
            <div className="text-sm text-muted-foreground">Loading...</div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.email}</p>
                    {role && (
                      <p className="text-xs text-muted-foreground">
                        {roleLabels[role] || role}
                      </p>
                    )}
                  </div>
                </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/dashboard')}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" className="hidden sm:inline-flex" onClick={() => navigate('/auth')}>
                Sign In
              </Button>
              <Button onClick={() => navigate('/auth')}>
                Request Demo
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
