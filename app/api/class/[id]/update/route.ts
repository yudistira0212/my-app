import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function PUT(request: Request) {
  const { id, nama, sks, waktu_mulai, waktu_selesai, dosen_id } =
    await request.json();
  try {
    console.log(id, nama, sks, waktu_mulai, waktu_selesai, dosen_id);

    const updatedClass = await prisma.class.update({
      where: { id },
      data: {
        nama,
        sks,
        waktu_mulai,
        waktu_selesai,
        dosen_id,
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
