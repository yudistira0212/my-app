"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(); // Panggil fungsi signOut untuk menghapus session
    router.push("/login"); // Arahkan pengguna ke halaman login setelah logout
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <nav className="bg-[#263159] text-white flex justify-between items-center p-4  shadow-inner">
      <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap ">
        DASHBOARD ADMIN
      </span>
      <div className="relative">
        <img
          src="/profile.jpg"
          alt="Profile"
          className="h-8 w-8 rounded-full cursor-pointer"
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
