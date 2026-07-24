import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Konfigurasi Cloudinary menggunakan Environment Variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload buffer ke Cloudinary menggunakan Promise
      const uploadResult: any = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "biolinkgweh" }, // Nama folder di dalam Cloudinary (opsional)
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );
        uploadStream.end(buffer);
      });

      // Simpan URL publik dari Cloudinary
      uploadedUrls.push(uploadResult.secure_url);
    }

    return NextResponse.json({ urls: uploadedUrls });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { message: "Gagal upload gambar ke cloud" },
      { status: 500 },
    );
  }
}
