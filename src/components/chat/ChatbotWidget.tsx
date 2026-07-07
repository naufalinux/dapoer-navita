"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ReactMarkdown from 'react-markdown';

type Message = {
  id: string;
  sender: "user" | "bot";
  text: string;
};

export default function ChatbotWidget() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-message",
      sender: "bot",
      text: "Halo! Selamat datang di Dapoer Navita. Ada yang bisa saya bantu hari ini?",
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userText = input;
    setInput("");
    
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: userText };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Convert to format expected by AI SDK
      const apiMessages = newMessages.map(m => ({
        role: m.sender === 'bot' ? 'assistant' : 'user',
        content: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages })
      });

      if (!res.ok) throw new Error("API Error");

      const botMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: botMsgId, sender: 'bot', text: '' }]);

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) return;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last.id === botMsgId) {
            return [...prev.slice(0, -1), { ...last, text: last.text + chunk }];
          }
          return prev;
        });
      }
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'bot', text: 'Maaf, terjadi kesalahan saat menghubungi server.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isAdmin) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] h-[500px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 transform origin-bottom-right transition-all">
          {/* Header */}
          <div className="bg-accent p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-white overflow-hidden p-1 shadow-sm">
                <Image src="/logo.png" alt="Chatbot" fill className="object-contain" />
              </div>
              <div>
                <h3 className="font-bold text-foreground leading-tight">Navita Assistant</h3>
                <span className="text-xs text-foreground/70 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span> Online
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 text-foreground/60 hover:text-foreground hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[85%] p-3 rounded-2xl text-sm prose prose-sm ${
                    msg.sender === "user" 
                      ? "bg-primary text-white rounded-tr-sm prose-invert" 
                      : "bg-white text-foreground border border-gray-100 shadow-sm rounded-tl-sm prose-p:my-1 prose-li:my-0.5"
                  }`}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-sm p-3">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleFormSubmit} className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanya menu hari ini..." 
              className="flex-1 bg-gray-100 text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
              disabled={isLoading}
            />
            <button 
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2 bg-secondary text-white rounded-full hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}

      {/* FAB */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 ${
          isOpen ? "bg-gray-200 text-foreground" : "bg-primary text-white"
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
}
