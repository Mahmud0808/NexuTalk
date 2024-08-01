import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prismadb from "@/lib/prismadb";
import authConfig from "@/lib/auth.config";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismadb),
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  ...authConfig,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
