import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
// import { prisma } from '../../../lib/prisma';

const prisma = new PrismaClient();

// get all

export async function GET() {
  try {
    const classes = await prisma.class.findMany();
    return NextResponse.json(classes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch classes" },
      { status: 500 }
    );
  }
}

// creat class
export async function POST(request: Request) {
  const { nama, sks, waktu_mulai, waktu_selesai, dosen_id } =
    await request.json();
  try {
    const classes = await prisma.class.create({
      data: {
        nama,
        sks,
        waktu_mulai,
        waktu_selesai,
        dosen_id: 0,
      },
    });
    return NextResponse.json(classes, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create classes" },
      { status: 500 }
    );
  }
}
