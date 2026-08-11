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
  assets/css/style.css                   # shared design system
  assets/js/main.js                      # nav toggle, cookie banner, demo form
  assets/img/logo-cedar.svg              # placeholder cedar-tree logo
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

## Before launch

See `BELGIAN-MARKET-NOTES.md` for the full list — in short: legal review of
the privacy policy, real business/registration details in the footer, real
logo and photography, and a GDPR-appropriate form backend.
