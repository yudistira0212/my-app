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
    // Check if the classes exists before trying to delete
    const classes = await prisma.class.findUnique({
      where: { id: Number(id) },
    });

    if (!classes) {
      return NextResponse.json({ error: "Class not found" }, { status: 404 });
    }

    await prisma.class.delete({
      where: { id: Number(id) },
    });

    // Return 204 without body for successful deletion
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Database error: ", error); // Log error for debugging
    return NextResponse.json(
      { error: "Failed to delete classes" },
      { status: 500 }
    );
  }
}
