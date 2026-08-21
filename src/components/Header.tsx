import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, ShoppingBag, User } from "lucide-react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../lib/store";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const cartItemCount = useCartStore((state) => state.getItemCount());

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
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled ? "py-4" : "py-6"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "flex items-center justify-between rounded-full px-6 py-3 transition-all duration-300",
            scrolled
              ? "bg-white/80 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.1)] backdrop-blur-xl border border-black/5"
              : "bg-transparent"
          )}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-lex-black">
              LEXPAY
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/explore" className="text-sm font-medium text-black/70 hover:text-black transition-colors">Explore</Link>
            <Link to="/products" className="text-sm font-medium text-black/70 hover:text-black transition-colors">Products</Link>
            <Link to="/services" className="text-sm font-medium text-black/70 hover:text-black transition-colors">Services</Link>
            <Link to="/digital" className="text-sm font-medium text-black/70 hover:text-black transition-colors">Digital</Link>
            <Link to="/business" className="text-sm font-medium text-black/70 hover:text-black transition-colors">Business</Link>
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/search" className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5 transition-colors">
              <Search className="h-5 w-5 text-black" strokeWidth={2} />
            </Link>
            <Link to="/cart" className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5 transition-colors">
              <ShoppingBag className="h-5 w-5 text-black" strokeWidth={2} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-lex-purple text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <Link to="/account" className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5 transition-colors">
              <User className="h-5 w-5 text-black" strokeWidth={2} />
            </Link>
            <button className="bg-lex-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-black/90 hover:scale-105 active:scale-95 transition-all">
              Mulai
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <Link to="/cart" className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5 transition-colors">
              <ShoppingBag className="h-5 w-5 text-black" strokeWidth={2} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-lex-purple text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button 
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6 text-black" strokeWidth={2} />
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
            <div className="bg-white rounded-3xl p-6 shadow-2xl border border-black/5 flex flex-col gap-4">
              <Link to="/explore" className="text-lg font-semibold text-black" onClick={() => setMobileMenuOpen(false)}>Explore</Link>
              <Link to="/products" className="text-lg font-semibold text-black" onClick={() => setMobileMenuOpen(false)}>Products</Link>
              <Link to="/services" className="text-lg font-semibold text-black" onClick={() => setMobileMenuOpen(false)}>Services</Link>
              <Link to="/digital" className="text-lg font-semibold text-black" onClick={() => setMobileMenuOpen(false)}>Digital</Link>
              <Link to="/business" className="text-lg font-semibold text-black" onClick={() => setMobileMenuOpen(false)}>Business</Link>
              <div className="h-px bg-black/5 w-full my-2"></div>
              <Link to="/search" className="flex items-center gap-3 text-lg font-semibold text-black" onClick={() => setMobileMenuOpen(false)}>
                <Search className="h-5 w-5" /> Search
              </Link>
              <Link to="/account" className="flex items-center gap-3 text-lg font-semibold text-black" onClick={() => setMobileMenuOpen(false)}>
                <User className="h-5 w-5" /> Account
              </Link>
              <button className="bg-lex-black text-white px-6 py-4 rounded-full text-lg font-medium w-full text-center mt-2">
                Mulai
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
