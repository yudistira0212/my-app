import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// getbyid

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const dosen = await prisma.dosen.findUnique({
      where: { id: Number(id) },
    });
    if (dosen) {
      return NextResponse.json(dosen, { status: 200 });
    } else {
      return NextResponse.json({ error: "Dosen not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch dosen" },
      { status: 500 }
    );
  }
}
