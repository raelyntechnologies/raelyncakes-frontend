import { useState, useEffect } from "react";
import { Cake } from "@/types/cake";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CakeFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cake?: Cake | null;
  onSave: (cake: Cake) => void;
}

const categories = ["Chocolate", "Red Velvet", "Vanilla", "Fruit", "Black Forest", "Butterscotch", "Special"];
const occasions = ["Birthday", "Anniversary", "Wedding", "Party", "Valentine", "Baby Shower", "Gift", "Corporate", "Farewell"];

const defaultCake: Partial<Cake> = {
  name: "",
  category: "Chocolate",
  occasion: [],
  price: 0,
  weights: [0.5, 1],
  rating: 4.5,
  reviewCount: 0,
  image: "/placeholder.svg",
  description: "",
  bestseller: false,
  eggless: false,
  sugarFree: false,
};

const CakeFormDialog = ({ open, onOpenChange, cake, onSave }: CakeFormDialogProps) => {
  const [formData, setFormData] = useState<Partial<Cake>>(defaultCake);
  const [weightsInput, setWeightsInput] = useState("0.5, 1");

  useEffect(() => {
    if (cake) {
      setFormData(cake);
      setWeightsInput(cake.weights.join(", "));
    } else {
      setFormData(defaultCake);
      setWeightsInput("0.5, 1");
    }
  }, [cake, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const weights = weightsInput
      .split(",")
      .map((w) => parseFloat(w.trim()))
      .filter((w) => !isNaN(w));

    const newCake: Cake = {
      id: cake?.id || `cake-${Date.now()}`,
      name: formData.name || "",
      category: formData.category || "Chocolate",
      occasion: formData.occasion || [],
      price: formData.price || 0,
      weights: weights.length > 0 ? weights : [0.5, 1],
      rating: formData.rating || 4.5,
      reviewCount: formData.reviewCount || 0,
      image: formData.image || "/placeholder.svg",
      description: formData.description || "",
      bestseller: formData.bestseller || false,
      eggless: formData.eggless || false,
      sugarFree: formData.sugarFree || false,
    };

    onSave(newCake);
    onOpenChange(false);
  };

  const toggleOccasion = (occasion: string) => {
    const current = formData.occasion || [];
    const updated = current.includes(occasion)
      ? current.filter((o) => o !== occasion)
      : [...current, occasion];
    setFormData({ ...formData, occasion: updated });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{cake ? "Edit Cake" : "Add New Cake"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Cake Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Belgian Truffle Delight"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                placeholder="899"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weights">Weights (kg, comma-separated)</Label>
              <Input
                id="weights"
                value={weightsInput}
                onChange={(e) => setWeightsInput(e.target.value)}
                placeholder="0.5, 1, 2, 3"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Occasions</Label>
            <div className="flex flex-wrap gap-2">
              {occasions.map((occasion) => (
                <Button
                  key={occasion}
                  type="button"
                  variant={formData.occasion?.includes(occasion) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleOccasion(occasion)}
                >
                  {occasion}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Luxurious Belgian chocolate layers with silky ganache..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="/cakes/chocolate-truffle.jpg"
            />
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="bestseller"
                checked={formData.bestseller}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, bestseller: checked as boolean })
                }
              />
              <Label htmlFor="bestseller">Bestseller</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="eggless"
                checked={formData.eggless}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, eggless: checked as boolean })
                }
              />
              <Label htmlFor="eggless">Eggless</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="sugarFree"
                checked={formData.sugarFree}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, sugarFree: checked as boolean })
                }
              />
              <Label htmlFor="sugarFree">Sugar-Free</Label>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{cake ? "Update Cake" : "Add Cake"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CakeFormDialog;
