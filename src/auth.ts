import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import { users, verificationTokens } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      id: "otp",
      name: "OTP",
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "OTP", type: "text" },
        name: { label: "Name", type: "text" },
        role: { label: "Role", type: "text" },
        bio: { label: "Bio", type: "text" },
        skills: { label: "Skills", type: "text" },
        interests: { label: "Interests", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.otp) return null;

        const email = credentials.email as string;
        const otp = credentials.otp as string;
        const name = (credentials.name as string) || email.split("@")[0];
        const role = credentials.role as string;
        const bio = credentials.bio as string;
        const skills = credentials.skills ? JSON.parse(credentials.skills as string) : [];
        const interests = credentials.interests ? JSON.parse(credentials.interests as string) : [];

        // 1. Verify OTP in database
        const dbToken = await db.query.verificationTokens.findFirst({
          where: and(
            eq(verificationTokens.identifier, email),
            eq(verificationTokens.token, otp)
          ),
        });

        if (!dbToken) throw new Error("Invalid code");
        if (dbToken.expires < new Date()) throw new Error("Code expired");

        // 2. Delete the used token
        await db.delete(verificationTokens).where(
          and(
            eq(verificationTokens.identifier, email),
            eq(verificationTokens.token, otp)
          )
        );

        // 3. Find or create user
        let user = await db.query.users.findFirst({
          where: eq(users.email, email),
        });

        if (!user) {
          const [newUser] = await db
            .insert(users)
            .values({
              email,
              name,
              role,
              bio,
              skills,
              interests,
              emailVerified: new Date(),
            })
            .returning();
          user = newUser;
        } else {
          // Optional: Update existing user with new profile info during login if provided
          if (credentials.role || credentials.bio) {
             const [updatedUser] = await db.update(users).set({
               name: credentials.name ? name : user.name,
               role: credentials.role ? role : user.role,
               bio: credentials.bio ? bio : user.bio,
               skills: credentials.skills ? skills : user.skills,
               interests: credentials.interests ? interests : user.interests,
             }).where(eq(users.email, email)).returning();
             user = updatedUser;
          }
        }

        return user;
      },
    }),
  ],
  session: { strategy: "jwt" },
});
