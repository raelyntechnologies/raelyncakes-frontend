import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { categories, occasions } from "@/data/cakes";
import { FilterState } from "@/types/cake";

interface CakeFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export const CakeFilters = ({ filters, onFilterChange }: CakeFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="space-y-4">
      {/* Search & Toggle */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for cakes..."
            value={filters.searchQuery}
            onChange={(e) => updateFilter("searchQuery", e.target.value)}
            className="w-full rounded-xl border border-border bg-card py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {filters.searchQuery && (
            <button
              onClick={() => updateFilter("searchQuery", "")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button
          variant={showFilters ? "default" : "outline"}
          size="lg"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">Filters</span>
        </Button>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((category) => (
          <motion.button
            key={category}
            whileTap={{ scale: 0.95 }}
            onClick={() => updateFilter("category", category)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              filters.category === category
                ? "gradient-primary text-primary-foreground shadow-button"
                : "bg-card text-muted-foreground shadow-soft hover:text-foreground"
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="rounded-2xl bg-card p-6 shadow-card"
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Occasion */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-foreground">
                Occasion
              </h4>
              <div className="flex flex-wrap gap-2">
                {occasions.map((occasion) => (
                  <button
                    key={occasion}
                    onClick={() => updateFilter("occasion", occasion)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                      filters.occasion === occasion
                        ? "bg-secondary text-secondary-foreground shadow-teal"
                        : "bg-muted text-muted-foreground hover:bg-secondary/20"
                    }`}
                  >
                    {occasion}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-foreground">
                Price Range
              </h4>
              <div className="px-2">
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) =>
                    updateFilter("priceRange", value as [number, number])
                  }
                  min={300}
                  max={3000}
                  step={100}
                  className="w-full"
                />
                <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                  <span>₹{filters.priceRange[0]}</span>
                  <span>₹{filters.priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Weight */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-foreground">
                Weight
              </h4>
              <div className="flex flex-wrap gap-2">
                {[0.5, 1, 2].map((weight) => (
                  <button
                    key={weight}
                    onClick={() =>
                      updateFilter(
                        "weight",
                        filters.weight === weight ? null : weight
                      )
                    }
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                      filters.weight === weight
                        ? "bg-primary text-primary-foreground shadow-button"
                        : "bg-muted text-muted-foreground hover:bg-primary/20"
                    }`}
                  >
                    {weight}kg
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-foreground">
                Dietary
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-muted-foreground">
                    Eggless
                  </label>
                  <Switch
                    checked={filters.eggless}
                    onCheckedChange={(checked) =>
                      updateFilter("eggless", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm text-muted-foreground">
                    Sugar-Free
                  </label>
                  <Switch
                    checked={filters.sugarFree}
                    onCheckedChange={(checked) =>
                      updateFilter("sugarFree", checked)
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          <div className="mt-6 flex justify-end">
            <Button
              variant="ghost"
              onClick={() =>
                onFilterChange({
                  category: "All",
                  occasion: "All",
                  priceRange: [300, 3000],
                  weight: null,
                  eggless: false,
                  sugarFree: false,
                  searchQuery: "",
                })
              }
            >
              Clear All Filters
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
