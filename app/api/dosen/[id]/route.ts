import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// getbyid

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Validate if ID is a valid number
  if (isNaN(Number(id))) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

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
    console.error("Failed to fetch dosen:", error);
    return NextResponse.json(
      { error: "Failed to fetch dosen" },
      { status: 500 }
    );
  }
}
