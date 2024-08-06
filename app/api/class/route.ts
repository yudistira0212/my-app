import { PrismaClient } from "@prisma/client";
import Error from "next/error";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// get all

export async function GET() {
  try {
    const classes = await prisma.class.findMany({
      include: { dosen: true }, // Include related dosen
    });
    return NextResponse.json(classes, { status: 200 });
  } catch (error: Error | any) {
    return NextResponse.json(
      { error: "Failed to fetch classes", details: error.message },
      { status: 500 }
    );
  }
}

// creat class
export async function POST(request: Request) {
  const { nama, sks, waktu_mulai, waktu_selesai, dosen_id } =
    await request.json();
  try {
    console.log(nama, sks, waktu_mulai, waktu_selesai, dosen_id);

    const classes = await prisma.class.create({
      data: {
        nama,
        sks,
        waktu_mulai,
        waktu_selesai,
        dosen_id,
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
