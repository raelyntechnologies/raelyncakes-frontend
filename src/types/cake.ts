export interface Cake {
  id: string;
  name: string;
  category: string;
  occasion: string[];
  price: number;
  weights: number[];
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  bestseller: boolean;
  eggless: boolean;
  sugarFree: boolean;
}

export interface CartItem {
  cake: Cake;
  quantity: number;
  weight: number;
  message?: string;
  toppings?: string[];
}

export interface FilterState {
  category: string;
  occasion: string;
  priceRange: [number, number];
  weight: number | null;
  eggless: boolean;
  sugarFree: boolean;
  searchQuery: string;
}
