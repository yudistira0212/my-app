import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// getbyid
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
