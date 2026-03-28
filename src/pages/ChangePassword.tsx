import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, User, Loader2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { useAppSelector } from "@/store/hooks";
import { toast } from "@/hooks/use-toast";
import API_URL from "@/config/api";

const ChangePassword = () => {
  const navigate = useNavigate();
  
  // Get user from Redux store
  const user = useAppSelector((state: any) => state.auth?.user);

  // State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
    api?: string;
  }>({});

  // Get user from Redux user (NON-EDITABLE)
  useEffect(() => {
    if (user?.name && user?.phone) {
      setName(user.name);
      setPhone(user.phone);
    }
  }, [user]);

  // ✅ Real-time password confirmation validation
  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setErrors(prev => ({ 
        ...prev, 
        confirmPassword: "Passwords do not match" 
      }));
    } else if (confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: "" }));
    }
  }, [password, confirmPassword]);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8) newErrors.password = "Password must be 8+ characters";

    if (!confirmPassword) newErrors.confirmPassword = "Confirm password is required";
    else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({ api: "" });

    try {
      const token = localStorage.getItem("access_token");
      
      const res = await fetch(`${API_URL}/users/changepassword`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` })
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          password: password.trim()
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || data.message || "Change password failed");
      }

      toast({
        title: "✅ Password changed successfully!",
        description: `Welcome back, ${name}!`,
      });

      // Clear sensitive data
      setPassword("");
      setConfirmPassword("");
      
      navigate("/", { replace: true });

    } catch (error: any) {
      setErrors({ api: error.message });
      toast({
        title: "❌ Change failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <div className="container flex min-h-[calc(100vh-200px)] items-center justify-center py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="rounded-3xl bg-card p-8 shadow-lifted">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-foreground">Change Password</h1>
              <p className="mt-2 text-muted-foreground">
                Update your account security
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* ✅ NAME - NON-EDITABLE & PREFILLED */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    value={name || "Loading..."}
                    readOnly
                    className="pl-10 bg-muted/50 cursor-not-allowed border-muted focus:ring-0"
                    placeholder="John Doe"
                  />
                </div>
                <p className="text-xs text-muted-foreground italic">
                  Your registered name
                </p>
              </div>

              {/* ✅ PHONE - NON-EDITABLE & PREFILLED */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    value={phone || "Loading..."}
                    readOnly
                    className="pl-10 bg-muted/50 cursor-not-allowed border-muted focus:ring-0"
                    placeholder="9876543210"
                  />
                </div>
                <p className="text-xs text-muted-foreground italic">
                  Your registered mobile number
                </p>
              </div>

              {/* PASSWORD - EDITABLE */}
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`pl-10 pr-10 ${
                      errors.password ? "border-destructive focus:border-destructive" : ""
                    }`}
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              {/* CONFIRM PASSWORD - EDITABLE */}
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`${
                    errors.confirmPassword ? "border-destructive focus:border-destructive" : ""
                  }`}
                  placeholder="••••••••••••"
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                )}
              </div>

              {/* API ERROR */}
              {errors.api && (
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                  <p className="text-sm text-destructive text-center">{errors.api}</p>
                </div>
              )}

              <Button 
                type="submit" 
                variant="hero" 
                size="xl" 
                className="w-full" 
                disabled={isLoading || !user || !name || !phone}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Changing password...
                  </>
                ) : (
                  "Change Password"
                )}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default ChangePassword;
