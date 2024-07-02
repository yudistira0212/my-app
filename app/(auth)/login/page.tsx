"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { push } = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      // redirect: false,
      email,
      password,
      redirect: false,
      callbackUrl: "/admin/utama",
    });

    if (result?.error) {
      // Handle error here (e.g., show error message)
      console.error(result.error);
    } else {
      // Redirect to the desired page after successful login
      push("/admin/utama");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="block w-auto max-w-lg p-6 bg-[#263159] border border-gray-200 rounded-lg shadow">
        <p className="w-[300px] text-white">MASUK SEBAGAI ADMIN</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="john.doe@company.com"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="•••••••••"
              required
            />
          </div>
          <div className="text-white">
            Belum punya akaun?{" "}
            <Link href={"/register"} className="hover:cursor-pointer">
              register
            </Link>{" "}
          </div>
          <div className="flex items-center justify-center mt-4">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              masuk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
