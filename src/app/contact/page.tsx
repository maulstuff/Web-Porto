"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, LoaderCircle, Mail } from "lucide-react";

const projectTypes = ["UI/UX Design", "Website Design", "Mobile App Design", "Dashboard / SaaS", "Design System", "Other collaboration"];

type FormState = "idle" | "sending" | "success" | "error";

export default function ContactPage() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Your message could not be sent. Please try again.");
      setState("success");
      form.reset();
    } catch (error) {
      setState("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <main className="contact-page">
      <header className="contact-header">
        <Link className="brand contact-brand" href="/" aria-label="MLSTVFF home">MLSTVFF<span>✳</span></Link>
        <Link className="contact-back" href="/"><ArrowLeft size={14} /> Back to home</Link>
      </header>

      <section data-scroll-reveal className="contact-hero">
        <p className="contact-eyebrow"><span /> GET IN TOUCH</p>
        <h1>Have a project in mind? <span>Let’s make it happen.</span></h1>
        <p className="contact-intro">I’m open to discussing thoughtful digital products, UI/UX design projects, and creative collaborations. Tell me a little about what you’re working on.</p>
      </section>

      <section data-scroll-reveal className="contact-content" aria-label="Contact information and message form">
        <aside className="contact-details">
          <div className="contact-info-block">
            <p className="contact-label">EMAIL ME</p>
            <a className="contact-email" href="mailto:mlstvff1@gmail.com">mlstvff1@gmail.com <ArrowUpRight size={14} /></a>
          </div>
          <div className="contact-info-block">
            <p className="contact-label">FOLLOW MY WORK</p>
            <div className="contact-socials">
              <a href="https://dribbble.com/mlstvff" target="_blank" rel="noreferrer">Dribbble <ArrowUpRight size={12} /></a>
              <a href="https://instagram.com/mlstvff" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={12} /></a>
              <a href="https://id.linkedin.com/in/maulstuff" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={12} /></a>
            </div>
          </div>
          <div className="contact-availability"><span className="availability-dot" /><p>Open to discussing selected projects and opportunities.</p></div>
        </aside>

        <div className="contact-form-wrap">
          <div className="contact-form-heading">
            <p className="contact-label">START A CONVERSATION</p>
            <h2>Send me a message<span>✳</span></h2>
            <p>Share a few details and I’ll get back to you by email.</p>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-field-row">
              <label className="contact-field"><span>Your name</span><input name="name" autoComplete="name" placeholder="e.g. Alex Morgan" minLength={2} maxLength={100} required /></label>
              <label className="contact-field"><span>Email address</span><input name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} required /></label>
            </div>
            <label className="contact-field"><span>What can I help with?</span><select name="projectType" defaultValue="" required><option value="" disabled>Select a project type</option>{projectTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select></label>
            <label className="contact-field"><span>Project details</span><textarea name="message" placeholder="A little about your goals, timeline, or idea..." rows={5} minLength={10} maxLength={5000} required /></label>
            <label className="contact-honeypot" aria-hidden="true">Leave this field empty<input name="companyWebsite" tabIndex={-1} autoComplete="off" /></label>
            <button className="contact-submit" type="submit" disabled={state === "sending"}>
              <span>{state === "sending" ? "Sending message..." : "Send message"}</span>
              <span className="contact-submit-icon">{state === "sending" ? <LoaderCircle size={16} className="contact-spinner" /> : <ArrowUpRight size={16} />}</span>
            </button>
            {state === "success" && <p className="contact-status contact-status-success" role="status"><CheckCircle2 size={16} /> Message sent successfully. Thanks for reaching out!</p>}
            {state === "error" && <p className="contact-status contact-status-error" role="alert">{errorMessage}</p>}
            <p className="contact-privacy-note"><Mail size={13} /> Your message will be sent directly to my email. Your details are only used to respond to your inquiry.</p>
          </form>
        </div>
      </section>

      <footer className="contact-page-footer"><span>© {new Date().getFullYear()} MLSTVFF. All rights reserved.</span><Link href="/">Back to portfolio <ArrowUpRight size={12} /></Link></footer>
    </main>
  );
}
