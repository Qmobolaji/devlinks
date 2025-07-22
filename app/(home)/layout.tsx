import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";

import "../globals.css";

import { AuthProvider } from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";

const instrumentSans = Instrument_Sans({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "DevLinks",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSans.className} bg-snow p-4 md:p-6 lg:px-8`}
      >
        <AuthProvider>
          <Header />

          {children}

          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
