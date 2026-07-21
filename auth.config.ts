import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isOnLogin = nextUrl.pathname === "/admin/login";

      if (isOnAdmin && !isOnLogin) {
        if (isLoggedIn) return true;
        return false; // Redirect ke /admin/login
      } else if (isOnLogin && isLoggedIn) {
        return Response.redirect(new URL("/admin/profile", nextUrl));
      }
      return true;
    },
  },
  providers: [], // Di-populate di auth.ts
} satisfies NextAuthConfig;
