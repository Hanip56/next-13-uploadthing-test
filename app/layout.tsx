import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "@/components/SessionProvider";
import { getServerSession } from "next-auth";
import { options } from "@/lib/nextAuthOptions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={inter.className}>{children}</body>
      </SessionProvider>
    </html>
  );
}
