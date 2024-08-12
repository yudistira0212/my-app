import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// get all

export async function GET() {
  try {
    const pengumuman = await prisma.pengumuman.findMany();
    console.log(pengumuman);

    return NextResponse.json(pengumuman, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch pengumuman:", error);
    return NextResponse.json(
      { error: "Failed to fetch pengumuman" },
      { status: 500 }
    );
  }
}
// creat pengumuman
export async function POST(request: Request) {
  const { judul, text, gambar, url_gambar, user_id } = await request.json();

  // Validate required fields
  if (!judul || !text || !gambar) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const pengumuman = await prisma.pengumuman.create({
      data: {
        judul,
        text,
        gambar,
        url_gambar,
        user_id,
      },
    });

    return NextResponse.json(pengumuman, { status: 201 });
  } catch (error) {
    console.error("Failed to create pengumuman:", error);
    return NextResponse.json(
      { error: "Failed to create pengumuman" },
      { status: 500 }
    );
  }
}
