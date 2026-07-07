"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { MenuItem } from "@/data/menu";
import { StoreSchedule } from "@/db/schema";

export type CartItem = MenuItem & { quantity: number };

type CartContextType = {
  items: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  totalItems: number;
  totalPrice: number;
  storeSettings: { isStoreOpen: boolean; schedule: StoreSchedule } | null;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [storeSettings, setStoreSettings] = useState<{ isStoreOpen: boolean; schedule: StoreSchedule } | null>(null);

  useEffect(() => {
    fetch("/api/settings/store")
      .then(res => res.json())
      .then(json => {
        if (json.success) setStoreSettings(json.data);
      })
      .catch(err => console.error("Failed to fetch store settings", err));
  }, []);

  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem("dapoer_navita_cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart data", e);
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("dapoer_navita_cart", JSON.stringify(items));
    }
  }, [items, isMounted]);

  const addItem = (item: MenuItem) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((i) => i.id === item.id);
      const maxQty = item.stockQuantity || 0;
      
      if (existingItem) {
        if (existingItem.quantity >= maxQty) return currentItems;
        return currentItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      
      if (maxQty < 1) return currentItems;
      return [...currentItems, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((currentItems) => currentItems.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    setItems((currentItems) =>
      currentItems.map((i) => {
        if (i.id === id) {
          const maxQty = i.stockQuantity || 0;
          return { ...i, quantity: quantity > maxQty ? maxQty : quantity };
        }
        return i;
      })
    );
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        setIsCartOpen,
        addItem,
        removeItem,
        updateQuantity,
        totalItems,
        totalPrice,
        storeSettings,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
