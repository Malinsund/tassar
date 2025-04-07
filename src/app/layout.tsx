import { AuthProvider } from "@/context/AuthContext";
import { ProfileProvider } from "@/context/ProfileContext";
import type { Metadata } from "next";
import "./globals.css";





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
      <head><link rel="icon" href="/favicon.ico" /></head>
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
