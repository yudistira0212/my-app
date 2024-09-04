import { PrismaClient } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// getbyid
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const kontak = await prisma.kontak.findUnique({
      where: { id: Number(id) },
    });

    if (!kontak) {
      return NextResponse.json({ error: "kontak not found" }, { status: 404 });
    }

    return NextResponse.json(kontak, { status: 200 });
  } catch (error) {
    console.error("Error fetching kontak:", error);
    return NextResponse.json(
      { error: "Failed to fetch kontak" },
      { status: 500 }
    );
  }
}
