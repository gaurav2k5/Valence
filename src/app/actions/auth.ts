"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function verifyOtpAction(credentials: any) {
  try {
    await signIn("otp", {
      ...credentials,
      redirectTo: "/dashboard",
    });
    // signIn will throw a redirect error on success
    return { success: true };
  } catch (error: any) {
    if (error && typeof error === "object" && "digest" in error && typeof (error as any).digest === "string" && (error as any).digest.startsWith("NEXT_REDIRECT")) {
      throw error; // Let Next.js handle the redirect!
    }

    if (error instanceof AuthError) {
      return { error: "Invalid or expired code" };
    }
    
    // Fallback for custom thrown errors
    if (error.message && error.message.includes("Invalid")) {
      return { error: "Invalid code" };
    }
    
    return { error: "An error occurred during sign in" };
  }
}
