import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// get all

export async function GET() {
  try {
    const kontak = await prisma.kontak.findMany({
      include: {
        prodi: true,
      },
    });
    return NextResponse.json(kontak, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch kontak:", error);
    return NextResponse.json(
      { error: "Failed to fetch kontak" },
      { status: 500 }
    );
  }
}

// creat kontak
export async function POST(request: Request) {
  const body = await request.json();

  try {
    const updateKontak = await prisma.kontak.create({
      data: {
        email: body.email,
        telephone: body.telephone,
        alamat: body.alamat,
        sosial_media: body.sosial_media,
        prodi_id: body.prodi_id,
      },
    });

    return NextResponse.json(updateKontak, { status: 201 });
  } catch (error) {
    console.error("Error updating kontak:", error);
    return NextResponse.json(
      { error: "Failed to update kontak" },
      { status: 500 }
    );
  }
}
