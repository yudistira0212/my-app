import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
// import { prisma } from '../../../lib/prisma';

const prisma = new PrismaClient();

// getbyid

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const classes = await prisma.class.findUnique({
      where: { id: Number(id) },
    });
    if (classes) {
      return NextResponse.json(classes, { status: 200 });
    } else {
      return NextResponse.json({ error: "Class not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch class" },
      { status: 500 }
    );
  }
}
