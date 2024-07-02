import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import type { Class } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const classes = await prisma.class.findMany();
    return NextResponse.json(classes, { status: 200 });
  } catch (error) {
    console.error("Error fetching classes:", error);
    return NextResponse.json(
      { message: "Failed to fetch classes" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body: Class = await req.json();

  if (
    !body ||
    !body.nama ||
    !body.sks ||
    !body.waktu_mulai ||
    !body.waktu_selesai
  ) {
    return NextResponse.json("gagal input: missing required fields", {
      status: 500,
    });
  }
  try {
    const newClass = await prisma.class.create({
      data: {
        nama: body.nama,
        sks: body.sks,
        waktu_mulai: body.waktu_mulai,
        waktu_selesai: body.waktu_selesai,
        dosen_id: body.dosen_id,
      },
    });

    return NextResponse.json(newClass, { status: 201 });
  } catch (error) {
    console.error("Error creating class:", error);
    return NextResponse.json(
      { message: "Failed to create class" },
      { status: 500 }
    );
  }
}
