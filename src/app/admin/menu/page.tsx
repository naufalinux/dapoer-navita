"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, X, Upload } from "lucide-react";

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

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Rice Bowl");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("0");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const fetchMenu = async () => {
    const res = await fetch("/api/menu");
    const json = await res.json();
    if (json.success) setMenuItems(json.data);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const resetForm = () => {
    setEditingItem(null);
    setName("");
    setCategory("Rice Bowl");
    setPrice("");
    setStockQuantity("0");
    setDescription("");
    setImageFile(null);
    setImagePreview("");
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setName(item.name);
    setCategory(item.category);
    setPrice(item.price.toString());
    setStockQuantity(item.stockQuantity.toString());
    setDescription(item.description);
    setImageFile(null);
    setImagePreview(item.image);
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File is too large. Maximum size is 2MB.");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const toggleStock = async (item: MenuItem) => {
    const res = await fetch(`/api/menu/${item.id}`, {
      method: "PATCH",
      body: JSON.stringify({ inStock: !item.inStock }),
      headers: { "Content-Type": "application/json" }
    });
    if (res.ok) fetchMenu();
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    const res = await fetch(`/api/menu/${id}`, { method: "DELETE" });
    if (res.ok) fetchMenu();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    let finalImageUrl = editingItem?.image || "";

    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (uploadData.success) {
        finalImageUrl = uploadData.url;
      } else {
        alert(uploadData.message || "Failed to upload image");
        setIsUploading(false);
        return;
      }
    }

    const payload = {
      name,
      category,
      price: Number(price),
      stockQuantity: Number(stockQuantity),
      description,
      image: finalImageUrl,
    };

    if (editingItem) {
      await fetch(`/api/menu/${editingItem.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" }
      });
    } else {
      await fetch("/api/menu", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" }
      });
    }

    setIsUploading(false);
    setIsModalOpen(false);
    fetchMenu();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-serif text-foreground">Menu Management</h1>
        <button 
          onClick={openAddModal}
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
                <th className="px-6 py-4">Stock Qty</th>
                <th className="px-6 py-4">In Stock</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {menuItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-foreground">{item.name}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">Rp {item.price.toLocaleString("id-ID")}</td>
                  <td className="px-6 py-4 font-medium text-foreground/70">{item.stockQuantity}</td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => toggleStock(item)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 ${item.inStock ? 'bg-primary' : 'bg-gray-300'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${item.inStock ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEditModal(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteItem(item.id)} className="p-2 text-secondary hover:bg-secondary/10 rounded-lg transition-colors">
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold font-serif text-foreground">{editingItem ? "Edit Menu Item" : "Add Menu Item"}</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-foreground/50 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form className="p-6 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">Item Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1">Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white transition-all">
                    <option>Rice Bowl</option>
                    <option>Nasi Box</option>
                    <option>Gorengan</option>
                    <option>Camilan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1">Price (Rp)</label>
                  <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">Stock Quantity</label>
                <input type="number" value={stockQuantity} onChange={e => setStockQuantity(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" rows={2} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">Image Upload (Max 2MB)</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <div className="relative w-32 h-32 mx-auto mb-4">
                        <Image src={imagePreview} alt="Preview" fill className="object-cover rounded-lg" />
                      </div>
                    ) : (
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    )}
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                        <span>Upload a file</span>
                        <input type="file" className="sr-only" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, WebP up to 2MB</p>
                  </div>
                </div>
              </div>
              <div className="pt-4 flex gap-3 justify-end sticky bottom-0 bg-white">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg font-medium text-foreground/70 hover:bg-gray-100 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isUploading} className="px-4 py-2 rounded-lg font-medium bg-primary hover:bg-primary/90 text-white transition-colors shadow-sm disabled:opacity-50">
                  {isUploading ? "Saving..." : "Save Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
