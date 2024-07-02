"use client";
import Head from "next/head";
import React, { useEffect } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { push } = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      push("/login");
    }
  }, [session]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>My Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
