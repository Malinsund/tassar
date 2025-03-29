import { AuthProvider } from "@/context/AuthContext";
import { ProfileProvider } from "@/context/ProfileContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Tassar",
  description: "En sida för djurälskare av djurälskare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
    <html lang="en" className="font-poppins">
      <head><link rel="icon" href="/tass.png" /></head>
      <AuthProvider>
        <ProfileProvider>
        <body>
          {children}
        </body>
        </ProfileProvider>
      </AuthProvider>
    </html>
  );
}
