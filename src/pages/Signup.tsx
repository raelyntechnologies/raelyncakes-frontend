import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, User, Loader2, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { useAppDispatch } from "@/store/hooks";
import { loginSuccess } from "@/store/authSlice";
import { toast } from "@/hooks/use-toast";
import { User as UserType } from "@/types/user";
import { differenceInYears, format, isValid } from "date-fns";
import API_URL from "@/config/api";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateofbirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    dateofbirth?: string;
    password?: string;
    confirmPassword?: string;
    api?: string;
  }>({});

  // strict India mobile validation
  const indianPhoneRegex = /^[6-9]\d{9}$/;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 10) return;

    setPhone(value);

    if (value.length && !indianPhoneRegex.test(value)) {
      setErrors(prev => ({
        ...prev,
        phone: "Enter valid 10-digit Indian mobile number"
      }));
    } else {
      setErrors(prev => ({ ...prev, phone: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!phone) newErrors.phone = "Phone number is required";
    else if (!indianPhoneRegex.test(phone))
      newErrors.phone = "Enter valid 10-digit Indian mobile number";

    if (!dateofbirth) newErrors.dateofbirth = "Date of Birth is required";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    if (!confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const MIN_AGE = 13;  // Cake shop policy

  // ✅ Calculate max date (13 years ago)
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - MIN_AGE);
  const maxDateStr = format(maxDate, "yyyy-MM-dd");

  const newErrorsdob: typeof errors = {};

  const validateDOB = (dateStr: string) => {
    if (!dateStr) {
      newErrorsdob.dateofbirth = "Date of Birth is required";
      setErrors(newErrorsdob);
      return false;
    }

    const dob = new Date(dateStr);
    
    // Invalid date
    if (!isValid(dob)) {
      newErrorsdob.dateofbirth = "Please select a valid date";
      setErrors(newErrorsdob);
      return false;
    }

    // Too young (under 13)
    const age = differenceInYears(new Date(), dob);
    if (age < MIN_AGE) {
      newErrorsdob.dateofbirth = `You must be at least ${MIN_AGE} years old`;
      setErrors(newErrorsdob);
      return false;
    }

    setErrors(prev => ({ ...prev, dateofbirth: "" }));
    return true;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDateOfBirth(value);
    validateDOB(value);
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const res = await fetch(`${API_URL}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          password: password,
          dateofbirth: dateofbirth
        })
      });


      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Signup failed");
      }

      // Store UserId, JWT token
      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        localStorage.setItem("userid", data.userid);
      }

      const newUser: UserType = {
        userid: data.userid,
        phone: data.phone,
        name: data.name,
        role: data.role
      };

      dispatch(loginSuccess(newUser));

      toast({
        title: "Account created!",
        description: `Welcome, ${name}!`
      });

      navigate("/");

    } catch (error: any) {
      setErrors(prev => ({ ...prev, api: error.message }));
      toast({
        title: "Signup failed",
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="rounded-3xl bg-card p-8 shadow-lifted">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold">Create Account</h1>
              <p className="mt-2 text-muted-foreground">
                Join us for sweet celebrations
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="space-y-2">
                <Label>Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={phone}
                    onChange={handlePhoneChange}
                    className={`pl-10 ${errors.phone ? "border-red-500" : ""}`}
                    placeholder="9876543210"
                  />
                </div>
                {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
              </div>
              
              <div className="space-y-2">
              <Label>Date of Birth</Label>
              <div className="relative w-full">
                <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground z-20 pointer-events-none" />
                <Input
                  type="date"
                  value={dateofbirth}
                  max={maxDateStr}
                  onChange={handleDateChange}
                  className={`
                    w-full pl-12 pr-4 py-2
                    min-h-[44px] h-auto
                    ${errors.dateofbirth ? "border-destructive focus:border-destructive" : ""}
                  `}
                  placeholder="Select your date of birth"
                />
              </div>
              
              {errors.dateofbirth && (
                <p className="text-sm text-destructive">{errors.dateofbirth}</p>
              )}
              
              {/* Age preview */}
             {dateofbirth && !errors.dateofbirth && (
                <p className="text-xs text-muted-foreground">
                  ✓ Age: <span className="font-medium">{differenceInYears(new Date(), new Date(dateofbirth))} years</span>
                </p>
              )}
            </div>

              <div className="space-y-2">
                <Label>Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
              </div>

              {errors.api && (
                <p className="text-sm text-destructive text-center">{errors.api}</p>
              )}

              <Button type="submit" variant="hero" size="xl" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Signup;
