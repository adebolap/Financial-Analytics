// Vercel serverless function: /api/book
// Sends the contact form directly via Gmail SMTP instead of relying on the
// visitor's own email client — submission happens on the site.
//
// Stateless: nothing is persisted anywhere. The two emails sent below (one
// to the CederStam inbox, one confirmation back to the visitor) are the
// only record of the enquiry. There is no calendar/slot locking, so this
// does not prevent two people requesting the same date — the practice
// still confirms manually by replying to the enquiry email, same as
// before. See BELGIAN-MARKET-NOTES.md for the reasoning and the setup
// steps required (a Gmail App Password) before this works.

const nodemailer = require("nodemailer");

const BUSINESS_NAME = "CederStam";

const TEXT = {
  nl: {
    ownerSubject: (naam, ref) => `Nieuwe contactaanvraag — ${naam} (${ref})`,
    confirmSubject: () => `Bevestiging van je aanvraag — ${BUSINESS_NAME}`,
    confirmBody: (naam, ref) =>
      `Hallo ${naam},\n\n` +
      `Bedankt voor je bericht aan ${BUSINESS_NAME}. Ik heb je aanvraag ontvangen en antwoord zo snel mogelijk.\n\n` +
      `Je referentie: ${ref}\n\n` +
      `Tot binnenkort,\nPatience — ${BUSINESS_NAME}`,
    fields: {
      naam: "Naam", email: "E-mail", telefoon: "Telefoon",
      leeftijd: "Leeftijd kind", datum: "Gewenste datum", tijdstip: "Voorkeur tijdstip",
      geen: "geen voorkeur",
    },
  },
  en: {
    ownerSubject: (naam, ref) => `New contact request — ${naam} (${ref})`,
    confirmSubject: () => `Confirmation of your request — ${BUSINESS_NAME}`,
    confirmBody: (naam, ref) =>
      `Hi ${naam},\n\n` +
      `Thank you for your message to ${BUSINESS_NAME}. I've received your request and will reply as soon as possible.\n\n` +
      `Your reference: ${ref}\n\n` +
      `Talk soon,\nPatience — ${BUSINESS_NAME}`,
    fields: {
      naam: "Name", email: "Email", telefoon: "Phone",
      leeftijd: "Child's age", datum: "Preferred date", tijdstip: "Preferred time",
      geen: "no preference",
    },
  },
  fr: {
    ownerSubject: (naam, ref) => `Nouvelle demande de contact — ${naam} (${ref})`,
    confirmSubject: () => `Confirmation de votre demande — ${BUSINESS_NAME}`,
    confirmBody: (naam, ref) =>
      `Bonjour ${naam},\n\n` +
      `Merci pour votre message à ${BUSINESS_NAME}. J'ai bien reçu votre demande et je réponds dans les meilleurs délais.\n\n` +
      `Votre référence : ${ref}\n\n` +
      `À bientôt,\nPatience — ${BUSINESS_NAME}`,
    fields: {
      naam: "Nom", email: "E-mail", telefoon: "Téléphone",
      leeftijd: "Âge de l'enfant", datum: "Date souhaitée", tijdstip: "Moment préféré",
      geen: "pas de préférence",
    },
  },
};

function isValidEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body = req.body || {};
  const naam = (body.naam || "").toString().trim();
  const email = (body.email || "").toString().trim();
  const telefoon = (body.telefoon || "").toString().trim();
  const leeftijd = (body.leeftijd || "").toString().trim();
  const datum = (body.datum || "").toString().trim();
  const tijdstip = (body.tijdstip || "").toString().trim();
  const bericht = (body.bericht || "").toString().trim();
  const lang = TEXT[body.lang] ? body.lang : "nl";
  const t = TEXT[lang];

  if (!naam || !isValidEmail(email) || !bericht) {
    res.status(400).json({ error: "Missing or invalid required fields" });
    return;
  }

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    res.status(503).json({ error: "Mail sending is not configured yet" });
    return;
  }

  const ref = "CS-" + Date.now().toString(36).toUpperCase();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const summary = [
    `${t.fields.naam}: ${naam}`,
    `${t.fields.email}: ${email}`,
    `${t.fields.telefoon}: ${telefoon || "-"}`,
    `${t.fields.leeftijd}: ${leeftijd || "-"}`,
    `${t.fields.datum}: ${datum || t.fields.geen}`,
    `${t.fields.tijdstip}: ${tijdstip || t.fields.geen}`,
    `Ref: ${ref}`,
    "",
    bericht,
  ].join("\n");

  try {
    await transporter.sendMail({
      from: `"${BUSINESS_NAME} website" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: t.ownerSubject(naam, ref),
      text: summary,
    });

    await transporter.sendMail({
      from: `"${BUSINESS_NAME}" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: t.confirmSubject(),
      text: t.confirmBody(naam, ref),
    });

    res.status(200).json({ ok: true, reference: ref });
  } catch (err) {
    console.error("book.js send failure:", err);
    res.status(502).json({ error: "Failed to send email" });
  }
};
