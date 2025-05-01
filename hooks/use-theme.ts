import { useTheme as useNextTheme } from "next-themes";
import { useEffect, useState } from "react";

export const useTheme = () => {
  const { theme, setTheme, systemTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      console.log("Current theme:", theme);
      console.log("System theme:", systemTheme);
      console.log(
        "Dark mode:",
        document.documentElement.classList.contains("dark")
      );
    }
  }, [theme, systemTheme, mounted]);

  const isDark =
    mounted &&
    (theme === "dark" || (theme === "system" && systemTheme === "dark"));

  const toggleTheme = () => {
    if (!mounted) return;
    const newTheme = isDark ? "light" : "dark";
    console.log("Toggling to:", newTheme);
    setTheme(newTheme);
  };

  return {
    isDark,
    toggleTheme,
    theme,
    systemTheme,
    setTheme,
    mounted,
  };
};
