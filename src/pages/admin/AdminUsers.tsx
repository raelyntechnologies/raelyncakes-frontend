import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { format, isValid } from "date-fns";
import {
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import API_URL from "@/config/api";

const AdminUsers = () => {
  const { toast } = useToast();

  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/users/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(localStorage.getItem("access_token") && {
              "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            })
          }
        });
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (error: any) {
        toast({
          title: "Failed to fetch users",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: users.length };
    users.forEach((user) => {
      counts[user.status] = (counts[user.status] || 0) + 1;
    });
    return counts;
  }, [users]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        String(user.id).toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.includes(searchQuery);
      return matchesSearch;
    });
  }, [users, searchQuery, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">User Management</h1>
        <p className="text-muted-foreground">Track and manage all users</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by users ID or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant={statusFilter === "all" ? "default" : "outline"}
          onClick={() => setStatusFilter("all")}
        >
          All Users ({statusCounts.all})
        </Button>
      </div>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading users...
            </div>
          ) : (
            <>
              {filteredUsers.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  {users.length === 0 ? "No users yet" : "No users match your filters"}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Date of Birth</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(filteredUsers ?? []).map((user, index) => {
                      const deliveryDate = user.delivery_date ? new Date(user.delivery_date) : null;
                      const deliveryDateText = deliveryDate && isValid(deliveryDate)
                        ? format(deliveryDate, "MMM d, yyyy")
                        : "Invalid date";
                      const items = user.items ?? [];

                      return (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.03 }}
                          className="border-b transition-colors data-[state=selected]:bg-muted hover:bg-muted/50"
                        >
                          <TableCell className="font-mono text-sm">
                            {String(user.id).slice(0, 8)}
                          </TableCell>
                          <TableCell>
                            <div>
                              <p>{user.name}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p>{user.phone}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p>{user.dateofbirth}</p>
                            </div>
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

export default AdminUsers;
