import { NextResponse } from "next/server";
import { db } from "@/db";
import { settings } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const config = await db.select().from(settings).where(eq(settings.id, 1));
    
    if (config.length === 0) {
      return NextResponse.json({ success: false, message: "Settings not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        isStoreOpen: config[0].isStoreOpen,
        openingTime: config[0].openingTime,
        closingTime: config[0].closingTime,
      }
    });
  } catch (error) {
    console.error("Failed to fetch store settings:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { isStoreOpen, openingTime, closingTime } = body;

    const updateData: any = {};
    if (isStoreOpen !== undefined) updateData.isStoreOpen = isStoreOpen;
    if (openingTime !== undefined) updateData.openingTime = openingTime;
    if (closingTime !== undefined) updateData.closingTime = closingTime;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ success: false, message: "No fields to update" }, { status: 400 });
    }

    await db.update(settings).set(updateData).where(eq(settings.id, 1));

    return NextResponse.json({ success: true, message: "Store settings updated" });
  } catch (error) {
    console.error("Failed to update store settings:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
