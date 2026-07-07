"use client";

import { useState, useEffect } from "react";
import { Store, Clock, Save } from "lucide-react";

export default function StoreSettings() {
  const [isStoreOpen, setIsStoreOpen] = useState(true);
  const [openingTime, setOpeningTime] = useState("09:00");
  const [closingTime, setClosingTime] = useState("21:00");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/settings/store")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setIsStoreOpen(json.data.isStoreOpen);
          setOpeningTime(json.data.openingTime);
          setClosingTime(json.data.closingTime);
        }
      });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/settings/store", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isStoreOpen, openingTime, closingTime })
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Store settings updated successfully.");
      } else {
        setMessage("Failed to update settings.");
      }
    } catch (e) {
      setMessage("An error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-serif text-foreground">Store Settings</h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-semibold transition-colors shadow-sm disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {isSaving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      {message && (
        <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 font-medium">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center space-y-4">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center ${isStoreOpen ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            <Store className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground mb-1">Store Status</h2>
            <p className="text-sm text-foreground/60 mb-6">Manually override the store status.</p>
            
            <button
              onClick={() => setIsStoreOpen(!isStoreOpen)}
              className={`relative inline-flex h-10 w-20 items-center rounded-full transition-colors focus:outline-none ${
                isStoreOpen ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-8 w-8 transform rounded-full bg-white transition-transform ${
                  isStoreOpen ? 'translate-x-11' : 'translate-x-1'
                }`}
              />
            </button>
            <div className="mt-4 font-bold text-lg">
              {isStoreOpen ? <span className="text-green-600">Currently OPEN</span> : <span className="text-red-600">Currently CLOSED</span>}
            </div>
          </div>
        </div>

        {/* Operating Hours Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Operating Hours</h2>
              <p className="text-sm text-foreground/60">Set the daily opening and closing times.</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">Opening Time</label>
              <input
                type="time"
                value={openingTime}
                onChange={(e) => setOpeningTime(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-lg font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">Closing Time</label>
              <input
                type="time"
                value={closingTime}
                onChange={(e) => setClosingTime(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-lg font-medium"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
