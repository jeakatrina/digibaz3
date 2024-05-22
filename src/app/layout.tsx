import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import { SessionProvider } from "@/lib/auth/SessionContext";
import { validateRequest } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await validateRequest();

  return (
    <html lang="en">
      <SessionProvider value={session}>
        <body className={`${inter.className} bg-primary`}>
          <div className="min-h-screen ">
            <Toaster
              position='top-center'
            />
            <Navbar />
            {children}
          </div>
          <Footer />
        </body>
      </SessionProvider>
    </html>
  );
}
