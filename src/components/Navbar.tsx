import { NavLink } from "react-router-dom";
import { LayoutDashboard, Calendar, Calculator, Trophy, Settings } from "lucide-react";

export const Navbar = () => {
  const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/timeline", icon: Calendar, label: "Timeline" },
    { to: "/calculator", icon: Calculator, label: "ROI Calculator" },
    { to: "/achievements", icon: Trophy, label: "Conquistas" },
    { to: "/settings", icon: Settings, label: "Configurações" },
  ];

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Roadmap CRM
          </div>
          
          <div className="flex space-x-1">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`
                }
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};