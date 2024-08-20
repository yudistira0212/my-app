import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function PUT(request: Request) {
  const { id, judul, text, gambar, url_gambar, user_id } = await request.json();

  const pengumuman = await prisma.pengumuman.findUnique({
    where: { id },
  });

  if (!pengumuman) {
    return NextResponse.json(
      { error: "Pengumuman not found" },
      { status: 404 }
    );
  }

  try {
    console.log(id, judul, text, gambar, url_gambar, user_id);

    const updatePengumuman = await prisma.pengumuman.update({
      where: { id },
      data: {
        judul,
        text,
        gambar,
        url_gambar,
        user_id,
      },
    });
    return NextResponse.json(updatePengumuman, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update pengmumuan" },
      { status: 500 }
    );
  }
}
