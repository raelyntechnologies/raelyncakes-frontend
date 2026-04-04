import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { format, isValid } from "date-fns";
import {
  Search,
  Eye,
  MoreHorizontal,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  ChefHat,
} from "lucide-react";
import { OrderStatus } from "@/types/order";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import API_URL from "@/config/api";

const statusConfig: Record<OrderStatus, { color: string; icon: typeof Package; label: string }> = {
  pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock, label: "Pending" },
  confirmed: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: CheckCircle, label: "Confirmed" },
  baking: { color: "bg-orange-100 text-orange-800 border-orange-200", icon: ChefHat, label: "Baking" },
  out_for_delivery: { color: "bg-purple-100 text-purple-800 border-purple-200", icon: Truck, label: "Out for Delivery" },
  delivered: { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle, label: "Delivered" },
  cancelled: { color: "bg-red-100 text-red-800 border-red-200", icon: XCircle, label: "Cancelled" },
};

const defaultStatusConfig = {
  color: "bg-slate-100 text-slate-800 border-slate-200",
  icon: Clock,
  label: "Unknown",
};

const AdminOrders = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

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

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: orders.length };
    orders.forEach((order) => {
      counts[order.status] = (counts[order.status] || 0) + 1;
    });
    return counts;
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        String(order.id).toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.user_phone.includes(searchQuery);
      const matchesStatus = statusFilter === "all" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

  const handleUpdateStatus = async (orderId: string, status: OrderStatus) => {
  try {
    const res = await fetch(`${API_URL}/orders/status/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(localStorage.getItem("access_token") && {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        }),
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      throw new Error("Failed to update status");
    }

    const updatedOrder = await res.json();

    // Update local state
      setOrders((prev: any[]) =>
        prev.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );

      toast({
        title: `Order status updated to ${
          statusConfig[status]?.label || status
        }`,
      });

    } catch (error) {
      console.error(error);
      toast({
        title: "Error updating order",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Order Management</h1>
        <p className="text-muted-foreground">Track and manage all orders</p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {Object.entries(statusConfig).map(([status, config]) => {
          const Icon = config.icon;
          const count = statusCounts[status] || 0;
          const isActive = statusFilter === status;

          return (
            <Card
              key={status}
              className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                isActive && "ring-2 ring-primary"
              )}
              onClick={() => setStatusFilter(isActive ? "all" : status)}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <div className={cn("p-2 rounded-lg", config.color.split(" ")[0])}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-xs text-muted-foreground">{config.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by order ID or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant={statusFilter === "all" ? "default" : "outline"}
          onClick={() => setStatusFilter("all")}
        >
          All Orders ({statusCounts.all})
        </Button>
      </div>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading orders...
            </div>
          ) : (
            <>
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  {orders.length === 0 ? "No orders yet" : "No orders match your filters"}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Delivery</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(filteredOrders ?? []).map((order, index) => {
                      const deliveryDate = order.delivery_date ? new Date(order.delivery_date) : null;
                      const deliveryDateText = deliveryDate && isValid(deliveryDate)
                        ? format(deliveryDate, "MMM d, yyyy")
                        : "Invalid date";

                      const statusMeta = statusConfig[order.status] ?? defaultStatusConfig;
                      const StatusIcon = statusMeta.icon;
                      const items = order.items ?? [];

                      return (
                        <motion.tr
                          key={order.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.03 }}
                          className="border-b transition-colors data-[state=selected]:bg-muted hover:bg-muted/50"
                        >
                          <TableCell className="font-mono text-sm">
                            {String(order.id).slice(0, 8)}
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{order.address.name}</p>
                              <p className="font-medium">{order.user_phone}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p>{order.address.street}</p>
                              <p>{order.address.city}, {order.address.state} {order.address.pincode}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-[200px]">
                              {items.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No items</p>
                              ) : (
                                items.map((item, i) => (
                                  <p key={i} className="text-sm truncate">
                                    {item.quantity}x {item.cake_name} ({item.weight}kg)
                                  </p>
                                ))
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold">₹{order.total}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <p>{deliveryDateText}</p>
                              <p className="text-xs text-muted-foreground">{order.delivery_slot || "N/A"}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={cn("border gap-1", statusMeta.color)}
                            >
                              <StatusIcon className="w-3 h-3" />
                              {statusMeta.label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={order.payment_status === "paid" ? "default" : "secondary"}
                            >
                              {order.payment_method?.toUpperCase()} - {order.payment_status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon-sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => navigate(`/order-success/${order.id}`)}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {order.status === "pending" && (
                                  <DropdownMenuItem onClick={() => handleUpdateStatus(String(order.id), "confirmed")}>
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Confirm Order
                                  </DropdownMenuItem>
                                )}
                                {order.status === "confirmed" && (
                                  <DropdownMenuItem onClick={() => handleUpdateStatus(String(order.id), "baking")}>
                                    <ChefHat className="w-4 h-4 mr-2" />
                                    Start Baking
                                  </DropdownMenuItem>
                                )}
                                {order.status === "baking" && (
                                  <DropdownMenuItem onClick={() => handleUpdateStatus(String(order.id), "out_for_delivery")}>
                                    <Truck className="w-4 h-4 mr-2" />
                                    Out for Delivery
                                  </DropdownMenuItem>
                                )}
                                {order.status === "out_for_delivery" && (
                                  <DropdownMenuItem onClick={() => handleUpdateStatus(String(order.id), "delivered")}>
                                    <Package className="w-4 h-4 mr-2" />
                                    Mark Delivered
                                  </DropdownMenuItem>
                                )}
                                {order.status !== "cancelled" && order.status !== "delivered" && (
                                  <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      className="text-destructive"
                                      onClick={() => handleUpdateStatus(String(order.id), "cancelled")}
                                    >
                                      <XCircle className="w-4 h-4 mr-2" />
                                      Cancel Order
                                    </DropdownMenuItem>
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </motion.tr>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrders;
