"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, X } from "lucide-react";

type MenuItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
  image: string;
};

const initialMenu: MenuItem[] = [
  { id: "1", name: "Nasi Ayam Geprek Mozarella", category: "Rice Bowl", price: 25000, inStock: true, image: "/images/nasi_ayam_geprek_1783444096844.png" },
  { id: "2", name: "Cumi Cabe Ijo Rice Bowl", category: "Rice Bowl", price: 25000, inStock: true, image: "/images/cumi_cabe_ijo_1783444106607.png" },
  { id: "3", name: "Nasi Box Nasi Uduk Telor", category: "Nasi Box", price: 17000, inStock: false, image: "/images/nasi_box_uduk_1783444115219.png" },
  { id: "4", name: "Tahu Berontak", category: "Gorengan", price: 11000, inStock: true, image: "/images/tahu_berontak_1783444124629.png" },
];

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenu);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleStock = (id: string) => {
    setMenuItems(items => items.map(item => item.id === id ? { ...item, inStock: !item.inStock } : item));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-serif text-foreground">Menu Management</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add New Item
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-foreground/60 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Item Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">In Stock</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {menuItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-foreground">{item.name}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">Rp {item.price.toLocaleString("id-ID")}</td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => toggleStock(item.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 ${item.inStock ? 'bg-primary' : 'bg-gray-300'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${item.inStock ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-secondary hover:bg-secondary/10 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold font-serif text-foreground">Add Menu Item</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-foreground/50 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">Item Name</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="e.g. Nasi Uduk" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1">Category</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white transition-all">
                    <option>Rice Bowl</option>
                    <option>Nasi Box</option>
                    <option>Gorengan</option>
                    <option>Camilan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1">Price (Rp)</label>
                  <input type="number" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="15000" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">Image URL</label>
                <input type="url" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="https://example.com/image.jpg" />
              </div>
              <div className="pt-4 flex gap-3 justify-end">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg font-medium text-foreground/70 hover:bg-gray-100 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-lg font-medium bg-primary hover:bg-primary/90 text-white transition-colors shadow-sm">
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
