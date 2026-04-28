import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  User,
  CreditCard,
  Truck,
  Calendar,
  Clock,
  Check,
  ArrowLeft,
  Wallet,
  Banknote,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCartItems, selectCartTotal, clearCart } from "@/store/cartSlice";
import { selectUser, selectIsAuthenticated } from "@/store/authSlice";
import { createOrder } from "@/store/orderSlice";
import { Order, PaymentMethod } from "@/types/order";
import { Address } from "@/types/user";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import API_URL from "@/config/api";

// Import cake images

//Classy
import vanillaDream from "@/assets/cakes/classy/vanilla.jpg";
import blackforestClassic from "@/assets/cakes/classy/blackforest.jpg";
import whiteforest from "@/assets/cakes/classy/whiteforest.jpg";
import redVelvetDrip from "@/assets/cakes/classy/red-velvet.jpg";
import purpleVelvet from "@/assets/cakes/classy/purple-velvet.jpg";

//Yummy
import vanchoCake from "@/assets/cakes/yummy/vancho-cake.jpg";
import coffeeCake from "@/assets/cakes/yummy/coffee-cake.jpg";
import tenderCoconutCake from "@/assets/cakes/yummy/tender-coconut.jpg";
import rainbowCake from "@/assets/cakes/yummy/rainbow-cake.jpg";

//Fruity
import fruitMango from "@/assets/cakes/fruity/mango.jpg";
import fruitOrange from "@/assets/cakes/fruity/orange.jpg";
import fruitStrawberry from "@/assets/cakes/fruity/strawberry.jpg";
import fruitBlueberry from "@/assets/cakes/fruity/blueberry.jpg";
import fruitBlackcurrant from "@/assets/cakes/fruity/blackcurrant.jpg";
import fruitPineapple from "@/assets/cakes/fruity/pineapple.jpg";
import fruitKiwi from "@/assets/cakes/fruity/kiwi.jpg";
import fruitMixed from "@/assets/cakes/fruity/mixed-fruits.jpg";

//Nutty
import butterscotch from "@/assets/cakes/nutty/butterscotch.jpg";
import nuttyBubble from "@/assets/cakes/nutty/bubble.jpg";
import cassata from "@/assets/cakes/nutty/cassata.jpg";
import neapolitan from "@/assets/cakes/nutty/neapolitan.jpg";
import pistachio from "@/assets/cakes/nutty/pistachio.jpg";
import raffaello from "@/assets/cakes/nutty/raffaello.jpg";
import rosemilk from "@/assets/cakes/nutty/rose-milk-almond.jpg";
import rasamalai from "@/assets/cakes/nutty/rasamalai.jpg";
import honeyAlmond from "@/assets/cakes/nutty/honey-almond.jpg";
import spanishDelight from "@/assets/cakes/nutty/spanish-delight.jpg";
import redVelvetCrunch from "@/assets/cakes/nutty/red-velvet-crunch.jpg";
import purpleVelvetCrunch from "@/assets/cakes/nutty/purple-velvet-crunch.jpg";

// Chocolaty
import chocolateCake from "@/assets/cakes/chocolaty/chocolate.jpg";
import chocolateTruffle from "@/assets/cakes/chocolaty/chocolate-truffle.jpg";
import whiteChocolate from "@/assets/cakes/chocolaty/whitechocolate.jpg";
import milkChocolate from "@/assets/cakes/chocolaty/milkchocolate.jpg";
import chocoAlmond from "@/assets/cakes/chocolaty/chocolate-almond.jpg";
import caramelChoco from "@/assets/cakes/chocolaty/caramel-choco.jpg";
import oreoCholocate from "@/assets/cakes/chocolaty/oreo-chocolate.jpg";
import chocoRedVelvet from "@/assets/cakes/chocolaty/chocolate-red-velvet.jpg";
import chocoPurpleVelvet from "@/assets/cakes/chocolaty/chocolate-purple-velvet.jpg";
import chocoPeanutButter from "@/assets/cakes/chocolaty/chocolate-peanut-butter.jpg";
import chocolateBiscoff from "@/assets/cakes/chocolaty/chocolate-biscoff.jpg";
import datesandNuts from "@/assets/cakes/chocolaty/dates-and-nuts.jpg";
import chocoNutella from "@/assets/cakes/chocolaty/chocolate-nutella.jpg";
import chocoFerrero from "@/assets/cakes/chocolaty/chocolate-ferrero.jpg";
import raffaeloWhole from "@/assets/cakes/chocolaty/raffaelo-whole.jpg";

//Browny
import brownyClassic from "@/assets/cakes/browny/browny-classic.jpg";
import fudgeOreo from "@/assets/cakes/browny/fudge-oreo.jpg";
import nutsLoaded from "@/assets/cakes/browny/nuts-loaded.jpg";
import almondBrowny from "@/assets/cakes/browny/almond-browny.jpg";
import whiteChocoChunks from "@/assets/cakes/browny/white-choco-chunks.jpg";
import tripleChocolate from "@/assets/cakes/browny/triple-chocolate.jpg";
import kitkatBrowny from "@/assets/cakes/browny/kitkat-browny.jpg";
import biscoffBrowny from "@/assets/cakes/browny/biscoff-browny.jpg";


const imageMap: Record<string, string> = {
  //Classy
  "/cakes/classy/vanilla.jpg": vanillaDream,
  "/cakes/classy/blackforest.jpg": blackforestClassic,
  "/cakes/classy/whiteforest.jpg": whiteforest,
  "/cakes/classy/red-velvet.jpg": redVelvetDrip,
  "/cakes/classy/purple-velvet.jpg": purpleVelvet,

  //Yummy
  "/cakes/yummy/vancho-cake.jpg": vanchoCake,
  "/cakes/yummy/coffee-cake.jpg": coffeeCake,
  "/cakes/yummy/tender-coconut.jpg": tenderCoconutCake,
  "/cakes/yummy/rainbow-cake.jpg": rainbowCake,

  //Fruity
  "/cakes/fruity/mango.jpg": fruitMango,
  "/cakes/fruity/orange.jpg": fruitOrange,
  "/cakes/fruity/strawberry.jpg": fruitStrawberry,
  "/cakes/fruity/blueberry.jpg": fruitBlueberry,
  "/cakes/fruity/blackcurrant.jpg": fruitBlackcurrant,
  "/cakes/fruity/pineapple.jpg": fruitPineapple,
  "/cakes/fruity/kiwi.jpg": fruitKiwi,
  "/cakes/fruity/mixed-fruits.jpg": fruitMixed,
  
  //Nutty
  "/cakes/nutty/butterscotch.jpg": butterscotch,
  "/cakes/nutty/bubble.jpg": nuttyBubble,
  "/cakes/nutty/cassata.jpg": cassata,
  "/cakes/nutty/neapolitan.jpg": neapolitan,
  "/cakes/nutty/pistachio.jpg": pistachio,
  "/cakes/nutty/raffaello.jpg": raffaello,
  "/cakes/nutty/rose-milk-almond.jpg": rosemilk,
  "/cakes/nutty/rasamalai.jpg": rasamalai,
  "/cakes/nutty/honey-almond.jpg": honeyAlmond,
  "/cakes/nutty/spanish-delight.jpg": spanishDelight,
  "/cakes/nutty/red-velvet-crunch.jpg": redVelvetCrunch,
  "/cakes/nutty/purple-velvet-crunch.jpg": purpleVelvetCrunch,

  // //Chocolaty
  "/cakes/chocolaty/chocolate.jpg": chocolateCake,
  "/cakes/chocolaty/chocolate-truffle.jpg": chocolateTruffle,
  "/cakes/chocolaty/whitechocolate.jpg": whiteChocolate,
  "/cakes/chocolaty/milkchocolate.jpg": milkChocolate,
  "/cakes/chocolaty/chocolate-almond.jpg": chocoAlmond,
  "/cakes/chocolaty/caramel-choco.jpg": caramelChoco,
  "/cakes/chocolaty/oreo-chocolate.jpg": oreoCholocate,
  "/cakes/chocolaty/chocolate-red-velvet.jpg": chocoRedVelvet,
  "/cakes/chocolaty/chocolate-purple-velvet.jpg": chocoPurpleVelvet,
  "/cakes/chocolaty/chocolate-peanut-butter.jpg": chocoPeanutButter,
  "/cakes/chocolaty/chocolate-biscoff.jpg": chocolateBiscoff,
  "/cakes/chocolaty/dates-and-nuts.jpg": datesandNuts,
  "/cakes/chocolaty/chocolate-nutella.jpg": chocoNutella,
  "/cakes/chocolaty/chocolate-ferrero.jpg": chocoFerrero,
  "/cakes/chocolaty/raffaelo-whole.jpg": raffaeloWhole,

  //Browny
  "/cakes/browny/browny-classic.jpg": brownyClassic,
  "/cakes/browny/fudge-oreo.jpg": fudgeOreo,
  "/cakes/browny/nuts-loaded.jpg": nutsLoaded,
  "/cakes/browny/almond-browny.jpg": almondBrowny,
  "/cakes/browny/white-choco-chunks.jpg": whiteChocoChunks,
  "/cakes/browny/triple-chocolate.jpg": tripleChocolate,
  "/cakes/browny/kitkat-browny.jpg": kitkatBrowny,
  "/cakes/browny/biscoff-browny.jpg": biscoffBrowny,
};

const deliverySlots = [
  { id: "morning", label: "Morning", time: "10:00 AM - 12:00 PM" },
  { id: "afternoon", label: "Afternoon", time: "02:00 PM - 04:00 PM" },
  { id: "evening", label: "Evening", time: "04:00 PM - 06:00 PM" },
  { id: "night", label: "Night", time: "06:00 PM - 08:00 PM" },
];

const Checkout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartTotal);
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const MIN_AGE = 13;  // Cake shop policy
  
    // ✅ Calculate max date (13 years ago)
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - MIN_AGE);
    const maxDateStr = format(maxDate, "yyyy-MM-dd");

  // Address form
  const [address, setAddress] = useState<Omit<Address, "id" | "isDefault">>({
    name: user?.name || "",
    phone: user?.phone || "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    dob: "",
  });

  // Delivery options
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliverySlot, setDeliverySlot] = useState("");

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");

  const deliveryFee = subtotal >= 999 ? 0 : 49;
  const total = subtotal + deliveryFee;

  // Generate next 8 days for delivery
  const getDeliveryDates = () => {
    const dates = [];
    for (let i = 0; i < 8; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push({
        value: date.toISOString().split("T")[0],
        label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : date.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }),
      });
    }
    return dates;
  };

  const handleAddressSubmit = () => {
    if (!address.name || !address.phone || !address.street || !address.city || !address.state || !address.pincode) {
      toast({
        title: "Missing information",
        description: "Please fill in all address fields",
        variant: "destructive",
      });
      return;
    }
    setStep(2);
  };

  const handleDeliverySubmit = () => {
    if (!deliveryDate || !deliverySlot) {
      toast({
        title: "Select delivery slot",
        description: "Please select a delivery date and time",
        variant: "destructive",
      });
      return;
    }
    setStep(3);
  };

  const handlePlaceOrder = async () => {
  setIsProcessing(true);

  try {
    const access_token = localStorage.getItem("access_token");

    const orderPayload = {
      items: items.map((item) => ({
        cake_id: item.cake.id,
        cake_name: item.cake.name,
        weight: item.weight,
        quantity: item.quantity,
        price: item.cake.price
      })),
      address: address,
      payment_method: paymentMethod,
      subtotal: subtotal,
      delivery_fee: deliveryFee,
      total: total,
      delivery_date: deliveryDate,
      delivery_slot: deliverySlot
    };

    const res = await fetch(
      `${API_URL}/orders/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`
        },
        body: JSON.stringify(orderPayload)
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail || "Order failed");
    }

    const order: Order = {
          id: data.id,
          user_id: data.user_id,
          user_phone: data.user_id,
          items: data.items,

          subtotal: data.subtotal,
          delivery_fee: data.delivery_fee,
          total: data.total,

          payment_method: data.payment_method,
          status: data.status,

          delivery_date: data.delivery_date,
          delivery_slot: data.delivery_slot,

          created_at: data.created_at,

          updatedAt: "",
          trackingUpdates: [],
          payment_status: "pending"
        };

    dispatch(createOrder(order));
    dispatch(clearCart());

    toast({
      title: "Order placed successfully! 🎂",
      description: `Order #${order.id} confirmed`
    });

    navigate(`/order-success/${order.id}`);

  } catch (error: any) {
    toast({
      title: "Order failed",
      description: error.message,
      variant: "destructive"
    });
  } finally {
    setIsProcessing(false);
  }
};


  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <CartDrawer />
        <div className="container flex min-h-[60vh] flex-col items-center justify-center py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground">Your cart is empty</h1>
          <p className="mt-2 text-muted-foreground">Add some cakes to checkout</p>
          <Link to="/cakes">
            <Button variant="hero" className="mt-6">Browse Cakes</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <div className="container py-8">
        <Link
          to="/cakes"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>

        <h1 className="mt-6 text-3xl font-bold text-foreground">Checkout</h1>

        {/* Progress Steps */}
        <div className="mt-8 flex items-center justify-center gap-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                  step >= s
                    ? "gradient-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step > s ? <Check className="h-5 w-5" /> : s}
              </div>
              <span
                className={`hidden text-sm font-medium sm:block ${
                  step >= s ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {s === 1 ? "Address" : s === 2 ? "Delivery" : "Payment"}
              </span>
              {s < 3 && (
                <div
                  className={`hidden h-0.5 w-12 sm:block ${
                    step > s ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Address */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-2xl bg-card p-6 shadow-soft"
              >
                <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  Delivery Address
                </h2>

                {!isAuthenticated && (
                  <div className="mb-6 rounded-xl bg-muted p-4">
                    <p className="text-sm text-muted-foreground">
                      <Link to="/login" className="font-semibold text-primary hover:underline">
                        Sign in
                      </Link>{" "}
                      to save your address for faster checkout
                    </p>
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="name"
                        value={address.name}
                        onChange={(e) => setAddress({ ...address, name: e.target.value })}
                        placeholder="John Doe"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={address.phone}
                        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      placeholder="123 Main Street, Apartment 4B"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      placeholder="Kanyakumari"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      placeholder="Tamilnadu"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      type="number"
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                      placeholder="629176"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={address.dob}
                      max={maxDateStr}
                      onChange={(e) => setAddress({ ...address, dob: e.target.value })}
                      placeholder="1990-01-01"
                    />
                  </div>
                </div>

                <Button
                  variant="hero"
                  size="xl"
                  className="mt-8 w-full"
                  onClick={handleAddressSubmit}
                >
                  Continue to Delivery
                </Button>
              </motion.div>
            )}

            {/* Step 2: Delivery */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-2xl bg-card p-6 shadow-soft"
              >
                <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-foreground">
                  <Truck className="h-5 w-5 text-primary" />
                  Delivery Options
                </h2>

                <div className="space-y-6">
                  <div>
                    <Label className="mb-3 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Select Delivery Date
                    </Label>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {getDeliveryDates().map((date) => (
                        <button
                          key={date.value}
                          onClick={() => setDeliveryDate(date.value)}
                          className={`rounded-xl p-3 text-center transition-all ${
                            deliveryDate === date.value
                              ? "gradient-primary text-primary-foreground shadow-button"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          <span className="text-sm font-medium">{date.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="mb-3 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Select Time Slot
                    </Label>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {deliverySlots.map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => setDeliverySlot(slot.id)}
                          className={`rounded-xl p-4 text-left transition-all ${
                            deliverySlot === slot.id
                              ? "gradient-primary text-primary-foreground shadow-button"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          <span className="block font-semibold">{slot.label}</span>
                          <span className="text-sm opacity-80">{slot.time}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <Button
                    variant="outline"
                    size="xl"
                    className="flex-1"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    variant="hero"
                    size="xl"
                    className="flex-1"
                    onClick={handleDeliverySubmit}
                  >
                    Continue to Payment
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-2xl bg-card p-6 shadow-soft"
              >
                <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-foreground">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Payment Method
                </h2>

                <div className="space-y-4">
                  {/* <button
                    onClick={() => setPaymentMethod("upi")}
                    className={`flex w-full items-center gap-4 rounded-xl p-4 transition-all ${
                      paymentMethod === "upi"
                        ? "border-2 border-primary bg-primary/5"
                        : "border-2 border-transparent bg-muted hover:bg-muted/80"
                    }`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-card">
                      <Wallet className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <span className="block font-semibold text-foreground">UPI Payment</span>
                      <span className="text-sm text-muted-foreground">
                        PhonePe, Google Pay, Paytm
                      </span>
                    </div>
                    <div
                      className={`h-5 w-5 rounded-full border-2 ${
                        paymentMethod === "upi"
                          ? "border-primary bg-primary"
                          : "border-muted-foreground"
                      }`}
                    >
                      {paymentMethod === "upi" && (
                        <Check className="h-full w-full p-0.5 text-primary-foreground" />
                      )}
                    </div>
                  </button> */}

                  <button
                    onClick={() => setPaymentMethod("cod")}
                    className={`flex w-full items-center gap-4 rounded-xl p-4 transition-all ${
                      paymentMethod === "cod"
                        ? "border-2 border-primary bg-primary/5"
                        : "border-2 border-transparent bg-muted hover:bg-muted/80"
                    }`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-card">
                      <Banknote className="h-6 w-6 text-secondary" />
                    </div>
                    <div className="flex-1 text-left">
                      <span className="block font-semibold text-foreground">Cash on Delivery</span>
                      <span className="text-sm text-muted-foreground">
                        Pay when you receive
                      </span>
                    </div>
                    <div
                      className={`h-5 w-5 rounded-full border-2 ${
                        paymentMethod === "cod"
                          ? "border-primary bg-primary"
                          : "border-muted-foreground"
                      }`}
                    >
                      {paymentMethod === "cod" && (
                        <Check className="h-full w-full p-0.5 text-primary-foreground" />
                      )}
                    </div>
                  </button>
                </div>

                {/* {paymentMethod === "upi" && (
                  <div className="mt-6 rounded-xl bg-muted p-4">
                    <p className="text-center text-sm text-muted-foreground">
                      You will be redirected to your UPI app to complete the payment
                    </p>
                  </div>
                )} */}

                <div className="mt-8 flex gap-4">
                  <Button
                    variant="outline"
                    size="xl"
                    className="flex-1"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </Button>
                  <Button
                    variant="hero"
                    size="xl"
                    className="flex-1"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Place Order • ₹${total.toLocaleString()}`
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-card p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-foreground">Order Summary</h3>

              <div className="mt-4 max-h-60 space-y-3 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={`${item.cake.id}-${item.weight}`}
                    className="flex gap-3"
                  >
                    <img
                      src={imageMap[item.cake.image] || vanillaDream}
                      alt={item.cake.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-foreground">
                        {item.cake.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {item.weight}kg × {item.quantity}
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        ₹{(item.cake.price * item.weight * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 border-t border-border pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className={deliveryFee === 0 ? "text-secondary" : "text-foreground"}>
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between border-t border-border pt-3 text-lg font-bold">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">₹{total.toLocaleString()}</span>
                </div>
              </div>

              {deliveryFee > 0 && (
                <div className="mt-4 rounded-xl bg-secondary/10 p-3 text-center">
                  <p className="text-sm text-secondary">
                    Add ₹{(999 - subtotal).toLocaleString()} more for free delivery
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
