import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiMagnifyingGlass, PiList, PiTote, PiUser, PiSun, PiMoon } from "react-icons/pi";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore, useThemeStore } from "../lib/store";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const cartItemCount = useCartStore((state) => state.getItemCount());
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "hidden md:block fixed top-0 z-50 w-full transition-all duration-300",
        scrolled ? "py-4" : "py-6"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "flex items-center justify-between rounded-full px-6 py-3 transition-all duration-300",
            scrolled
              ? "bg-bg-card/80 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.1)] backdrop-blur-xl border border-border-main"
              : "bg-transparent"
          )}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-text-primary">
              LEXPAY
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/explore" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Explore</Link>
            <Link to="/products" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Products</Link>
            <Link to="/services" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Services</Link>
            <Link to="/digital" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Digital</Link>
            <Link to="/business" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Business</Link>
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={toggleTheme} 
              className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-all hover:scale-105 active:scale-95"
            >
              {theme === 'dark' ? (
                <PiSun className="h-5 w-5 text-white" strokeWidth={1.5} />
              ) : (
                <PiMoon className="h-5 w-5 text-black" strokeWidth={1.5} />
              )}
            </button>
            <Link to="/search" className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              <PiMagnifyingGlass className="h-5 w-5 text-text-primary" strokeWidth={2} />
            </Link>
            <Link to="/cart" className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              <PiTote className="h-5 w-5 text-text-primary" strokeWidth={2} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-lex-purple text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-bg-main">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <Link to="/account" className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              <PiUser className="h-5 w-5 text-text-primary" strokeWidth={2} />
            </Link>
            <button className="bg-btn-bg text-btn-text px-6 py-2.5 rounded-full text-sm font-medium hover:bg-white/80 hover:scale-105 active:scale-95 transition-all">
              Mulai
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={toggleTheme} 
              className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-all hover:scale-105 active:scale-95"
            >
              {theme === 'dark' ? (
                <PiSun className="h-5 w-5 text-white" strokeWidth={1.5} />
              ) : (
                <PiMoon className="h-5 w-5 text-black" strokeWidth={1.5} />
              )}
            </button>
            <Link to="/search" className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              <PiMagnifyingGlass className="h-5 w-5 text-text-primary" strokeWidth={2} />
            </Link>
            <button 
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <PiList className="h-6 w-6 text-text-primary" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full px-4 pt-2 pb-6 md:hidden"
          >
            <div className="bg-bg-card rounded-3xl p-6 shadow-2xl border border-border-main flex flex-col gap-4">
              <Link to="/explore" className="text-lg font-semibold text-text-primary" onClick={() => setMobileMenuOpen(false)}>Explore</Link>
              <Link to="/products" className="text-lg font-semibold text-text-primary" onClick={() => setMobileMenuOpen(false)}>Products</Link>
              <Link to="/services" className="text-lg font-semibold text-text-primary" onClick={() => setMobileMenuOpen(false)}>Services</Link>
              <Link to="/digital" className="text-lg font-semibold text-text-primary" onClick={() => setMobileMenuOpen(false)}>Digital</Link>
              <Link to="/business" className="text-lg font-semibold text-text-primary" onClick={() => setMobileMenuOpen(false)}>Business</Link>
              <div className="h-px bg-border-main w-full my-2"></div>
              <Link to="/search" className="flex items-center gap-3 text-lg font-semibold text-text-primary" onClick={() => setMobileMenuOpen(false)}>
                <PiMagnifyingGlass className="h-5 w-5" /> Search
              </Link>
              <Link to="/account" className="flex items-center gap-3 text-lg font-semibold text-text-primary" onClick={() => setMobileMenuOpen(false)}>
                <PiUser className="h-5 w-5" /> Account
              </Link>
              <button className="bg-btn-bg text-btn-text px-6 py-4 rounded-full text-lg font-medium w-full text-center mt-2">
                Mulai
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
