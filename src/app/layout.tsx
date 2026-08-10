import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SplashScreen from "@/components/SplashScreen";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SyndyTopup",
  description: "เว็บไซต์ท็อปอัพเกม ขายไอดี ขายไอเทม รับฝากดูแลไอดี",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="th"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SplashScreen duration={2500}>{children}</SplashScreen>
      </body>
    </html>
  );
}