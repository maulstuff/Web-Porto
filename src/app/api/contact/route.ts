import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 5000;
const ALLOWED_PROJECT_TYPES = new Set([
  "UI/UX Design",
  "Website Design",
  "Mobile App Design",
  "Dashboard / SaaS",
  "Design System",
  "Other collaboration",
]);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const projectType = String(body.projectType ?? "").trim();
    const message = String(body.message ?? "").trim();
    const honeypot = String(body.companyWebsite ?? "").trim();

    // Quietly accept bot submissions without sending email.
    if (honeypot) return NextResponse.json({ ok: true });

    if (name.length < 2 || name.length > 100) {
      return NextResponse.json({ error: "Please enter a name between 2 and 100 characters." }, { status: 400 });
    }
    if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!ALLOWED_PROJECT_TYPES.has(projectType)) {
      return NextResponse.json({ error: "Please select a valid project type." }, { status: 400 });
    }
    if (message.length < 10 || message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json({ error: "Please write a message between 10 and 5,000 characters." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "The contact form is not configured yet. Please email mlstvff1@gmail.com directly." }, { status: 503 });
    }

    const from = process.env.CONTACT_FROM_EMAIL || "MLSTVFF Contact <onboarding@resend.dev>";
    const recipient = process.env.CONTACT_TO_EMAIL || "mlstvff1@gmail.com";
    const safeName = name.replace(/[\r\n]/g, " ");

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: email,
        subject: `Portfolio inquiry — ${safeName} (${projectType})`,
        text: [
          "You received a new message from the MLSTVFF portfolio contact form.",
          "",
          `Name: ${safeName}`,
          `Email: ${email}`,
          `Project type: ${projectType}`,
          "",
          "Message:",
          message,
        ].join("\n"),
      }),
      cache: "no-store",
    });

    if (!resendResponse.ok) {
      const details = await resendResponse.json().catch(() => ({}));
      console.error("Resend contact email failed:", resendResponse.status, details);
      return NextResponse.json({ error: "The message could not be sent right now. Please try again or email mlstvff1@gmail.com directly." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form request failed:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again or email mlstvff1@gmail.com directly." }, { status: 500 });
  }
}
