import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { Gift, Heart, Cake, Star, PartyPopper, Baby, GraduationCap, Sparkles } from "lucide-react";

const occasions = [
  {
    id: "birthday",
    title: "Birthday Celebrations",
    description: "Make every birthday unforgettable with our custom birthday cakes. From kids' favorites to elegant adult designs.",
    icon: PartyPopper,
    color: "from-pink-500 to-rose-500",
    cakes: ["Chocolate Truffle", "Rainbow Vanilla", "Unicorn Special"],
  },
  {
    id: "wedding",
    title: "Wedding & Engagement",
    description: "Celebrate your love story with our exquisite multi-tiered wedding cakes and intimate engagement desserts.",
    icon: Heart,
    color: "from-rose-400 to-pink-500",
    cakes: ["Elegant Wedding Cake", "Gold Celebration", "Red Velvet Classic"],
  },
  {
    id: "anniversary",
    title: "Anniversary",
    description: "Honor years of love with romantic cake designs perfect for couples celebrating their journey together.",
    icon: Sparkles,
    color: "from-purple-500 to-pink-500",
    cakes: ["Heart Red Velvet", "Chocolate Lava", "Fresh Fruit Delight"],
  },
  {
    id: "baby-shower",
    title: "Baby Shower",
    description: "Welcome the little one with adorable themed cakes in soft pastels and playful designs.",
    icon: Baby,
    color: "from-sky-400 to-teal-400",
    cakes: ["Pinata Vanilla", "Unicorn Special", "Rainbow Vanilla"],
  },
  {
    id: "graduation",
    title: "Graduation",
    description: "Celebrate academic achievements with cakes that honor hard work and bright futures ahead.",
    icon: GraduationCap,
    color: "from-amber-500 to-orange-500",
    cakes: ["Gold Celebration", "Chocolate Truffle", "Black Forest Classic"],
  },
  {
    id: "corporate",
    title: "Corporate Events",
    description: "Impress clients and celebrate team milestones with professionally designed corporate cakes.",
    icon: Star,
    color: "from-slate-600 to-slate-800",
    cakes: ["Gold Celebration", "Chocolate Truffle", "Fresh Fruit Delight"],
  },
  {
    id: "festivals",
    title: "Festivals & Holidays",
    description: "Add sweetness to Diwali, Christmas, Eid, and all your favorite festivals with themed creations.",
    icon: Gift,
    color: "from-emerald-500 to-teal-500",
    cakes: ["Black Forest Classic", "Mango Fresh", "Red Velvet Classic"],
  },
  {
    id: "just-because",
    title: "Just Because",
    description: "No occasion needed! Surprise someone special or treat yourself to a delicious cake any day.",
    icon: Cake,
    color: "from-secondary to-primary",
    cakes: ["Chocolate Lava", "Mango Fresh", "Pinata Vanilla"],
  },
];

const Occasions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Every Moment Deserves Cake
            </span>
            <h1 className="mb-6 text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
              Cakes for Every{" "}
              <span className="text-gradient-primary">Occasion</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              From intimate celebrations to grand events, we craft the perfect cake 
              to make your special moments even sweeter.
            </p>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -left-20 top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-20 bottom-20 h-40 w-40 rounded-full bg-secondary/10 blur-3xl" />
      </section>

      {/* Occasions Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {occasions.map((occasion, index) => (
              <motion.div
                key={occasion.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-card p-6 shadow-soft transition-all duration-300 hover:shadow-lifted"
              >
                <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${occasion.color} text-white shadow-lg`}>
                  <occasion.icon className="h-7 w-7" />
                </div>
                
                <h3 className="mb-2 text-xl font-bold text-foreground">
                  {occasion.title}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {occasion.description}
                </p>
                
                <div className="mb-4">
                  <p className="mb-2 text-xs font-medium text-muted-foreground">
                    Popular choices:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {occasion.cakes.map((cake) => (
                      <span
                        key={cake}
                        className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {cake}
                      </span>
                    ))}
                  </div>
                </div>

                <Link to="/cakes">
                  <Button variant="soft" size="sm" className="w-full">
                    Browse Cakes
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Order CTA */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl gradient-primary p-8 md:p-12 lg:p-16"
          >
            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">
                Have a Unique Occasion?
              </h2>
              <p className="mb-8 text-lg text-primary-foreground/80">
                We love creating custom cakes for special moments. Tell us about your 
                occasion, and we'll design something magical just for you.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link to="/contact">
                  <Button variant="hero-outline" size="lg">
                    Request Custom Cake
                  </Button>
                </Link>
                <Link to="/cakes">
                  <Button variant="hero-outline" size="lg">
                    View All Cakes
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Occasions;
