import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
// import { prisma } from '../../../lib/prisma';

const prisma = new PrismaClient();

// getbyid

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const pengumuman = await prisma.pengumuman.findUnique({
      where: { id: Number(id) },
    });
    if (pengumuman) {
      return NextResponse.json(pengumuman, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Pemgumuman not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch pengumuman" },
      { status: 500 }
    );
  }
}
