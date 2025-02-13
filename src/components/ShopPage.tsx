
import { useState } from "react";
import { Button } from "./ui/button";
import { ShoppingCart, Heart, Menu } from "lucide-react";

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

export const ShopPage = () => {
  const [cartCount, setCartCount] = useState(0);

  return (
    <div className="min-h-screen">
      <nav className="glass sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button className="lg:hidden">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold">Premium Tech</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
                <Heart className="w-6 h-6" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-xs font-medium rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
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
                  onClick={() => setCartCount(cartCount + 1)}
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
