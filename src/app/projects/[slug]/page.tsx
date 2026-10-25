import type { Metadata } from "next";
import Image from "next/image";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import ProjectGallery from "@/components/ProjectGallery";

const projects = {
  "archy-industries": {
    number: "001.", title: "Archy Industries", year: "2023", category: "INDUSTRIAL DESIGN",
    image: "photo-1531058020387-3be344556be6",
    intro: "A modern digital experience for a residential brand, bringing architecture, lifestyle, and contemporary home living together through a refined online presence.",
    challenge: "Create a clear and engaging property website that showcases architectural details, communicates the value of each home, and helps visitors explore different property options without overwhelming them.",
    approach: "We designed an editorial-style experience built around architectural photography, generous white space, and a minimal navigation system. An asymmetrical layout creates visual rhythm, while structured property details and clear product variants make the browsing experience intuitive.",
    outcomes: ["A stronger visual presentation of residential architecture", "A clear hierarchy for property information and specifications", "A more intuitive experience for exploring home variants"]
  },
  "madhouse": {
    number: "002.", title: "MADHOUSE", year: "2024", category: "CREATIVE & DIGITAL AGENCY",
    image: "photo-1506794778202-cad84cf45f1d",
    intro: "A bold digital experience for a creative agency that turns ambitious ideas into distinctive visual identities, engaging digital products, and memorable brand experiences.",
    challenge: "Build a distinctive agency website that communicates Madhouse's creative personality, showcases its diverse capabilities, and introduces the people behind the work without compromising clarity or usability.",
    approach: "We combined oversized typography, immersive abstract visuals, and a high-contrast black interface to create a bold editorial experience. A carefully structured layout connects the agency introduction, selected works, team profiles, and service offerings, while subtle gradients and luminous accents bring depth to the visual identity.",
    outcomes: ["A distinctive digital identity that reflects the agency's creative character", "A clear presentation of services, selected projects, and team members", "An immersive browsing experience built around bold typography and visual storytelling"]
  },
  "atexco": {
    number: "003.", title: "Atexco", year: "2023", category: "INDUSTRIAL & DIGITAL PRINTING",
    image: "photo-1557682250-33bd709cbe85",
    intro: "A corporate digital experience for Atexco, showcasing advanced digital printing machinery and textile printing solutions through a modern, product-focused website.",
    challenge: "Present complex industrial printing technology in a way that feels accessible and engaging, while helping potential customers explore machinery, understand product capabilities, and discover the company's expertise in digital textile printing.",
    approach: "We combined a structured corporate layout with bold blue branding, clean typography, and large product visuals to communicate precision and technological innovation. Dedicated product showcases, company history, textile application galleries, and vision sections create a cohesive experience that connects industrial capabilities with real-world applications.",
    outcomes: ["A clearer presentation of digital printing machinery and product ranges", "A cohesive brand experience built around Atexco's blue visual identity", "A structured journey through company information, industrial applications, and technology"]
  },
  "putra-mutiara-jaya": {
    number: "004.", title: "Putra Mutiara Jaya", year: "2024", category: "INDUSTRIAL PRINTING SOLUTIONS",
    image: "photo-1518770660439-4636190af475",
    intro: "A modern corporate website for Putra Mutiara Jaya, presenting advanced digital printing machinery and professional printing solutions through a clear, customer-focused digital experience.",
    challenge: "Create a professional online presence that communicates PMJ's expertise in digital printing technology, showcases its product capabilities, and builds customer confidence through clear information about the company, its services, and its commitment to quality.",
    approach: "We developed a clean, light-themed interface with a strong typographic hierarchy, a blue-and-white visual identity, and prominent product imagery. Structured content sections highlight the company's expertise, customer service, industry applications, and core values, creating an experience that balances technical credibility with accessible navigation.",
    outcomes: ["More scannable service pages", "Consistent responsive patterns", "An organized experience connecting company information, product offerings, and customer benefitsClearer calls to action"]
  },
  "the-aesthetics-skin": {
    number: "006.", title: "The Aesthetics Skin", year: "2025", category: "BEAUTY & SKINCARE E-COMMERCE",
    image: "photo-1534528741775-53994a69daeb",
    intro:       "A modern skincare e-commerce experience designed to bring beauty, self-care, and product discovery together through a refined and approachable digital storefront.",
    challenge:       "Create a beauty-focused online shopping experience that balances an engaging brand story with practical product discovery. The website needed to help customers explore skincare collections, find products suited to their skin, and navigate the shopping journey with confidence.",
    approach:       "We developed a clean, light interface using soft lavender accents, rounded components, and expressive beauty imagery to create a calm and contemporary visual identity. A welcoming homepage introduces the brand philosophy, while structured product listings, category filters, skin-type selections, and price controls support a more intuitive shopping experience.",
    outcomes: ["A cohesive visual identity reflecting the brand's beauty and self-care positioning", "A more organized way to explore skincare products and categories", "A shopping experience that balances editorial storytelling with product discovery"]
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
      images: [{ url: shareImage, width: 1200, height: 630, alt: `${project.title} case study by MAULANA AKBAR KUSUMA` }],
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
        <Link className="about-page-brand" href="/" aria-label="Amertha - Home">
  <Image
    src="/images/mlstvff-logo-black.svg"
    alt="Amertha"
    width={120}
    height={30}
    priority
    className="about-page-logo"
  />
</Link>
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
      <ProjectGallery projectTitle={project.title} />
      <section data-scroll-reveal className="detail-next"><p>HAVE A PROJECT IN MIND?</p><h2>Let’s make something meaningful.</h2><Link href="/contact">Let’s Discuss <span><ArrowUpRight size={16} /></span></Link></section>
      <footer className="contact-page-footer"><span>© {new Date().getFullYear()} AMERTHA. All rights reserved.</span>
<Link href="/#projects"><ArrowLeft size={15} /> Back to all projects</Link>

      </footer>
    </main>
  );
}
