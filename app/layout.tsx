import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from './components/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "國立陽明交通大學校友總會 | NCTU Alumni Association",
  description: "國立陽明交通大學校友總會官方網站，提供校友最新消息、活動行事曆、校友會組織章程等資訊。連結全球交大校友，傳承交大精神。",
  keywords: "交通大學,校友會,NCTU,陽明交通大學,校友總會,交大校友,Alumni",
  authors: [{ name: "國立陽明交通大學校友總會" }],
  creator: "國立陽明交通大學校友總會",
  publisher: "國立陽明交通大學校友總會",
  robots: "index, follow",
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: "國立陽明交通大學校友總會",
    description: "國立陽明交通大學校友總會官方網站，提供校友最新消息、活動行事曆、校友會組織章程等資訊。",
    url: "https://nctualumni.org.tw",
    siteName: "國立陽明交通大學校友總會",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "國立陽明交通大學校友總會 Logo",
      },
    ],
    locale: "zh_TW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "國立陽明交通大學校友總會",
    description: "國立陽明交通大學校友總會官方網站，提供校友最新消息、活動行事曆、校友會組織章程等資訊。",
    images: ["/logo.png"],
  },
  verification: {
    google: "your-google-verification-code", // 需要替換為實際的驗證碼
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning={true}
      >
        <Header />
        <main className="flex-grow pb-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
