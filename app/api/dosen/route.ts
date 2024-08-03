import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// get all

export async function GET() {
  try {
    const dosen = await prisma.dosen.findMany();
    return NextResponse.json(dosen, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch dosen:", error);
    return NextResponse.json(
      { error: "Failed to fetch dosen" },
      { status: 500 }
    );
  }
}
// creat dosen
export async function POST(request: Request) {
  const {
    nama,
    jabatan,
    biografi,
    kontak,
    pendidikan,
    publikasi,
    url_gambar,
    gambar,
    prodi_id,
  } = await request.json();

  // Validate required fields
  if (!nama || !jabatan || !prodi_id) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const dosen = await prisma.dosen.create({
      data: {
        nama,
        jabatan,
        biografi,
        kontak,
        pendidikan,
        publikasi,
        url_gambar,
        gambar,
        prodi_id,
      },
    });

    return NextResponse.json(dosen, { status: 201 });
  } catch (error) {
    console.error("Failed to create dosen:", error);
    return NextResponse.json(
      { error: "Failed to create dosen" },
      { status: 500 }
    );
  }
}
