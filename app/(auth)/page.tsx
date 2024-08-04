"use client";

import { useSession } from "next-auth/react";
import AuthForm from "../../components/layout/AuthForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SplashScreen from "@/components/layout/SplashScreen";

export default function Page() {
  const session = useSession();
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (session?.status === "authenticated") {
      timer = setTimeout(() => {
        router.push("/conversations");
      }, 1200);
    } else if (session?.status === "unauthenticated") {
      timer = setTimeout(() => {
        setShowSplash(false);
      }, 1200);
    }

    return () => clearTimeout(timer);
  }, [session?.status, router]);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="flex min-h-screen min-w-full justify-center">
      <div className="flex-1 min-h-full flex-col justify-center py-16 px-8 lg:px-12 xl:px-24 bg-accent hidden lg:flex">
        <h3 className="text-white text-3xl tracking-wide">
          <span className="font-light">nexu</span>
          <span className="font-bold">talk</span>
        </h3>
        <h1 className="text-white text-4xl font-medium mt-8">
          Connect, Communicate & Collaborate
        </h1>
        <p className="text-white text-xl font-light mt-16 lg:max-w-[90%] xl:max-w-2xl">
          Join NexuTalk for seamless communication and collaboration. Create
          channels, chat in real-time, and stay connected with your team. Join
          now!
        </p>
      </div>
      <div className="flex flex-1 min-h-full flex-col justify-center py-16 px-6 lg:px-8 bg-slate-100">
        <AuthForm />
      </div>
    </div>
  );
}
