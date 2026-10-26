import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — Maulana Akbar Kusuma | Amertha",
  description: "Learn about Maulana Akbar Kusuma (AMERTHA), a UI/UX Designer from Indonesia focused on user-centered product experiences, interface design, and digital workflows.",
  alternates: absoluteUrl("/about") ? { canonical: absoluteUrl("/about") } : undefined,
  openGraph: {
    type: "profile",
    title: "About Maulana Akbar Kusuma | AMERTHA",
    description: "A little about Maulana Akbar Kusuma, UI/UX Designer from Indonesia.",
    url: absoluteUrl("/about"),
  },
  twitter: {
    card: "summary_large_image",
    title: "About Maulana Akbar Kusuma | AMERTHA",
    description: "A little about Maulana Akbar Kusuma, UI/UX Designer from Indonesia.",
  },
};
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const principles = [
  {
    number: "01",
    title: "Understand before designing",
    text: "Good design starts with listening. I look at user needs, context, and friction points before deciding what an interface should look or feel like."
  },
  {
    number: "02",
    title: "Make complexity feel simple",
    text: "I turn information and workflows into clear, purposeful experiences—using structure, hierarchy, and interaction to help people move with confidence."
  },
  {
    number: "03",
    title: "Connect detail with the bigger picture",
    text: "From the first user flow to the final component, I care about the details while keeping the product goals and overall experience in view."
  }
];
function Divider() {
  return <div className="section-divider" aria-hidden="true" />;
}

export default function AboutPage() {
  return (
    <main className="about-page">
      <header className="about-page-nav">
        <Link className="about-page-brand" href="/" aria-label="Amertha - Home">
  <Image
    src="/images/mlstvff-logo-black.svg"
    alt="Amertha"
    width={150}
    height={44}
    priority
    className="about-page-logo"
  />
</Link>
        <Link className="about-page-back" href="/"><ArrowLeft size={15} /> Back to home</Link>
      </header>

      <section data-scroll-reveal className="about-page-hero">
        <p className="about-page-eyebrow"><span /> A LITTLE ABOUT ME</p>
        <div className="about-page-hero-grid">
          <h1>Designing digital experiences that feel <span>clear, useful,</span> and human.</h1>
          <figure className="about-page-profile-image">
            <Image
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=85"
  alt="Portrait of Maulana Akbar Kusuma"
  width={1200}
  height={1400}
  sizes="(max-width: 760px) 100vw, 35vw"
            />
            <figcaption><span>MAULANA AKBAR KUSUMA</span><span>UI/UX DESIGNER</span></figcaption>
          </figure>
        </div>
        <div className="about-page-intro">
          <p>
            I’m Maulana Akbar Kusuma, a UI/UX Designer from Indonesia. I work at the intersection of user experience and visual design, shaping digital products that are thoughtful, easy to understand, and enjoyable to use.
          </p>
          <div className="about-page-quick-facts">
            <span>BASED IN<strong>Indonesia</strong></span>
            <span>FOCUS<strong>UI / UX Design</strong></span>
            <span>ALSO INTO<strong>Visual Design</strong></span>
          </div>
        </div>
      </section>

      <section data-scroll-reveal className="about-page-statement">
        <div className="about-page-section-label">01 / MY APPROACH</div>
        <div>
          <h2>I believe good design is more than how a product looks. It’s how naturally people can use it.</h2>
          <p>
            My process combines curiosity, structure, and craft. I enjoy understanding a problem, exploring different directions, and refining the details until the experience feels coherent—from the first impression to the smallest interaction.
          </p>
        </div>
      </section>

      <section data-scroll-reveal className="about-page-principles">
        <div className="about-page-section-label">02 / WHAT GUIDES MY WORK</div>
        <div className="about-page-principle-list">
          {principles.map((item) => (
            <article className="about-page-principle" key={item.number}>
              <span>{item.number}</span>
              <div><h3>{item.title}</h3><p>{item.text}</p></div>
              <ArrowUpRight size={18} />
            </article>
          ))}
        </div>
      </section>

      <section data-scroll-reveal className="about-page-background">
        <div className="about-page-section-label">03 / BEYOND THE SCREEN</div>
        <div>
          <h2>Curious by nature. Always learning.</h2>
          <p>
            Alongside product design, I’m interested in the wider creative process: visual storytelling, design systems, and how teams turn early ideas into useful products. I value sharing knowledge, learning from other disciplines, and staying open to better ways of solving problems.
          </p>
          <p className="about-page-note">The best solutions often come from asking better questions.</p>
        </div>
      </section>

      <section data-scroll-reveal className="about-page-cta">
        <p>HAVE AN IDEA IN MIND?</p>
        <h2>Let’s make something meaningful.</h2>
        
<div className="about-cta-buttons">
  <a href="/contact" className="about-cta-button about-cta-primary">
    <span>Let’s Discuss</span>
    <span className="about-cta-icon">
      <ArrowUpRight size={25} strokeWidth={2} />
    </span>
  </a>
  {/*<a
    href="/CV - Maulana Akbar Kusuma 2026 - English.pdf"
    download
    className="about-cta-button about-cta-secondary"
  >
    <span>Download CV</span>
    <span className="about-cta-icon">
      <ArrowUpRight size={25} strokeWidth={2} />
    </span>
  </a> */}
</div>

      </section>
<Divider />
<footer className="contact-page-footer"><span>© {new Date().getFullYear()} AMERTHA. All rights reserved.</span>
 <Link href="/#projects">Explore selected work <ArrowUpRight size={14} /></Link>

      </footer>
    </main>
  );
}
