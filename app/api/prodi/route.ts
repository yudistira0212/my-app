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

  console.log(body);

  try {
    const updatedProdi = await prisma.prodi.create({
      data: {
        nama: body.nama,
        deskripsi: body.deskripsi,
        visi_misi: body.visi_misi,
        sejarah: body.sejarah,
        info_lainnya: body.info_lainnya,
        logo_prodi: body.logo_prodi,
        url_logo_prodi: body.url_logo_prodi,
        logo_universitas: body.logo_universitas,
        url_logo_universitas: body.url_logo_universitas,
      },
    });

    return NextResponse.json(updatedProdi, { status: 201 });
  } catch (error) {
    console.error("Error updating Prodi:", error);
    return NextResponse.json(
      { message: "Failed to update Prodi" },
      { status: 500 }
    );
  }
}
