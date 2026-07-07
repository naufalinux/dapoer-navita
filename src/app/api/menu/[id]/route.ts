import { NextResponse } from "next/server";
import { db } from "@/db";
import { menuItems } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const existing = await db.select().from(menuItems).where(eq(menuItems.id, id));
    
    if (existing.length === 0) {
      return NextResponse.json({ success: false, message: "Menu item not found" }, { status: 404 });
    }

    await db.update(menuItems)
      .set({ ...body })
      .where(eq(menuItems.id, id));

    const updated = await db.select().from(menuItems).where(eq(menuItems.id, id));
    return NextResponse.json({ success: true, data: updated[0] });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    const existing = await db.select().from(menuItems).where(eq(menuItems.id, id));
    
    if (existing.length === 0) {
      return NextResponse.json({ success: false, message: "Menu item not found" }, { status: 404 });
    }

    await db.delete(menuItems).where(eq(menuItems.id, id));
    
    return NextResponse.json({ success: true, data: existing[0] });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
