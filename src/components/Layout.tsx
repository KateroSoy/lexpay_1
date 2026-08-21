import { Outlet, Link, useLocation } from "react-router-dom";
import { Home, FileText, Store, Menu, User, Star } from "lucide-react";
import { cn } from "../lib/utils";
import { Toaster } from "react-hot-toast";

export function Layout() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Daftar Harga", path: "/services", icon: FileText },
    { name: "Informasi", path: "/information", icon: Star },
    { name: "Saya", path: "/account", icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-lex-black">
      <Toaster position="bottom-center" />
      
      {/* Mobile App Frame */}
      <div className="mx-auto max-w-md bg-white min-h-screen shadow-2xl relative overflow-x-hidden flex flex-col pb-20">
        
        <main className="flex-1">
          <Outlet />
        </main>
        
        {/* Mobile Bottom Navigation */}
        <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-100 px-2 py-2 z-50 rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-around relative">
            
            {/* Left Items */}
            <div className="flex items-center gap-6">
              <NavItem item={navItems[0]} location={location} />
              <NavItem item={navItems[1]} location={location} />
            </div>

            {/* Center Floating Button */}
            <div className="relative -top-8 flex justify-center w-16">
              <Link 
                to="/services" 
                className="w-14 h-14 bg-lex-purple-light rounded-full flex items-center justify-center border-[6px] border-white shadow-md text-white transition-transform active:scale-95"
              >
                <Store className="w-6 h-6" fill="currentColor" />
              </Link>
            </div>

            {/* Right Items */}
            <div className="flex items-center gap-6">
              <NavItem item={navItems[2]} location={location} />
              <NavItem item={navItems[3]} location={location} />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

function NavItem({ item, location }: { item: any, location: any }) {
  const isActive = location.pathname === item.path;
  
  return (
    <Link 
      to={item.path}
      className={cn(
        "flex flex-col items-center gap-1 min-w-[48px] transition-colors",
        isActive ? "text-lex-purple" : "text-gray-400 hover:text-gray-600"
      )}
    >
      <item.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
      <span className="text-[10px] font-semibold tracking-tight">{item.name}</span>
    </Link>
  );
}
