/**
 * Inline script to set dark mode before paint — prevents flash of wrong theme.
 * Uses Next.js Script component with beforeInteractive strategy to avoid
 * the "script inside React component" warning.
 */
import Script from "next/script";

export function ThemeScript() {
  return (
    <Script
      id="theme-init"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          try {
            const theme = localStorage.getItem("theme");
            if (theme === "light") {
              document.documentElement.classList.remove("dark");
            }
          } catch (e) {}
        `,
      }}
    />
  );
}
