import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const heroImage = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1800&q=85";

export const metadata = {
  title: "Dashboard Concept Case Study | MLSTVFF",
  description:
    "A UI/UX dashboard concept exploring clearer information hierarchy, task visibility, and focused digital workflows by Maulana Akbar Kusuma.",
  alternates: { canonical: "/case-study" },
  openGraph: {
    title: "Dashboard Concept Case Study | MLSTVFF",
    description:
      "Explore the thinking behind a dashboard concept focused on clarity, task visibility, and more intuitive workflows.",
    type: "article",
    images: [{ url: heroImage, width: 1800, height: 1200, alt: "Workspace with laptop for a dashboard design concept" }],
  },
};

const stages = [
  {
    number: "01",
    title: "Understand the challenge",
    body: "Dashboards can become difficult to scan when every metric, task, and action competes for attention. The initial design question is how to help people quickly understand what matters and what needs action.",
    output: "Problem framing and key information needs",
  },
  {
    number: "02",
    title: "Structure the information",
    body: "Group related information, establish a clear hierarchy, and give high-priority tasks a predictable place. The goal is to make the next useful action easier to identify without adding visual noise.",
    output: "Content hierarchy and workflow direction",
  },
  {
    number: "03",
    title: "Design the interface",
    body: "Use consistent spacing, typography, component patterns, and restrained emphasis to distinguish status, priority, and supporting information. Keep common actions easy to locate across the workspace.",
    output: "Dashboard interface concept",
  },
  {
    number: "04",
    title: "Prototype and refine",
    body: "A next step for this concept would be to prototype key flows, review the design with representative users, and refine any areas where people hesitate or misinterpret information.",
    output: "Proposed validation plan",
  },
];

export default function CaseStudyPage() {
  return (
    <main className="study-page">
      <header className="study-nav">
        <Link href="/" className="study-wordmark" aria-label="MLSTVFF home">MLSTVFF<span>*</span></Link>
        <Link href="/#case-study" className="study-back"><ArrowLeft size={14} /> Back to portfolio</Link>
      </header>

      <section data-scroll-reveal className="study-intro">
        <p className="study-eyebrow"><span /> FEATURED CASE STUDY · CONCEPT PROJECT</p>
        <h1>Making complex workflows feel <span>simple.</span></h1>
        <p className="study-lead">A dashboard concept exploring how tasks, priorities, and progress can be organized into a clearer digital workspace.</p>
        <div className="study-meta-grid">
          <div><span>ROLE</span><strong>UI/UX Design</strong></div>
          <div><span>PROJECT TYPE</span><strong>Independent concept</strong></div>
          <div><span>FOCUS</span><strong>Information hierarchy</strong></div>
          <div><span>STATUS</span><strong>Concept exploration</strong></div>
        </div>
      </section>

      <section data-scroll-reveal className="study-cover" aria-label="Dashboard concept cover image">
        <Image src={heroImage} alt="Laptop and workspace representing a digital dashboard concept" fill priority sizes="(max-width: 800px) 100vw, 90vw" unoptimized />
      </section>

      <section data-scroll-reveal className="study-overview">
        <div><p className="study-eyebrow"><span /> THE OVERVIEW</p><h2>Clarity should come before complexity.</h2></div>
        <div className="study-overview-copy">
          <p>This concept explores a familiar product-design challenge: presenting a lot of information without overwhelming the person using it. The proposed direction prioritizes scannability, visible task status, and predictable interactions.</p>
          <p className="study-disclaimer">This is a concept study, not a shipped product. The content describes the design rationale and proposed next steps; it does not claim validated user outcomes.</p>
        </div>
      </section>

      <section data-scroll-reveal className="study-process">
        <div className="study-section-heading"><p className="study-eyebrow"><span /> DESIGN PROCESS</p><h2>From problem framing to a clearer interface.</h2></div>
        <div className="study-stage-list">
          {stages.map((stage) => (
            <article className="study-stage" key={stage.number}>
              <span className="study-stage-number">{stage.number}</span>
              <div><h3>{stage.title}</h3><p>{stage.body}</p></div>
              <div className="study-stage-output"><span>OUTPUT</span><strong>{stage.output}</strong></div>
            </article>
          ))}
        </div>
      </section>

      <section data-scroll-reveal className="study-next">
        <p className="study-eyebrow"><span /> NEXT STEP</p>
        <h2>Good design keeps getting better.</h2>
        <p>The next iteration would validate the information hierarchy and key workflows with users, then refine the concept based on what they need to find and do most often.</p>
        <div className="study-actions"><Link href="/#projects" className="study-primary">Explore more projects <ArrowUpRight size={15} /></Link><Link href="/#contact" className="study-secondary">Let’s discuss a project <ArrowUpRight size={15} /></Link></div>
      </section>

      <footer className="study-footer"><Link href="/" className="study-wordmark">MLSTVFF<span>*</span></Link><Link href="/#case-study" className="study-back"><ArrowLeft size={14} /> Back to portfolio</Link></footer>
    </main>
  );
}
