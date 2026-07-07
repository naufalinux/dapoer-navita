"use client";

import { useState, useEffect } from "react";
import { Save, Bot, ServerCrash, AlertCircle, SlidersHorizontal } from "lucide-react";

export default function ChatbotSettings() {
  const [systemPrompt, setSystemPrompt] = useState(
    "Anda adalah asisten AI ramah untuk Dapoer Navita. Anda harus sopan, tidak menjanjikan diskon fiktif, dan selalu arahkan pelanggan untuk memasukkan pesanan ke keranjang."
  );
  const [isFailoverActive, setIsFailoverActive] = useState(false);
  const [temperature, setTemperature] = useState(0.2);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/settings/chatbot")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setSystemPrompt(data.data.systemPrompt || "");
          setIsFailoverActive(data.data.isFailoverActive || false);
          setTemperature(data.data.temperature !== undefined ? data.data.temperature : 0.2);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleSave = async () => {
    try {
      const res = await fetch("/api/settings/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ systemPrompt, isFailoverActive, temperature }),
      });
      if (res.ok) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
      }
    } catch (error) {
      console.error("Failed to save settings", error);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-foreground/60">Loading settings...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-serif text-foreground">AI Chatbot Settings</h1>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
        >
          <Save className="w-4 h-4" />
          {isSaved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="grid gap-6">
        {/* System Prompt Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                <Bot className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold font-serif text-foreground">System Prompt & Store Context</h2>
            </div>
            <p className="text-sm text-foreground/70">
              Update this context to inform the AI about today's menu, out-of-stock items, or active promotions. The chatbot will use this information to answer customer queries.
            </p>
          </div>
          <div className="p-6">
            <textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              rows={8}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono transition-all resize-y"
              placeholder="Enter system prompt here..."
            />
            <div className="mt-3 flex items-center gap-2 text-xs text-foreground/50">
              <AlertCircle className="w-4 h-4" />
              <span>Changes take effect immediately for all new chat sessions.</span>
            </div>
          </div>
        </div>

        {/* Temperature Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/10 text-blue-600 rounded-lg">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold font-serif text-foreground">Model Temperature</h2>
            </div>
            <p className="text-sm text-foreground/70">
              Control the creativity of the AI responses. Lower values (0.0 - 0.3) make the AI more factual and focused, ideal for customer service. Higher values make it more creative but prone to hallucination.
            </p>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-foreground/80">Factual</span>
              <span className="font-bold text-primary">{temperature.toFixed(2)}</span>
              <span className="text-sm font-medium text-foreground/80">Creative</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>

        {/* Failover Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-secondary/10 text-secondary rounded-lg">
                <ServerCrash className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold font-serif text-foreground">API Redundancy Control</h2>
            </div>
            <p className="text-sm text-foreground/70">
              Manage failover settings in case the primary Gemini 2.5 Flash API becomes unresponsive.
            </p>
          </div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">Manual Failover to Qwen 3</h3>
              <p className="text-sm text-foreground/60 mt-1 max-w-md">
                Force the chatbot to bypass Gemini and use the Qwen 3 API endpoint. Only activate this if you notice prolonged downtime from the primary provider.
              </p>
            </div>
            <button 
              onClick={() => setIsFailoverActive(!isFailoverActive)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2 ${isFailoverActive ? 'bg-secondary' : 'bg-gray-300'}`}
            >
              <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${isFailoverActive ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>
          {isFailoverActive && (
            <div className="px-6 pb-6 pt-2">
              <div className="bg-secondary/10 border border-secondary/20 text-secondary px-4 py-3 rounded-lg text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p>
                  <strong>Warning:</strong> The system is currently forcing all traffic to the secondary Qwen 3 endpoint. Response times and styling may vary slightly.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
