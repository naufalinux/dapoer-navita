import { NextResponse } from "next/server";
import { db } from "@/db";
import { settings } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const data = await db.select().from(settings).where(eq(settings.id, 1));
    if (data.length === 0) {
      return NextResponse.json({ success: true, data: { systemPrompt: "", isFailoverActive: false } });
    }
    return NextResponse.json({ success: true, data: data[0] });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const existing = await db.select().from(settings).where(eq(settings.id, 1));
    
    if (existing.length === 0) {
      await db.insert(settings).values({
        id: 1,
        systemPrompt: body.systemPrompt || "",
        isFailoverActive: body.isFailoverActive || false,
      });
    } else {
      const updateData: any = {};
      if (body.systemPrompt !== undefined) updateData.systemPrompt = body.systemPrompt;
      if (body.isFailoverActive !== undefined) updateData.isFailoverActive = body.isFailoverActive;
      
      await db.update(settings).set(updateData).where(eq(settings.id, 1));
    }
    
    const updated = await db.select().from(settings).where(eq(settings.id, 1));
    return NextResponse.json({ success: true, data: updated[0] });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Invalid request body" }, { status: 400 });
  }
}
