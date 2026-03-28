import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Star,
  Filter,
  RotateCcw,
} from "lucide-react";
import { Cake } from "@/types/cake";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectAllCakes, addCake, updateCake, deleteCake, resetCakes } from "@/store/cakeSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import CakeFormDialog from "@/components/admin/CakeFormDialog";
import { useToast } from "@/hooks/use-toast";

const AdminCakes = () => {
  const dispatch = useAppDispatch();
  const cakes = useAppSelector(selectAllCakes);
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingCake, setEditingCake] = useState<Cake | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cakeToDelete, setCakeToDelete] = useState<Cake | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(cakes.map((c) => c.category));
    return ["all", ...Array.from(cats)];
  }, [cakes]);

  const filteredCakes = useMemo(() => {
    return cakes.filter((cake) => {
      const matchesSearch =
        cake.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cake.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "all" || cake.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [cakes, searchQuery, categoryFilter]);

  const handleSaveCake = (cake: Cake) => {
    if (editingCake) {
      dispatch(updateCake(cake));
      toast({ title: "Cake updated successfully!" });
    } else {
      dispatch(addCake(cake));
      toast({ title: "Cake added successfully!" });
    }
    setEditingCake(null);
  };

  const handleEditClick = (cake: Cake) => {
    setEditingCake(cake);
    setFormOpen(true);
  };

  const handleDeleteClick = (cake: Cake) => {
    setCakeToDelete(cake);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (cakeToDelete) {
      dispatch(deleteCake(cakeToDelete.id));
      toast({ title: "Cake deleted successfully!", variant: "destructive" });
      setCakeToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleReset = () => {
    dispatch(resetCakes());
    toast({ title: "Cake catalog reset to defaults" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cake Management</h1>
          <p className="text-muted-foreground">Manage your cake catalog</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button
            onClick={() => {
              setEditingCake(null);
              setFormOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Cake
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search cakes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat: string) => (
              <SelectItem key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="flex gap-4 text-sm text-muted-foreground">
        <span>Showing {filteredCakes.length} of {cakes.length} cakes</span>
      </div>

      {/* Cake Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCakes.map((cake, index) => (
          <motion.div
            key={cake.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="group hover:shadow-lifted transition-all duration-300 overflow-hidden">
              <div className="aspect-square relative bg-muted">
                <img
                  src={cake.image}
                  alt={cake.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
                {cake.bestseller && (
                  <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground">
                    Bestseller
                  </Badge>
                )}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="icon-sm"
                    variant="secondary"
                    onClick={() => handleEditClick(cake)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon-sm"
                    variant="destructive"
                    onClick={() => handleDeleteClick(cake)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-sm line-clamp-1">{cake.name}</h3>
                    <span className="font-bold text-primary">₹{cake.price}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {cake.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {cake.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {cake.rating}
                    </div>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {cake.eggless && (
                      <Badge variant="secondary" className="text-xs">Eggless</Badge>
                    )}
                    {cake.sugarFree && (
                      <Badge variant="secondary" className="text-xs">Sugar-Free</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredCakes.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No cakes found matching your criteria
        </div>
      )}

      {/* Form Dialog */}
      <CakeFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        cake={editingCake}
        onSave={handleSaveCake}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Cake</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{cakeToDelete?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminCakes;
