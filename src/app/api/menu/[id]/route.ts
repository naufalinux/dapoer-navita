import { NextResponse } from "next/server";
import { mockDb } from "@/lib/mockDb";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const index = mockDb.menuItems.findIndex((item) => item.id === id);
    
    if (index === -1) {
      return NextResponse.json({ success: false, message: "Menu item not found" }, { status: 404 });
    }

    mockDb.menuItems[index] = {
      ...mockDb.menuItems[index],
      ...body,
    };

    return NextResponse.json({ success: true, data: mockDb.menuItems[index] });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const index = mockDb.menuItems.findIndex((item) => item.id === id);
  
  if (index === -1) {
    return NextResponse.json({ success: false, message: "Menu item not found" }, { status: 404 });
  }

  const deletedItem = mockDb.menuItems.splice(index, 1)[0];
  return NextResponse.json({ success: true, data: deletedItem });
}
