import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  const { id, nama, sks, waktu_mulai, waktu_selesai, dosen_id, ruangan } =
    await request.json();

  const classes = await prisma.class.findUnique({
    where: { id },
  });
  if (!classes) {
    return NextResponse.json(
      { error: "Pengumuman not found" },
      { status: 404 }
    );
  }

  try {
    console.log(sks);

    const updatedClass = await prisma.class.update({
      where: { id },
      data: {
        nama,
        sks: Number(sks),
        waktu_mulai,
        waktu_selesai,
        dosen_id,
        ruangan,
      },
    });
    return NextResponse.json(updatedClass, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update class" },
      { status: 500 }
    );
  }
}
