import { NextResponse } from "next/server";
import { mockDb } from "@/lib/mockDb";

export async function GET() {
  return NextResponse.json({ success: true, data: mockDb.orders });
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
      status: "Pending" as const,
      date: new Date().toISOString().split("T")[0],
    };
    
    // Add to the beginning of the list
    mockDb.orders.unshift(newOrder);
    
    return NextResponse.json({ success: true, data: newOrder }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Invalid request body" }, { status: 400 });
  }
}
