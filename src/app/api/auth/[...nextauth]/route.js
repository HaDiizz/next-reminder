import NextAuth from "next-auth";
import { cookies, headers } from "next/headers";
import { axios } from "@/lib/axios";
import CredentialsProvider from "next-auth/providers/credentials";
import { revalidatePath } from "next/cache";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials.username || !credentials.password) {
          throw new Error("Fields are required.");
        }
        const response = await axios.post("/login", credentials);
        if (response.data.status !== "success") {
          return null;
        }
        await cookies().set({
          name: "token",
          value: response.data.token,
          httpOnly: true,
          path: "/",
          maxAge: response.data.expiresIn,
        });
        return response.data.user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      const cookieStore = cookies();
      const tokenCookie = cookieStore.get("token");
      const response = await axios.get("/userInfo", {
        headers: { Authorization: `Bearer ${tokenCookie.value}` },
      });
      if (response.data.status === "success") {
        token.id = response?.data?.result?.userInfo?.id;
        token.username = response?.data?.result?.userInfo?.username;
        token.email = response?.data?.result?.userInfo?.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user || token;
      }
      if (session.user) return session;
    },
  },
  events: {
    signOut: ({ session }) => {
      if (!session) {
        cookies().delete("token");
      }
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
