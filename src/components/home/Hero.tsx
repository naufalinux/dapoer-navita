"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Hero() {
  const { storeSettings } = useCart();
  
  return (
    <section className="relative bg-accent/10 py-20 overflow-hidden">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 z-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-block py-1 px-3 rounded-full bg-secondary/10 text-secondary font-semibold text-sm">
              #1 Catering in Bogor
            </span>
            {storeSettings && (
              <div className={`inline-flex items-center gap-2 py-1 px-3 rounded-full font-semibold text-sm border ${
                storeSettings.isStoreOpen 
                  ? "bg-green-50 text-green-700 border-green-200" 
                  : "bg-red-50 text-red-700 border-red-200"
              }`}>
                <span className="relative flex h-3 w-3">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    storeSettings.isStoreOpen ? "bg-green-400" : "bg-red-400"
                  }`}></span>
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${
                    storeSettings.isStoreOpen ? "bg-green-500" : "bg-red-500"
                  }`}></span>
                </span>
                {storeSettings.isStoreOpen 
                  ? `Open Now (${storeSettings.openingTime} - ${storeSettings.closingTime})`
                  : `Currently Closed (Opens at ${storeSettings.openingTime})`}
              </div>
            )}
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground leading-tight">
            Taste the Authentic <br />
            <span className="text-primary">Indonesian Flavors</span>
          </h1>
          <p className="text-lg text-foreground/80 max-w-lg">
            From daily catering to our highly popular rice bowls. Fresh ingredients, rich spices, and unforgettable taste delivered to your door.
          </p>
          <div className="flex gap-4 pt-4">
            <Link href="#menu" className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-lg shadow-secondary/30">
              Order Now
            </Link>
            <Link href="#about" className="bg-white hover:bg-gray-50 text-foreground border border-gray-200 px-8 py-3 rounded-full font-medium transition-colors">
              Our Story
            </Link>
          </div>
        </div>
        <div className="relative h-[400px] w-full z-10 hidden md:block">
          {/* Decorative background circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/40 rounded-full blur-3xl -z-10"></div>
          {/* Main Hero Image */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
            <Image 
              src="/images/nasi_ayam_geprek_1783444096844.png" 
              alt="Nasi Ayam Geprek" 
              fill 
              className="object-cover" 
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
