import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
    }

    // Validation: Type
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ success: false, message: "Invalid file type. Only JPG, PNG, and WebP are allowed." }, { status: 400 });
    }

    // Validation: Size (2MB)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ success: false, message: "File is too large. Maximum size is 2MB." }, { status: 400 });
    }

    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    
    // Upload to Vercel Blob
    const blob = await put(`uploads/${fileName}`, file, {
      access: 'public',
    });

    return NextResponse.json({ 
      success: true, 
      url: blob.url,
      localUrl: blob.url // Kept for backward compatibility if the frontend still references localUrl
    }, { status: 201 });
    
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
