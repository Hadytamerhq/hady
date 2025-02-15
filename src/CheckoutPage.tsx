import { useState } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cartItems, totalPrice } = location.state || {};

  if (!cartItems) {
    return <Navigate to="/shop" replace />;
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Order Placed Successfully",
      description: "Thank you for your purchase! You will receive a confirmation email shortly.",
    });
    navigate('/shop', { state: { email: formData.email } });
  };

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm">Full Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm">Address</label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm">City</label>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm">ZIP Code</label>
                  <Input
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <h2 className="text-xl font-semibold pt-4">Payment Information</h2>
              
              <div className="space-y-2">
                <label className="text-sm">Card Number</label>
                <Input
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                  maxLength={16}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm">Expiry Date</label>
                  <Input
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm">CVV</label>
                  <Input
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    required
                    maxLength={3}
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full mt-6">
                Place Order (${totalPrice?.toFixed(2)})
              </Button>
            </form>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map((item: any) => (
                <div key={item.id} className="flex items-center space-x-4 py-2">
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
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              
              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>${totalPrice?.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
