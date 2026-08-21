import { useRef } from "react";
import { motion } from "framer-motion";
import { 
  PiSquaresFourThin, 
  PiShoppingBagThin, 
  PiWrenchThin, 
  PiLightningThin, 
  PiCoffeeThin, 
  PiCpuThin
} from "react-icons/pi";

export interface CategoryOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

const DEFAULT_CATEGORIES: CategoryOption[] = [
  { id: "all", label: "Semua", icon: <PiSquaresFourThin className="w-4 h-4" /> },
  { id: "products", label: "Products", icon: <PiShoppingBagThin className="w-4 h-4" /> },
  { id: "services", label: "Services", icon: <PiWrenchThin className="w-4 h-4" /> },
  { id: "digital", label: "Digital", icon: <PiLightningThin className="w-4 h-4" /> },
  { id: "food", label: "Food", icon: <PiCoffeeThin className="w-4 h-4" /> },
  { id: "technology", label: "Tech", icon: <PiCpuThin className="w-4 h-4" /> },
];

interface CategoryFilterTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  categories?: CategoryOption[];
  counts?: Record<string, number>;
  showHelperText?: boolean;
}

export function CategoryFilterTabs({
  activeTab,
  onTabChange,
  categories = DEFAULT_CATEGORIES,
  counts,
}: CategoryFilterTabsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // We keep the state but don't use it for buttons to keep it ultra-clean, 
  // or we can remove scroll buttons entirely as mobile users naturally swipe pills.

  return (
    <div className="relative w-full my-4">
      {/* Scrollable Container (Ultra Minimal) */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-2 px-1 scroll-smooth snap-x select-none"
      >
        {categories.map((cat) => {
          const isActive = activeTab.toLowerCase() === cat.id.toLowerCase();
          const count = counts ? counts[cat.id] : cat.count;

          return (
            <button
              key={cat.id}
              onClick={() => onTabChange(cat.id)}
              className={`relative px-4 py-2.5 rounded-full font-bold text-[13px] whitespace-nowrap transition-all duration-300 flex items-center gap-2 snap-start outline-none cursor-pointer border ${
                isActive
                  ? "border-transparent text-white"
                  : "bg-bg-main border-border-main text-text-secondary hover:text-text-primary hover:border-lex-purple/30 shadow-xs"
              }`}
            >
              {/* Active Pill Background */}
              {isActive && (
                <motion.div
                  layoutId="activeCategoryTabPill"
                  className="absolute inset-0 rounded-full bg-lex-purple shadow-[0_4px_16px_rgba(89,39,229,0.25)] z-0"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}

              {/* Content */}
              <span className="relative z-10 flex items-center gap-2">
                {cat.icon && (
                  <span className={`transition-transform duration-300 ${isActive ? "scale-105" : "opacity-60"}`}>
                    {cat.icon}
                  </span>
                )}
                <span>{cat.label}</span>
              </span>

              {/* Count Badge */}
              {count !== undefined && count > 0 && (
                <span
                  className={`relative z-10 px-2 py-0.5 rounded-full text-[10px] font-black transition-all ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-black/5 dark:bg-white/5 text-text-secondary"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
