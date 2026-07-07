"use client";

import { useCart } from "@/context/CartContext";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, totalPrice, storeSettings } = useCart();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    const isClosed = storeSettings && !storeSettings.isStoreOpen;
    const header = isClosed 
      ? "Halo Dapoer Navita, saya ingin *Pre-Order* untuk jadwal buka selanjutnya:"
      : "Halo Dapoer Navita, saya ingin memesan:";

    const message = items
      .map((item) => `${item.quantity}x ${item.name} - Rp ${(item.price * item.quantity).toLocaleString("id-ID")}`)
      .join("%0A");
    const total = `Total: Rp ${totalPrice.toLocaleString("id-ID")}`;
    
    const whatsappUrl = `https://wa.me/6282213302131?text=${header}%0A${message}%0A%0A${total}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity" 
        onClick={() => setIsCartOpen(false)}
      />
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col transform transition-transform">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-xl font-serif font-bold text-foreground flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Your Order
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-foreground/50">
              <ShoppingBag className="w-16 h-16 mb-4 opacity-50" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-xl">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm leading-tight text-foreground">{item.name}</h3>
                    <p className="text-secondary font-semibold text-sm">Rp {item.price.toLocaleString("id-ID")}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 bg-white rounded-lg border border-gray-200 px-2 py-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="hover:text-primary transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold text-sm w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= (item.stockQuantity || 0)}
                        className={`transition-colors ${item.quantity >= (item.stockQuantity || 0) ? "text-gray-300 cursor-not-allowed" : "hover:text-primary"}`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-gray-500 mb-1">Max: {item.stockQuantity || 0}</span>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-foreground/70">Total</span>
              <span className="text-2xl font-bold text-primary">
                Rp {totalPrice.toLocaleString("id-ID")}
              </span>
            </div>
            <button 
              onClick={handleCheckout}
              className={`w-full text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg ${
                storeSettings?.isStoreOpen 
                  ? "bg-secondary hover:bg-secondary/90 shadow-secondary/30" 
                  : "bg-orange-500 hover:bg-orange-600 shadow-orange-500/30"
              }`}
            >
              {storeSettings?.isStoreOpen ? "Order via WhatsApp" : "Pre-Order via WhatsApp"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
