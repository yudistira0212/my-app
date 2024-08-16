import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function PATCH(request: Request) {
  const { mahasiswaId, classId } = await request.json();

  const mahasiswa_id: number = Number(mahasiswaId);
  const class_id: number = Number(classId);
  // Dapatkan data kelas berdasarkan ID
  const classData = await prisma.class.findUnique({
    where: { id: classId },
  });

  if (!classData) {
    return NextResponse.json(
      { error: "Class tidak ditemukan" },
      { status: 500 }
    );
  }

  const now = new Date();

  // Cek apakah waktu absen valid berdasarkan waktu kelas
  if (now < classData.waktu_mulai) {
    return NextResponse.json({ error: "Kelas Belum dimulai" }, { status: 500 });
  }

  if (now > classData.waktu_selesai) {
    return NextResponse.json({ error: "Kelas Telah Selesai" }, { status: 500 });
  }

  // Cek apakah mahasiswa sudah absen untuk kelas ini
  const sudahAbsen = await prisma.absen.findFirst({
    where: {
      mahasiswa_id,
      class_id,
    },
  });

  if (sudahAbsen) {
    return NextResponse.json({ error: "Anda Sudah Absen" }, { status: 500 });
  }

  try {
    const absen = await prisma.absen.create({
      data: {
        mahasiswa_id,
        class_id,
        waktu_absen: now,
      },
    });
    return NextResponse.json(absen, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal absen" }, { status: 500 });
  }
}
