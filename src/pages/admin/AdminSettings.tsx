import { useState } from "react";
import { motion } from "framer-motion";
import {
  Store,
  Bell,
  CreditCard,
  Truck,
  Clock,
  Save,
  RotateCcw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const AdminSettings = () => {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    storeName: "Raelyn Cakes",
    storeEmail: "hello@raelyncakes.com",
    storePhone: "+91 98765 43210",
    storeAddress: "23/5, Eraviputhenthurai, Thoothoor (PO), Kanyakumari, Tamil Nadu 629176",
    minOrderAmount: 300,
    deliveryFee: 50,
    freeDeliveryAbove: 1000,
    maxDeliveryRadius: 10,
    openingTime: "10:00",
    closingTime: "20:00",
    acceptCOD: true,
    acceptUPI: true,
    emailNotifications: true,
    smsNotifications: true,
    orderConfirmation: true,
    deliveryUpdates: true,
  });

  const handleSave = () => {
    localStorage.setItem("raelyn_settings", JSON.stringify(settings));
    toast({ title: "Settings saved successfully!" });
  };

  const handleReset = () => {
    localStorage.removeItem("raelyn_settings");
    toast({ title: "Settings reset to defaults" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your store configuration</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="w-5 h-5 text-primary" />
                Store Information
              </CardTitle>
              <CardDescription>Basic details about your bakery</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="storeName">Store Name</Label>
                <Input
                  id="storeName"
                  value={settings.storeName}
                  onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeEmail">Email</Label>
                <Input
                  id="storeEmail"
                  type="email"
                  value={settings.storeEmail}
                  onChange={(e) => setSettings({ ...settings, storeEmail: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storePhone">Phone</Label>
                <Input
                  id="storePhone"
                  value={settings.storePhone}
                  onChange={(e) => setSettings({ ...settings, storePhone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeAddress">Address</Label>
                <Textarea
                  id="storeAddress"
                  value={settings.storeAddress}
                  onChange={(e) => setSettings({ ...settings, storeAddress: e.target.value })}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Delivery Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-secondary" />
                Delivery Settings
              </CardTitle>
              <CardDescription>Configure delivery options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minOrder">Min Order (₹)</Label>
                  <Input
                    id="minOrder"
                    type="number"
                    value={settings.minOrderAmount}
                    onChange={(e) =>
                      setSettings({ ...settings, minOrderAmount: Number(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryFee">Delivery Fee (₹)</Label>
                  <Input
                    id="deliveryFee"
                    type="number"
                    value={settings.deliveryFee}
                    onChange={(e) =>
                      setSettings({ ...settings, deliveryFee: Number(e.target.value) })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="freeDelivery">Free Delivery Above (₹)</Label>
                  <Input
                    id="freeDelivery"
                    type="number"
                    value={settings.freeDeliveryAbove}
                    onChange={(e) =>
                      setSettings({ ...settings, freeDeliveryAbove: Number(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxRadius">Max Radius (km)</Label>
                  <Input
                    id="maxRadius"
                    type="number"
                    value={settings.maxDeliveryRadius}
                    onChange={(e) =>
                      setSettings({ ...settings, maxDeliveryRadius: Number(e.target.value) })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Business Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Business Hours
              </CardTitle>
              <CardDescription>Set your operating hours</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="openingTime">Opening Time</Label>
                  <Input
                    id="openingTime"
                    type="time"
                    value={settings.openingTime}
                    onChange={(e) => setSettings({ ...settings, openingTime: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="closingTime">Closing Time</Label>
                  <Input
                    id="closingTime"
                    type="time"
                    value={settings.closingTime}
                    onChange={(e) => setSettings({ ...settings, closingTime: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-secondary" />
                Payment Methods
              </CardTitle>
              <CardDescription>Enable payment options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">UPI Payments</p>
                  <p className="text-sm text-muted-foreground">Accept PhonePe, GPay, etc.</p>
                </div>
                <Switch
                  checked={settings.acceptUPI}
                  onCheckedChange={(checked) => setSettings({ ...settings, acceptUPI: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Cash on Delivery</p>
                  <p className="text-sm text-muted-foreground">Accept cash at delivery</p>
                </div>
                <Switch
                  checked={settings.acceptCOD}
                  onCheckedChange={(checked) => setSettings({ ...settings, acceptCOD: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notifications
              </CardTitle>
              <CardDescription>Configure notification preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Channels</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Email Notifications</p>
                      <p className="text-xs text-muted-foreground">Receive updates via email</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, emailNotifications: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">SMS Notifications</p>
                      <p className="text-xs text-muted-foreground">Receive updates via SMS</p>
                    </div>
                    <Switch
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, smsNotifications: checked })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Events</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Order Confirmation</p>
                      <p className="text-xs text-muted-foreground">When a new order is placed</p>
                    </div>
                    <Switch
                      checked={settings.orderConfirmation}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, orderConfirmation: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Delivery Updates</p>
                      <p className="text-xs text-muted-foreground">Status change notifications</p>
                    </div>
                    <Switch
                      checked={settings.deliveryUpdates}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, deliveryUpdates: checked })
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminSettings;
