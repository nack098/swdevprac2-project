import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { login, me } from "./apis/auth";

const credentials = Credentials({
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "text" },
    password: { label: "Password", type: "password" },
  },
  async authorize({ email, password }) {
    try {
      const loginData: LoginData = {
        email: email as string,
        password: password as string,
      };
      const res = await login(loginData);

      if (res.status !== 200) {
        console.error("Login error:", res.statusText);
        return null;
      }

      const data = res.data;

      const info = (await me(data.token)).data;

      if (!data || !data._id) return null;

      return {
        _id: data._id,
        name: data.name,
        email: data.email,
        role: info.data.role,
        token: data.token,
      };
    } catch (error) {
      console.error("Authorize Error:", error);
      return null;
    }
  },
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [credentials],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = { ...token } as any;
      return session;
    },
  },
});
