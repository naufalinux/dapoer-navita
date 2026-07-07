import { db } from "@/db";
import { settings, menuItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid messages format" }), { status: 400 });
    }

    // Fetch settings and menu context
    const settingsData = await db.select().from(settings).where(eq(settings.id, 1));
    const currentSettings = settingsData[0] || { isFailoverActive: false, systemPrompt: "", temperature: 0.2 };
    
    const menuData = await db.select().from(menuItems);
    
    // Dynamically inject inventory and pricing
    let dynamicPrompt = currentSettings.systemPrompt;
    if (menuData.length > 0) {
      dynamicPrompt += "\n\n--- INVENTORY & PRICING CONTEXT ---\nHere is the current real-time menu availability:\n";
      menuData.forEach(item => {
        dynamicPrompt += `- ${item.name} (${item.category}): Rp ${item.price} - ${item.inStock && item.stockQuantity > 0 ? `In Stock (${item.stockQuantity} available)` : "OUT OF STOCK"}\n`;
      });
      dynamicPrompt += "\nImportant Rules for AI: Use this information to accurately answer customer queries. Do not offer items that are OUT OF STOCK. Do not promise prices or discounts different from what is listed here unless explicitly instructed otherwise in the system prompt. Keep answers concise, friendly, and helpful.";
    }

    let model;
    if (currentSettings.isFailoverActive) {
      // Qwen Failover via OpenAI compatible endpoint
      const openai = createOpenAI({
        apiKey: process.env.QWEN_API_KEY || '',
        baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
      });
      model = openai('qwen-plus');
    } else {
      // Primary: Gemini
      const google = createGoogleGenerativeAI({
        apiKey: process.env.GEMINI_API_KEY || '',
      });
      model = google('gemini-2.5-flash');
    }

    const result = streamText({
      model,
      messages,
      system: dynamicPrompt,
      temperature: currentSettings.temperature !== undefined ? currentSettings.temperature : 0.2,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
