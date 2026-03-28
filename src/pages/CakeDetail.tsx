import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  Shield,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { CakeCard } from "@/components/CakeCard";
import { cakesData } from "@/data/cakes";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart, openCart } from "@/store/cartSlice";
import { toggleFavorite, selectIsFavorite } from "@/store/favoritesSlice";
import { getCakeImage } from "@/utils/cakeImages";

const CakeDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const cake = cakesData.find((c) => c.id === id);

  const [selectedWeight, setSelectedWeight] = useState(cake?.weights[0] || 1);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const isLiked = useAppSelector(selectIsFavorite(id || ""));

  if (!cake) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold">Cake not found</h1>
          <Link to="/cakes">
            <Button className="mt-4">Back to Cakes</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedCakes = cakesData
    .filter((c) => c.category === cake.category && c.id !== cake.id)
    .slice(0, 4);

  const totalPrice = cake.price * selectedWeight * quantity;
  const imageUrl = getCakeImage(cake.image);

  const handleAddToCart = () => {
    dispatch(addToCart({ cake, weight: selectedWeight, message }));
    dispatch(openCart());
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <div className="container py-8">
        {/* Breadcrumb */}
        <Link
          to="/cakes"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cakes
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-square overflow-hidden rounded-3xl bg-card shadow-lifted">
              <img
                src={imageUrl}
                alt={cake.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Badges */}
            <div className="absolute left-4 top-4 flex flex-col gap-2">
              {cake.bestseller && (
                <span className="rounded-full gradient-primary px-4 py-1.5 text-sm font-medium text-primary-foreground shadow-button">
                  Bestseller
                </span>
              )}
              {cake.eggless && (
                <span className="rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground shadow-teal">
                  Eggless
                </span>
              )}
            </div>

            {/* Like Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => cake && dispatch(toggleFavorite(cake))}
              className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-card/90 shadow-soft backdrop-blur-sm"
            >
              <Heart
                className={`h-6 w-6 ${
                  isLiked ? "fill-primary text-primary" : "text-muted-foreground"
                }`}
              />
            </motion.button>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <span className="text-sm font-medium uppercase tracking-wider text-secondary">
              {cake.category}
            </span>

            <h1 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
              {cake.name}
            </h1>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(cake.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="font-medium text-foreground">{cake.rating}</span>
              <span className="text-muted-foreground">
                ({cake.reviewCount} reviews)
              </span>
            </div>

            <p className="mt-6 text-lg text-muted-foreground">
              {cake.description}
            </p>

            {/* Weight Selection */}
            <div className="mt-8">
              <h3 className="mb-3 font-semibold text-foreground">Select Weight</h3>
              <div className="flex flex-wrap gap-3">
                {cake.weights.map((weight) => (
                  <button
                    key={weight}
                    onClick={() => setSelectedWeight(weight)}
                    className={`rounded-xl px-6 py-3 text-sm font-medium transition-all ${
                      selectedWeight === weight
                        ? "gradient-primary text-primary-foreground shadow-button"
                        : "bg-card text-muted-foreground shadow-soft hover:bg-muted"
                    }`}
                  >
                    {weight}kg
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="mt-6">
              <h3 className="mb-3 font-semibold text-foreground">
                Add a Message (Optional)
              </h3>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message on the cake..."
                className="w-full rounded-xl border border-border bg-card p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
              />
            </div>

            {/* Quantity & Price */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-foreground">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-medium text-foreground">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Price</p>
                <p className="text-3xl font-bold text-foreground">
                  ₹{totalPrice.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex gap-4">
              <Button
                variant="hero"
                size="xl"
                className="flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              {/* <Button variant="secondary" size="xl" className="flex-1">
                Buy Now
              </Button> */}
            </div>

            {/* Delivery Info */}
            <div className="mt-8 grid grid-cols-2 gap-4 rounded-2xl bg-muted p-6">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Free Delivery
                  </p>
                  <p className="text-xs text-muted-foreground">
                    On orders above ₹999
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    100% Fresh
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Baked fresh daily
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Cakes */}
        {relatedCakes.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-foreground">
              You May Also Like
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedCakes.map((cake, index) => (
                <CakeCard key={cake.id} cake={cake} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CakeDetail;
