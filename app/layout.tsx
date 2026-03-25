import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { ModalOutlet } from "@/components/modal-outlet";
import { ScrollToTopClient } from "@/components/scroll-to-top-client";
import "./globals.css";

export const metadata: Metadata = {
  title: "MediaBox",
  description: "Browse Movies and TV Shows",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"){document.documentElement.classList.remove("dark")}else{document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
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
