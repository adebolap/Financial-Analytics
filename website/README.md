# CederStam website

Mostly-static site (plain HTML/CSS/JS) for CederStam, an orthopedagogical
practice offering individual guidance to children aged 0–12 with learning or
developmental difficulties, multilingual newcomers, and children with
intellectual disabilities. One serverless function (`api/book.js`) handles
the contact form.

## Structure

```
website/
  index.html, over-mij.html, aanpak.html, voor-wie.html,
  contact.html, privacybeleid.html      # Dutch (default)
  en/                                    # English mirror
  api/book.js                            # Vercel serverless function — sends
                                          # the contact form via Gmail SMTP
  package.json                           # only dependency: nodemailer
  assets/css/style.css                   # shared design system
  assets/js/main.js                      # nav toggle, cookie banner, contact form
  assets/img/logo-cederstam.png          # real logo (source, transparent bg)
  assets/img/logo-icon.png               # cropped icon used in header/footer
  assets/img/favicon.png, apple-touch-icon.png
  assets/img/patience-portrait.jpg       # About page photo
  assets/img/gallery/                    # real client photography
  robots.txt, sitemap.xml
  BELGIAN-MARKET-NOTES.md                # what's Belgium-specific + open TODOs
```

## Running locally

No build step. Serve the folder with any static server, e.g.:

```
cd website
python3 -m http.server 8080
```

Then open `http://localhost:8080/`.

## Deploying to Vercel

This is a zero-build static site living in the `website/` subfolder of the
repo, so when importing the repo into Vercel:

1. **Root Directory** → set to `website` (Project Settings → General, or
   the "Root Directory" field during import).
2. **Framework Preset** → "Other" (no framework, no build step).
3. **Build Command** → leave empty.
4. **Output Directory** → leave empty/default (same as Root Directory).

`vercel.json` (cache headers for `assets/`, a couple of security headers)
and `404.html` are already in place and picked up automatically once the
Root Directory is set. `.vercelignore` keeps `README.md` and
`BELGIAN-MARKET-NOTES.md` out of the public deployment — they're project
notes, not site content.

Once a custom domain is attached, double-check that the `canonical` /
`hreflang` tags and `sitemap.xml` (currently pointing at
`https://www.cederstem.be`) match the real domain.

### Contact form email (required for the "Book" flow to send)

The contact form on every language posts to `/api/book`, a Vercel
serverless function that sends the message via Gmail SMTP — no calendar,
no third-party booking service, just Gmail sending on the practice's
behalf. **Until this is set up, the form automatically falls back to
opening the visitor's own email client instead (the previous behaviour),
so nothing is broken in the meantime.**

To activate it, whoever owns the `cederstem@gmail.com` account needs to:

1. Turn on 2-Step Verification on that Google account, if not already on
   (myaccount.google.com/security).
2. Generate an App Password at myaccount.google.com/apppasswords (choose
   "Mail" as the app). This is a 16-character password used only by this
   form — not the real Gmail password.
3. In the Vercel project → Settings → Environment Variables, add:
   - `GMAIL_USER` = `cederstem@gmail.com`
   - `GMAIL_APP_PASSWORD` = the 16-character App Password from step 2
4. Redeploy (or just push a commit — Vercel redeploys automatically).

Nothing is stored anywhere — the function is stateless. It sends one
email to the practice inbox and one confirmation email to whoever filled
in the form, and that's the entire record of the enquiry. It also does
**not** check real calendar availability, so it can't prevent two people
requesting the same date — the practice still confirms manually by
replying to the enquiry.

## Before launch

See `BELGIAN-MARKET-NOTES.md` for the full list — in short: legal review of
the privacy policy, real business/registration details in the footer, real
logo and photography, and a GDPR-appropriate form backend.
