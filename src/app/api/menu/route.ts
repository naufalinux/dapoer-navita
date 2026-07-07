import { NextResponse } from "next/server";
import { db } from "@/db";
import { menuItems } from "@/db/schema";

export async function GET() {
  try {
    const data = await db.select().from(menuItems);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch menu items" }, { status: 500 });
  }
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
    
    await db.insert(menuItems).values(newItem);
    
    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Invalid request body" }, { status: 400 });
  }
}
