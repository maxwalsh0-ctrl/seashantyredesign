# Sea Shanty Cafe website

Static site for the Sea Shanty Cafe, Trearddur Bay. Hosted on Vercel, which rebuilds it on every commit.

## Where to change things

| To change… | Edit this file |
|---|---|
| Phone, email, social links, opening hours, booking link, photos | `src/data/site.json` |
| The top menu (navigation) | `nav` in `src/data/site.json` |
| Dishes and prices | `src/data/menu.json` (used on the home page and `/menu`) |
| FAQs | `src/data/faq.json` |
| Header or footer (every page) | `src/partials/header.html`, `src/partials/footer.html` |
| A single page | `src/pages/<page>.html` |
| Shared styles and scripts | `src/assets/site.css`, `src/assets/site.js` |
| Photos and logos | `src/assets/images/` |

Edit a file on GitHub, commit, and Vercel publishes the change in about a minute.

## How it builds

`node build.mjs` (no dependencies) writes the finished site into `public/`:

- puts the shared header and footer into every page, marking the current page in the menu
- fills `{{phone}}`-style placeholders and `data-link` buttons from `site.json`
- writes the menu and FAQs as plain HTML, so they show even with JavaScript off
- uses clean addresses (`/menu`, not `menu.html`)
- generates `sitemap.xml` and `robots.txt`

`public/` is generated, so it isn't committed.

## Go-live checklist

1. In `src/data/site.json`, set `siteUrl` to `https://seashantycafe.co.uk`.
2. In `src/robots.txt`, change `Disallow: /` to `Allow: /`.
3. Remove the `noindex` robots meta tag from the pages in `src/pages/`.
4. Add the domain to the Vercel project and update the DNS.
