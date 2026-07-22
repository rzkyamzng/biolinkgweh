import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { message: "Tidak ada file dikirim" },
        { status: 400 },
      );
    }

    const uploadedUrls: string[] = [];
    const uploadDir = path.join(process.cwd(), "public/uploads");

    // Pastikan folder public/uploads ada
    await mkdir(uploadDir, { recursive: true });

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Beri nama unik agar tidak bentrok
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const filePath = path.join(uploadDir, filename);

      await writeFile(filePath, buffer);
      uploadedUrls.push(`/uploads/${filename}`);
    }

    return NextResponse.json({ urls: uploadedUrls });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { message: "Gagal upload gambar" },
      { status: 500 },
    );
  }
}
