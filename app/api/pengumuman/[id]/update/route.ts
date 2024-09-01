import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { judul, text, gambar, url_gambar, user_id } = await request.json();

  const pengumuman = await prisma.pengumuman.findUnique({
    where: { id: Number(id) },
  });

  if (!pengumuman) {
    return NextResponse.json(
      { error: "Pengumuman not found" },
      { status: 404 }
    );
  }

  try {
    const updatePengumuman = await prisma.pengumuman.update({
      where: { id: Number(id) },
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
