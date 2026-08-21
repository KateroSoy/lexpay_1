import { useState } from "react";
import { PiMagnifyingGlassThin, PiXThin, PiSparkleThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

interface ModernSearchBarProps {
  initialQuery?: string;
  placeholder?: string;
  onSearchSubmit?: (query: string) => void;
  showQuickChips?: boolean;
}

const QUICK_CHIPS = [
  { label: "Servis AC", query: "AC" },
  { label: "Top Up MLBB", query: "Mobile Legends" },
  { label: "Mechanical Keyboard", query: "Keyboard" },
  { label: "Cold Brew", query: "Cold Brew" },
  { label: "Haircut", query: "Haircut" }
];

export function ModernSearchBar({
  initialQuery = "",
  placeholder = "Cari layanan, produk, atau digital...",
  onSearchSubmit,
  showQuickChips = true
}: ModernSearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(query);
    } else {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleChipClick = (chipQuery: string) => {
    setQuery(chipQuery);
    if (onSearchSubmit) {
      onSearchSubmit(chipQuery);
    } else {
      navigate(`/search?q=${encodeURIComponent(chipQuery)}`);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-4 md:mb-6">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative flex items-center bg-bg-main backdrop-blur-3xl rounded-full p-2 pl-4 border border-border-main shadow-xs transition-all duration-300 group-hover:border-lex-purple/40 group-focus-within:border-lex-purple group-focus-within:shadow-[0_4px_16px_rgba(89,39,229,0.1)]">
          
          {/* Animated Search Icon */}
          <div className="flex items-center justify-center text-text-secondary opacity-60 group-focus-within:text-lex-purple transition-colors mr-3 shrink-0">
            <PiMagnifyingGlassThin className="w-5 h-5 md:w-6 md:h-6" />
          </div>

          {/* Search Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent border-none outline-none py-1.5 text-[13px] md:text-sm font-semibold text-text-primary placeholder:text-text-secondary/50 placeholder:font-medium"
          />

          {/* Clear Button */}
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                if (onSearchSubmit) onSearchSubmit("");
              }}
              className="p-1.5 mr-1 rounded-full text-text-secondary/60 hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0"
              aria-label="Clear search"
            >
              <PiXThin className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {/* Quick Suggestion Chips */}
      {showQuickChips && (
        <div className="flex items-center gap-2 mt-3 px-1 overflow-x-auto scrollbar-hide py-1">
          <span className="text-[10px] md:text-[11px] font-bold text-text-secondary opacity-50 flex items-center gap-1 shrink-0 uppercase tracking-widest">
            <PiSparkleThin className="w-4 h-4 text-text-secondary" /> Populer
          </span>
          {QUICK_CHIPS.map((chip) => (
            <button
              key={chip.label}
              onClick={() => handleChipClick(chip.query)}
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold bg-bg-main text-text-secondary hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/10 border border-border-main transition-all whitespace-nowrap cursor-pointer"
            >
              {chip.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
