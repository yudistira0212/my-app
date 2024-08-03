import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Validate if ID is a valid number
  if (isNaN(Number(id))) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const {
    nama,
    jabatan,
    prodi,
    biografi,
    publikasi,
    kontak,
    pendidikan,
    url_gambar,
    gambar,
    prodi_id,
  } = await request.json();

  try {
    // Check if the dosen exists before updating
    const existingDosen = await prisma.dosen.findUnique({
      where: { id: Number(id) },
    });

    if (!existingDosen) {
      return NextResponse.json({ error: "Dosen not found" }, { status: 404 });
    }

    const dosen = await prisma.dosen.update({
      where: { id: Number(id) },
      data: {
        nama,
        jabatan,
        prodi,
        biografi,
        kontak,
        pendidikan,
        url_gambar,
        gambar,
        publikasi,
        prodi_id,
      },
    });

    return NextResponse.json(dosen, { status: 200 });
  } catch (error) {
    console.error("Failed to update dosen:", error);
    return NextResponse.json(
      { error: "Failed to update dosen" },
      { status: 500 }
    );
  }
}
