import { NextResponse } from "next/server";
import { mockDb } from "@/lib/mockDb";

export async function GET() {
  return NextResponse.json({ success: true, data: mockDb.menuItems });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.name || !body.price || !body.category) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const newItem = {
      id: Date.now().toString(),
      name: body.name,
      category: body.category,
      price: Number(body.price),
      inStock: body.inStock ?? true,
      image: body.image || "/images/placeholder.png",
      description: body.description || "",
    };
    
    mockDb.menuItems.push(newItem);
    
    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Invalid request body" }, { status: 400 });
  }
}
