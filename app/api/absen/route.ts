import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(request: Request) {
  const { mahasiswaNim, classId } = await request.json();

  let mahasiswa_id: number = 0;
  const class_id: number = Number(classId);
  // Dapatkan data kelas berdasarkan ID

  const mahasiswa = await prisma.mahasiswa.findUnique({
    where: { nim: mahasiswaNim },
  });

  const classData = await prisma.class.findUnique({
    where: { id: class_id },
  });

  if (!mahasiswa) {
    return NextResponse.json(
      { error: "Mahasiswa tidak ditemukan" },
      { status: 404 }
    );
  }

  mahasiswa_id = mahasiswa.id;

  if (!classData) {
    return NextResponse.json(
      { error: "Class tidak ditemukan" },
      { status: 404 }
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

export async function GET() {
  try {
    const absen = await prisma.absen.findMany({
      include: {
        mahasiswa: true,
        class: true,
      },
      orderBy: {
        waktu_absen: "desc",
      },
    });
    return NextResponse.json(absen, { status: 200 });
  } catch (error) {
    console.log("error get data absen : ", error);
    return NextResponse.json(
      { error: "Gagal mendapatkan data absensi" },
      { status: 500 }
    );
  }
}
