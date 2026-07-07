"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { categories, menuData } from "@/data/menu";
import { useCart } from "@/context/CartContext";

export default function MenuCatalog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { addItem } = useCart();

  const filteredMenu =
    activeCategory === "All"
      ? menuData
      : menuData.filter((item) => item.category.includes(activeCategory));

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

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMenu.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group flex flex-col"
            >
              <div className="relative h-64 w-full overflow-hidden shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
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
                <p className="text-sm text-foreground/70 mb-6 line-clamp-2 flex-1">
                  {item.description}
                </p>
                <button 
                  onClick={() => addItem(item)}
                  className="w-full flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary text-primary hover:text-white py-3 rounded-xl font-semibold transition-colors mt-auto"
                >
                  <Plus className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
