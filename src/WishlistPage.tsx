
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export const WishlistPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const email = location.state?.email;
  const wishlistItems = location.state?.wishlistItems || [];
  
  if (!email) {
    return <Navigate to="/" replace />;
  }

  const removeFromWishlist = (productId: number) => {
    navigate('/shop', { 
      state: { 
        email,
        wishlistItems: wishlistItems.filter((item: Product) => item.id !== productId)
      }
    });
    toast({
      title: "Removed from Wishlist",
      description: "Item has been removed from your wishlist",
    });
  };

  const addToCart = (product: Product) => {
    navigate('/shop', { 
      state: { 
        email,
        addToCart: product,
        wishlistItems
      }
    });
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Wishlist</h1>
        <Button
          variant="ghost"
          onClick={() => navigate('/shop', { state: { email, wishlistItems } })}
        >
          Back to Shop
        </Button>
      </div>
      {wishlistItems.length === 0 ? (
        <p className="text-center text-white/60">Your wishlist is empty</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item: Product) => (
            <div
              key={item.id}
              className="glass rounded-xl overflow-hidden"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-white/60">${item.price}</p>
                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
