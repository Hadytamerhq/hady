
import { useLocation, Navigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { specialOffers } from './data/offers';

export const OffersPage = () => {
  const location = useLocation();
  const { toast } = useToast();
  const email = location.state?.email;
  
  if (!email) {
    return <Navigate to="/" replace />;
  }

  const handleAddToCart = (offer: any) => {
    // This is just a placeholder - in a real app, we'd use a cart context or state management
    toast({
      title: "Added to Cart",
      description: `${offer.name} has been added to your cart`,
    });
  };

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Special Offers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {specialOffers.map((offer) => (
          <div
            key={offer.id}
            className="glass rounded-xl overflow-hidden group animate-fadeIn"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={offer.image}
                alt={offer.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-medium">{offer.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-primary">
                  ${offer.price}
                </span>
                <span className="text-sm text-white/60 line-through">
                  ${offer.originalPrice}
                </span>
              </div>
              <Button
                onClick={() => handleAddToCart(offer)}
                className="w-full"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
