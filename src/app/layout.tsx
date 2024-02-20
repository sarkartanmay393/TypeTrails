import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreStateProvider } from "./_provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TypeTrails",
  description: "Built by tsx for your typing improvement",
  icons: ["/logo.webp"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreStateProvider>{children}</StoreStateProvider>
      </body>
    </html>
  );
}
