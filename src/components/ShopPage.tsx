
import { useState } from "react";
import { Button } from "./ui/button";
import { ShoppingCart, Heart, Menu, User, Tag, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
  },
  {
    id: 2,
    name: "Smart Watch Series X",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
  },
  {
    id: 3,
    name: "Ultra HD Camera",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500",
  },
  {
    id: 4,
    name: "Portable Speaker",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=500",
  },
];

interface CartItem extends (typeof products)[0] {
  quantity: number;
}

export const ShopPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const addToCart = (product: (typeof products)[0]) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen">
      <nav className="glass sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Sheet>
              <SheetTrigger asChild>
                <button className="lg:block p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] glass">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <div className="space-y-4">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left"
                    >
                      <Tag className="mr-2 h-4 w-4" />
                      Special Offers
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left"
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Wishlist
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="text-xl font-semibold">Premium Tech</h1>
            <div className="flex items-center space-x-4">
              <Drawer>
                <DrawerTrigger asChild>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
                    <ShoppingCart className="w-6 h-6" />
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-xs font-medium rounded-full flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </button>
                </DrawerTrigger>
                <DrawerContent className="glass">
                  <DrawerHeader>
                    <DrawerTitle>Shopping Cart</DrawerTitle>
                  </DrawerHeader>
                  <div className="px-4">
                    {cartItems.length === 0 ? (
                      <p className="text-center py-8 text-muted-foreground">
                        Your cart is empty
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {cartItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-4 py-2"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                Qty: {item.quantity} × ${item.price}
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <div className="border-t border-white/10 pt-4">
                          <div className="flex justify-between font-medium">
                            <span>Total:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                          </div>
                          <Button className="w-full mt-4">Checkout</Button>
                        </div>
                      </div>
                    )}
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="glass rounded-xl overflow-hidden group animate-fadeIn hover:scale-105 transition-transform duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-white/60">${product.price}</p>
                <Button
                  onClick={() => addToCart(product)}
                  className="w-full btn-primary"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
