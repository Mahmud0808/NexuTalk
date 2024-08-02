import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import AuthContext from "@/components/context/AuthContext";

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

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
      <body className={poppins.className}>
        <AuthContext>
          <main className="h-full">{children}</main>
          <Toaster />
        </AuthContext>
      </body>
    </html>
  );
}
