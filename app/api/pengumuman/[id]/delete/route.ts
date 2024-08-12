import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Validate if ID is a valid number
  if (isNaN(Number(id))) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  try {
    // Check if the pengumuman exists before trying to delete
    const pengumuman = await prisma.pengumuman.findUnique({
      where: { id: Number(id) },
    });

    if (!pengumuman) {
      return NextResponse.json({ error: "Dosen not found" }, { status: 404 });
    }

    await prisma.pengumuman.delete({
      where: { id: Number(id) },
    });

    // Return 204 without body for successful deletion
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Database error: ", error); // Log error for debugging
    return NextResponse.json(
      { error: "Failed to delete pengumuman" },
      { status: 500 }
    );
  }
}
