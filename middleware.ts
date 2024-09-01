import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const allowedOrigins = [
  "http://localhost:3000",
  "https://my-app-sigma-ivory.vercel.app/",
];

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Middleware untuk melindungi API route dan mengarahkan root ke /home
export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  });

  const path = req.nextUrl.pathname;

  // Redirect dari root ("/") ke "/home"
  if (path === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // Jika token tidak ada dan bukan sedang mengakses root atau login, redirect ke halaman login
  if ((!token && path.startsWith("/admin")) || path.startsWith("/register")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && path.startsWith("/login")) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  if (!token && path.endsWith("/update")) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
  if (!token && path.endsWith("/delete")) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // Jika ada token, lanjutkan ke request yang diminta
  return NextResponse.next();
}

// Tentukan path yang harus menggunakan middleware ini
export const config = {
  matcher: [
    "/",
    "/admin/:path*",
    "/register",
    "/login",
    "/api/:path*/update",
    "/api/:path*/delete",
  ],
};
