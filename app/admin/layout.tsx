"use client";
import Head from "next/head";
import React, { useEffect } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  // const { push } = useRouter();
  // const { data: session, status } = useSession();

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     push("/login");
  //   }
  // }, [session]);

  // console.log(session?.user);

  // if (status === "loading") {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <Head>
        <title>My Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="sticky top-0 z-10 shadow-xl">
        <Navbar />
      </div>
      <div className="flex h-full">
        <div className="sticky top-0 left-0">
          <Sidebar />
        </div>

        <div className="flex-1 overflow-y-auto h-full pb-32">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
