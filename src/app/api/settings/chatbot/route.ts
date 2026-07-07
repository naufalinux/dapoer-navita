import { NextResponse } from "next/server";
import { mockDb } from "@/lib/mockDb";

export async function GET() {
  return NextResponse.json({ success: true, data: mockDb.settings });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Update settings
    if (body.systemPrompt !== undefined) {
      mockDb.settings.systemPrompt = body.systemPrompt;
    }
    
    if (body.isFailoverActive !== undefined) {
      mockDb.settings.isFailoverActive = body.isFailoverActive;
    }
    
    return NextResponse.json({ success: true, data: mockDb.settings });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Invalid request body" }, { status: 400 });
  }
}
