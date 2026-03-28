import { motion } from "framer-motion";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cake } from "@/types/cake";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart, openCart } from "@/store/cartSlice";
import { toggleFavorite, selectIsFavorite } from "@/store/favoritesSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getCakeImage } from "@/utils/cakeImages";

interface CakeCardProps {
  cake: Cake;
  index?: number;
}

export const CakeCard = ({ cake, index = 0 }: CakeCardProps) => {
  const dispatch = useAppDispatch();
  const isLiked = useAppSelector(selectIsFavorite(cake.id));
  const [selectedWeight, setSelectedWeight] = useState(cake.weights[0]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ cake, weight: selectedWeight }));
    dispatch(openCart());
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(cake));
  };

  const imageUrl = getCakeImage(cake.image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link to={`/cake/${cake.id}`}>
        <div className="relative overflow-hidden rounded-2xl bg-card shadow-card transition-all duration-300 hover:shadow-lifted">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden">
            <img
              src={imageUrl}
              alt={cake.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Badges */}
            <div className="absolute left-3 top-3 flex flex-col gap-2">
              {cake.bestseller && (
                <Badge className="gradient-primary border-0 text-primary-foreground shadow-button">
                  Bestseller
                </Badge>
              )}
              {cake.eggless && (
                <Badge variant="secondary" className="shadow-teal">
                  Eggless
                </Badge>
              )}
              {cake.sugarFree && (
                <Badge className="bg-secondary text-secondary-foreground shadow-teal">
                  Sugar-Free
                </Badge>
              )}
            </div>

            {/* Like Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleLike}
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-card/90 shadow-soft backdrop-blur-sm transition-colors hover:bg-card"
            >
              <Heart
                className={`h-5 w-5 transition-colors ${
                  isLiked ? "fill-primary text-primary" : "text-muted-foreground"
                }`}
              />
            </motion.button>

            {/* Quick Add Button */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute bottom-3 left-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
            </motion.div> */}
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Category */}
            <p className="text-xs font-medium uppercase tracking-wider text-secondary">
              {cake.category}
            </p>

            {/* Title */}
            <h3 className="mt-1 text-lg font-semibold text-foreground line-clamp-1">
              {cake.name}
            </h3>

            {/* Rating */}
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-medium text-foreground">
                  {cake.rating}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({cake.reviewCount} reviews)
              </span>
            </div>

            {/* Weight Options */}
            <div className="mt-3 flex flex-wrap gap-2">
              {cake.weights.map((weight) => (
                <button
                  key={weight}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedWeight(weight);
                  }}
                  className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                    selectedWeight === weight
                      ? "bg-primary text-primary-foreground shadow-button"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {weight}kg
                </button>
              ))}
            </div>

            {/* Price */}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-foreground">
                  ₹{(cake.price * selectedWeight).toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">
                  / {selectedWeight}kg
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
