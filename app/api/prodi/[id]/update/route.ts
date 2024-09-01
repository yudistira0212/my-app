import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
