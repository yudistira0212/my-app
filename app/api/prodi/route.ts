import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// get all

export async function GET() {
  try {
    const prodi = await prisma.prodi.findMany();
    return NextResponse.json(prodi, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch prodi:", error);
    return NextResponse.json(
      { error: "Failed to fetch prodi" },
      { status: 500 }
    );
  }
}
// creat prodi
export async function POST(request: Request) {
  const body = await request.json();

  try {
    const updatedProdi = await prisma.prodi.create({
      data: {
        nama: body.data.nama,
        deskripsi: body.data.deskripsi,
        visi: body.data.visi,
        misi: body.data.misi,
        tujuan: body.data.tujuan,
        sejarah: body.data.sejarah,
        info_lainnya: body.data.info_lainnya,
        logo_prodi: body.data.logo_prodi,
        url_logo_prodi: body.data.url_logo_prodi,
        logo_universitas: body.data.logo_universitas,
        url_logo_universitas: body.data.url_logo_universitas,
      },
    });

    return NextResponse.json(updatedProdi, { status: 201 });
  } catch (error) {
    console.error("Error updating Prodi:", error);
    return NextResponse.json(
      { error: "Failed to update Prodi" },
      { status: 500 }
    );
  }
}
