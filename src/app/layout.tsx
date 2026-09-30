import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/components/providers/AuthProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VALENCE",
  description: "Your idea. Find the people who can build it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} font-sans antialiased text-[#fafafa] scroll-smooth`}>
      <body className="min-h-screen flex flex-col relative overflow-x-hidden">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
