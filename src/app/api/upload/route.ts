import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs/promises";
import path from "path";

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "mock-key",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "mock-secret",
  },
});

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

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    
    // 1. Save locally for dev/testing
    const localPath = path.join(process.cwd(), "public", "uploads", fileName);
    await fs.writeFile(localPath, buffer);
    const localUrl = `/uploads/${fileName}`;

    // 2. Upload to S3 if configured
    let cloudUrl = null;
    if (process.env.AWS_S3_BUCKET && process.env.AWS_ACCESS_KEY_ID) {
      try {
        const uploadParams = {
          Bucket: process.env.AWS_S3_BUCKET,
          Key: `uploads/${fileName}`,
          Body: buffer,
          ContentType: file.type,
        };
        await s3Client.send(new PutObjectCommand(uploadParams));
        cloudUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/uploads/${fileName}`;
      } catch (s3Error) {
        console.error("S3 Upload Failed:", s3Error);
        // Continue and just use local url if S3 fails
      }
    }

    return NextResponse.json({ 
      success: true, 
      url: cloudUrl || localUrl,
      localUrl: localUrl
    }, { status: 201 });
    
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
