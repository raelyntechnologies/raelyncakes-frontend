import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CakeCard } from "@/components/CakeCard";
import { CakeFilters } from "@/components/CakeFilters";
import { CartDrawer } from "@/components/CartDrawer";
import { cakesData } from "@/data/cakes";
import { FilterState } from "@/types/cake";

const CakesPage = () => {
  const [filters, setFilters] = useState<FilterState>({
    category: "All",
    occasion: "All",
    priceRange: [300, 5000],
    weight: null,
    eggless: false,
    sugarFree: false,
    searchQuery: "",
  });

  const filteredCakes = useMemo(() => {
    return cakesData.filter((cake) => {
      // Category filter
      if (filters.category !== "All" && cake.category !== filters.category) {
        return false;
      }

      // Occasion filter
      if (
        filters.occasion !== "All" &&
        !cake.occasion.includes(filters.occasion)
      ) {
        return false;
      }

      // Price filter
      if (
        cake.price < filters.priceRange[0] ||
        cake.price > filters.priceRange[1]
      ) {
        return false;
      }

      // Weight filter
      if (filters.weight && !cake.weights.includes(filters.weight)) {
        return false;
      }

      // Dietary filters
      if (filters.eggless && !cake.eggless) {
        return false;
      }
      if (filters.sugarFree && !cake.sugarFree) {
        return false;
      }

      // Search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return (
          cake.name.toLowerCase().includes(query) ||
          cake.description.toLowerCase().includes(query) ||
          cake.category.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      {/* Page Header */}
      <section className="gradient-hero py-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Our Cake Collection
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Explore 50+ handcrafted cakes for every occasion. Filter by
              category, price, or dietary preferences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container">
          <CakeFilters filters={filters} onFilterChange={setFilters} />

          {/* Results Count */}
          <div className="mb-6 mt-8 flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {filteredCakes.length}
              </span>{" "}
              cakes
            </p>
          </div>

          {/* Cakes Grid */}
          {filteredCakes.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredCakes.map((cake, index) => (
                <CakeCard key={cake.id} cake={cake} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center"
            >
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                <span className="text-4xl">🍰</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                No cakes found
              </h3>
              <p className="mt-2 text-muted-foreground">
                Try adjusting your filters to find what you're looking for
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CakesPage;
