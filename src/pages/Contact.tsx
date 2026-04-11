import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Instagram, 
  Facebook, 
  MessageCircle,
  CheckCircle
} from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["Eraviputhenthurai", "Thoothoor (PO), Kanyakumari - 629176"],
  },
  // {
  //   icon: Phone,
  //   title: "Call Us",
  //   details: ["+91 63800 80915", "+91 63800 80915"],
  // },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 6380080915"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["raelyntechnologies@gmail.com"],
  },
  // {
  //   icon: Mail,
  //   title: "Email Us",
  //   details: ["raelyntechnologies@gmail.com", "raelyntechnologies@gmail.com"],
  // },
  {
    icon: Clock,
    title: "Opening Hours",
    details: ["Mon - Sat: 9:00 AM - 9:00 PM", "Sunday: 10:00 AM - 6:00 PM"],
  },
];

const socialLinks = [
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/916380080915", handle: "+91 6380080915", color: "from-green-500 to-green-400" },
  { icon: Phone, label: "Phone", href: "tel:+916380080915", handle: "+91 6380080915", color: "from-blue-600 to-blue-500" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/raelyncakes", handle: "raelyncakes", color: "from-purple-500 to-pink-500" },
  { icon: Mail, label: "Email", href: "mailto:raelyntechnologies@gmail.com", handle: "raelyntechnologies@gmail.com", color: "from-yellow-600 to-yellow-500" },
];

const faqs = [
  {
    question: "How far in advance should I order?",
    answer: "For standard cakes, we recommend ordering at least 24-48 hours in advance. For custom or wedding cakes, please order 1-2 weeks ahead.",
  },
  {
    question: "Do you offer eggless options?",
    answer: "Yes! Most of our cakes are available in eggless versions at no extra charge. Just select the eggless option while ordering.",
  },
  {
    question: "What are your delivery areas?",
    answer: "We deliver across Kanyakumari. Delivery charges vary based on location. Same-day delivery is available for select areas.",
  },
  {
    question: "Can I customize my cake design?",
    answer: "Absolutely! We love creating custom designs. Contact us with your vision, and we'll make it happen.",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Message Sent! 🎉",
      description: "We'll get back to you within 24 hours.",
    });

    // Reset form after delay
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

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
              Get in Touch
            </span>
            <h1 className="mb-6 text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
              We'd Love to{" "}
              <span className="text-gradient-primary">Hear From You</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Questions about orders, custom cakes, or just want to say hello? 
              We're here to help make your celebrations sweeter!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="container">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-soft">
                  <CardContent className="flex items-start gap-4 p-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-bold text-foreground">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-sm text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-12">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-soft">
                <CardContent className="p-6 md:p-8">
                  <h2 className="mb-6 text-2xl font-bold text-foreground">
                    Send Us a Message
                  </h2>
                  
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-foreground">
                        Message Sent!
                      </h3>
                      <p className="text-muted-foreground">
                        Thank you for reaching out. We'll respond soon!
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Your Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                            className="rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            required
                            className="rounded-xl"
                          />
                        </div>
                      </div>
                      
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            className="rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Custom Cake Inquiry"
                            required
                            className="rounded-xl"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Your Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your cake requirements, event date, or any questions..."
                          rows={5}
                          required
                          className="rounded-xl resize-none"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Map & Social */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Map Placeholder */}
              <Card className="overflow-hidden border-0 shadow-soft">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="mx-auto mb-2 h-12 w-12 text-primary" />
                    <p className="font-medium text-foreground">Eraviputhenthurai</p>
                    <p className="text-sm text-muted-foreground">Thoothoor (PO), Kanyakumari - 629176</p>
                  </div>
                </div>
              </Card>

              {/* Social Links */}
              <Card className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <h3 className="mb-4 font-bold text-foreground">Connect With Us</h3>
                  <div className="space-y-3">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.label}
                        href="#"
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-muted"
                      >
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${social.color} text-white`}>
                          <social.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{social.label}</p>
                          <p className="text-sm text-muted-foreground">{social.handle}</p>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-muted/30 py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Frequently Asked{" "}
              <span className="text-gradient-primary">Questions</span>
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Quick answers to common questions about orders, delivery, and more.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-soft">
                  <CardContent className="p-5">
                    <h3 className="mb-2 font-bold text-foreground">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
