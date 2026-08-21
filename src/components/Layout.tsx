import { useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Home, Compass, Package, User, Search } from "lucide-react";
import { cn } from "../lib/utils";
import { Toaster } from "react-hot-toast";

export function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

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
      
      {/* Mobile Bottom Navigation - PLISSPA Style */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-black/5 px-2 py-2 z-50 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-around relative">
          
          <NavItem item={navItems[0]} location={location} />
          <NavItem item={navItems[1]} location={location} />
          
          {/* Center Floating Button */}
          <div className="relative -top-6 flex justify-center w-16">
            <Link 
              to="/search" 
              className="w-14 h-14 bg-lex-purple rounded-full flex items-center justify-center border-[6px] border-white shadow-md text-white transition-transform active:scale-95"
            >
              <Search className="w-5 h-5" fill="none" strokeWidth={2.5} />
            </Link>
          </div>

          <NavItem item={navItems[2]} location={location} />
          <NavItem item={navItems[3]} location={location} />
        </div>
      </div>
    </div>
  );
}

function NavItem({ item, location }: { item: any, location: any }) {
  const isActive = location.pathname === item.path || 
                   (item.path !== "/" && location.pathname.startsWith(item.path));
  
  return (
    <Link 
      to={item.path}
      className={cn(
        "flex flex-col items-center gap-1 min-w-[48px] transition-colors",
        isActive ? "text-lex-purple" : "text-black/40 hover:text-black/70"
      )}
    >
      <item.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
      <span className="text-[10px] font-bold tracking-tight">{item.name}</span>
    </Link>
  );
}
