import { Provider } from "react-redux";
import { store } from "./store/store";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Cakes from "./pages/Cakes";
import CakeDetail from "./pages/CakeDetail";
import Occasions from "./pages/Occasions";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import CustomOrder from "./pages/CustomOrder";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCakes from "./pages/admin/AdminCakes";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSettings from "./pages/admin/AdminSettings";
import ChangePassword from "./pages/ChangePassword";
import AdminUsers from "./pages/admin/AdminUsers";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cakes" element={<Cakes />} />
            <Route path="/cake/:id" element={<CakeDetail />} />
            <Route path="/occasions" element={<Occasions />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/custom" element={<CustomOrder />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success/:orderId" element={<OrderSuccess />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="cakes" element={<AdminCakes />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
