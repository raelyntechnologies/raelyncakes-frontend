import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Package,
  Truck,
  MapPin,
  Calendar,
  Clock,
  Phone,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { useToast } from "@/hooks/use-toast";
import API_URL from "@/config/api";

const OrderSuccess = () => {
  const { orderId } = useParams();
  console.log("Fetched order:", orderId);

  const { toast } = useToast();
  const [order, setOrder] = useState(null); 
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/orders/details/${orderId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(localStorage.getItem("access_token") && {
              "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            })
          }
        });
        if (!response.ok) throw new Error("Failed to fetch order");
        const data = await response.json();
        setOrder(data);
      } catch (error: any) {
        toast({
          title: "Failed to fetch order",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container flex min-h-[60vh] flex-col items-center justify-center py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground">Order not found</h1>
          <Link to="/cakes">
            <Button variant="hero" className="mt-6">Browse Cakes</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const deliverySlotLabels: Record<string, string> = {
    morning: "10:00 AM - 12:00 PM",
    afternoon: "02:00 PM - 4:00 PM",
    evening: "4:00 PM - 6:00 PM",
    night: "6:00 PM - 8:00 PM",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <div className="container py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-2xl text-center"
        >
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-secondary/10"
          >
            <CheckCircle className="h-14 w-14 text-secondary" />
          </motion.div>

          <h1 className="text-3xl font-bold text-foreground">
            Order Placed Successfully! 🎂
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Thank you for your order. We're baking it with love!
          </p>

          {/* Order ID */}
          <div className="mt-8 inline-block rounded-xl bg-card px-6 py-3 shadow-soft">
            <span className="text-sm text-muted-foreground">Order ID:</span>
            <span className="ml-2 font-mono font-bold text-foreground">
              {order.id}
            </span>
          </div>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-10 max-w-2xl"
        >
          <div className="rounded-2xl bg-card p-6 shadow-soft">
            {/* Timeline */}
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Order Status
              </h3>
              <div className="flex items-center justify-between">
                {[
                  { icon: CheckCircle, label: "Confirmed", active: true },
                  { icon: Package, label: "Baking", active: false },
                  { icon: Truck, label: "On the way", active: false },
                  { icon: MapPin, label: "Delivered", active: false },
                ].map((step, index) => (
                  <div key={step.label} className="flex flex-1 items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          step.active
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <step.icon className="h-5 w-5" />
                      </div>
                      <span
                        className={`mt-2 text-xs ${
                          step.active ? "font-semibold text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {index < 3 && (
                      <div
                        className={`mx-2 h-0.5 flex-1 ${
                          step.active ? "bg-secondary" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Details */}
            <div className="grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Delivery Date</p>
                  <p className="font-medium text-foreground">
                    {new Date(order.delivery_date).toLocaleDateString("en-IN", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Time Slot</p>
                  <p className="font-medium text-foreground">
                    {deliverySlotLabels[order.delivery_slot]}
                  </p>
                </div>
              </div>

              {/* <div className="flex items-start gap-3 sm:col-span-2">
                <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Delivery Address</p>
                  <p className="font-medium text-foreground">
                    {order.address.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.address.street}, {order.address.city}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.address.state} - {order.address.pincode}
                  </p>
                </div>
              </div> */}
            </div>

            {/* Order Summary */}
            <div className="mt-6 border-t border-border pt-6">
              <h4 className="mb-4 font-semibold text-foreground">Items Ordered</h4>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={`${item.cake_id}-${item.weight}`}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-muted-foreground">
                      {item.cake_name} ({item.weight}kg) × {item.quantity}
                    </span>
                    <span className="font-medium text-foreground">
                      ₹{(item.price * item.weight * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-between border-t border-border pt-4 text-lg font-bold">
                <span className="text-foreground">Total Paid</span>
                <span className="text-foreground">₹{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link to="/orders" className="flex-1">
              <Button variant="outline" size="xl" className="w-full">
                View All Orders
              </Button>
            </Link>
            <Link to="/cakes" className="flex-1">
              <Button variant="hero" size="xl" className="w-full">
                Continue Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Support */}
          <div className="mt-8 rounded-xl bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Need help with your order?{" "}
              <a
                href="tel:+916380080915"
                className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
              >
                <Phone className="h-4 w-4" />
                Call us
              </a>
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderSuccess;
