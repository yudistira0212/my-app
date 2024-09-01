import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Dapatkan daftar absensi berdasarkan mahasiswa ID
    const absensi = await prisma.absen.findMany({
      where: {
        mahasiswa_id: Number(id),
      },
      include: {
        class: true, // Menyertakan detail kelas
      },
      orderBy: {
        waktu_absen: "desc",
      },
    });

    return NextResponse.json(absensi, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Gagal mendapatkan data absensi" },
      { status: 500 }
    );
  }
}
