"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { images } from "../lib/image/images";
import { useAuth } from "../hooks/useAuth";
import Loading from "@/app/components/common/loading/Loading";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { login, loading, error, logout, session } = useAuth();

  const handleSignOut = async () => {
    await logout();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <nav className="bg-[#263159] text-white flex justify-between items-center p-4  shadow-inner">
      <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap ">
        DASHBOARD ADMIN
      </span>
      <div className="relative">
        <Image
          src={session?.user?.image || images.imageDefault}
          alt="Profile"
          className="h-8 w-8 rounded-full cursor-pointer"
          width={32}
          height={32}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-2">
            <Link href="#" className="block px-4 py-2"></Link>
            <Link href="#" className="block px-4 py-2">
              {session?.user?.email}
            </Link>
            <button
              onClick={handleSignOut}
              className="block px-4 py-2 hover:bg-[#495579] hover:text-white w-full active:bg-[#2c3a64]"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
