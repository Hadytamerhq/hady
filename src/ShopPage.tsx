
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Menu, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

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
  {
    id: 5,
    name: "Wireless Gaming Mouse",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
  },
  {
    id: 6,
    name: "4K Gaming Monitor",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500",
  },
  {
    id: 7,
    name: "Mechanical Keyboard",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500",
  },
  {
    id: 8,
    name: "Noise-Canceling Earbuds",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
  },
  {
    id: 9,
    name: "Smart Home Hub",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=500",
  },
  {
    id: 10,
    name: "Wireless Charging Pad",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1587037542794-6c5bf0e66d8b?w=500",
  },
];

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

interface CartItem extends Product {
  quantity: number;
}

export const ShopPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  
  if (!email) {
    return <Navigate to="/" replace />;
  }

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const { toast } = useToast();

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
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
    toast({
      title: "Removed from Cart",
      description: "Item has been removed from your cart",
    });
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate('/checkout', { state: { cartItems, totalPrice } });
  };

  return (
    <div className="min-h-screen">
      <nav className="glass sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold">Premium Tech</h1>
              <Button
                variant="ghost"
                onClick={() => navigate('/offers', { state: { email } })}
              >
                Special Offers
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/wishlist', { state: { email } })}
              >
                Wishlist
              </Button>
            </div>

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
                          <Button 
                            className="w-full mt-4"
                            onClick={handleCheckout}
                          >
                            Checkout
                          </Button>
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
