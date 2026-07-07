"use client";

import { useState, useEffect } from "react";
import { Store, Clock, Save } from "lucide-react";
import { StoreSchedule } from "@/db/schema";

const defaultSchedule: StoreSchedule = {
  monday: { isOpen: true, open: '09:00', close: '21:00' },
  tuesday: { isOpen: true, open: '09:00', close: '21:00' },
  wednesday: { isOpen: true, open: '09:00', close: '21:00' },
  thursday: { isOpen: true, open: '09:00', close: '21:00' },
  friday: { isOpen: true, open: '09:00', close: '21:00' },
  saturday: { isOpen: true, open: '09:00', close: '21:00' },
  sunday: { isOpen: false, open: '09:00', close: '21:00' },
};

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;

export default function StoreSettings() {
  const [isStoreOpen, setIsStoreOpen] = useState(true);
  const [schedule, setSchedule] = useState<StoreSchedule>(defaultSchedule);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/settings/store")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setIsStoreOpen(json.data.isStoreOpen);
          setSchedule(json.data.schedule || defaultSchedule);
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
        body: JSON.stringify({ isStoreOpen, schedule })
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

  const handleScheduleChange = (day: keyof StoreSchedule, field: 'isOpen' | 'open' | 'close', value: any) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6 max-w-5xl">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center space-y-4 md:col-span-1">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center ${isStoreOpen ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            <Store className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground mb-1">Global Override</h2>
            <p className="text-sm text-foreground/60 mb-6">Master switch for emergencies or holidays.</p>
            
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
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Weekly Schedule</h2>
              <p className="text-sm text-foreground/60">Set daily opening hours and open/closed status.</p>
            </div>
          </div>

          <div className="space-y-4">
            {daysOfWeek.map((day) => (
              <div key={day} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
                <div className="flex items-center gap-4 w-1/3">
                  <button
                    onClick={() => handleScheduleChange(day, 'isOpen', !schedule[day].isOpen)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                      schedule[day].isOpen ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        schedule[day].isOpen ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className="font-medium text-foreground capitalize">{day}</span>
                </div>

                <div className={`flex items-center gap-3 transition-opacity ${schedule[day].isOpen ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                  <input
                    type="time"
                    value={schedule[day].open}
                    onChange={(e) => handleScheduleChange(day, 'open', e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium"
                  />
                  <span className="text-foreground/50">to</span>
                  <input
                    type="time"
                    value={schedule[day].close}
                    onChange={(e) => handleScheduleChange(day, 'close', e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
