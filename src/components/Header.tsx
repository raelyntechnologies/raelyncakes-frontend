import { useCallback, useState, useMemo, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, User, Heart, LogOut, Package, Key, Phone } from "lucide-react";
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

  const navLinks = useMemo(() => 
    isAdmin
      ? [...baseNavLinks, { href: "/admin", label: "Admin" }]
      : baseNavLinks,
    [isAdmin]
  );

  const isActive = useCallback((path: string) => location.pathname === path, [location.pathname]);

  const userInitial = useMemo(() => 
    user?.name?.charAt(0)?.toUpperCase() || 'U', 
    [user?.name]
  );

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = useCallback(async () => {
    const token = localStorage.getItem("access_token");
    
    if (token) {
      try {
        const response = await fetch(`${API_URL}/users/signout`, {
          method: "POST",
          headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        
        if (!response.ok) {
          throw new Error('Logout API failed');
        }
      } catch (error) {
        console.warn("Logout API failed:", error);
      }
    }
    
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("userid");
    dispatch(logout());
    toast({
      title: "Logged out successfully",
      description: "See you next time!",
    });
    navigate("/");
  }, [dispatch, navigate]);

  const CartBadge = ({ count }: { count: number }) => (
    count > 0 && (
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground"
      >
        {count}
      </motion.span>
    )
  );

  const FavoriteBadge = ({ count }: { count: number }) => (
    count > 0 && (
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
      >
        {count}
      </motion.span>
    )
  );

  return (
    <header className="sticky top-0 z-50 w-full">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg"
      >
        Skip to content
      </a>
      
      <div className="glass border-b border-border/50">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between md:h-20 lg:px-8">
          {/* Logo - ALWAYS VISIBLE */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0" aria-label="Raelyn Cakes Home">
            <motion.div
              whileHover={{ rotate: 15 }}
              className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary shadow-button flex-shrink-0"
            >
              <span className="text-xl">🎂</span>
            </motion.div>
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-gradient-primary truncate md:text-xl">Raelyn Cakes</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Handcrafted with Love</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block flex-1" role="navigation" aria-label="Main navigation">
            <ul className="mx-auto flex max-w-md items-center justify-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={`relative py-2 text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-current={isActive(link.href) ? "page" : undefined}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-primary"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Phone Contact - VISIBLE ON ALL DEVICES */}
          <div className="flex flex-col items-end gap-0.5 sm:gap-1 flex-shrink-0 ml-4 max-w-[140px] md:ml-0 md:max-w-none">
            {/* Mobile: Compact phone button */}
            <div className="block sm:hidden">
              <a 
                href="tel:+916380080915" 
                className="flex items-center justify-end gap-1 text-xs font-semibold text-primary hover:text-primary/80 p-1 -m-1 rounded-lg hover:bg-muted/50 transition-all truncate"
                aria-label="Call Raelyn Cakes"
              >
                <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                +91 6380080915
              </a>
            </div>
            
            {/* Desktop: Full phone info */}
            <div className="hidden sm:flex flex-col items-end gap-1">
              <span className="text-xs font-medium text-muted-foreground">Call Us</span>
              <a 
                href="tel:+916380080915" 
                className="text-sm font-semibold text-primary hover:underline flex items-center gap-1 group"
                aria-label="Call Raelyn Cakes at +91 63800 80915"
              >
                <Phone className="h-4 w-4 group-hover:translate-y-[-1px] transition-transform" />
                +91 6380080915
              </a>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2 ml-auto">
            {/* Favorites */}
            <Link to="/favorites" className="hidden sm:flex" aria-label={`View ${favoriteCount} favorites`}>
              <Button variant="ghost" size="icon" className="relative h-9 w-9">
                <Heart className={`h-4 w-4 ${favoriteCount > 0 ? "fill-primary text-primary" : ""}`} />
                <FavoriteBadge count={favoriteCount} />
              </Button>
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 hidden md:flex" aria-label="User menu">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-sm font-semibold text-primary">
                        {userInitial}
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
              <Link to="/login" className="hidden md:block" aria-label="Sign in">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
            )}
            
            {/* Cart Button */}
            <Button
              variant="soft"
              size="icon"
              className="relative h-10 w-10"
              onClick={() => dispatch(openCart())}
              aria-label={`View cart with ${cartItemCount} items`}
            >
              <ShoppingCart className="h-5 w-5" />
              <CartBadge count={cartItemCount} />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
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
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="glass fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 lg:hidden"
            >
              <nav className="container mx-auto px-4 py-6 lg:px-8">
                <ul className="space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
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
                        className="block rounded-xl px-4 py-3 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        My Orders
                      </Link>
                    </li>
                  )}
                </ul>
                <div className="mt-6 flex flex-col gap-2 border-t border-border pt-4">
                  {isAuthenticated ? (
                    <Button variant="outline" className="w-full" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  ) : (
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                      <Button variant="outline" className="w-full">
                        <User className="mr-2 h-4 w-4" />
                        Sign In
                      </Button>
                    </Link>
                  )}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};