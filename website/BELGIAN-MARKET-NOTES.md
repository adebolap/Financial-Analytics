# CederStam website — Belgian market notes

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
CederStam, so it was a **style** reference, not a content or identity one.
Its visual language — serif wordmark, black-and-white portrait photography,
neutral/muted palette, minimal chrome, generous white space, "Let's
network" style footer — lines up well with what was already built for
CederStam (serif headings, calm palette, lots of white space); the main
difference is her site is monochrome where CederStam's brief specifically
calls for cream/soft green/beige.

**Correction:** an earlier draft used "Nathalie" as a placeholder name on
the About page, inferring it from the reference URL. That was wrong — the
PDF confirms Nathalie Nimako is a real, unrelated person, so her name has no
place on CederStam's site. It's been replaced with a `[first name last
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

9. **Booking flow — now server-side, updated.** The Contact page still
   has the date + time-of-day preference picker (Ochtend/Namiddag/Avond),
   but submitting it no longer opens the visitor's email client. It now
   POSTs to `/api/book`, a Vercel serverless function that sends the
   message via Gmail SMTP (Nodemailer) on the practice's behalf — the
   booking genuinely happens on the site now, not in a mailto: draft.
   Explicitly **not** Calendly/Twizzit/Kalendra and **not** the Google
   Calendar API — this uses Gmail's own SMTP under the account already in
   use, nothing more, matching the "Gmail as the center of the schedule,
   A–Z" goal. See README.md for the one-time setup (a Gmail App Password
   + two Vercel environment variables) needed to activate it — **until
   that's done, the form automatically falls back to the old mailto:
   behaviour**, so nothing breaks in the meantime.
   Same honest limitation as before: still no real calendar, so nothing
   prevents two people requesting the same date/time — it remains a
   *preference*, confirmed manually by reply. Stateless by design:
   nothing is stored anywhere, the sent email is the only record. A true
   live-availability system (real open slots, automatic locking) would
   need an actual calendar backend (e.g. embedding Google Calendar's
   "Appointment schedule," or the Calendar API + a datastore) — still a
   future option if enquiry volume ever makes manual confirmation
   painful, not something needed for a new solo practice.

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
- **French: built, then removed.** A full `/fr/` mirror was built (see
  git history), but the client asked to drop French entirely — the site
  is bilingual (NL/EN) only now. The `fr/` folder, its hreflang/sitemap/
  robots.txt entries, and the `fr` block in `api/book.js` were all
  deleted.
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
- Payment: the IBAN was later **removed** from the Payment card at the
  client's request — it now says payment details are agreed directly
  with the parent (NL + EN). Session rates still pending (placeholder:
  "follow once confirmed"). **Online payment is explicitly out of
  scope** — no checkout/payment gateway.
- Real photography: 5 photos of children playing with building blocks
  placed — hero image + 4-photo strip on the homepage (NL + EN).
- Mobile responsiveness: confirmed working — hamburger nav below 860px,
  hero/grids collapse to 1–2 columns, forms stack, tested at 390px width.
- **Mutualiteit/reimbursement claim removed entirely** — the homepage
  badge and the paragraph on the For Whom page are gone (NL + EN). No
  reimbursement claim is made anywhere on the site now.
- **Professional positioning:** "Orthopedagogisch begeleider" now used
  as Patience's title — on the homepage hero eyebrow and in her About
  page introduction (NL + EN). The service description "orthopedagogische
  begeleiding en opvoedingsondersteuning" (client-provided phrasing) is
  used in body copy, meta descriptions, and footer taglines site-wide.
- **Services list added** — a new "Wat ik aanbied" / "What I offer"
  section on the Approach page (NL + EN) covering: sociaal-emotionele
  begeleiding, gedragsgerichte begeleiding, autismebegeleiding,
  ontwikkelingsgerichte begeleiding, opvoedingsondersteuning, and
  samenwerking met school/CLB. Autism support card specifically covers
  structure, communication, emotions, social situations, and daily
  functioning. Opvoedingsondersteuning card covers behaviour,
  communication, boundaries, routines, and practical strategies at home.
- **Location simplified to Antwerpen** — every footer, the Contact page
  region field, and meta/structured data now say Antwerpen (EN: Antwerp)
  only, replacing the earlier three-city listing.
- **Short description** applied to meta descriptions, OG tags, JSON-LD,
  page titles, and the homepage hero lede, based on the client's example:
  "CederStam biedt orthopedagogische begeleiding en opvoedingsondersteuning."

## Conversion/layout additions (site-wide, NL + EN)

- **Sticky header CTA.** A compact "Plan een kennismaking" / "Book an
  introduction" button now sits in the header nav, which is already
  `position: sticky`, so it's visible at all times while scrolling on
  desktop. Hidden below 860px and folded into the mobile dropdown menu
  instead, to avoid crowding the small-screen header.
- **FAQ accordion** on every homepage (native `<details>/<summary>`,
  no JS), addressing the questions most likely to stall a booking:
  what happens at the intro call, languages, location, programme
  length, school collaboration, and cost (answered honestly as
  "discussed during the intro call" — no invented numbers, and no
  mutualiteit/reimbursement claim, consistent with its earlier removal).
- **"What happens next" mini-timeline** on every Contact page, right
  above the form: send message → reply asap → plan the intro. Reduces
  uncertainty about what submitting the form actually leads to.

## Round 4 — brand/content update batch (2026-09-04)

Applied from a client message with the real logo file, a portrait photo,
and a list of instructions. Site-wide, NL + EN:

- **Real logo applied.** The client's icon-and-wordmark PNG is now the
  source file (`assets/img/logo-cederstam.png`, background removed for
  transparency). A cropped icon-only version (`logo-icon.png`) replaced
  the placeholder inline cedar SVG in the header and footer brand marks
  on every page. `favicon.png` and `apple-touch-icon.png` were generated
  from the same icon for the browser tab / home-screen icon.
- **About page photo added.** The client's portrait photo
  (`assets/img/patience-portrait.jpg`) now sits in the About page hero,
  in the same two-column `hero-grid`/`hero-visual` layout already used
  on the homepage.
- **Footer restyled**: white background, black text (was the sage-tinted
  footer from the original palette).
- **French removed entirely** (see note in the "Confirmed by the client"
  section above) — site is NL/EN only again.
- **CLB and Kind en Gezin collaboration removed.** Per the client,
  CederStam does not position itself as collaborating with CLB or Kind
  en Gezin — only with schools and directly with parents. Updated the
  homepage badge + FAQ, the Approach page (services card, step 02,
  "what is orthopedagogical support" section), the For Whom page ("good
  to know" section), and Privacy Policy §6 (data-sharing) accordingly.
- **"Teachers & care professionals" audience removed** from the
  homepage's "Who I'm here for" 3-card grid (now 2 cards, `grid-2`) and
  the For Whom page's 6-card grid (now 5 cards).
- **IBAN removed** from the Payment card on the Contact page — now says
  payment details are agreed directly with the parent.
- **Dutch gloss removed from the EN site.** The English pages no longer
  show "(orthopedagogical support worker)" as a parenthetical next to
  the Dutch term "orthopedagogisch begeleider" — the EN pages now read
  "orthopedagogical support worker" only, on the homepage hero and the
  About page intro.

### Two items resolved after asking the client

Two items in that same message were ambiguous enough that guessing felt
riskier than asking, especially since one touches sensitive disability
terminology. Both are now resolved:

1. **"Cedar Tribe: only in Antwerp."** Confirmed this just meant
   "CederStam is only for the Antwerp region" — a re-confirmation of the
   location scope already applied in an earlier round (see "Confirmed
   by the client" above). No further change needed.
2. **"Autistic Kids / Children with intellectual disability becomes
   behavioural challenges."** Confirmed: rename the existing card only
   (no separate autism card added). The "Kinderen met een verstandelijke
   beperking" / "Children with an intellectual disability" audience card
   on the "Voor wie?"/"For whom?" pages is now **"Gedragsuitdagingen"**
   / **"Behavioural challenges"** (card description unchanged). Meta
   descriptions on both pages updated to match.

## Round 5 — About page copy cleanup

The About page ("Mijn verhaal" / "My story" and "Ervaring & opleiding" /
"Experience & education") no longer shows bracketed placeholder text
(`[jaartal diploma aan te vullen]`, `[Aantal] jaar ervaring`,
`[organisatie / school / praktijk]`, etc.) or the "this is placeholder
text" notice. It's rewritten to use only what's actually confirmed —
qualified opvoedster, experience supporting children with learning and
developmental difficulties, affinity with multilingual families — without
inventing a specific year or number. If/when the diploma year and exact
years of experience are confirmed, they can be added back in as specific
numbers.

## Round 6 — palette redesign: white background, green accents (2026-09-04)

The client asked for a redesign to a white background with green accents
matching the real logo's colors. `assets/css/style.css` is built entirely
on CSS custom properties, so this was mostly a `:root` swap plus a couple
of hardcoded gradient tweaks:

- `--cream` (main background) is now pure white `#ffffff`, replacing the
  warm off-white.
- `--sage` / `--sage-dark` / `--sage-light` — the headings, icons, badges,
  step numbers, quote-block, and outline-button colors — are now sampled
  from the logo's green (`#1d7a41` core, `#145c32` dark, `#5fae7c` light;
  sampled directly from the pixels in `logo-icon.png`).
- `--accent` / `--accent-dark` (primary CTA buttons) were the reserved
  terracotta from an earlier round — now unified with the same green
  family (`#1d7a41` / `#145c32`), so the whole site reads as one
  white-and-green system instead of white/sage/terracotta.
- `--cream-alt` and `--beige` (alternating section backgrounds) are now
  very light green tints instead of warm cream/beige, so contrast
  sections stay in the green family too.
- The header's translucent background and the hero's radial-gradient
  glow were hardcoded warm-toned `rgba()` values — updated to green-toned
  equivalents so they don't clash with the new palette.
- The footer stays white-background/black-text as set in an earlier
  round (that request is independent of this one and wasn't touched).
- `--footer-sage` (an unused leftover variable from the old palette) was
  removed.

## Still open

- Diploma year and total years of experience for the About page (copy
  now reads naturally without them, but adding the real numbers would
  strengthen credibility).
- Session rates for the Payment card (now that IBAN is gone, the exact
  payment arrangement with parents also needs to be written up).
- Sign-off on the draft 5-step approach and bio copy, or requested edits.
- Confirm which mutualiteiten (if any) offer reimbursement.
- Whether the domain should become `cederstam.be` to match the corrected
  brand spelling, or stay `cederstem.be`/`cederstem@gmail.com` since
  that account is already live and configured.
- A short intro video from Patience (highest-impact trust builder,
  still the one open item from the original brief's "Able to add
  Video" requirement) and 1–2 parent testimonials once available —
  both flagged as the next-biggest conversion levers, not yet built.
