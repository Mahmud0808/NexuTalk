import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import AuthContext from "@/components/context/AuthContext";
import ActiveStatus from "@/components/common/ActiveStatus";
import Providers from "@/components/common/Providers";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} bg-bg`}>
        <Providers>
          <AuthContext>
            <ActiveStatus />
            <main className="h-full">{children}</main>
            <Toaster />
          </AuthContext>
        </Providers>
      </body>
    </html>
  );
}
