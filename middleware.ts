import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/",
  },
  callbacks: {
    authorized: async ({ req }) => {
      const pathname = req.nextUrl.pathname;

      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_JWT_SECRET,
      });

      if (!token?.email) {
        return pathname === "/";
      }

      return (
        pathname.startsWith("/users") || pathname.startsWith("/conversations")
      );
    },
  },
});

export const config = {
  matcher: [
    "/users/:path*",
    "/conversations/:path*",
    "/((?!api|_next/static|_next/image|assets|images|icon.ico|favicon.ico).*)",
  ],
};
