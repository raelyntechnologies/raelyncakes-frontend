import { CartItem } from "./cake";
import { Address } from "./user";

export type OrderStatus = 
  | "pending"
  | "confirmed"
  | "baking"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export type PaymentMethod = "cod" | "upi";

export interface Order {
  id: number
  user_id: number
  user_phone: string

  subtotal: number
  delivery_fee: number
  total: number

  payment_method: "cod" | "upi"
  status: "pending" | "confirmed" | "baking" | "out_for_delivery" | "delivered" | "cancelled"

  delivery_date: string
  delivery_slot: string

  created_at: string

  items: OrderItem[]

  updatedAt: string

  trackingUpdates: TrackingUpdate[]
  payment_status: "pending" | "paid" | "failed"
}

export interface OrderItem {
  cake_id: string
  cake_name: string
  weight: number
  quantity: number
  price: number
}


export interface TrackingUpdate {
  status: OrderStatus;
  message: string;
  timestamp: string;
}
