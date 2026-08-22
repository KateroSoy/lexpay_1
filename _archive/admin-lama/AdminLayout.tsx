import { Link, Outlet, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  Search
} from "lucide-react";
import { useState } from "react";

const sidebarLinks = [
  { name: "Dashboard", href: "/cms", icon: LayoutDashboard },
  { name: "Products", href: "/cms/products", icon: Package },
  { name: "Orders", href: "/cms/orders", icon: ShoppingCart },
  { name: "Settings", href: "/cms/settings", icon: Settings },
];

export function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-bg-main text-text-primary flex font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:sticky top-0 h-screen w-64 bg-bg-card border-r border-border-main flex flex-col transition-transform duration-300 z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-border-main shrink-0">
          <Link to="/cms" className="text-xl font-black tracking-tight text-primary-main">
            LEX CMS
          </Link>
          <button className="lg:hidden text-text-secondary hover:text-text-primary" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
          {sidebarLinks.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                  isActive 
                    ? "bg-primary-main/10 text-primary-main" 
                    : "text-text-secondary hover:bg-bg-main hover:text-text-primary"
                }`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border-main">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-bg-main hover:text-error-main w-full transition-colors text-sm font-medium">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-bg-card border-b border-border-main flex items-center justify-between px-4 lg:px-8 shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden text-text-secondary hover:text-text-primary"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-bg-main border border-border-main rounded-lg text-sm text-text-secondary focus-within:border-primary-main/50 focus-within:ring-1 focus-within:ring-primary-main/50 transition-all">
              <Search size={16} />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="bg-transparent border-none outline-none w-64 text-text-primary placeholder:text-text-secondary/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-text-secondary hover:text-text-primary transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error-main rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-main to-secondary-main flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary-main/20">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
