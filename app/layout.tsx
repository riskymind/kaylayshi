import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { metaData } from "./config";
import { ThemeProvider } from "./components/theme-switch";
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: metaData.title,
  description: metaData.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col items-center justify-center mx-auto mt-2 lg:mt-8 mb-20 lg:mb-40`}>
        <ThemeProvider   
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
            <main className="min-w-0 flex-auto mt-2 md:mt-6 px-6 sm:px-4 md:px-0 max-w-[824px] w-full">
              {children}
            </main>
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
