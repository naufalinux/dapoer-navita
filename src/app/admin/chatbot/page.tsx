"use client";

import { useState } from "react";
import { Save, Bot, ServerCrash, AlertCircle } from "lucide-react";

export default function ChatbotSettings() {
  const [systemPrompt, setSystemPrompt] = useState(
    "Anda adalah asisten AI untuk Dapoer Navita, sebuah bisnis katering dan rice bowl di Bogor.\nMenu kami hari ini:\n- Nasi Ayam Geprek (Rp 25.000)\n- Cumi Cabe Ijo (Rp 25.000)\n- Nasi Box Uduk (Rp 17.000)\n\nPromo Hari Ini: Gratis Tahu Berontak untuk pembelian di atas Rp 100.000."
  );
  const [isFailoverActive, setIsFailoverActive] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

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
