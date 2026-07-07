"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

type MenuItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  stockQuantity: number;
  inStock: boolean;
  image: string;
  description: string;
};

// Categories matching the admin options
const categories = ["All", "Rice Bowl", "Nasi Box", "Gorengan", "Camilan"];

export default function MenuCatalog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addItem, storeSettings } = useCart();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch("/api/menu");
        const json = await res.json();
        if (json.success) {
          // ensure backwards compatibility with previous array structures if any
          setMenuItems(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch menu:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const filteredMenu =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category.includes(activeCategory));

  const todayIndex = new Date().getDay();
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;
  const todayKey = days[todayIndex];
  const todaySchedule = storeSettings?.schedule[todayKey];
  const isActuallyOpen = storeSettings?.isStoreOpen && todaySchedule?.isOpen;

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-primary mb-4">Our Menu</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Explore our delicious selection of authentic Indonesian dishes, prepared fresh daily with the finest ingredients.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                activeCategory === category
                  ? "bg-primary text-white shadow-md"
                  : "bg-gray-100 text-foreground/80 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          </div>
        ) : menuItems.length === 0 ? (
          <div className="text-center py-20 text-foreground/60">
            No menu items available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMenu.map((item) => {
              const isAvailable = item.inStock && item.stockQuantity > 0;

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col relative ${
                    !isAvailable ? "opacity-75 grayscale-[0.5]" : "group"
                  }`}
                >
                  {!isAvailable && (
                    <div className="absolute top-4 left-4 z-10 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      Sold Out
                    </div>
                  )}
                  
                  <div className="relative h-64 w-full overflow-hidden shrink-0">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className={`object-cover transition-transform duration-500 ${isAvailable && "group-hover:scale-105"}`}
                      />
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2 gap-4">
                      <h3 className="text-xl font-bold text-foreground font-serif leading-tight">
                        {item.name}
                      </h3>
                      <span className="text-secondary font-bold whitespace-nowrap">
                        Rp {item.price.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/70 mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-medium text-foreground/60">Stock: </span>
                        <span className={`font-bold ${isAvailable ? 'text-primary' : 'text-secondary'}`}>
                          {item.stockQuantity}
                        </span>
                      </div>
                      <button 
                        onClick={() => isAvailable && addItem(item)}
                        disabled={!isAvailable}
                        className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-colors ${
                          isAvailable 
                            ? "bg-primary/10 hover:bg-primary text-primary hover:text-white" 
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {isAvailable ? <Plus className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                        {isAvailable ? (isActuallyOpen ? "Add" : "Pre-Order") : "Out of Stock"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
