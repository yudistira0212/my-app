import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Middleware untuk melindungi API route dan mengarahkan root ke /home
export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  });

  // Redirect dari root ("/") ke "/home"
  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // Jika token tidak ada dan bukan sedang mengakses root atau login, redirect ke halaman login
  if (
    (!token && req.nextUrl.pathname.startsWith("/admin")) ||
    req.nextUrl.pathname.startsWith("/register")
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && req.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  // if (token && req.nextUrl.pathname.startsWith("/admin")) {
  //   return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  // }

  // Jika ada token, lanjutkan ke request yang diminta
  return NextResponse.next();
}

// Tentukan path yang harus menggunakan middleware ini
export const config = {
  matcher: ["/", "/admin/:path*", "/register", "/login"],
};
