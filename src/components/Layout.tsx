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
    { name: "Cart", path: "/cart", icon: PiTote, badge: cartItemCount },
    { name: "Orders", path: "/orders", icon: PiPackage },
    { name: "Account", path: "/account", icon: PiUser },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-transparent text-text-primary pb-24 md:pb-0">
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
      
      {/* Mobile Bottom Navigation - Modern Expanding Pill Style */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-bg-card border-t border-border-main px-4 py-3 z-50 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between">
          {navItems.map((item, idx) => (
             <NavItem key={idx} item={item} location={location} />
          ))}
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
        "flex items-center justify-center gap-2 h-12 transition-all duration-300 relative",
        isActive 
          ? "bg-lex-purple text-white px-5 rounded-full" 
          : "text-text-secondary w-12 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
      )}
    >
      <item.icon className="w-6 h-6 shrink-0" strokeWidth={isActive ? 2.5 : 2} />
      
      {/* Expanding text container */}
      <div 
        className={cn(
          "overflow-hidden transition-all duration-300 whitespace-nowrap flex items-center",
          isActive ? "max-w-[100px] opacity-100" : "max-w-0 opacity-0"
        )}
      >
        <span className="text-sm font-bold">{item.name}</span>
        
        {/* Active Cart Badge */}
        {item.badge !== undefined && item.badge > 0 && (
          <span className="ml-2 bg-white text-lex-purple text-[10px] font-black px-1.5 py-0.5 rounded-full">
            {item.badge}
          </span>
        )}
      </div>

      {/* Inactive Cart Badge (Dot) */}
      {!isActive && item.badge !== undefined && item.badge > 0 && (
        <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-bg-card" />
      )}
    </Link>
  );
}
