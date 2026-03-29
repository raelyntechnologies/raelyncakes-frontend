import { useCallback, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Search, User, Heart, LogOut, Package, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectCartItemCount, openCart } from "@/store/cartSlice";
import { selectUser, selectIsAuthenticated, selectIsAdmin, logout } from "@/store/authSlice";
import { selectFavoriteCount } from "@/store/favoritesSlice";
import { toast } from "@/hooks/use-toast";
import API_URL from "@/config/api";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItemCount = useAppSelector(selectCartItemCount);
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAdmin = useAppSelector(selectIsAdmin);
  const favoriteCount = useAppSelector(selectFavoriteCount);

  const baseNavLinks = [
    { href: "/", label: "Home" },
    { href: "/cakes", label: "Cakes" },
    { href: "/occasions", label: "Occasions" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const navLinks = isAdmin
    ? [...baseNavLinks, { href: "/admin", label: "Admin" }]
    : baseNavLinks;

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = useCallback(async () => {
  const token = localStorage.getItem("access_token");
    
    if (token) {
      try {
        await fetch(`${API_URL}/users/signout`, {
          method: "POST",
          headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
      } catch (error) {
        console.warn("Logout API failed:", error);
      }
    }
  
  // Always clear client state
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("userid");
   dispatch(logout());
    toast({
      title: "Logged out",
      description: "See you next time!",
    });
    navigate("/");
}, [dispatch, navigate]);


  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="glass border-b border-border/50">
        <div className="container flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 15 }}
              className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary shadow-button"
            >
              <span className="text-xl">🎂</span>
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-gradient-primary">
                Raelyn Cakes
              </h1>
              <p className="hidden text-xs text-muted-foreground md:block">
                Handcrafted with Love
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={`relative py-2 text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-primary"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
              <h1 className="text-xl font-bold text-gradient-primary">
                Call Us Now
              </h1>
              <p className="hidden text-xs text-muted-foreground md:block">
                +91 63800 80915
              </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button> */}
            <Link to="/favorites">
              <Button variant="ghost" size="icon" className="relative hidden md:flex">
                <Heart className={`h-5 w-5 ${favoriteCount > 0 ? "fill-primary text-primary" : ""}`} />
                {favoriteCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
                  >
                    {favoriteCount}
                  </motion.span>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden md:flex">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-sm font-semibold text-primary">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="font-medium text-foreground">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.phone}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/changepassword" className="flex items-center gap-2">
                      <Key className="h-4 w-4" />
                      Change Password
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" className="hidden md:block">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}
            
            {/* Cart Button */}
            <Button
              variant="soft"
              size="icon"
              className="relative"
              onClick={() => dispatch(openCart())}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass border-b border-border/50 lg:hidden"
          >
            <nav className="container py-4">
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                        isActive(link.href)
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {isAuthenticated && (
                  <li>
                    <Link
                      to="/orders"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      My Orders
                    </Link>
                  </li>
                )}
              </ul>
              <div className="mt-4 flex gap-2 border-t border-border pt-4">
                <Button variant="outline" className="flex-1">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
                {isAuthenticated ? (
                  <Button variant="outline" className="flex-1" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                ) : (
                  <Link to="/login" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      <User className="mr-2 h-4 w-4" />
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
