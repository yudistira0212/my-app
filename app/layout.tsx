import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import SessionProvider from "./SessionProvider";
import Link from "next/link";
import { images } from "./lib/image/images";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Informatika",
  description: "Informatika",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={images.LogoUnipa.src} />
      </head>
      <body className={inter.className}>
        <ToastContainer />
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
