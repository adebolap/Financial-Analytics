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

- Founder's name: **Patience Afram** — now on the About page (NL + EN).
- Qualification: **Opvoedster** (childcare educator). Applied to the About
  page credentials list. **Flag:** the rest of the site's copy still says
  "orthopedagogische begeleiding / orthopedagogical support" throughout,
  which in Belgium usually implies an orthopedagogiek degree — a different,
  specific qualification from "opvoedster." Worth confirming with the client
  whether that positioning/terminology is intentional (e.g. she works under
  supervision of, or in the tradition of, orthopedagogical methods) or
  whether the site's language should shift to match "opvoedster" more
  literally, before this goes live.
- Region: **Antwerpen · Gent · Brussel** — updated in the footer and
  Contact page on every NL/EN page.
- Phone: **0489 05 65 42** — added to the Contact page (`tel:` link) on
  both languages.
- KBO/enterprise number: **1022.865.295** — added to every footer.
- Services offered: in person, home visits, and online, confirmed —
  Contact page now states sessions typically run 1–2 hours/day, with
  holiday-period care up to 4 hours/day.
- French: confirmed to follow later, not needed at launch.
- Gmail-based bookings: confirmed as the intended flow (as used on a
  previous project). **Still needed:** which Gmail address to route
  enquiries to, and whether it should go through a lightweight static
  form-forwarder (no backend required) or a mailto: link. The contact
  form is not wired up to any address yet.
- Real photography: 5 photos of children playing with building blocks
  received and placed — hero image and a 4-photo strip on the homepage
  (NL + EN).
- Payment: confirmed as bank transfer or payment after the session. Added
  as a "Betaling" / "Payment" card on the Contact page (NL + EN). **Still
  needed:** the actual bank account number (IBAN) and session rates —
  currently a placeholder line saying these "follow once confirmed."

## Still open

- Diploma year, total years of experience, and any professional
  registration/membership number for the About page.
- The "opvoedster" vs. "orthopedagogisch" terminology question above.
- Which Gmail address the contact form should send to.
- IBAN / bank account number and session rates for the new Payment card.
- Typical response time for enquiries (session-length info was given,
  but not reply turnaround).
- Confirm which mutualiteiten (if any) offer reimbursement.
- Final logo file (a placeholder cedar icon is in use).
- Sign-off on the draft 5-step approach and bio copy, or requested edits.
