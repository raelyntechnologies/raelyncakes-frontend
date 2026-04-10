import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  IndianRupee,
  ShoppingBag,
  Cake,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectAllCakes } from "@/store/cakeSlice";
import StatsCard from "@/components/admin/StatsCard";
import RevenueChart from "@/components/admin/RevenueChart";
import { setLoading } from "@/store/authSlice";
import { useToast } from "@/hooks/use-toast";
import API_URL from "@/config/api";
import { CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const COLORS = ["#E91E8C", "#26A69A", "#FFB800", "#7C3AED", "#F97316", "#10B981"];

const AdminDashboard = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState([]); 
  const cakes = useAppSelector(selectAllCakes);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/orders/orders`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(localStorage.getItem("access_token") && {
              "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            })
          }
        });
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        setOrders(data);
      } catch (error: any) {
        toast({
          title: "Failed to fetch orders",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Category distribution
  const categoryData = useMemo(() => {
    const categories: Record<string, number> = {};
    cakes.forEach((cake) => {
      categories[cake.category] = (categories[cake.category] || 0) + 1;
    });
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, [cakes]);

  const stats = useMemo(() => {
    const totalRevenue = orders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + o.total, 0);
    
    const totalOrders = orders.length;
    const pendingOrders = orders.filter((o) => o.status === "pending").length;
    const deliveredOrders = orders.filter((o) => o.status === "delivered").length;

    return { totalRevenue, totalOrders, pendingOrders, deliveredOrders };
  }, [orders]);

  // Mock revenue data for chart
  const revenueData = useMemo(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map((name) => ({
      name,
      revenue: Math.floor(Math.random() * 50000) + 10000,
      orders: Math.floor(Math.random() * 20) + 5,
    }));
  }, []);

  // Top selling cakes (mock data based on existing cakes)
  const topCakes = useMemo(() => {
    return cakes
      .filter((c) => c.bestseller)
      .slice(0, 5)
      .map((cake) => ({
        ...cake,
        sold: Math.floor(Math.random() * 100) + 20,
      }));
  }, [cakes]);

   // Daily trend (mock)
  const dailyTrend = useMemo(() => {
    const months = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return months.map((month) => ({
      name: month,
      revenue: Math.floor(Math.random() * 200000) + 100000,
      orders: Math.floor(Math.random() * 100) + 50,
    }));
  }, []);

  // Monthly trend (mock)
  const monthlyTrend = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months.map((month) => ({
      name: month,
      revenue: Math.floor(Math.random() * 200000) + 100000,
      orders: Math.floor(Math.random() * 100) + 50,
    }));
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your bakery overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          change="+12% from last week"
          changeType="positive"
          icon={IndianRupee}
          iconColor="bg-green-100 text-green-600"
          delay={0}
        />
        <StatsCard
          title="Total Orders"
          value={stats.totalOrders}
          change={`${stats.pendingOrders} pending`}
          changeType="neutral"
          icon={ShoppingBag}
          iconColor="bg-blue-100 text-blue-600"
          delay={0.1}
        />
        <StatsCard
          title="Total Cakes"
          value={cakes.length}
          change={`${cakes.filter((c) => c.bestseller).length} bestsellers`}
          changeType="neutral"
          icon={Cake}
          iconColor="bg-primary/10 text-primary"
          delay={0.2}
        />
        <StatsCard
          title="Delivered"
          value={stats.deliveredOrders}
          change={`${Math.round((stats.deliveredOrders / (stats.totalOrders || 1)) * 100)}% success rate`}
          changeType="positive"
          icon={TrendingUp}
          iconColor="bg-secondary/10 text-secondary"
          delay={0.3}
        />
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
        {/* Daily Trend Line Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Daily Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dailyTrend}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                          <XAxis dataKey="name" className="text-xs fill-muted-foreground" />
                          <YAxis
                            className="text-xs fill-muted-foreground"
                            tickFormatter={(value) => `₹${value / 1000}k`}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                            formatter={(value: number) => [`₹${value.toLocaleString()}`, "Revenue"]}
                          />
                          <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="hsl(var(--primary))"
                            strokeWidth={3}
                            dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                </div>

        {/* Top Selling Cakes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cake className="w-5 h-5 text-primary" />
              Top Selling Cakes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCakes.map((cake, index) => (
                <motion.div
                  key={cake.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground">
                    #{index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{cake.name}</p>
                    <p className="text-xs text-muted-foreground">{cake.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">{cake.sold} sold</p>
                    <p className="text-xs text-muted-foreground">₹{cake.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
        {/* Monthly Trend Line Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyTrend}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                          <XAxis dataKey="name" className="text-xs fill-muted-foreground" />
                          <YAxis
                            className="text-xs fill-muted-foreground"
                            tickFormatter={(value) => `₹${value / 1000}k`}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                            formatter={(value: number) => [`₹${value.toLocaleString()}`, "Revenue"]}
                          />
                          <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="hsl(var(--primary))"
                            strokeWidth={3}
                            dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                </div>
        {/* Category Distribution Pie Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Cakes by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
