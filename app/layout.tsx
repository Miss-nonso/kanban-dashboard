import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import Sidebar from "./components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Kanban Task Management app",
  description: "Plan and mange tasks better with Kanban"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen`}
      >
        <Sidebar />
        {/* <div> */}

        <main className="flex-1"> {children}</main>
        {/* </div> */}
      </body>
    </html>
  );
}
