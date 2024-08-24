import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest, { params }: any) {
  const { id } = params;
  const body = await req.json();

  try {
    const updatedProdi = await prisma.prodi.update({
      where: { id: Number(id) },
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

    return NextResponse.json(updatedProdi, { status: 200 });
  } catch (error) {
    console.error("Error updating Prodi:", error);
    return NextResponse.json(
      { error: "Failed to update Prodi" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest, { params }: any) {
  const { id } = params;

  try {
    const prodi = await prisma.prodi.findUnique({
      where: { id: Number(id) },
    });

    if (!prodi) {
      return NextResponse.json({ error: "Prodi not found" }, { status: 404 });
    }

    return NextResponse.json(prodi, { status: 200 });
  } catch (error) {
    console.error("Error fetching Prodi:", error);
    return NextResponse.json(
      { error: "Failed to fetch Prodi" },
      { status: 500 }
    );
  }
}
