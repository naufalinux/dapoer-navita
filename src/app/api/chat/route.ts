import { NextResponse } from "next/server";
import { db } from "@/db";
import { settings } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ success: false, message: "Invalid messages format" }, { status: 400 });
    }

    const lastUserMessage = messages[messages.length - 1]?.text || "";
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Fetch settings from DB
    const settingsData = await db.select().from(settings).where(eq(settings.id, 1));
    const currentSettings = settingsData[0] || { isFailoverActive: false, systemPrompt: "" };

    const aiEngine = currentSettings.isFailoverActive ? "Qwen 3 (Failover)" : "Gemini 2.5 Flash-lite";

    let responseText = `[Powered by ${aiEngine}]\n\nTerima kasih atas pesannya! `;
    
    // Simple mock logic based on keywords
    if (lastUserMessage.toLowerCase().includes("menu") || lastUserMessage.toLowerCase().includes("makanan")) {
      responseText += "Tentu, kami memiliki Nasi Ayam Geprek, Cumi Cabe Ijo, dan Nasi Box Uduk. Ada yang ingin Anda pesan?";
    } else if (lastUserMessage.toLowerCase().includes("promo")) {
      responseText += "Promo kami hari ini: Gratis Tahu Berontak untuk pembelian di atas Rp 100.000!";
    } else {
      responseText += "Saat ini fitur AI Chatbot sedang dalam tahap simulasi. Untuk pemesanan, silakan tambahkan ke keranjang dan checkout melalui WhatsApp!";
    }

    return NextResponse.json({ 
      success: true, 
      data: {
        id: Date.now().toString(),
        sender: "bot",
        text: responseText
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
