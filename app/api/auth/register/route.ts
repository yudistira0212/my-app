import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body);

    if (!body.email || !body.password || !body.nama) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(body.password, 10);
    console.log(hashedPassword);

    // Create new user
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        nama: body.nama,
        role: "admin", // Set role sesuai kebutuhan Anda
      },
    });

    console.log("User created:", user);

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
