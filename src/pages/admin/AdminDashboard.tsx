import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  IndianRupee,
  ShoppingBag,
  Cake,
  Users,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectOrders, updateOrderStatus } from "@/store/orderSlice";
import { selectAllCakes } from "@/store/cakeSlice";
import { OrderStatus } from "@/types/order";
import StatsCard from "@/components/admin/StatsCard";
import RecentOrdersTable from "@/components/admin/RecentOrdersTable";
import RevenueChart from "@/components/admin/RevenueChart";

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const cakes = useAppSelector(selectAllCakes);

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

  const handleUpdateStatus = (orderId: string, status: OrderStatus) => {
    const messages: Record<OrderStatus, string> = {
      pending: "Order placed",
      confirmed: "Order confirmed by bakery",
      baking: "Your cake is being baked with love",
      out_for_delivery: "Order is out for delivery",
      delivered: "Order delivered successfully",
      cancelled: "Order has been cancelled",
    };

    dispatch(updateOrderStatus({ orderId, status, message: messages[status] }));
  };

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
        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <RevenueChart data={revenueData} />
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

      {/* Recent Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Orders</CardTitle>
          <a
            href="/admin/orders"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            View All <ArrowUpRight className="w-4 h-4" />
          </a>
        </CardHeader>
        <CardContent>
          <RecentOrdersTable orders={orders} onUpdateStatus={handleUpdateStatus} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
