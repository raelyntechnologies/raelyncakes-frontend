import { motion } from "framer-motion";
import { ArrowRight, Truck, Shield, Gift, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CakeCard } from "@/components/CakeCard";
import { CartDrawer } from "@/components/CartDrawer";
import { cakesData } from "@/data/cakes";

// Import images
import heroCakes from "@/assets/hero-cakes.jpg";

const featuredCakes = cakesData.filter((cake) => cake.bestseller).slice(0, 6);

const features = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "On orders above ₹999",
  },
  {
    icon: Clock,
    title: "Same Day Delivery",
    description: "Order before 12 PM",
  },
  {
    icon: Shield,
    title: "100% Fresh",
    description: "Baked with love daily",
  },
  {
    icon: Gift,
    title: "Gift Wrapping",
    description: "Free on all orders",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="container py-12 md:py-20">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block rounded-full bg-secondary/20 px-4 py-1.5 text-sm font-medium text-secondary"
              >
                ✨ Handcrafted with Love
              </motion.span>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl"
              >
                Celebrate Every{" "}
                <span className="text-gradient-primary">Sweet Moment</span>{" "}
                with Us
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 text-lg text-muted-foreground md:text-xl"
              >
                From dreamy chocolate layers to elegant wedding tiers, discover
                50+ handcrafted cakes delivered fresh to your doorstep.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
              >
                <Link to="/cakes">
                  <Button variant="hero" size="xl" className="w-full sm:w-auto">
                    Explore Cakes
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="xl" className="w-full sm:w-auto">
                    Sign In
                  </Button>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-10 flex justify-center gap-8 lg:justify-start"
              >
                {[
                  { value: "50+", label: "Cake Varieties" },
                  { value: "100+", label: "Happy Customers" },
                  { value: "1000+", label: "Total Sales" },
                  { value: "4.9", label: "Overall Rating" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-2xl font-bold text-foreground md:text-3xl">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 overflow-hidden rounded-3xl shadow-lifted"
                >
                  <img
                    src={heroCakes}
                    alt="Delicious cakes display"
                    className="w-full object-cover"
                  />
                </motion.div>
                
                {/* Decorative Elements */}
                <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
                <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-secondary/20 blur-2xl" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 50C240 100 480 0 720 50C960 100 1200 0 1440 50V100H0V50Z"
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </section>

      {/* Features */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center rounded-2xl bg-card p-6 text-center shadow-soft"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cakes */}
      <section className="py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              ⭐ Bestsellers
            </span>
            <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
              Our Most Loved Cakes
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Discover our customer favorites – handpicked selections that never
              fail to impress
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCakes.map((cake, index) => (
              <CakeCard key={cake.id} cake={cake} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link to="/cakes">
              <Button variant="secondary" size="xl">
                View All Cakes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-muted py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Shop by Category
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Find the perfect cake for every taste and occasion
            </p>
          </motion.div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Classy", emoji: "🍦", count: 5, color: "from-amber-100 to-amber-50" },
              { name: "Yummy", emoji: "❤️", count: 4, color: "from-rose-600 to-rose-400" },
              { name: "Fruity", emoji: "🍓", count: 8, color: "from-red-400 to-orange-300" },
              { name: "Nutty", emoji: "🍒", count: 12, color: "from-neutral-800 to-neutral-600" },
              { name: "Chocolaty", emoji: "🍫", count: 15, color: "from-amber-900 to-amber-700" },
              { name: "Browny", emoji: "✨", count: 8, color: "from-primary to-primary-glow" },
            ].map((category, i) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/cakes?category=${category.name}`}>
                  <div className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${category.color} p-6 transition-transform hover:-translate-y-1`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-4xl">{category.emoji}</span>
                        <h3 className="mt-3 text-xl font-bold text-foreground">
                          {category.name}
                        </h3>
                        <p className="mt-1 text-sm text-foreground/70">
                          {category.count} Varieties
                        </p>
                      </div>
                      <ArrowRight className="h-6 w-6 text-foreground/50 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl gradient-primary p-8 text-center md:p-16"
          >
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl">
                Need a Cake?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-primary-foreground/90">
                From themed birthday cakes to elegant wedding tiers, we bring
                your vision to life. Let's create something special together!
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link to="/cakes">
                  <Button variant="hero-outline" size="xl">
                    Start Order
                  </Button>
                </Link>
                <Button 
                variant="hero-outline" 
                size="xl"
                onClick={() => window.location.href = 'tel:+916380080915'}
                aria-label="Call Raelyn Cakes at +91 6380080915"
              >
                <span className="mr-1 sm:mr-2">📞</span>
                <span className="truncate">Call Us Now</span>
              </Button>
              </div>
            </div>

            {/* Decorative */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-foreground/10" />
            <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-primary-foreground/10" />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
