# CederStem website

Static, no-build-tool site (plain HTML/CSS/JS) for CederStem, an
orthopedagogical practice offering individual guidance to children aged 0–12
with learning or developmental difficulties, multilingual newcomers, and
children with intellectual disabilities.

## Structure

```
website/
  index.html, over-mij.html, aanpak.html, voor-wie.html,
  contact.html, privacybeleid.html      # Dutch (default)
  en/                                    # English mirror
  fr/                                    # French mirror
  assets/css/style.css                   # shared design system
  assets/js/main.js                      # nav toggle, cookie banner, contact form
  assets/img/logo-cedar.svg              # placeholder cedar-tree logo
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

## Before launch

See `BELGIAN-MARKET-NOTES.md` for the full list — in short: legal review of
the privacy policy, real business/registration details in the footer, real
logo and photography, and a GDPR-appropriate form backend.
