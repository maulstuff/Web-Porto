
import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import PageScrollReveal from "@/components/PageScrollReveal";

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
      <body>
        <SmoothScroll>
          <PageScrollReveal />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
