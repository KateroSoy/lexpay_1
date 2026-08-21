import { useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PiHouse, PiCompass, PiPackage, PiUser, PiTote } from "react-icons/pi";
import { cn } from "../lib/utils";
import { Toaster } from "react-hot-toast";
import { useThemeStore, useCartStore } from "../lib/store";

export function Layout() {
  const location = useLocation();
  const theme = useThemeStore((state) => state.theme);
  const cartItemCount = useCartStore((state) => state.getItemCount());

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const navItems = [
    { name: "Home", path: "/", icon: PiHouse },
    { name: "Explore", path: "/explore", icon: PiCompass },
    { name: "Orders", path: "/orders", icon: PiPackage },
    { name: "Account", path: "/account", icon: PiUser },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-transparent text-text-primary pb-20 md:pb-0">
      <Toaster 
        position="top-center" 
        toastOptions={{
          className: '',
          style: {
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: '100px',
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: '600',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            marginTop: '16px'
          },
        }}
      />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      
      {/* Mobile Bottom Navigation - PLISSPA Style */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-bg-card border-t border-border-main px-2 py-2 z-50 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-around relative">
          
          <NavItem item={navItems[0]} location={location} />
          <NavItem item={navItems[1]} location={location} />
          
          {/* Center Floating Button */}
          <div className="relative -top-6 flex justify-center w-16">
            <Link 
              to="/cart" 
              className="relative w-14 h-14 bg-lex-purple rounded-full flex items-center justify-center border-[6px] border-bg-card shadow-md text-white transition-transform active:scale-95"
            >
              <PiTote className="w-6 h-6" fill="none" strokeWidth={2.5} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-bg-card">
                  {cartItemCount}
                </span>
              )}
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
        isActive ? "text-lex-purple" : "opacity-60 text-text-secondary hover:text-white/70"
      )}
    >
      <item.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
      <span className="text-[10px] font-bold tracking-tight">{item.name}</span>
    </Link>
  );
}
