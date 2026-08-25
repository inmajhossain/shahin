import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    let query = {};
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query = {
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
      };
    }

    const contacts = await Contact.find(query).sort({ createdAt: -1 }).lean();
    
    // Convert MongoDB ObjectId to string
    const formattedContacts = contacts.map(contact => ({
      ...contact,
      _id: contact._id.toString()
    }));
    
    return NextResponse.json(formattedContacts);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: unknown = await request.json();

    if (!data || typeof data !== "object") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    const input = data as Record<string, unknown>;
    const name = typeof input.name === "string" ? input.name.trim() : "";
    const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
    const message = typeof input.message === "string" ? input.message.trim() : "";
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name || name.length > 80 || !validEmail || email.length > 254 || !message || message.length > 4000) {
      return NextResponse.json(
        { error: "Please provide a valid name, email, and message" },
        { status: 400 }
      );
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
    const recipient = process.env.CONTACT_EMAIL || "devinmaj@gmail.com";

    if (!gmailUser || !gmailAppPassword) {
      console.error("Contact email is not configured");
      return NextResponse.json(
        { error: "Email delivery is not configured yet" },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    await transporter.sendMail({
      from: `Inmaj Portfolio <${gmailUser}>`,
      to: recipient,
      replyTo: email,
      subject: `New portfolio inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;padding:32px;color:#171717">
          <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#6b7280">New portfolio inquiry</p>
          <h1 style="font-size:28px;margin:8px 0 24px">${escapeHtml(name)}</h1>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <div style="margin-top:24px;padding:20px;border-radius:12px;background:#f4f4f5;white-space:pre-wrap">${escapeHtml(message)}</div>
          <p style="margin-top:24px;font-size:12px;color:#6b7280">Sent from the Inmaj portfolio contact form.</p>
        </div>
      `,
    });

    let savedContact: Record<string, unknown> | null = null;
    try {
      await connectDB();
      const contact = await Contact.create({ name, email, message });
      savedContact = {
        ...contact.toObject(),
        _id: contact._id.toString(),
      };
    } catch (databaseError) {
      // Email delivery is the primary action. A temporary database outage must
      // not tell the visitor their successfully delivered inquiry failed.
      console.error("Contact was emailed but could not be saved:", databaseError);
    }

    return NextResponse.json(
      { delivered: true, saved: Boolean(savedContact), contact: savedContact },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Your message could not be delivered. Please email me directly." },
      { status: 500 }
    );
  }
}
