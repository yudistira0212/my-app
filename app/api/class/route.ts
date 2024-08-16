import { PrismaClient } from "@prisma/client";
import Error from "next/error";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// get all

export async function GET() {
  try {
    console.log("Fetching classes..."); // Tambahkan log
    const classes = await prisma.class.findMany({
      include: { dosen: true },
    });
    console.log("Classes fetched:", classes); // Tambahkan log hasil query
    return NextResponse.json(classes, { status: 200 });
  } catch (error: Error | any) {
    console.error("Error fetching classes:", error); // Log error
    return NextResponse.json(
      { error: "Failed to fetch classes", details: error.message },
      { status: 500 }
    );
  }
}

// creat class
export async function POST(request: Request) {
  const { nama, sks, waktu_mulai, waktu_selesai, dosen_id, ruangan } =
    await request.json();
  try {
    console.log(sks);

    const classes = await prisma.class.create({
      data: {
        nama,
        sks: Number(sks),
        waktu_mulai,
        waktu_selesai,
        dosen_id,
        ruangan,
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
