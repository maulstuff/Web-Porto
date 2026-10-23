
import type { Metadata } from "next";
import "./globals.css";
import { Instrument_Sans } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import PageScrollReveal from "@/components/PageScrollReveal";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MLSTVFF — UI/UX Designer",
  description:
    "Maulana Akbar Kusuma is a UI/UX designer from Indonesia, creating clear and intuitive digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={instrumentSans.variable}>
        <SmoothScroll>
          <PageScrollReveal />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
