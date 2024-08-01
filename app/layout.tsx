import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import AuthContext from "@/components/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexuTalk - Connect, Communicate & Collaborate",
  description:
    "Join NexuTalk for seamless communication and collaboration. Create channels, chat in real-time, and stay connected with your team. Join now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <main>{children}</main>
          <Toaster />
        </AuthContext>
      </body>
    </html>
  );
}
