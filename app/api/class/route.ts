import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";

import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// get all

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const keyword = searchParams.get("search");

  try {
    let classes;

    if (keyword) {
      classes = await prisma.class.findMany({
        where: {
          nama: {
            contains: keyword,
          },
        },
        include: {
          dosen: true,
        },
      });
    } else {
      classes = await prisma.class.findMany({
        include: {
          dosen: true,
        },
      });
    }

    return NextResponse.json(classes);
  } catch (error) {
    console.error("Error fetching classes:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data kelas" },
      { status: 500 }
    );
  }
}

// creat class
export async function POST(request: Request) {
  const { nama, sks, waktu_mulai, waktu_selesai, dosen_id, ruangan } =
    await request.json();

  try {
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
      { error: "Failed to create class" },
      { status: 500 }
    );
  }
}
