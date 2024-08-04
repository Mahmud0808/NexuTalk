"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function LightTheme({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, []);

  return <>{children}</>;
}
