import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  IndianRupee,
  ShoppingBag,
  Users,
  Cake,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/store/hooks";
import { selectOrders } from "@/store/orderSlice";
import { selectAllCakes } from "@/store/cakeSlice";
import StatsCard from "@/components/admin/StatsCard";
import { Order } from "@/types/order";

const COLORS = ["#E91E8C", "#26A69A", "#FFB800", "#7C3AED", "#F97316", "#10B981"];

const AdminAnalytics = () => {
  const orders = useAppSelector(selectOrders);
  const cakes = useAppSelector(selectAllCakes);

  // Revenue by day
  const dailyRevenue = useMemo(() => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const baseData = days.map((day) => ({
    name: day,
    revenue: 0,
    orders: 0,
    avgOrderValue: 0,
  }));

  // Handle empty orders array
  if (!orders?.length) return baseData;

  orders.forEach((order: Order) => {
    // Safe date parsing with fallback
    const orderDate = new Date(order.created_at);
    if (isNaN(orderDate.getTime())) return; // Skip invalid dates
    
    const dayIndex = orderDate.getDay(); // 0=Sun, 1=Mon...6=Sat
    const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1; // Mon=0...Sun=6
    
    baseData[adjustedIndex].revenue += order.total || 0;
    baseData[adjustedIndex].orders += 1;
  });

  // Calculate AOV and format
  return baseData.map((day) => ({
    ...day,
    avgOrderValue: day.orders > 0 ? (day.revenue / day.orders).toFixed(0) : 0,
    revenueFormatted: day.revenue.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }),
  }));
}, [orders]);

  // Category distribution
  const categoryData = useMemo(() => {
    const categories: Record<string, number> = {};
    cakes.forEach((cake) => {
      categories[cake.category] = (categories[cake.category] || 0) + 1;
    });
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, [cakes]);

  // Order status distribution
  const statusData = useMemo(() => {
    const statuses: Record<string, number> = {};
    orders.forEach((order) => {
      statuses[order.status] = (statuses[order.status] || 0) + 1;
    });
    return Object.entries(statuses).map(([name, value]) => ({
      name: name.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      value,
    }));
  }, [orders]);

  // Monthly trend (mock)
  const monthlyTrend = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    return months.map((month) => ({
      name: month,
      revenue: Math.floor(Math.random() * 200000) + 100000,
      orders: Math.floor(Math.random() * 100) + 50,
    }));
  }, []);

  // Top occasions
  const occasionData = useMemo(() => {
    const occasions: Record<string, number> = {};
    cakes.forEach((cake) => {
      cake.occasion.forEach((occ) => {
        occasions[occ] = (occasions[occ] || 0) + 1;
      });
    });
    return Object.entries(occasions)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [cakes]);

  // Stats calculations
  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== "cancelled" ? o.total : 0), 0);
    const avgOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;
    const deliveredCount = orders.filter((o) => o.status === "delivered").length;
    const conversionRate = orders.length > 0 ? Math.round((deliveredCount / orders.length) * 100) : 0;

    return { totalRevenue, avgOrderValue, conversionRate };
  }, [orders]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">Insights and performance metrics</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          change="+18% from last month"
          changeType="positive"
          icon={IndianRupee}
          iconColor="bg-green-100 text-green-600"
          delay={0}
        />
        <StatsCard
          title="Average Order Value"
          value={`₹${stats.avgOrderValue}`}
          change="+5% from last month"
          changeType="positive"
          icon={ShoppingBag}
          iconColor="bg-blue-100 text-blue-600"
          delay={0.1}
        />
        <StatsCard
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          change="Orders delivered successfully"
          changeType="neutral"
          icon={TrendingUp}
          iconColor="bg-primary/10 text-primary"
          delay={0.2}
        />
        <StatsCard
          title="Active Products"
          value={cakes.length}
          change={`${cakes.filter((c) => c.bestseller).length} bestsellers`}
          changeType="neutral"
          icon={Cake}
          iconColor="bg-secondary/10 text-secondary"
          delay={0.3}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Revenue Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyRevenue}>
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
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

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

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        {/* Occasions Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Occasions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={occasionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis type="number" className="text-xs fill-muted-foreground" />
                  <YAxis
                    type="category"
                    dataKey="name"
                    className="text-xs fill-muted-foreground"
                    width={80}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="value" fill="hsl(var(--secondary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Status Distribution */}
      {statusData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="name" className="text-xs fill-muted-foreground" />
                  <YAxis className="text-xs fill-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminAnalytics;
