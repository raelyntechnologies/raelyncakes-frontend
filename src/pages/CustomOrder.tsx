import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Cake, 
  Palette, 
  MessageSquare, 
  Calendar, 
  Upload, 
  Sparkles,
  ChevronRight,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { toast } from "@/hooks/use-toast";

const flavors = [
  { id: "chocolate", name: "Chocolate", color: "bg-amber-800" },
  { id: "vanilla", name: "Vanilla", color: "bg-amber-100" },
  { id: "red-velvet", name: "Red Velvet", color: "bg-red-500" },
  { id: "butterscotch", name: "Butterscotch", color: "bg-amber-400" },
  { id: "black-forest", name: "Black Forest", color: "bg-stone-800" },
  { id: "fruit", name: "Fresh Fruit", color: "bg-orange-400" },
];

const sizes = [
  { id: "0.5kg", name: "0.5 kg", serves: "4-6", price: 499 },
  { id: "1kg", name: "1 kg", serves: "8-10", price: 899 },
  { id: "1.5kg", name: "1.5 kg", serves: "12-15", price: 1299 },
  { id: "2kg", name: "2 kg", serves: "18-20", price: 1699 },
  { id: "3kg", name: "3 kg", serves: "25-30", price: 2499 },
];

const toppings = [
  { id: "fresh-fruits", name: "Fresh Fruits", price: 150 },
  { id: "chocolate-shavings", name: "Chocolate Shavings", price: 100 },
  { id: "sprinkles", name: "Rainbow Sprinkles", price: 50 },
  { id: "edible-flowers", name: "Edible Flowers", price: 200 },
  { id: "macarons", name: "Macarons", price: 250 },
  { id: "gold-leaf", name: "Gold Leaf", price: 300 },
];

const occasions = [
  "Birthday",
  "Wedding",
  "Anniversary",
  "Baby Shower",
  "Corporate Event",
  "Graduation",
  "Other",
];

const dietaryOptions = [
  { id: "eggless", name: "Eggless", extra: 0 },
  { id: "sugar-free", name: "Sugar-Free", extra: 100 },
  { id: "vegan", name: "Vegan", extra: 150 },
];

const CustomOrder = () => {
  const [step, setStep] = useState(1);
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [selectedOccasion, setSelectedOccasion] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [dietary, setDietary] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [referenceImage, setReferenceImage] = useState<string | null>(null);

  const calculateTotal = () => {
    let total = 0;
    const size = sizes.find((s) => s.id === selectedSize);
    if (size) total += size.price;
    
    selectedToppings.forEach((t) => {
      const topping = toppings.find((top) => top.id === t);
      if (topping) total += topping.price;
    });
    
    dietary.forEach((d) => {
      const option = dietaryOptions.find((opt) => opt.id === d);
      if (option) total += option.extra;
    });
    
    return total;
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

  const handleSubmit = () => {
    toast({
      title: "Custom Order Submitted! 🎂",
      description: "We'll contact you within 24 hours to confirm your order.",
    });
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedFlavor && selectedSize;
      case 2:
        return true;
      case 3:
        return selectedOccasion && deliveryDate;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-16">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Design Your Dream Cake
            </span>
            <h1 className="mt-6 text-4xl font-bold text-foreground md:text-5xl">
              Custom Cake Order
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Create a one-of-a-kind cake tailored to your taste and occasion. 
              Our expert bakers will bring your vision to life!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Steps */}
      <div className="border-b border-border bg-card">
        <div className="container py-4">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            {[
              { num: 1, label: "Base & Size", icon: Cake },
              { num: 2, label: "Customize", icon: Palette },
              { num: 3, label: "Details", icon: MessageSquare },
              { num: 4, label: "Review", icon: Check },
            ].map((s, index) => (
              <div key={s.num} className="flex items-center gap-2 md:gap-4">
                <button
                  onClick={() => step > s.num && setStep(s.num)}
                  className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors md:px-4 ${
                    step === s.num
                      ? "bg-primary text-primary-foreground"
                      : step > s.num
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <s.icon className="h-4 w-4" />
                  <span className="hidden md:inline">{s.label}</span>
                  <span className="md:hidden">{s.num}</span>
                </button>
                {index < 3 && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="container py-12">
        <div className="mx-auto max-w-3xl">
          {/* Step 1: Base & Size */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="mb-4 text-2xl font-bold text-foreground">
                  Choose Your Flavor
                </h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {flavors.map((flavor) => (
                    <button
                      key={flavor.id}
                      onClick={() => setSelectedFlavor(flavor.id)}
                      className={`flex items-center gap-3 rounded-xl border-2 p-4 transition-all ${
                        selectedFlavor === flavor.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div
                        className={`h-8 w-8 rounded-full ${flavor.color} shadow-md`}
                      />
                      <span className="font-medium text-foreground">
                        {flavor.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="mb-4 text-2xl font-bold text-foreground">
                  Select Size
                </h2>
                <RadioGroup
                  value={selectedSize}
                  onValueChange={setSelectedSize}
                  className="grid gap-3 md:grid-cols-2"
                >
                  {sizes.map((size) => (
                    <Label
                      key={size.id}
                      htmlFor={size.id}
                      className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition-all ${
                        selectedSize === size.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value={size.id} id={size.id} />
                        <div>
                          <p className="font-semibold text-foreground">
                            {size.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Serves {size.serves}
                          </p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-primary">
                        ₹{size.price}
                      </span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            </motion.div>
          )}

          {/* Step 2: Customize */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="mb-4 text-2xl font-bold text-foreground">
                  Add Toppings
                </h2>
                <div className="grid gap-3 md:grid-cols-2">
                  {toppings.map((topping) => (
                    <Label
                      key={topping.id}
                      htmlFor={topping.id}
                      className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition-all ${
                        selectedToppings.includes(topping.id)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id={topping.id}
                          checked={selectedToppings.includes(topping.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedToppings([...selectedToppings, topping.id]);
                            } else {
                              setSelectedToppings(
                                selectedToppings.filter((t) => t !== topping.id)
                              );
                            }
                          }}
                        />
                        <span className="font-medium text-foreground">
                          {topping.name}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-primary">
                        +₹{topping.price}
                      </span>
                    </Label>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="mb-4 text-2xl font-bold text-foreground">
                  Dietary Preferences
                </h2>
                <div className="flex flex-wrap gap-3">
                  {dietaryOptions.map((option) => (
                    <Label
                      key={option.id}
                      htmlFor={`diet-${option.id}`}
                      className={`flex cursor-pointer items-center gap-2 rounded-full border-2 px-4 py-2 transition-all ${
                        dietary.includes(option.id)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Checkbox
                        id={`diet-${option.id}`}
                        checked={dietary.includes(option.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setDietary([...dietary, option.id]);
                          } else {
                            setDietary(dietary.filter((d) => d !== option.id));
                          }
                        }}
                      />
                      <span className="font-medium text-foreground">
                        {option.name}
                      </span>
                      {option.extra > 0 && (
                        <span className="text-xs text-muted-foreground">
                          (+₹{option.extra})
                        </span>
                      )}
                    </Label>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="mb-4 text-2xl font-bold text-foreground">
                  Cake Message
                </h2>
                <Input
                  placeholder="e.g., Happy Birthday Sarah! 🎉"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  maxLength={50}
                  className="text-lg"
                />
                <p className="mt-2 text-sm text-muted-foreground">
                  {customMessage.length}/50 characters
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 3: Details */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="mb-4 text-2xl font-bold text-foreground">
                  Select Occasion
                </h2>
                <div className="flex flex-wrap gap-3">
                  {occasions.map((occasion) => (
                    <button
                      key={occasion}
                      onClick={() => setSelectedOccasion(occasion)}
                      className={`rounded-full border-2 px-5 py-2 font-medium transition-all ${
                        selectedOccasion === occasion
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-foreground hover:border-primary"
                      }`}
                    >
                      {occasion}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="mb-4 text-2xl font-bold text-foreground">
                  Delivery Date
                </h2>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <Input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="max-w-xs"
                  />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Custom cakes require at least 48 hours advance notice
                </p>
              </div>

              <div>
                <h2 className="mb-4 text-2xl font-bold text-foreground">
                  Reference Image (Optional)
                </h2>
                <div className="flex items-center gap-4">
                  <label className="flex cursor-pointer items-center gap-2 rounded-xl border-2 border-dashed border-border px-6 py-4 transition-colors hover:border-primary">
                    <Upload className="h-5 w-5 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Upload an image
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
                </div>
              </div>

              <div>
                <h2 className="mb-4 text-2xl font-bold text-foreground">
                  Special Instructions
                </h2>
                <Textarea
                  placeholder="Any allergies, specific design requests, or other details..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  rows={4}
                />
              </div>
            </motion.div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="mb-6 text-2xl font-bold text-foreground">
                Order Summary
              </h2>

              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Flavor</span>
                    <span className="font-medium text-foreground capitalize">
                      {selectedFlavor.replace("-", " ")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Size</span>
                    <span className="font-medium text-foreground">
                      {sizes.find((s) => s.id === selectedSize)?.name}
                    </span>
                  </div>
                  {selectedToppings.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Toppings</span>
                      <span className="font-medium text-foreground text-right">
                        {selectedToppings
                          .map(
                            (t) =>
                              toppings.find((top) => top.id === t)?.name
                          )
                          .join(", ")}
                      </span>
                    </div>
                  )}
                  {dietary.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dietary</span>
                      <span className="font-medium text-foreground">
                        {dietary
                          .map(
                            (d) =>
                              dietaryOptions.find((opt) => opt.id === d)?.name
                          )
                          .join(", ")}
                      </span>
                    </div>
                  )}
                  {customMessage && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Message</span>
                      <span className="font-medium text-foreground">
                        "{customMessage}"
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Occasion</span>
                    <span className="font-medium text-foreground">
                      {selectedOccasion}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Date</span>
                    <span className="font-medium text-foreground">
                      {new Date(deliveryDate).toLocaleDateString("en-IN", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <div className="mt-6 border-t border-border pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary">₹{calculateTotal()}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Final price may vary based on design complexity
                  </p>
                </div>
              </div>

              {referenceImage && (
                <div className="rounded-2xl border border-border bg-card p-4">
                  <p className="mb-2 text-sm font-medium text-muted-foreground">
                    Reference Image
                  </p>
                  <img
                    src={referenceImage}
                    alt="Reference"
                    className="h-40 w-full rounded-lg object-cover"
                  />
                </div>
              )}

              {specialInstructions && (
                <div className="rounded-2xl border border-border bg-card p-4">
                  <p className="mb-2 text-sm font-medium text-muted-foreground">
                    Special Instructions
                  </p>
                  <p className="text-foreground">{specialInstructions}</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex items-center justify-between">
            {step > 1 ? (
              <Button
                variant="outline"
                size="lg"
                onClick={() => setStep(step - 1)}
              >
                Back
              </Button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <Button
                size="lg"
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="gap-2"
              >
                Continue
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={handleSubmit}
                className="gap-2"
              >
                <Check className="h-4 w-4" />
                Submit Order Request
              </Button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CustomOrder;
