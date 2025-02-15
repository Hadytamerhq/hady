
import { useLocation, Navigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const WishlistPage = () => {
  const location = useLocation();
  const { toast } = useToast();
  const email = location.state?.email;
  
  if (!email) {
    return <Navigate to="/" replace />;
  }

  // This is just a placeholder - in a real app, we'd use a wishlist context or state management
  const wishlistItems = [];

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p className="text-center text-white/60">Your wishlist is empty</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item: any) => (
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
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
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
