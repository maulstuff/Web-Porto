import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Maulana Akbar Kusuma | Amertha",
  description: "Get in touch with Maulana Akbar Kusuma for UI/UX design, website design, product design, and creative collaborations.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Maulana Akbar Kusuma | Amertha",
    description: "Discuss a UI/UX design project or creative collaboration with Maulana Akbar Kusuma.",
    type: "website",
  },
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
