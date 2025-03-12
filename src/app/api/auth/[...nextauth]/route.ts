import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
        },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(
            "http://183.82.7.208:3002/anyapp/authentication/",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                action: "login",
                credential: credentials?.username,
                password: credentials?.password,
                device_id: "device_unique_id",
                app_secret: process.env.NEXTAUTH_SECRET,
              }),
            }
          );

          const data = await response.json();
          console.log("API Response:", data); // ✅ Log response

          if (!response.ok) {
            console.error("Error: API returned non-OK status");
            throw new Error("Invalid credentials");
          }

          if (data.status === "success") {
            return {
              id: data.user_id,
              token: data.login_token,
              expiresAt: parseInt(data.login_token_expiration, 10),
            };
          } else {
            console.error("Login Failed:", data.message);
            throw new Error(data.message || "Login failed");
          }
        } catch (error) {
          console.error("Authorize error:", error);
          throw new Error("Login failed. Please check credentials.");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // Fallback session expiration (7 days)
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.token = user.token;
        token.expiresAt = user.expiresAt; // Store expiration timestamp
      }

      return token;
    },

    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id ? String(token.id) : "";
        session.user.token = token.token ? String(token.token) : "";
        session.expires = new Date(
          Number(token.expiresAt) * 1000
        ).toISOString(); // Convert to date format
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
