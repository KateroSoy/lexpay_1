import { Outlet, Link, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Home, Compass, Package, User } from "lucide-react";
import { cn } from "../lib/utils";
import { Toaster } from "react-hot-toast";

export function Layout() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Explore", path: "/explore", icon: Compass },
    { name: "Orders", path: "/orders", icon: Package },
    { name: "Account", path: "/account", icon: User },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-lex-white text-lex-black pb-20 md:pb-0">
      <Toaster position="bottom-center" />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-black/5 px-6 py-3 z-50 flex items-center justify-between shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
                           (item.path !== "/" && location.pathname.startsWith(item.path));
          return (
            <Link 
              key={item.name} 
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 min-w-[64px] transition-colors",
                isActive ? "text-lex-purple" : "text-black/40 hover:text-black/70"
              )}
            >
              <item.icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold tracking-wide">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
