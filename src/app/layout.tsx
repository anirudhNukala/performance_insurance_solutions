import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Performance Insurance Solutions LLC | Trucking Insurance & Surety Bonds",
  description:
    "Performance Insurance Solutions LLC specializes in commercial trucking insurance and surety bonds. Get comprehensive coverage for your fleet and freight brokerage business. Licensed across the US.",
  keywords: [
    "trucking insurance",
    "surety bonds",
    "BMC-84",
    "freight broker bond",
    "commercial truck insurance",
    "motor carrier insurance",
    "cargo insurance",
    "liability insurance trucking",
    "Performance Insurance Solutions",
  ],
  openGraph: {
    title: "Performance Insurance Solutions LLC",
    description:
      "Your trusted partner for commercial trucking insurance and surety bonds.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
