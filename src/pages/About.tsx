import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { Heart, Award, Clock, Users, Leaf, Sparkles } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every cake is crafted with passion and care, treating each order as if it were for our own family.",
  },
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description: "We source the finest ingredients locally, ensuring freshness and supporting our community.",
  },
  {
    icon: Award,
    title: "Quality First",
    description: "No shortcuts. We bake fresh daily and never compromise on taste or presentation.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "Your celebration matters. We ensure your cake arrives fresh and on time, every time.",
  },
];

const stats = [
  { number: "1,000+", label: "Happy Customers" },
  { number: "50+", label: "Cake Varieties" },
  { number: "1", label: "Years of Sweet Memories" },
  { number: "4.9", label: "Average Rating" },
];

const team = [
  {
    name: "Raelyn",
    role: "Founder & Head Baker",
    image: "👩‍🍳",
    bio: "With 5 years of baking experience, Raelyn's passion for creating memorable cakes led to founding this bakery.",
  },
  {
    name: "Arjun",
    role: "Executive Pastry Chef",
    image: "👨‍🍳",
    bio: "Trained in Paris, Arjun brings international techniques and artistic flair to every creation.",
  },
  {
    name: "Priya",
    role: "Creative Director",
    image: "👩‍🎨",
    bio: "Priya transforms cake ideas into stunning visual masterpieces, specializing in custom designs.",
  },
  {
    name: "Vikram",
    role: "Operations Manager",
    image: "👨‍💼",
    bio: "Vikram ensures every order is handled with care and delivered with a smile.",
  },
];

const About = () => {
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
              Our Story
            </span>
            <h1 className="mb-6 text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
              Baking Happiness{" "}
              <span className="text-gradient-primary">Since 2026</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              What started as a home kitchen passion has grown into India's most loved 
              artisan bakery, one cake at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
                From Our Kitchen to{" "}
                <span className="text-gradient-primary">Your Heart</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Raelyn Cakes began in 2026 when founder Raelyn started baking 
                  cakes for friends and family from her home kitchen. What started as a 
                  lockdown hobby quickly became a sensation, with orders pouring in through 
                  word of mouth.
                </p>
                <p>
                  Today, we've grown into a full-fledged artisan bakery, but our core values 
                  remain the same: every cake is made with love, the freshest ingredients, 
                  and an unwavering commitment to making your celebrations special.
                </p>
                <p>
                  We believe that a cake isn't just dessert—it's the centerpiece of your 
                  most precious moments. Whether it's a child's first birthday, a couple's 
                  anniversary, or a simple "just because" surprise, we pour our hearts into 
                  every creation.
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                <Link to="/cakes">
                  <Button variant="default" size="lg">
                    Explore Our Cakes
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8">
                <div className="flex h-full items-center justify-center text-9xl">
                  🎂
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 rounded-2xl bg-card p-4 shadow-lifted">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Handcrafted</p>
                    <p className="text-sm text-muted-foreground">With Love ❤️</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-muted/30 py-16">
        <div className="container">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl font-bold text-gradient-primary md:text-4xl">
                  {stat.number}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              What We <span className="text-gradient-primary">Stand For</span>
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Our values guide everything we do, from selecting ingredients to 
              the final presentation of your cake.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl bg-card p-6 text-center shadow-soft"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-muted/30 py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Meet the <span className="text-gradient-primary">Dream Team</span>
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              The passionate people behind every delicious creation.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group overflow-hidden rounded-2xl bg-card shadow-soft transition-all duration-300 hover:shadow-lifted"
              >
                <div className="flex h-40 items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 text-6xl">
                  {member.image}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-foreground">{member.name}</h3>
                  <p className="mb-2 text-sm font-medium text-primary">{member.role}</p>
                  <p className="text-xs text-muted-foreground">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl gradient-primary p-8 text-center md:p-12"
          >
            <Users className="mx-auto mb-4 h-12 w-12 text-primary-foreground" />
            <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">
              Join Our Sweet Family
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-primary-foreground/80">
              Be part of thousands of happy customers who trust us with their 
              most special celebrations.
            </p>
            <Link to="/cakes">
              <Button variant="hero-outline" size="lg">
                Order Your First Cake
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
