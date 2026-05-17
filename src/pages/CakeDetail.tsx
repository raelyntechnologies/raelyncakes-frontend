import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  ArrowLeft,
  Upload,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { cakesData } from "@/data/cakes";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectIsFavorite, toggleFavorite } from "@/store/favoritesSlice";
import { selectUser } from "@/store/authSlice";
import { getCakeImage } from "@/utils/cakeImages";
import { generateWhatsAppMessage, openWhatsAppChat } from "@/utils/whatsappUtils";
import { toast } from "@/hooks/use-toast";
import API_URL from "@/config/api";

// Import all cake images for checkout
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
import fruitPineapple from "@/assets/cakes/fruity/pineapple.jpg";
import fruitKiwi from "@/assets/cakes/fruity/kiwi.jpg";
import fruitBlueberry from "@/assets/cakes/fruity/blueberry.jpg";
import fruitMixedFruits from "@/assets/cakes/fruity/mixed-fruits.jpg";

//Nutty
import nuttyHoneyAlmond from "@/assets/cakes/nutty/honey-almond.jpg";
import nuttyPistachio from "@/assets/cakes/nutty/pistachio.jpg";
import nuttyBubble from "@/assets/cakes/nutty/bubble.jpg";
import nuttyButterscotch from "@/assets/cakes/nutty/butterscotch.jpg";

//Chocolaty
import chocolateBasic from "@/assets/cakes/chocolaty/chocolate.jpg";
import whiteChocolate from "@/assets/cakes/chocolaty/whitechocolate.jpg";
import chocolateTruffle from "@/assets/cakes/chocolaty/chocolate-truffle.jpg";
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

const imageMap: { [key: string]: string } = {
  "/cakes/classy/vanilla.jpg": vanillaDream,
  "/cakes/classy/blackforest.jpg": blackforestClassic,
  "/cakes/classy/whiteforest.jpg": whiteforest,
  "/cakes/classy/red-velvet.jpg": redVelvetDrip,
  "/cakes/classy/purple-velvet.jpg": purpleVelvet,
  "/cakes/yummy/vancho-cake.jpg": vanchoCake,
  "/cakes/yummy/coffee-cake.jpg": coffeeCake,
  "/cakes/yummy/tender-coconut.jpg": tenderCoconutCake,
  "/cakes/yummy/rainbow-cake.jpg": rainbowCake,
  "/cakes/fruity/mango.jpg": fruitMango,
  "/cakes/fruity/orange.jpg": fruitOrange,
  "/cakes/fruity/strawberry.jpg": fruitStrawberry,
  "/cakes/fruity/pineapple.jpg": fruitPineapple,
  "/cakes/fruity/kiwi.jpg": fruitKiwi,
  "/cakes/fruity/blueberry.jpg": fruitBlueberry,
  "/cakes/fruity/mixed-fruits.jpg": fruitMixedFruits,
  "/cakes/nutty/honey-almond.jpg": nuttyHoneyAlmond,
  "/cakes/nutty/pistachio.jpg": nuttyPistachio,
  "/cakes/nutty/bubble.jpg": nuttyBubble,
  "/cakes/nutty/butterscotch.jpg": nuttyButterscotch,
  "/cakes/chocolaty/chocolate.jpg": chocolateBasic,
  "/cakes/chocolaty/whitechocolate.jpg": whiteChocolate,
  "/cakes/chocolaty/chocolate-truffle.jpg": chocolateTruffle,
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
  "/cakes/browny/browny-classic.jpg": brownyClassic,
  "/cakes/browny/fudge-oreo.jpg": fudgeOreo,
  "/cakes/browny/nuts-loaded.jpg": nutsLoaded,
  "/cakes/browny/almond-browny.jpg": almondBrowny,
  "/cakes/browny/white-choco-chunks.jpg": whiteChocoChunks,
  "/cakes/browny/triple-chocolate.jpg": tripleChocolate,
  "/cakes/browny/kitkat-browny.jpg": kitkatBrowny,
  "/cakes/browny/biscoff-browny.jpg": biscoffBrowny,
};

const CakeDetail = () => {
  const isLoggedIn = !!localStorage.getItem("access_token");
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cake = cakesData.find((c) => c.id === id);
  const user = useAppSelector(selectUser);

  // Scroll to top when cake detail page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Cake details
  const [selectedWeight, setSelectedWeight] = useState(cake?.weights[0] || 1);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const isLiked = useAppSelector(selectIsFavorite(id || ""));

  // Update cake details when cake changes
  useEffect(() => {
    if (cake) {
      setSelectedWeight(cake.weights[0] || 1);
      setQuantity(1);
      setMessage("");
      setReferenceImage(null);
      setNotes("");
    }
  }, [cake?.id]);

  // Delivery details
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  // Delivery options
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliverySlot, setDeliverySlot] = useState("");

  // Payment
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isProcessing, setIsProcessing] = useState(false);

  // Location search
  const [searchResults, setSearchResults] = useState<Array<{ display_name: string; lat: string; lon: string }>>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  // Reset delivery details when cake changes
  useEffect(() => {
    if (cake) {
      setLocation("");
      setLatitude(0);
      setLongitude(0);
      setDeliveryDate("");
      setDeliverySlot("");
    }
  }, [cake?.id]);

  // Handle click outside search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const locationElement = document.getElementById("location");
      if (locationElement && !locationElement.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!cake) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold">Cake not found</h1>
          <Link to="/cakes">
            <Button className="mt-2">Back to Cakes</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const subtotal = cake.price * selectedWeight * quantity;
  const deliveryFee = subtotal < 1000 ? 50 : 0;
  const totalPrice = subtotal + deliveryFee;
  const imageUrl = getCakeImage(cake.image);

  const handleWhatsAppOrder = () => {
    // Combined validations
    const validations = [
      {
        condition: !message.trim(),
        title: "Cake Message Required",
        description: "Please enter a message for the cake.",
      },
      {
        condition: !name.trim(),
        title: "Name Required",
        description: "Please enter your full name.",
      },
      {
        condition: !phone.trim(),
        title: "Phone Required",
        description: "Please enter your phone number.",
      },
      {
        condition: !/^[6-9]\d{9}$/.test(phone.trim()),
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit mobile number.",
      },
      {
        condition: !location.trim(),
        title: "Location Required",
        description: "Please enter delivery location.",
      },
      {
        condition: !deliveryDate,
        title: "Delivery Date Required",
        description: "Please select delivery date.",
      },
      {
        condition: !deliverySlot,
        title: "Delivery Time Required",
        description: "Please select delivery time.",
      },
    ];

    // Find first failed validation
    const failedValidation = validations.find((v) => v.condition);

    if (failedValidation) {
      toast({
        title: failedValidation.title,
        description: failedValidation.description,
        variant: "destructive",
      });
      return;
    }

    let whatsappMessage = generateWhatsAppMessage(
      cake.name,
      selectedWeight,
      cake.category,
    );

    // Quantity
    if (quantity > 1) {
      whatsappMessage += `\n🍰 Quantity: ${quantity}`;
    }

    // Cake Message
    whatsappMessage += `\n\n📝 Cake Message:\n"${message.trim()}"`;

    // Special Instructions
    if (notes.trim()) {
      whatsappMessage += `\n\n💬 Special Instructions:\n${notes.trim()}`;
    }

    // Delivery Details
    whatsappMessage += `
    
  📍 Delivery Details
  👤 Name: ${name.trim()}
  📞 Phone: ${phone.trim()}
  📌 Location: ${location.trim()}
  `;

    // Date & Time
    whatsappMessage += `
  📅 Delivery Schedule
  🗓️ Date: ${deliveryDate}
  ⏰ Time: ${deliverySlot}
  `;

    // Pricing Breakdown
    whatsappMessage += `
  💰 Pricing Details
  🍰 Cake Price: ₹${subtotal.toLocaleString()}`;
    
    if (deliveryFee > 0) {
      whatsappMessage += `\n  🚚 Delivery Fee: ₹${deliveryFee.toLocaleString()}`;
    }
    
    whatsappMessage += `\n  💳 Total Amount: ₹${totalPrice.toLocaleString()}
  `;

    openWhatsAppChat(whatsappMessage);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReferenceImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Location search functions
  const searchLocations = async (query: string) => {
    if (query.trim().length < 3) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setSearchResults(data.slice(0, 8));
      setShowSearchResults(true);
    } catch (error) {
      console.error("Location search error:", error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleLocationSearch = (value: string) => {
    setLocation(value);
    if (value.trim().length >= 3) {
      searchLocations(value);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  // const handleSelectLocation = (result: { display_name: string; lat: string; lon: string }) => {
  //   setLocation(result.display_name);
  //   setLatitude(parseFloat(result.lat));
  //   setLongitude(parseFloat(result.lon));
  //   setShowSearchResults(false);
  // };

  const handleSelectLocation = (result) => {
  setLocation(result.display_name);
  setLatitude(Number(result.lat));
  setLongitude(Number(result.lon));

  setShowSearchResults(false);
  setSearchResults([]);
};

  // Place order function
const handlePlaceOrder = async () => {

  // Prevent multiple clicks
  if (isProcessing) return;

  // =====================================================
  // Validations
  // =====================================================

  const validations = [
    {
      condition: !message.trim(),
      title: "Cake Message Required",
      description: "Please enter a message for the cake.",
    },
    {
      condition: !name.trim(),
      title: "Name Required",
      description: "Please enter your full name.",
    },
    {
      condition: !phone.trim(),
      title: "Phone Required",
      description: "Please enter your phone number.",
    },
    {
      condition: !/^[6-9]\d{9}$/.test(phone.trim()),
      title: "Invalid Phone Number",
      description: "Please enter a valid 10-digit mobile number.",
    },
    {
      condition: !location.trim(),
      title: "Location Required",
      description: "Please enter delivery location.",
    },
    {
      condition: !deliveryDate,
      title: "Delivery Date Required",
      description: "Please select delivery date.",
    },
    {
      condition: !deliverySlot,
      title: "Delivery Time Required",
      description: "Please select delivery time.",
    },
  ];

  const failedValidation = validations.find(
    (v) => v.condition
  );

  if (failedValidation) {

    toast({
      title: failedValidation.title,
      description: failedValidation.description,
      variant: "destructive",
    });

    return;
  }

  setIsProcessing(true);

  try {

    const access_token = localStorage.getItem("access_token");

    // =====================================================
    // Payload
    // =====================================================

    const orderPayload = {

      // Cake
      cake_id: cake.id,
      cake_name: cake.name,
      cake_image: cake.image,

      weight: parseFloat(String(selectedWeight)),
      quantity: parseInt(String(quantity), 10),

      cake_message: message.trim(),
      cake_notes: notes.trim(),

      reference_image: referenceImage || null,

      // User
      user_name: name.trim(),
      user_phone: phone.trim(),

      // Delivery
      location: location.trim(),

      latitude: String(latitude),
      longitude: String(longitude),

      delivery_date: deliveryDate,
      delivery_time: deliverySlot,

      // Pricing
      subtotal: parseFloat(String(subtotal)),
      delivery_fee: parseFloat(String(deliveryFee)),
      total: parseFloat(String(totalPrice)),

      // Payment
      payment_method: paymentMethod,
    };

    // =====================================================
    // API Call
    // =====================================================

    const response = await fetch(
      `${API_URL}/orders/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(access_token && {
            Authorization: `Bearer ${access_token}`,
          }),
        },
        body: JSON.stringify(orderPayload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("API Error Response:", {
        status: response.status,
        data: data,
      });

      let errorMessage = "Failed to place order";

      // Handle array of validation errors
      if (Array.isArray(data)) {
        const errorDetails = data
          .map((err: any) => {
            if (typeof err === 'string') return err;
            if (err.msg) return `${err.loc?.join('.')}: ${err.msg}`;
            if (err.message) return err.message;
            if (err.detail) return err.detail;
            return JSON.stringify(err);
          })
          .filter(Boolean);
        errorMessage = errorDetails.length > 0 ? errorDetails.join("; ") : "Validation failed";
      } else if (typeof data === 'object' && data !== null) {
        // Handle object errors
        errorMessage =
          data?.detail ||
          data?.message ||
          data?.error ||
          (data?.errors ? JSON.stringify(data.errors) : JSON.stringify(data));
      }

      throw new Error(errorMessage);
    }

    // =====================================================
    // Success
    // =====================================================

    toast({
      title: "Order Placed Successfully!",
      description: `Order ID: ${data.id}`,
    });

    // =====================================================
    // Reset Form
    // =====================================================

    setMessage("");
    setNotes("");

    setName("");
    setPhone("");
    setLocation("");

    setDeliveryDate("");
    setDeliverySlot("");

    setReferenceImage(null);

    // =====================================================
    // Redirect
    // =====================================================

    setTimeout(() => {
      navigate(`/order-success/${data.id}`, { 
        state: { 
          orderId: data.id,
          orderDetails: data,
          cakeName: cake.name,
          totalPrice: totalPrice
        } 
      });
    }, 1500);

  } catch (error: any) {
    console.error("Order placement error:", error);
    console.error("Error details:", {
      message: error?.message,
      stack: error?.stack,
    });
    console.error("Full error object:", error);

    toast({
      title: "Order Failed",
      description:
        error?.message ||
        "Could not place your order. Please try again.",
      variant: "destructive",
    });

  } finally {

    setIsProcessing(false);
  }
};
  return (
    <div className="min-h-screen bg-background">
  <Header />

  <div className="container py-6">
    <Link
      to="/cakes"
      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to Cakes
    </Link>

    <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:gap-10 min-h-screen">

      {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="h-full overflow-hidden rounded-3xl bg-card shadow-lifted">
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

      {/* RIGHT SIDE */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col"
      >
        <div className="flex flex-col gap-3">

          {/* CAKE INFO */}
          <div>
            <div className="flex items-center justify-between gap-3 flex-wrap">

              <h1 className="text-2xl font-bold text-foreground leading-tight">
                {cake.name}{" "}
                <span className="text-medium font-medium text-secondary">
                  ({cake.category})
                </span>
              </h1>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(cake.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>

                <span className="text-sm font-medium text-foreground">
                  {cake.rating}
                </span>

                <span className="text-xs text-muted-foreground">
                  ({cake.reviewCount})
                </span>
              </div>
            </div>

            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {cake.description}
            </p>
          </div>

          {/* WEIGHT */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-semibold text-foreground">Select Weight</h3>

            <div className="flex flex-wrap gap-3">
              {cake.weights.map((weight) => (
                <button
                  key={weight}
                  onClick={() => setSelectedWeight(weight)}
                  className={`rounded-xl px-6 py-3 text-sm font-medium transition-all whitespace-nowrap ${
                    selectedWeight === weight
                      ? "gradient-primary text-primary-foreground shadow-button"
                      : "bg-card text-muted-foreground shadow-soft hover:bg-muted"
                  }`}
                >
                  {weight}kg
                </button>
              ))}
            </div>

            <div className="rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 p-4 border border-primary/20 min-h-[40px] min-w-[120px]">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Cake Price:</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                {deliveryFee > 0 && (
                  <div className="flex justify-between items-center text-sm text-muted-foreground border-t border-primary/20 pt-2">
                    <span>Delivery Fee:</span>
                    <span>₹{deliveryFee.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-lg font-bold text-foreground border-t border-primary/20 pt-2">
                  <span>Total:</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cake Message */}
          <div className="flex-1 min-w-[200px]">
            <h3 className="mb-2 font-semibold text-foreground">
              Cake Message <span className="text-red-500">*</span>
            </h3>
            <Input
              value={message}
              maxLength={50}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Cake message..."
              className={message.trim().length === 0 ? "border-red-500" : ""}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              {message.length}/50
            </p>
          </div>

          {/* Special Instructions */}
          <div className="flex-1 min-w-[200px]">
            <h3 className="mb-2 font-semibold text-foreground">
              Special Instructions
            </h3>
            <Input
              value={notes}
              maxLength={200}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any allergies or specific design requests..."
            />
            <p className="mt-1 text-xs text-muted-foreground">
              {notes.length}/200
            </p>
          </div>

          {/* <div className="mt-2">
            <h3 className="mb-3 font-semibold text-foreground">
              Reference Image
            </h3>
            <div className="flex items-center gap-4">
              <label className="flex cursor-pointer items-center gap-2 rounded-xl border-2 border-dashed border-border px-6 py-4 transition-colors hover:border-primary">
                <Upload className="h-5 w-10 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Upload
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
              {referenceImage && (
                <img
                  src={referenceImage}
                  alt="Reference"
                  className="h-20 w-20 rounded-lg object-cover"
                />
              )}
              <p className="mt-2 text-sm text-muted-foreground">
                  Custom cakes require at least 24 hours notice. Prices may vary based on design complexity.
                </p>
            </div>
          </div> */}

          {/* DELIVERY DETAILS */}
          <div className="rounded-2xl bg-card/50 p-4 border border-border/50">
            <h3 className="mb-3 font-semibold text-foreground">
              Delivery Details
            </h3>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">Full Name <span className="text-red-500">*</span></p>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className={`h-9 text-sm ${name.trim().length === 0 ? "border-red-500" : ""}`}
                />
              </div>

              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">Phone <span className="text-red-500">*</span></p>
                <Input
                  placeholder="Phone"
                  type="tel"
                  inputMode="numeric"
                  pattern="[6-9][0-9]{9}"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className={`h-9 text-sm ${phone.trim().length === 0 ? "border-red-500" : ""}`}
                />
              </div>

              {/* <div className="relative sm:col-span-2">
                <p className="mb-2 text-xs font-medium text-muted-foreground">Location <span className="text-red-500">*</span></p>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => handleLocationSearch(e.target.value)}
                  placeholder="Location"
                  className={`h-9 text-sm ${location.trim().length === 0 ? "border-red-500" : ""}`}
                />
                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                    {searchResults.map((result, index) => (
                      <button
                        key={index}
                        onClick={() => handleSelectLocation(result)}
                        className="w-full text-left px-4 py-2 hover:bg-muted transition-colors text-sm border-b border-border/50 last:border-0"
                      >
                        {result.display_name}
                      </button>
                    ))}
                  </div>
                )}
              </div> */}

              <div className="relative sm:col-span-2">
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Location <span className="text-red-500">*</span>
              </p>

              <Input
                id="location"
                value={location}
                onChange={(e) => handleLocationSearch(e.target.value)}
                placeholder="Location"
                className={`h-9 text-sm ${
                  location.trim().length === 0 ? "border-red-500" : ""
                }`}
              />

              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">

                  {searchResults.map((result, index) => (
                    <button
                      key={index}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSelectLocation(result);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-muted transition-colors text-sm border-b border-border/50 last:border-0"
                    >
                      {result.display_name}
                    </button>
                  ))}

                </div>
              )}
            </div>
            </div>
          </div>

          {/* DATE + TIME */}
          <div className="rounded-2xl bg-card/50 p-4 border border-border/50">
          <h3 className="mb-3 font-semibold text-foreground">
              Date & Time
            </h3>
            <div className="flex gap-3 flex-wrap">
              <div className="flex-1">
                <p className="mb-2 text-xs font-medium text-muted-foreground">Date <span className="text-red-500">*</span></p>
                <Input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className={`h-9 text-sm ${deliveryDate.trim().length === 0 ? "border-red-500" : ""}`}
                />
              </div>

              <div className="flex-1">
                <p className="mb-2 text-xs font-medium text-muted-foreground">Time <span className="text-red-500">*</span></p>
                <Input
                  type="time"
                  value={deliverySlot}
                  onChange={(e) => setDeliverySlot(e.target.value)}
                  className={`h-9 text-sm ${deliverySlot.trim().length === 0 ? "border-red-500" : ""}`}
                />
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="mt-4 border-t border-border pt-4">
          {isLoggedIn ? (
            <Button
              variant="hero"
              size="lg"
              className="w-full"
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          ) : (
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={handleWhatsAppOrder}
            >
              WhatsApp Order
            </Button>
          )}
        </div>

        </div>
      </motion.div>
    </div>
  </div>

  <Footer />
</div>
  );
};

export default CakeDetail;
