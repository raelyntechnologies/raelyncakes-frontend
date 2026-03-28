import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Cake } from "@/types/cake";
import { cakesData } from "@/data/cakes";

const STORAGE_KEY = "raelyn_cakes";

interface CakeState {
  cakes: Cake[];
  isLoading: boolean;
}

const loadCakes = (): Cake[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : cakesData;
  } catch {
    return cakesData;
  }
};

const saveCakes = (cakes: Cake[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cakes));
};

const initialState: CakeState = {
  cakes: loadCakes(),
  isLoading: false,
};

const cakeSlice = createSlice({
  name: "cakes",
  initialState,
  reducers: {
    addCake: (state, action: PayloadAction<Cake>) => {
      state.cakes.unshift(action.payload);
      saveCakes(state.cakes);
    },
    updateCake: (state, action: PayloadAction<Cake>) => {
      const index = state.cakes.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.cakes[index] = action.payload;
        saveCakes(state.cakes);
      }
    },
    deleteCake: (state, action: PayloadAction<string>) => {
      state.cakes = state.cakes.filter((c) => c.id !== action.payload);
      saveCakes(state.cakes);
    },
    resetCakes: (state) => {
      state.cakes = cakesData;
      localStorage.removeItem(STORAGE_KEY);
    },
  },
});

export const { addCake, updateCake, deleteCake, resetCakes } = cakeSlice.actions;

// Selectors
export const selectAllCakes = (state: RootState) => state.cakes.cakes;
export const selectCakeById = (id: string) => (state: RootState) =>
  state.cakes.cakes.find((c) => c.id === id);
export const selectCakesByCategory = (category: string) => (state: RootState) =>
  state.cakes.cakes.filter((c) => c.category === category);

export default cakeSlice.reducer;
