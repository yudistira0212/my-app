import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// get all

export async function GET() {
  try {
    const dosen = await prisma.dosen.findMany();
    return NextResponse.json(dosen, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch dosen" },
      { status: 500 }
    );
  }
}

// creat dosen
export async function POST(request: Request) {
  const { nama, jabatan, prodi } = await request.json();
  try {
    const dosen = await prisma.dosen.create({
      data: {
        nama,
        jabatan,
        prodi,
      },
    });
    return NextResponse.json(dosen, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create dosen" },
      { status: 500 }
    );
  }
}
