import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { ModalOutlet } from "@/components/modal-outlet";
import { ScrollToTopClient } from "@/components/scroll-to-top-client";
import { ThemeScript } from "@/components/theme-script";
import "./globals.css";

export const metadata: Metadata = {
  title: "MediaBox",
  description: "Browse Movies and TV Shows",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <ThemeScript />
      </head>
      <body>
        <Providers>
          <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <Navbar />
            <main className="pt-4 pb-16">{children}</main>
            <ModalOutlet />
            <ScrollToTopClient />
          </div>
        </Providers>
      </body>
    </html>
  );
}
