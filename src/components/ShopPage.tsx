
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ShoppingCart, Heart, Menu, User, Tag, X, Edit, Save } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useLocation, Navigate } from "react-router-dom";
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
import { Input } from "./ui/input";

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

// Define Product type first
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

// Then define CartItem interface that includes all Product properties plus quantity
interface CartItem extends Product {
  quantity: number;
}

const specialOffers = [
  {
    id: 1,
    title: "Summer Sale!",
    description: "Get 20% off on all wireless devices",
    code: "SUMMER20",
  },
  {
    id: 2,
    title: "Bundle Deal",
    description: "Buy any 2 items and get 1 free",
    code: "BUNDLE2GET1",
  },
];

export const ShopPage = () => {
  const location = useLocation();
  const email = location.state?.email;
  
  // Redirect if no email is provided
  if (!email) {
    return <Navigate to="/" replace />;
  }

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [userEmail, setUserEmail] = useState(email);
  const [userName, setUserName] = useState("");
  const { toast } = useToast();

  // Extract name from email whenever it changes
  useEffect(() => {
    const name = userEmail.split("@")[0];
    setUserName(name.charAt(0).toUpperCase() + name.slice(1));
  }, [userEmail]);

  const addToWishlist = (product: Product) => {
    if (!wishlistItems.some((item) => item.id === product.id)) {
      setWishlistItems([...wishlistItems, product]);
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist`,
      });
    }
  };

  const removeFromWishlist = (productId: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== productId));
    toast({
      title: "Removed from Wishlist",
      description: "Item has been removed from your wishlist",
    });
  };

  const saveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated",
    });
  };

  const addToCart = (product: Product) => {
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
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="relative h-32 rounded-lg overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500"
                          alt="Profile Banner"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                          <h3 className="text-white font-semibold">{userName}</h3>
                          <p className="text-white/80 text-sm">{userEmail}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 bg-black/20 hover:bg-black/40"
                          onClick={() => setIsEditing(!isEditing)}
                        >
                          {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                        </Button>
                      </div>
                      {isEditing && (
                        <div className="space-y-2">
                          <Input
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            placeholder="Email"
                          />
                          <Button onClick={saveProfile} className="w-full">
                            Save Changes
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold flex items-center">
                        <Tag className="mr-2 h-4 w-4" />
                        Special Offers
                      </h3>
                      <div className="space-y-2">
                        {specialOffers.map((offer) => (
                          <div
                            key={offer.id}
                            className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                          >
                            <h4 className="font-medium">{offer.title}</h4>
                            <p className="text-sm text-white/60">
                              {offer.description}
                            </p>
                            <code className="text-xs bg-white/10 px-2 py-1 rounded mt-2 inline-block">
                              {offer.code}
                            </code>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold flex items-center">
                        <Heart className="mr-2 h-4 w-4" />
                        Wishlist ({wishlistItems.length})
                      </h3>
                      <div className="space-y-2">
                        {wishlistItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-3 p-2 rounded-lg bg-white/5"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-md object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{item.name}</p>
                              <p className="text-sm text-white/60">
                                ${item.price}
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromWishlist(item.id)}
                              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
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
                <div className="flex gap-2">
                  <Button
                    onClick={() => addToCart(product)}
                    className="flex-1 btn-primary"
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => addToWishlist(product)}
                    className={`${
                      wishlistItems.some((item) => item.id === product.id)
                        ? "bg-primary/10"
                        : ""
                    }`}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
