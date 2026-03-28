import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectCartItems,
  selectCartTotal,
  selectIsCartOpen,
  closeCart,
  updateQuantity,
  removeFromCart,
} from "@/store/cartSlice";
import { Link } from "react-router-dom";

// Import cake images

//Classy
import vanillaDream from "@/assets/cakes/classy/vanilla.jpg";
import blackforestClassic from "@/assets/cakes/classy/blackforest.jpg";
import whiteforest from "@/assets/cakes/classy/whiteforest.jpg";
import redVelvetDrip from "@/assets/cakes/classy/red-velvet.jpg";
import purpleVelvet from "@/assets/cakes/classy/purple-velvet.jpg";

//Yummy
import vanchoCake from "@/assets/cakes/yummy/vancho-cake.jpg";
import coffeeCake from "@/assets/cakes/yummy/coffee-cake.jpg";
import tenderCoconutCake from "@/assets/cakes/yummy/tender-coconut.jpg";
import rainbowCake from "@/assets/cakes/yummy/rainbow-cake.jpg";

//Fruity
import fruitMango from "@/assets/cakes/fruity/mango.jpg";
import fruitOrange from "@/assets/cakes/fruity/orange.jpg";
import fruitStrawberry from "@/assets/cakes/fruity/strawberry.jpg";
import fruitBlueberry from "@/assets/cakes/fruity/blueberry.jpg";
import fruitBlackcurrant from "@/assets/cakes/fruity/blackcurrant.jpg";
import fruitPineapple from "@/assets/cakes/fruity/pineapple.jpg";
import fruitKiwi from "@/assets/cakes/fruity/kiwi.jpg";
import fruitMixed from "@/assets/cakes/fruity/mixed-fruits.jpg";

//Nutty
import butterscotch from "@/assets/cakes/nutty/butterscotch.jpg";
import nuttyBubble from "@/assets/cakes/nutty/bubble.jpg";
import cassata from "@/assets/cakes/nutty/cassata.jpg";
import neapolitan from "@/assets/cakes/nutty/neapolitan.jpg";
import pistachio from "@/assets/cakes/nutty/pistachio.jpg";
import raffaello from "@/assets/cakes/nutty/raffaello.jpg";
import rosemilk from "@/assets/cakes/nutty/rose-milk-almond.jpg";
import rasamalai from "@/assets/cakes/nutty/rasamalai.jpg";
import honeyAlmond from "@/assets/cakes/nutty/honey-almond.jpg";
import spanishDelight from "@/assets/cakes/nutty/spanish-delight.jpg";
import redVelvetCrunch from "@/assets/cakes/nutty/red-velvet-crunch.jpg";
import purpleVelvetCrunch from "@/assets/cakes/nutty/purple-velvet-crunch.jpg";

// //Chocolaty
import chocolateCake from "@/assets/cakes/chocolaty/chocolate.jpg";
import chocolateTruffle from "@/assets/cakes/chocolaty/chocolate-truffle.jpg";
import whiteChocolate from "@/assets/cakes/chocolaty/whitechocolate.jpg";
import milkChocolate from "@/assets/cakes/chocolaty/milkchocolate.jpg";
import chocoAlmond from "@/assets/cakes/chocolaty/chocolate-almond.jpg";
import caramelChoco from "@/assets/cakes/chocolaty/caramel-choco.jpg";
import oreoCholocate from "@/assets/cakes/chocolaty/oreo-chocolate.jpg";
import chocoRedVelvet from "@/assets/cakes/chocolaty/chocolate-red-velvet.jpg";
import chocoPurpleVelvet from "@/assets/cakes/chocolaty/chocolate-purple-velvet.jpg";
import chocoPeanutButter from "@/assets/cakes/chocolaty/chocolate-peanut-butter.jpg";
import chocolateBiscoff from "@/assets/cakes/chocolaty/chocolate-biscoff.jpg";
import datesandNuts from "@/assets/cakes/chocolaty/dates-and-nuts.jpg";
import chocoNutella from "@/assets/cakes/chocolaty/chocolate-nutella.jpg";
import chocoFerrero from "@/assets/cakes/chocolaty/chocolate-ferrero.jpg";
import raffaeloWhole from "@/assets/cakes/chocolaty/raffaelo-whole.jpg";

//Browny
import brownyClassic from "@/assets/cakes/browny/browny-classic.jpg";
import fudgeOreo from "@/assets/cakes/browny/fudge-oreo.jpg";
import nutsLoaded from "@/assets/cakes/browny/nuts-loaded.jpg";
import almondBrowny from "@/assets/cakes/browny/almond-browny.jpg";
import whiteChocoChunks from "@/assets/cakes/browny/white-choco-chunks.jpg";
import tripleChocolate from "@/assets/cakes/browny/triple-chocolate.jpg";
import kitkatBrowny from "@/assets/cakes/browny/kitkat-browny.jpg";
import biscoffBrowny from "@/assets/cakes/browny/biscoff-browny.jpg";

const imageMap: Record<string, string> = {
  //Classy
  "/cakes/classy/vanilla.jpg": vanillaDream,
  "/cakes/classy/blackforest.jpg": blackforestClassic,
  "/cakes/classy/whiteforest.jpg": whiteforest,
  "/cakes/classy/red-velvet.jpg": redVelvetDrip,
  "/cakes/classy/purple-velvet.jpg": purpleVelvet,

  //Yummy
  "/cakes/yummy/vancho-cake.jpg": vanchoCake,
  "/cakes/yummy/coffee-cake.jpg": coffeeCake,
  "/cakes/yummy/tender-coconut.jpg": tenderCoconutCake,
  "/cakes/yummy/rainbow-cake.jpg": rainbowCake,

  //Fruity
  "/cakes/fruity/mango.jpg": fruitMango,
  "/cakes/fruity/orange.jpg": fruitOrange,
  "/cakes/fruity/strawberry.jpg": fruitStrawberry,
  "/cakes/fruity/blueberry.jpg": fruitBlueberry,
  "/cakes/fruity/blackcurrant.jpg": fruitBlackcurrant,
  "/cakes/fruity/pineapple.jpg": fruitPineapple,
  "/cakes/fruity/kiwi.jpg": fruitKiwi,
  "/cakes/fruity/mixed-fruits.jpg": fruitMixed,
  
  //Nutty
  "/cakes/nutty/butterscotch.jpg": butterscotch,
  "/cakes/nutty/bubble.jpg": nuttyBubble,
  "/cakes/nutty/cassata.jpg": cassata,
  "/cakes/nutty/neapolitan.jpg": neapolitan,
  "/cakes/nutty/pistachio.jpg": pistachio,
  "/cakes/nutty/raffaello.jpg": raffaello,
  "/cakes/nutty/rose-milk-almond.jpg": rosemilk,
  "/cakes/nutty/rasamalai.jpg": rasamalai,
  "/cakes/nutty/honey-almond.jpg": honeyAlmond,
  "/cakes/nutty/spanish-delight.jpg": spanishDelight,
  "/cakes/nutty/red-velvet-crunch.jpg": redVelvetCrunch,
  "/cakes/nutty/purple-velvet-crunch.jpg": purpleVelvetCrunch,

  // //Chocolaty
  "/cakes/chocolaty/chocolate.jpg": chocolateCake,
  "/cakes/chocolaty/chocolate-truffle.jpg": chocolateTruffle,
  "/cakes/chocolaty/whitechocolate.jpg": whiteChocolate,
  "/cakes/chocolaty/milkchocolate.jpg": milkChocolate,
  "/cakes/chocolaty/chocolate-almond.jpg": chocoAlmond,
  "/cakes/chocolaty/caramel-choco.jpg": caramelChoco,
  "/cakes/chocolaty/oreo-chocolate.jpg": oreoCholocate,
  "/cakes/chocolaty/chocolate-red-velvet.jpg": chocoRedVelvet,
  "/cakes/chocolaty/chocolate-purple-velvet.jpg": chocoPurpleVelvet,
  "/cakes/chocolaty/chocolate-peanut-butter.jpg": chocoPeanutButter,
  "/cakes/chocolaty/chocolate-biscoff.jpg": chocolateBiscoff,
  "/cakes/chocolaty/dates-and-nuts.jpg": datesandNuts,
  "/cakes/chocolaty/chocolate-nutella.jpg": chocoNutella,
  "/cakes/chocolaty/chocolate-ferrero.jpg": chocoFerrero,
  "/cakes/chocolaty/raffaelo-whole.jpg": raffaeloWhole,

  //Browny
  "/cakes/browny/browny-classic.jpg": brownyClassic,
  "/cakes/browny/fudge-oreo.jpg": fudgeOreo,
  "/cakes/browny/nuts-loaded.jpg": nutsLoaded,
  "/cakes/browny/almond-browny.jpg": almondBrowny,
  "/cakes/browny/white-choco-chunks.jpg": whiteChocoChunks,
  "/cakes/browny/triple-chocolate.jpg": tripleChocolate,
  "/cakes/browny/kitkat-browny.jpg": kitkatBrowny,
  "/cakes/browny/biscoff-browny.jpg": biscoffBrowny,
};

export const CartDrawer = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const isOpen = useAppSelector(selectIsCartOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeCart())}
            className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-md bg-background shadow-lifted"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">Your Cart</h2>
                    <p className="text-sm text-muted-foreground">
                      {items.length} item{items.length !== 1 && "s"}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => dispatch(closeCart())}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                      <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Your cart is empty
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Add some delicious cakes to get started!
                    </p>
                    <Button
                      variant="default"
                      className="mt-6"
                      onClick={() => dispatch(closeCart())}
                    >
                      Browse Cakes
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                      {items.map((item) => (
                        <motion.div
                          key={`${item.cake.id}-${item.weight}`}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          className="flex gap-4 rounded-xl bg-card p-4 shadow-soft"
                        >
                          <img
                            src={imageMap[item.cake.image] || vanillaDream}
                            alt={item.cake.name}
                            className="h-20 w-20 rounded-lg object-cover"
                          />
                          <div className="flex flex-1 flex-col">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold text-foreground">
                                  {item.cake.name}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {item.weight}kg
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                onClick={() =>
                                  dispatch(
                                    removeFromCart({
                                      id: item.cake.id,
                                      weight: item.weight,
                                    })
                                  )
                                }
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                            <div className="mt-auto flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon-sm"
                                  onClick={() =>
                                    dispatch(
                                      updateQuantity({
                                        id: item.cake.id,
                                        weight: item.weight,
                                        quantity: item.quantity - 1,
                                      })
                                    )
                                  }
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-6 text-center font-medium text-foreground">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="outline"
                                  size="icon-sm"
                                  onClick={() =>
                                    dispatch(
                                      updateQuantity({
                                        id: item.cake.id,
                                        weight: item.weight,
                                        quantity: item.quantity + 1,
                                      })
                                    )
                                  }
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <span className="font-semibold text-foreground">
                                ₹
                                {(
                                  item.cake.price *
                                  item.weight *
                                  item.quantity
                                ).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-border p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-xl font-bold text-foreground">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                  <Link to="/checkout" onClick={() => dispatch(closeCart())}>
                    <Button variant="hero" size="xl" className="w-full">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Free delivery on orders above ₹999
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
