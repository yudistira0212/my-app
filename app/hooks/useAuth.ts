import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import axios from "axios";

export const useAuth = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status]);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error);
      } else {
        setError(null);
      }
    } catch (err) {
      setError("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut({ redirect: true, callbackUrl: "/login" });
    } catch (err) {
      setError("An error occurred during logout.");
    } finally {
      setLoading(false);
    }
  };

  const fetchProtectedData = async (url: string) => {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("Not authenticated");

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      });

      return res.data;
    } catch (err) {
      setError("An error occurred while fetching data.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    session,
    loading,
    error,
    login,
    logout,
    fetchProtectedData,
  };
};
