import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Package,
  Calendar,
  MapPin,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { setLoading } from "@/store/authSlice";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import API_URL from "@/config/api";

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  baking: "bg-orange-100 text-orange-700",
  out_for_delivery: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  baking: "Baking",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const Orders = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/orders/orders`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(localStorage.getItem("access_token") && {
              "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            })
          }
        });
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        setOrders(data);
      } catch (error: any) {
        toast({
          title: "Failed to fetch orders",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <div className="container py-8">
        <h1 className="text-3xl font-bold text-foreground">My Orders</h1>
        <p className="mt-2 text-muted-foreground">
          Track and manage your cake orders
        </p>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              No orders yet
            </h2>
            <p className="mt-2 text-muted-foreground">
              Start ordering delicious cakes today!
            </p>
            <Link to="/cakes">
              <Button variant="hero" size="xl" className="mt-6">
                Browse Cakes
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="mt-8 space-y-4">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/order-success/${order.id}`}
                  className="block rounded-2xl bg-card p-6 shadow-soft transition-all hover:shadow-lifted"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Package className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-foreground">
                            {order.id}
                          </h3>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              statusColors[order.status]
                            }`}
                          >
                            {statusLabels[order.status]}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(order.created_at).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                          {/* <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {order.address.city}
                          </span> */}
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {order.items.length} item{order.items.length !== 1 && "s"} •{" "}
                          {order.items.map((i) => i.cake_name).join(", ")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground">
                          ₹{order.total.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {order.payment_method === "cod" ? "Cash on Delivery" : "Paid via UPI"}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Orders;
