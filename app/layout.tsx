import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./_contexts/cart";
import AuthProvider from "./_providers/auth";
import { Toaster } from "./_components/ui/sonner";
import Header from "./_components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iFood Clone",
  description: "An unofficial version of ifood.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <Header />
            {children}
          </CartProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
