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
    // Check if the dosen exists before trying to delete
    const dosen = await prisma.dosen.findUnique({
      where: { id: Number(id) },
    });

    if (!dosen) {
      return NextResponse.json({ error: "Dosen not found" }, { status: 404 });
    }

    await prisma.dosen.delete({
      where: { id: Number(id) },
    });

    // Return 204 without body for successful deletion
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Database error: ", error); // Log error for debugging
    return NextResponse.json(
      { error: "Failed to delete dosen" },
      { status: 500 }
    );
  }
}
