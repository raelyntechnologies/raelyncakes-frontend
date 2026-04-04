import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Cake,
  ShoppingBag,
  BarChart3,
  Settings,
  ChevronLeft,
  LogOut,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { path: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { path: "/admin/cakes", icon: Cake, label: "Cakes", end: false },
  { path: "/admin/users", icon: Users, label: "Users", end: false },
  { path: "/admin/orders", icon: ShoppingBag, label: "Orders", end: false },
  { path: "/admin/analytics", icon: BarChart3, label: "Analytics", end: false },
  { path: "/admin/settings", icon: Settings, label: "Settings", end: false },
];

const AdminSidebar = ({ collapsed, onToggle }: AdminSidebarProps) => {
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 256 }}
      className="fixed left-0 top-0 h-screen bg-card border-r border-border z-50 flex flex-col"
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Cake className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">Admin</span>
          </motion.div>
        )}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onToggle}
          className={cn("transition-transform", collapsed && "mx-auto rotate-180")}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = item.end 
              ? location.pathname === item.path 
              : location.pathname.startsWith(item.path);
            
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.end}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-button"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <NavLink
          to="/"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
            "text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="font-medium">Exit Admin</span>}
        </NavLink>
      </div>
    </motion.aside>
  );
};

export default AdminSidebar;
