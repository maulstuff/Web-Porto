import type { Metadata } from "next";
import Image from "next/image";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const projects = {
  "raven-claw": {
    number: "001.", title: "RAVEN CLAW", year: "2025", category: "E-COMMERCE",
    image: "photo-1531058020387-3be344556be6",
    intro: "A bold digital storefront built to give a distinctive product brand a clearer, more immersive online presence.",
    challenge: "Create a memorable shopping experience that balances a strong visual identity with a simple path to purchase.",
    approach: "We shaped the experience around confident typography, focused product storytelling, and a clear information hierarchy. The interface keeps product discovery direct while allowing the imagery and brand personality to lead.",
    outcomes: ["Clearer product discovery", "A consistent visual system", "A streamlined shopping journey"]
  },
  "willow-studio": {
    number: "002.", title: "WILLOW STUDIO", year: "2024", category: "STUDIO",
    image: "photo-1506794778202-cad84cf45f1d",
    intro: "A refined digital home for a creative studio, designed to make its point of view and work easy to explore.",
    challenge: "Translate a studio's personality into a flexible website without letting the layout compete with the work.",
    approach: "We used generous whitespace, editorial typography, and a restrained navigation system. Project imagery gets room to breathe, while small interactions help visitors move naturally through the portfolio.",
    outcomes: ["A more distinctive studio presence", "Editorial portfolio storytelling", "Simplified navigation"]
  },
  "maison-laiv": {
    number: "003.", title: "MAISON LAIV", year: "2024", category: "BRANDING",
    image: "photo-1557682250-33bd709cbe85",
    intro: "A visual identity exploration translated into a digital brand experience with a tactile, contemporary feel.",
    challenge: "Build a recognizable visual language that feels consistent across brand touchpoints and digital content.",
    approach: "The direction pairs a focused color palette with modular layouts and clear typographic contrast. Reusable patterns help the brand stay coherent as content expands.",
    outcomes: ["A coherent digital identity", "Reusable brand components", "Consistent visual hierarchy"]
  },
  "mystic-meadows": {
    number: "004.", title: "MYSTIC MEADOWS", year: "2023", category: "AGENCY",
    image: "photo-1518770660439-4636190af475",
    intro: "A clean agency website concept designed to make complex services feel approachable and easy to understand.",
    challenge: "Organize a broad set of offerings into a website that helps potential clients find the right information quickly.",
    approach: "We grouped content by user intent, clarified page hierarchy, and created repeatable sections that make the site easier to scan on desktop and mobile.",
    outcomes: ["More scannable service pages", "Consistent responsive patterns", "Clearer calls to action"]
  },
  "synclab": {
    number: "006.", title: "SYNCLAB", year: "2023", category: "WEBSITE",
    image: "photo-1534528741775-53994a69daeb",
    intro: "A minimal website concept that uses a confident art direction to introduce a modern digital product.",
    challenge: "Create a distinctive first impression while keeping key product information easy to find.",
    approach: "We paired expressive imagery with a simple page structure, concise copy, and a consistent component system that supports future growth.",
    outcomes: ["Focused first impression", "Scalable page structure", "Consistent component styling"]
  }
};

const imageUrl = (id: string, width = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=90`;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects[slug as keyof typeof projects];

  if (!project) {
    return {
      title: "Project Not Found",
      description: "This project page could not be found.",
      robots: { index: false, follow: true },
    };
  }

  const title = `${project.title} — UI/UX Design Concept`;
  const description = `${project.intro} This page presents a concept case study covering the design challenge, approach, and intended outcomes.`;
  const canonical = absoluteUrl(`/projects/${slug}`);
  const shareImage = absoluteUrl("/opengraph-image") ?? "/opengraph-image";

  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      type: "article",
      title: `${title} | ${SITE_NAME}`,
      description,
      url: canonical,
      images: [{ url: shareImage, width: 1200, height: 630, alt: `${project.title} case study by MLSTVFF` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [shareImage],
    },
  };
}

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects[slug as keyof typeof projects];

  if (!project) {
    return <main className="project-detail-not-found"><p>PROJECT NOT FOUND</p><Link href="/#projects"><ArrowLeft size={16} /> Back to projects</Link></main>;
  }

  return (
    <main className="project-detail-page">
      <header className="detail-nav">
        <Link className="detail-brand" href="/">MLSTVFF<span>*</span></Link>
        <Link className="detail-back" href="/#projects"><ArrowLeft size={15} /> All projects</Link>
      </header>
      <section data-scroll-reveal className="detail-hero">
        <p className="detail-eyebrow"><span /> PROJECT CASE STUDY · {project.number} {project.category}</p>
        <h1>{project.title}</h1>
        <div className="detail-intro-row">
          <p className="detail-intro">{project.intro}</p>
          <div className="detail-meta"><span>YEAR<strong>{project.year}</strong></span><span>DISCIPLINE<strong>{project.category}</strong></span></div>
        </div>
        <div className="detail-hero-image"><Image src={imageUrl(project.image)} alt={`${project.title} project visual`} fill priority sizes="100vw" /></div>
      </section>
      <section data-scroll-reveal className="detail-story"><div className="detail-section-label">01 / THE CHALLENGE</div><h2>{project.challenge}</h2></section>
      <section data-scroll-reveal className="detail-story detail-story-split"><div className="detail-section-label">02 / THE APPROACH</div><div><h2>Thoughtful by design.</h2><p>{project.approach}</p></div></section>
      <section data-scroll-reveal className="detail-outcomes"><div className="detail-section-label">03 / KEY OUTCOMES</div><div className="detail-outcome-list">{project.outcomes.map((outcome, i) => <div key={outcome}><span>0{i + 1}</span><strong>{outcome}</strong><ArrowUpRight size={18} /></div>)}</div></section>
      <section data-scroll-reveal className="detail-next"><p>HAVE A PROJECT IN MIND?</p><h2>Let’s make something meaningful.</h2><Link href="/#contact">Let’s Discuss <span><ArrowUpRight size={16} /></span></Link></section>
      <footer className="detail-footer"><Link className="detail-brand" href="/">MLSTVFF<span>*</span></Link><Link href="/#projects"><ArrowLeft size={15} /> Back to all projects</Link></footer>
    </main>
  );
}
