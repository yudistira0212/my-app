import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
// import { prisma } from '../../../lib/prisma';

const prisma = new PrismaClient();

// get all

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// creat user
export async function POST(request: Request) {
  const { nama, email, password, role } = await request.json();
  try {
    const user = await prisma.user.create({
      data: {
        nama,
        email,
        password,
        role,
      },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
