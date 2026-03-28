import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Eye, MoreHorizontal } from "lucide-react";
import { Order, OrderStatus } from "@/types/order";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface RecentOrdersTableProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
}

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  baking: "bg-orange-100 text-orange-800 border-orange-200",
  out_for_delivery: "bg-purple-100 text-purple-800 border-purple-200",
  delivered: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

const statusLabels: Record<OrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  baking: "Baking",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const RecentOrdersTable = ({ orders, onUpdateStatus }: RecentOrdersTableProps) => {
  const navigate = useNavigate();

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No orders yet
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.slice(0, 10).map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-mono text-sm">
              #{String(order.id).slice(0, 8)}
            </TableCell>
            {/* <TableCell>
              <div>
                <p className="font-medium">{order.address.name}</p>
                <p className="text-xs text-muted-foreground">{order.address.phone}</p>
              </div>
            </TableCell> */}
            {/* <TableCell>
              {order.items.length} item{order.items.length > 1 ? "s" : ""}
            </TableCell> */}
            <TableCell className="font-semibold">₹{order.total}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={cn("border", statusColors[order.status])}
              >
                {statusLabels[order.status]}
              </Badge>
            </TableCell>
            {/* <TableCell className="text-sm text-muted-foreground">
              {format(new Date(order.created_at), "MMM d, h:mm a")}
            </TableCell> */}
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
                  {order.status === "pending" && (
                    <DropdownMenuItem onClick={() => onUpdateStatus(String(order.id), "confirmed")}>
                      Confirm Order
                    </DropdownMenuItem>
                  )}
                  {order.status === "confirmed" && (
                    <DropdownMenuItem onClick={() => onUpdateStatus(String(order.id), "baking")}>
                      Start Baking
                    </DropdownMenuItem>
                  )}
                  {order.status === "baking" && (
                    <DropdownMenuItem onClick={() => onUpdateStatus(String(order.id), "out_for_delivery")}>
                      Out for Delivery
                    </DropdownMenuItem>
                  )}
                  {order.status === "out_for_delivery" && (
                    <DropdownMenuItem onClick={() => onUpdateStatus(String(order.id), "delivered")}>
                      Mark Delivered
                    </DropdownMenuItem>
                  )}
                  {order.status !== "cancelled" && order.status !== "delivered" && (
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => onUpdateStatus(String(order.id), "cancelled")}
                    >
                      Cancel Order
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RecentOrdersTable;
