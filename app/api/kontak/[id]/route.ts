import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest, { params }: any) {
  const { id } = params;
  const body = await req.json();

  console.log(body);

  const kontak = await prisma.kontak.findUnique({
    where: { id: Number(id) },
  });
  if (!kontak) {
    return NextResponse.json({ error: "kontak not found" }, { status: 404 });
  }

  try {
    const updateKontak = await prisma.kontak.update({
      where: { id: Number(id) },
      data: {
        email: body.email,
        telephone: body.telephone,
        alamat: body.alamat,
        sosial_media: body.sosial_media,
        prodi_id: body.prodi_id,
      },
    });

    return NextResponse.json(updateKontak, { status: 200 });
  } catch (error) {
    console.error("Error updating kontak:", error);
    return NextResponse.json(
      { message: "Failed to update kontak" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest, { params }: any) {
  const { id } = params;

  try {
    const kontak = await prisma.kontak.findUnique({
      where: { id: Number(id) },
    });

    if (!kontak) {
      return NextResponse.json(
        { message: "kontak not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(kontak, { status: 200 });
  } catch (error) {
    console.error("Error fetching kontak:", error);
    return NextResponse.json(
      { message: "Failed to fetch kontak" },
      { status: 500 }
    );
  }
}
