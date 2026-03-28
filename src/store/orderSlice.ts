import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Order, OrderStatus, TrackingUpdate } from "@/types/order";

const STORAGE_KEY = "raelyn_orders";

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
}

const loadOrders = (): Order[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveOrders = (orders: Order[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
};

const initialState: OrderState = {
  orders: loadOrders(),
  currentOrder: null,
  isLoading: false,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    createOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
      state.currentOrder = action.payload;
      saveOrders(state.orders);
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<{ orderId: string; status: OrderStatus; message: string }>
    ) => {
      const order = state.orders.find((o) => String(o.id) === String(action.payload.orderId));
      if (order) {
        order.status = action.payload.status;
        order.created_at = new Date().toISOString();
        
        const update: TrackingUpdate = {
          status: action.payload.status,
          message: action.payload.message,
          timestamp: new Date().toISOString(),
        };
        order.trackingUpdates.push(update);
        saveOrders(state.orders);
      }
    },
    updatePaymentStatus: (
      state,
      action: PayloadAction<{ orderId: string; status: "pending" | "paid" | "failed" }>
    ) => {
      const order = state.orders.find((o) => String(o.id) === String(action.payload.orderId));
      if (order) {
        order.paymentstatus = action.payload.status;
        order.updatedAt = new Date().toISOString();
        saveOrders(state.orders);
      }
    },
    setCurrentOrder: (state, action: PayloadAction<Order | null>) => {
      state.currentOrder = action.payload;
    },
    clearOrders: (state) => {
      state.orders = [];
      state.currentOrder = null;
      localStorage.removeItem(STORAGE_KEY);
    },
  },
});

export const {
  createOrder,
  updateOrderStatus,
  updatePaymentStatus,
  setCurrentOrder,
  clearOrders,
} = orderSlice.actions;

// Selectors
export const selectOrders = (state: RootState) => state.orders.orders;
export const selectCurrentOrder = (state: RootState) => state.orders.currentOrder;
export const selectOrderById = (orderId: string) => (state: RootState) =>
  state.orders.orders.find((o) => o.id === Number(orderId));
export const selectUserOrders = (userId: string) => (state: RootState) =>
  state.orders.orders.filter((o) => String(o.user_id) === userId);

export default orderSlice.reducer;
