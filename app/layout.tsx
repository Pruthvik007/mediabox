import type { Metadata } from "next";
import "@pruthvik007/components/theme.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "MediaBox",
  description: "Browse Movies and TV Shows",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const theme = localStorage.getItem("theme");
              if (theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
                document.documentElement.classList.add("dark");
              }
            `,
          }}
        />
      </head>
      <body>
        <div className="min-h-screen bg-background text-foreground">
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
