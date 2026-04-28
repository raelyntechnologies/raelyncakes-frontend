import { motion } from "framer-motion";
import { useEffect } from "react";
import { Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { CakeCard } from "@/components/CakeCard";
import { useAppSelector } from "@/store/hooks";
import { selectFavorites } from "@/store/favoritesSlice";

const Favorites = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const favorites = useAppSelector(selectFavorites);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <section className="gradient-hero py-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Your Favorites
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Cakes you've loved — all in one place.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8">
        <div className="container">
          {favorites.length > 0 ? (
            <>
              <p className="mb-6 text-muted-foreground">
                <span className="font-semibold text-foreground">{favorites.length}</span>{" "}
                {favorites.length === 1 ? "cake" : "cakes"} in your favorites
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {favorites.map((cake, index) => (
                  <CakeCard key={cake.id} cake={cake} index={index} />
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center"
            >
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                <Heart className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                No favorites yet
              </h3>
              <p className="mt-2 text-muted-foreground">
                Tap the heart icon on any cake to save it here
              </p>
              <Link to="/cakes">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-button"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Browse Cakes
                </motion.button>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Favorites;
