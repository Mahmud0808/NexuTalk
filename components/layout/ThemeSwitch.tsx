"use client";

import { useTheme } from "next-themes";
import { HiMoon, HiSun } from "react-icons/hi2";

export default function ThemeSwitch() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="min-w-0 min-h-0 w-auto h-auto group flex gap-x-3 rounded-full p-3 text-sm leading-6 font-semibold text-gray-500 hover:bg-bg-highlight hover:text-black dark:hover:text-gray-500"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? (
        <HiSun className="h-6 w-6 shrink-0" />
      ) : (
        <HiMoon className="h-6 w-6 shrink-0" />
      )}
    </button>
  );
}
