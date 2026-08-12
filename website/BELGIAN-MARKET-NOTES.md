# CederStem website — Belgian market notes

This doc explains what was built, the assumptions made, and what's still needed
from the client before this goes live.

## What's in this build

A static, no-build-tool website (plain HTML/CSS/JS — easy for a non-developer
to edit or hand to any hosting provider) matching the brief in `Ceder_2.pdf`:

- **Dutch site (root):** `index.html`, `over-mij.html`, `aanpak.html`,
  `voor-wie.html`, `contact.html`, `privacybeleid.html`
- **English mirror:** `en/index.html`, `en/about.html`, `en/approach.html`,
  `en/for-whom.html`, `en/contact.html`, `en/privacy-policy.html`
- Shared design system in `assets/css/style.css` (cream / soft green / beige,
  serif headings, generous white space, cedar-tree mark)
- `assets/img/logo-cedar.svg` — a placeholder cedar-tree logo mark. Swap for
  the client's real logo once finalized.
- Cookie consent banner, demo contact form, `robots.txt`, `sitemap.xml`,
  `LocalBusiness` structured data, hreflang tags for NL/EN.

**Reference site (nathalienimako.com):** outbound access to that domain was
blocked in the first session, so the initial pass was designed purely from
the brief's own description. A PDF export of the site was shared afterward:
it's Nathalie Nimako's own Shopify storefront — a faith-based creative brand
("Kingdom Creatives") selling an e-book (*Called to Create*), an art print,
and a course. It's a different person and a different kind of business from
CederStem, so it was a **style** reference, not a content or identity one.
Its visual language — serif wordmark, black-and-white portrait photography,
neutral/muted palette, minimal chrome, generous white space, "Let's
network" style footer — lines up well with what was already built for
CederStem (serif headings, calm palette, lots of white space); the main
difference is her site is monochrome where CederStem's brief specifically
calls for cream/soft green/beige.

**Correction:** an earlier draft used "Nathalie" as a placeholder name on
the About page, inferring it from the reference URL. That was wrong — the
PDF confirms Nathalie Nimako is a real, unrelated person, so her name has no
place on CederStem's site. It's been replaced with a `[first name last
name]` placeholder; add the actual founder's name.

**No real photography or logo file exists yet** (per the brief — client will
send images). Hero sections currently use color/illustration instead of
photos so the site still looks intentional; swap in real photos of children
learning/playing in a natural setting when available.

The "5-step method" and specific bio/credential details are drafted as
plausible placeholder copy, clearly marked in the HTML — replace with the
client's real process and CV details.

## Added specifically for the Belgian market

1. **Bilingual by default, ready for a third language.** Dutch (nl-BE) is the
   default; English is a full mirror. French was intentionally *not*
   drafted — clinical/pedagogical language in French should come from the
   client or a native-speaking reviewer rather than be invented, given the
   sensitivity of the subject matter. The URL structure (`/fr/...`) is easy
   to add later following the same pattern as `/en/`.

2. **GDPR, and specifically child health-data GDPR.** A full draft privacy
   policy (`privacybeleid.html` / `en/privacy-policy.html`) covers: special-
   category data (Art. 9 GDPR) for developmental/health information about
   children, image rights ("beeldrecht") requiring written parental consent
   for any child photos/videos, retention periods, and a complaint path to
   the Belgian Data Protection Authority (Gegevensbeschermingsautoriteit /
   APD). **This must be reviewed by a lawyer or DPO before launch** — it's a
   solid first draft, not legal advice.

3. **Legal footer requirements.** Belgian law (Code of Economic Law, Book
   XII) requires commercial websites to display the business's legal name,
   address, and enterprise number (KBO/BCE). Footer placeholders are in
   place — fill in once the practice is registered.

4. **Trust signals Belgian parents recognize.** Copy references collaboration
   with **CLB** (Centra voor Leerlingenbegeleiding), **Kind en Gezin**, and
   mentions possible reimbursement via **mutualiteit** (health insurance
   fund) — common, recognizable trust markers in Flemish family/care
   services. Confirm which of these actually apply before publishing.

5. **Professional registration.** If there's a relevant Belgian professional
   association or register for orthopedagogues (e.g. a psychologists'
   commission registration, or a sector association), add the registration
   number to the About page — it's a strong trust signal for parents
   vetting a first-time practice.

6. **Local SEO groundwork.** `LocalBusiness` JSON-LD, `hreflang` alternates
   between NL/EN, a sitemap, and meta descriptions are in place. Still to
   do: register a Google Business Profile, target city/region keywords once
   a practice location is fixed, and consider listing on Belgian care
   directories (e.g. Zorgkaart, Twizzit, socialezorg.be).

7. **EU/Belgian hosting.** For data-residency comfort given the sensitive
   data involved, host with an EU-based provider (Belgian options like
   Combell, or any EU-region host) rather than a US-based one, and pick a
   `.be` domain to reinforce local trust.

8. **GDPR-safe forms.** The contact form is currently a front-end-only demo
   (no submissions are sent anywhere). Before launch, wire it to an
   EU-hosted form processor rather than a generic US SaaS form tool, since
   the form can end up collecting special-category data about a child.

9. **Booking flow.** Not built yet, but worth adding: an online intake/
   appointment booking button (e.g. Kalendra, Twizzit, or Calendly with EU
   data residency settings) once the client has a preferred scheduling tool.

10. **Accessibility.** Semantic HTML, skip-to-content link, keyboard-
    navigable nav, labeled form fields, and color contrast were built in
    from the start — important both as good practice for a children's-
    disability-focused practice and because Belgian/EU accessibility rules
    increasingly apply to service-sector sites.

## Confirmed by the client (applied to the site)

- Founder's name: **Patience Afram** — on the About page (NL + EN).
- Qualification: **Opvoedster** (childcare educator) — on the About page
  credentials list. **Resolved:** the client confirmed the
  "orthopedagogische begeleiding / orthopedagogical support" positioning
  is intentional and should stay throughout the site as-is.
- **Professional registration/membership number deliberately excluded** —
  client's choice, to avoid potential bias. Removed from the About page
  entirely (not even a placeholder).
- Region: **Antwerpen · Gent · Brussel** — footer and Contact page,
  every NL/EN page.
- Phone: **0489 05 65 42** — Contact page (`tel:` link), both languages.
- KBO/enterprise number: **1022.865.295** — every footer.
- Services offered: in person, home visits, and online, confirmed —
  Contact page states sessions typically run 1–2 hours/day, with
  holiday-period care up to 4 hours/day.
- French: confirmed to follow later, not needed at launch.
- Enquiries email: **cederstem@gmail.com** — replaced the placeholder
  `hallo@cederstem.be` / `privacy@cederstem.be` everywhere (footers,
  contact card, privacy policy contact). The contact form now builds a
  `mailto:` link on submit (name/email/phone/child's age/message,
  pre-filled) addressed to this inbox — no third-party form processor
  involved, which also simplifies the GDPR story (data never touches a
  server; the visitor sends it themselves from their own email client).
  Privacy policy §9 updated to describe this instead of promising a
  "GDPR-compliant EU-hosted processor before launch."
- Response time: **"zo snel mogelijk" / "as soon as possible"** — replaces
  the earlier placeholder on the Contact page.
- Payment: bank transfer or payment after the session, confirmed. IBAN
  **BE46 6502 5022 2136** added to the Payment card (NL + EN). Session
  rates still pending (placeholder: "follow once confirmed"). **Online
  payment is explicitly out of scope** — no checkout/payment gateway.
- Real photography: 5 photos of children playing with building blocks
  placed — hero image + 4-photo strip on the homepage (NL + EN).
- Mobile responsiveness: confirmed working — hamburger nav below 860px,
  hero/grids collapse to 1–2 columns, forms stack, tested at 390px width.

## Still open

- Diploma year and total years of experience for the About page.
- Session rates for the Payment card.
- Final logo file (a placeholder cedar icon is in use).
- Sign-off on the draft 5-step approach and bio copy, or requested edits.
- Confirm which mutualiteiten (if any) offer reimbursement.
