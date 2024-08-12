// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's postal address. */
      id?: string;
      role?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } & DefaultUser;
  }

  interface User {
    id: string;
    role?: string;
  }
}
