import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Instagram, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import { selectIsAdmin } from "@/store/authSlice";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const isAdmin = useAppSelector(selectIsAdmin);

  const quickLinks = [
    { label: "All Cakes", href: "/cakes" },
    { label: "Occasions", href: "/occasions" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    ...(isAdmin ? [{ label: "Admin", href: "/admin" }] : []),
  ];

  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container py-12">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div>
              <h3 className="text-2xl font-bold">Get Sweet Updates!</h3>
              <p className="mt-1 text-primary-foreground/70">
                Subscribe for exclusive offers and new cake launches
              </p>
            </div>
            <div className="flex w-full max-w-md gap-2">
              <input
                type="phone"
                placeholder="Enter your phone number"
                className="flex-1 rounded-xl bg-primary-foreground/10 px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button variant="hero" size="lg">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 15 }}
                className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary shadow-button"
              >
                <span className="text-xl">🎂</span>
              </motion.div>
              <span className="text-xl font-bold">Raelyn Cakes</span>
            </Link>
            <p className="mt-4 text-sm text-primary-foreground/70">
              Handcrafted with love, delivered with care. Making your celebrations
              sweeter since 2025.
            </p>
            <div className="mt-6 flex gap-3">
            {[
              { Icon: MessageCircle, href: "https://wa.me/916380080915" },
              { Icon: Phone, href: "tel:+916380080915" },
              { Icon: Instagram, href: "https://instagram.com/raelyncakes" },
              { Icon: Mail, href: "mailto:raelyntechnologies@gmail.com" }
            ].map(({ Icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm border border-border/50 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:bg-gradient-to-br hover:from-primary hover:to-primary-foreground hover:border-primary/50 active:scale-95"
                aria-label={`Connect on ${Icon.displayName || 'social media'}`}
              >
                <Icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
              </motion.a>
            ))}
          </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Categories</h4>
            <ul className="space-y-2">
              {[
                "Classy Cakes",
                "Yummy Cakes",
                "Fruity Cakes",
                "Nutty Cakes",
                "Chocolaty Cakes",
                "Browny Cakes",
              ].map((link) => (
                <li key={link}>
                  <Link
                    to="/cakes"
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-primary"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <MapPin className="h-4 w-4 text-primary" />
                Eraviputhenthurai, Thoothoor(PO), Kanyakumari - 629176
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Phone className="h-4 w-4 text-primary" />
                +91 6380080915
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Mail className="h-4 w-4 text-primary" />
                raelyntechnologies@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="text-sm text-primary-foreground/70">
            © {currentYear} Raelyn Technologies. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="#"
              className="text-sm text-primary-foreground/70 hover:text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              to="#"
              className="text-sm text-primary-foreground/70 hover:text-primary"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
