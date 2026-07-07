import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const data = await db.select().from(orders).orderBy(desc(orders.date));
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.customerName || !body.phone || !body.items || !body.total) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const newOrder = {
      id: `ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: body.customerName,
      phone: body.phone,
      items: body.items,
      total: Number(body.total),
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
    };
    
    await db.insert(orders).values(newOrder);
    
    return NextResponse.json({ success: true, data: newOrder }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Invalid request body" }, { status: 400 });
  }
}
