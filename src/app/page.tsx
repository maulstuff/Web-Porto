"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Menu, X } from "lucide-react";
import { motion } from "framer-motion";


const services = [
  { n: "01", title: "UX RESEARCH & STRATEGY", text: "Understanding user needs through research, identifying pain points, and turning insights into a clear product strategy. I use these findings to shape user journeys and prioritize the problems that matter most.", kind: "text" },
  { n: "02", title: "UI DESIGN", text: "Designing clean, accessible interfaces with thoughtful hierarchy, typography, and visual consistency. Every screen is crafted to feel intuitive, communicate clearly, and support users across different devices.", kind: "text" },
  { n: "03", title: "PROTOTYPING & TESTING", text: "Making ideas tangible with interactive prototypes and validating flows before development. Testing key interactions early helps uncover friction, refine user journeys, and give the team confidence in the final direction.", kind: "text" },
  { n: "04", title: "DESIGN SYSTEMS", text: "Building reusable components, clear usage rules, and practical documentation to keep digital products consistent. A scalable design system helps teams work faster while maintaining quality across every screen.", kind: "text" },
  { n: "05", title: "PRODUCT DESIGN", text: "Connecting user needs with business goals to shape useful, intuitive digital products from discovery to delivery. I balance functionality, visual clarity, and real-world constraints to create experiences that work as a whole.", kind: "text" },
  { n: "06", title: "CREATIVE DIRECTION", text: " ", kind: "image" },
];

const projects = [
  { n: "001.", title: "Archy Industries", slug: "archy-industries", year: "2023", category: "INDUSTRIAL DESIGN", image: "photo-1531058020387-3be344556be6", className: "project-large", alt: "Sculptural dark product design" },
  { n: "002.", title: "Madhouse", slug: "madhouse", year: "2023", category: "CREATIVE & DIGITAL AGENCY", image: "photo-1506794778202-cad84cf45f1d", className: "project-small", alt: "Creative studio portrait" },
  { n: "003.", title: "Atexco", slug: "atexco", year: "2023", category: "INDUSTRIAL & DIGITAL PRINTING", image: "photo-1557682250-33bd709cbe85", className: "project-center", alt: "Abstract monochrome brand texture" },
  { n: "004.", title: "Putra Mutiara Jaya", slug: "putra-mutiara-jaya", year: "2024", category: "INDUSTRIAL PRINTING SOLUTIONS", image: "photo-1518770660439-4636190af475", className: "project-small project-four", alt: "Minimal technology product" },
  { n: "006.", title: "SYNCLAB", slug: "synclab", year: "2023", category: "WEBSITE", image: "photo-1534528741775-53994a69daeb", className: "project-large project-six", alt: "Minimal fashion portrait" },
];

const imageUrl = (id: string, width = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;


function CountUp({ value, duration = 1800 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    let startTime = 0;
    const tick = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      // Ease-out keeps the count readable while still feeling smooth.
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(value * eased));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [value, duration]);

  return <span aria-label={String(value)}>{String(count).padStart(2, "0")}</span>;
}

function SectionMarker({ label }: { label: string }) {
  return (
    <div className="section-marker">
      <span className="green-square" />
      <span>{label}</span>
    </div>
  );
}

function AsteriskMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="square"
      >
        <path d="M20 2V38" />
        <path d="M2 20H38" />
        <path d="M7.3 7.3L32.7 32.7" />
        <path d="M32.7 7.3L7.3 32.7" />
      </g>
    </svg>
  );
}
function Divider() {
  return <div className="section-divider" aria-hidden="true" />;
}

function PillLink({ children = "Let’s Discuss", dark = false, href = "/contact" }: { children?: React.ReactNode; dark?: boolean; href?: string }) {
  return <a className={`pill-link ${dark ? "pill-dark" : ""}`} href={href}>{children}<span className="pill-icon"><ArrowUpRight size={13} /></span></a>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Add reveal classes before the first paint, then reveal each card only when it enters the viewport.
  useEffect(() => {
    document.documentElement.classList.add("js-scroll-reveal");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".page-shell > section.section-pad:not(.about)"));
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>(
      ".about-copy, .services-grid > .service-card, .project-card, .process-grid > .process-card, .faq-list > .faq-item, .case-study-feature, .collaboration-grid > *"
    ));

    if (!("IntersectionObserver" in window)) {
      [...sections, ...revealItems].forEach((item) => item.classList.add("is-revealed"));
      return;
    }

    // Respect accessibility preferences while keeping the layout visible.
    if (reduceMotion) {
      [...sections, ...revealItems].forEach((item) => item.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });

    [...sections, ...revealItems].forEach((item, index) => {
      item.classList.add("scroll-reveal");
      if (revealItems.includes(item)) {
        const siblings = item.parentElement ? Array.from(item.parentElement.children) : [];
        const siblingIndex = siblings.indexOf(item);
        item.style.setProperty("--reveal-delay", `${Math.max(0, siblingIndex) % 5 * 85}ms`);
      }
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  const faqs = [
    { question: "What kind of projects do you work on?", answer: "I focus on UI/UX and product design for websites, dashboards, and digital products — from improving an existing experience to shaping a new idea." },
    { question: "What does your design process look like?", answer: "I usually start by understanding the goals and user needs, then define the structure, explore interface concepts, build prototypes, and refine the design with feedback." },
    { question: "How long does a project usually take?", answer: "It depends on the scope, complexity, and feedback rounds. A focused design task may take a few days, while a larger product or website can take several weeks." },
    { question: "Can I request revisions?", answer: "Absolutely. Feedback is part of the process. We’ll align on the project scope and review milestones so there’s room to refine the design in the right direction." },
    { question: "What tools do you use?", answer: "My workflow can include Figma for interface design and prototyping, alongside collaboration and documentation tools to keep decisions and handoff clear." },
  ];

  return (
    <main>
      <section className="hero" id="home">
        <div className="hero-glow hero-glow-green" />
        <div className="hero-glow hero-glow-blue" />
        <header className="topbar">
          <a href="#home" className="brand" aria-label="Amertha Home">
  <Image
    src="/images/mlstvff-logo-white.svg"
    alt="Amertha"
    width={120}
    height={30}
    priority
  />
</a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
          <nav className={menuOpen ? "nav-links nav-open" : "nav-links"}>
            <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="/about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
            <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
            <a href="/contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </nav>
          <div className="topbar-right"><a href="/contact">Let’s Discuss</a><a className="round-green" href="/contact" aria-label="Discuss a project"><ArrowUpRight size={14} /></a></div>
        </header>

        <div className="hero-content">

<motion.h1
  className="hero-logo-heading"
  initial={{ opacity: 0, y: 25 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  <Image
    src="/images/mlstvff-logo-white.svg"
    alt="Amertha"
    width={1036}
    height={251}
    priority
    className="hero-logo-image"
  />
</motion.h1>

          {/*<a className="hero-down" href="#footer" aria-label="Scroll to about"><ArrowDown size={15} /></a>*/}
          <div className="hero-bottom">
            <div className="stats" aria-label="Portfolio overview">
              <div><strong><CountUp value={projects.length} /></strong><span>Featured projects</span></div>
              <div><strong><CountUp value={services.length} /></strong><span>Clients & Collaborations</span></div>
              <div><strong><CountUp value={4} /></strong><span>Design stages</span></div>
            </div>
            <div className="hero-intro">
              <p>Hi, I’m Maulana Akbar Kusuma, a UI/UX designer from Indonesia. I design clear, thoughtful digital experiences for websites, dashboards, and products.</p>
              <PillLink />
            </div>
          </div>
        </div>
      </section>

      <div className="page-shell">
        <section className="about section-pad" id="about">
          <Divider />
          <div className="about-grid">
            <div className="about-label"><SectionMarker label="ABOUT ME" />{/* <PillLink dark /> */}</div>
            <div className="about-copy">
              <h2>I’m Maulana Akbar Kusuma, a UI/UX designer from Indonesia. I turn complex ideas into clear, intuitive digital experiences through thoughtful research and visual design.</h2>
              <div className="about-actions"><a className="text-link" href="/about">More about me <ArrowUpRight size={13} /></a><a className="cv-download" href="/cv-maulana-akbar-kusuma.pdf" download>Download CV <ArrowUpRight size={13} /></a></div>
            </div>
          </div>
        </section>

        <section className="services section-pad" id="services">
          <Divider />
          <SectionMarker label="SERVICES" />
          <div className="services-grid">
            {services.map((service) => (
              <article
                className={`service-card ${service.kind === "image" ? "service-image-card" : ""}`}
                key={service.n}
              >
                {service.kind === "image" ? (
                  <Image
                    src={imageUrl("photo-1529139574466-a303027c1d8b", 900)}
                    alt="Fashion editorial image used as a visual service card"
                    fill
                    sizes="(max-width: 700px) 100vw, 33vw"
                  />
                ) : (
                  <>
                    <div className="service-heading">
                      <span>{service.n}</span>
                      <h3>{service.title}</h3>
                    </div>
                    <p>{service.text}</p>
                  </>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="projects section-pad" id="projects">
          <Divider />
          <SectionMarker label="SELECTED PROJECTS" />
          <div className="project-grid">
            {projects.map((project) => (
              <article className={`project-card ${project.className}`} key={project.n}>
                <a className="project-image" href={`/projects/${project.slug}`} aria-label={`View project details for ${project.title}`}>
                  <Image src={imageUrl(project.image, 1400)} alt={project.alt} fill sizes="(max-width: 700px) 100vw, 50vw" />
                  <span className="view-project">VIEW <ArrowUpRight size={12} /></span>
                </a>
                <div className="project-meta">
                  <span className="project-number">{project.n}</span>
                  <div className="project-name"><strong>{project.title}</strong><span>{project.year}</span></div>
                  <span className="project-category">{project.category}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="case-study section-pad" id="case-study">
          <Divider />
          <div className="case-study-heading">
            <div>
              <SectionMarker label="FEATURED CASE STUDY" />
              <h2>Making complex workflows feel <span>simple.</span></h2>
            </div>
            <p>A dashboard concept exploring how tasks, priorities, and progress can be organized into a clearer digital workspace.</p>
          </div>
          <article className="case-study-feature">
            <a className="case-study-visual" href="/case-study" aria-label="Open the featured dashboard case study">
              <Image src={imageUrl("photo-1498050108023-c5249f4df085", 1800)} alt="Workspace with a laptop showing a digital interface" fill sizes="(max-width: 700px) 100vw, 58vw" />
              <span className="case-study-visual-label">DASHBOARD CONCEPT <ArrowUpRight size={14} /></span>
            </a>
            <div className="case-study-copy">
              <div className="case-study-meta"><span>UI/UX DESIGN</span><span>CONCEPT STUDY</span></div>
              <h3>Designing a more focused workspace</h3>
              <p>The aim is to make important information easier to scan, help people understand what needs attention, and keep common actions within reach. This concept focuses on information hierarchy, task visibility, and a consistent interface system.</p>
              <div className="case-study-details">
                <div><span>01 / CHALLENGE</span><strong>Reduce visual noise</strong></div>
                <div><span>02 / APPROACH</span><strong>Clarify hierarchy and flows</strong></div>
                <div><span>03 / DESIGN FOCUS</span><strong>Dashboard UI and interaction</strong></div>
              </div>
              <a className="text-link" href="/case-study">Explore my process <ArrowUpRight size={13} /></a>
            </div>
          </article>
          <p className="case-study-note">Concept presentation. Replace this example with a real project and verified process details before publishing.</p>
        </section>

        <section className="process section-pad" id="process">
          <Divider />
          <div className="process-heading">
            <div>
              <SectionMarker label="HOW I WORK" />
              <h2>Design process<span>—</span><br />from insight to impact.</h2>
            </div>
            <p>Good design is more than how it looks. It starts with understanding the problem, exploring the right ideas, and refining the details that make a product easier to use.</p>
          </div>
          <div className="process-grid">
            <article className="process-card">
              <div className="process-card-top"><span>01</span>{/*<span className="process-symbol">↗</span>*/}</div>
              <h3>Discover</h3>
              <p>Understand the people, goals, and challenges behind the product before jumping into solutions.</p>
              <div className="process-output"><span>KEY OUTPUT</span><strong>Research & insights</strong></div>
            </article>
            <article className="process-card">
              <div className="process-card-top"><span>02</span>{/*<span className="process-symbol">⌁</span>*/}</div>
              <h3>Define</h3>
              <p>Turn what we learn into a clear problem statement, user flows, and a focused product direction.</p>
              <div className="process-output"><span>KEY OUTPUT</span><strong>Flows & structure</strong></div>
            </article>
            <article className="process-card process-card-featured">
              <div className="process-card-top"><span>03</span>{/*<span className="process-symbol">✳</span>*/}</div>
              <h3>Design</h3>
              <p>Explore concepts and build a thoughtful interface with clear hierarchy, useful interactions, and a consistent visual language.</p>
              <div className="process-output"><span>KEY OUTPUT</span><strong>UI & prototype</strong></div>
            </article>
            <article className="process-card">
              <div className="process-card-top"><span>04</span>{/*<span className="process-symbol">↻</span>*/}</div>
              <h3>Validate & refine</h3>
              <p>Test key journeys, learn from feedback, and refine the experience before handing it over for development.</p>
              <div className="process-output"><span>KEY OUTPUT</span><strong>Tested handoff</strong></div>
            </article>
          </div>
        </section>


        <section className="collaboration section-pad" id="collaboration">
          <Divider />
          <div className="collaboration-heading">
            <div>
              <SectionMarker label="COLLABORATION" />
              <h2>Good work comes from <span>good collaboration.</span></h2>
            </div>
            <p>A few principles I bring into a project, from the first conversation to the final handoff.</p>
          </div>
          <div className="collaboration-grid">
            <article><span>01</span><h3>Clear communication</h3><p>Share context, align on goals, and keep decisions easy to follow throughout the process.</p></article>
            <article><span>02</span><h3>Thoughtful decisions</h3><p>Choose solutions based on user needs and project goals, not decoration alone.</p></article>
            <article><span>03</span><h3>Useful handoff</h3><p>Prepare organized components, interaction details, and notes that support implementation.</p></article>
          </div>
        </section>

        <section className="faq section-pad" id="faq">
          <Divider />
          <div className="faq-layout">
            <div className="faq-intro">
              <SectionMarker label="GOOD TO KNOW" />
              <h2>Questions, <span>answered.</span></h2>
              <p>A few things you might want to know before we start working together.</p>
              <a className="faq-contact-link" href="/contact">Have another question? <span>Let’s talk <ArrowUpRight size={13} /></span></a>
            </div>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <article className={`faq-item ${openFaq === index ? "faq-item-open" : ""}`} key={faq.question}>
                  <button className="faq-question" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>
                    <span>{faq.question}</span>
                    <span className="faq-toggle" aria-hidden="true">{openFaq === index ? "−" : "+"}</span>
                  </button>
                  {openFaq === index && <div className="faq-answer"><p>{faq.answer}</p></div>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <footer className="footer section-pad" id="contact">
          <div className="footer-shell">
            <div className="footer-card">
              <div className="footer-top">
                <div className="footer-about">
                  
<a className="brand footer-brand" href="#home" aria-label="MLSTVFF — Home">
  <Image
    src="/images/mlstvff-logo-black.svg"
    alt="MLSTVFF"
    width={180}
    height={44}
    className="footer-logo-image"
  />
</a>

                  <p>Turning ideas into clear, useful digital experiences through thoughtful UI/UX and product design.</p>
                  <a className="pill-link footer-cv-link" href="/CV - Maulana Akbar Kusuma 2026 - English.pdf" download>Download CV <span className="pill-icon"><ArrowUpRight size={13} /></span></a>
                </div>
                <div className="footer-right-group">
                  <div className="footer-links"><h4>Explore</h4><a href="#home">Home</a><a href="/about">About</a><a href="#services">Services</a><a href="#projects">Projects</a><a href="/contact">Contact</a></div>
                  <div className="footer-connect"><h4>Let’s connect</h4><div><a href="https://dribbble.com/mlstvff" target="_blank" rel="noreferrer">Dribbble <ArrowUpRight size={12} /></a><a href="https://instagram.com/mlstvff" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={12} /></a><a href="https://id.linkedin.com/in/maulstuff" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={12} /></a></div></div>
                </div>
              </div>
              <div className="footer-bottom"><span>© {new Date().getFullYear()} Amertha. All rights reserved.</span></div>
            </div>
            <div className="footer-wordmark" aria-hidden="true">AMERTHA</div>
          </div>
        </footer>
      </div>
    </main>
  );
}
