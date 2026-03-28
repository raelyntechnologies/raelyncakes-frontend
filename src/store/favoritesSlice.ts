import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cake } from "@/types/cake";
import { RootState } from "./store";

interface FavoritesState {
  items: Cake[];
}

const loadFavorites = (): Cake[] => {
  try {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const initialState: FavoritesState = {
  items: loadFavorites(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Cake>) => {
      const index = state.items.findIndex((c) => c.id === action.payload.id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export const selectFavorites = (state: RootState) => state.favorites.items;
export const selectFavoriteCount = (state: RootState) => state.favorites.items.length;
export const selectIsFavorite = (id: string) => (state: RootState) =>
  state.favorites.items.some((c) => c.id === id);

export default favoritesSlice.reducer;
