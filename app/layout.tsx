import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "../components/Sidebar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TransformiX BI Assistant",
  description: "TransformiX BI Assistant helps businesses unlock insights from CRM data. Upload your CSV files and get actionable business intelligence instantly.",
  icons: {
    icon: "/Logo.webp",    
    shortcut: "/Logo.webp", 
    apple: "/Logo.webp", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased flex`}
      >
        <Sidebar />
        <main className="flex-1 pl-[var(--sidebar-width)] p-4 overflow-y-auto transition-all duration-300">
          {children}
        </main>
      </body>
    </html>
  );
}
