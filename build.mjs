// Sea Shanty Cafe — site build.
// Vercel runs this on every commit (see vercel.json). It has no dependencies.
//
//   src/data/site.json   the café's details: phone, email, links, hours, photos, top menu
//   src/data/menu.json   the food and drink menu (used on the home page and /menu)
//   src/data/faq.json    the FAQs
//   src/partials/        the header and footer, written once for every page
//   src/pages/           one file per page
//   src/assets/          shared CSS, JS and images
//
// Output goes to public/, which is what Vercel serves.

import fs from "node:fs";
import path from "node:path";

const SRC = "src", OUT = "public";
const read = p => fs.readFileSync(p, "utf8");
const json = p => JSON.parse(read(p));

const site = json(`${SRC}/data/site.json`);
const menu = json(`${SRC}/data/menu.json`);
const faq  = json(`${SRC}/data/faq.json`);
const header = read(`${SRC}/partials/header.html`);
const footer = read(`${SRC}/partials/footer.html`);

const esc = s => String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

// {{key}} → value from site.json (plus a few computed values)
const tokens = { ...site, year: new Date().getFullYear() };
const fill = html => html.replace(/\{\{(\w+)\}\}/g, (m, k) => {
  if (!(k in tokens)) throw new Error(`Unknown token ${m}`);
  return esc(tokens[k]);
});

// page file name → its clean URL
const urlFor = file => file === "index.html" ? "/" : "/" + file.replace(/\.html$/, "");

function renderHeader(url) {
  const nav = site.nav.map(([href, label]) =>
    `<a href="${href}"${href === url ? ' aria-current="page"' : ""}>${label}</a>`).join("");
  const sub = ["From the sea", "Bar", "Parlour"];
  const drawer = site.nav.map(([href, label]) => {
    const text = label === "FAQS" ? "FAQs" : label.charAt(0) + label.slice(1).toLowerCase();
    if (href === "/menu") return `<a href="/menu" class="drawer-toggle" id="menuToggle" aria-expanded="false" onclick="toggleDrawerSub(event)">Menu<svg class="arrow" viewBox="0 0 20 20"><path d="M5 7l5 5 5-5"/></svg></a>`
      + `<div class="drawer-sub" id="menuSub"><a href="/menu?tab=From+the+sea">The Restaurant</a><a href="/menu?tab=Bar">The Bar</a><a href="/menu?tab=Parlour">Ice Cream Parlour</a><a href="/webcam">The Terrace</a></div>`
      + `<a href="/reserve">Book a table</a>`;
    return `<a href="${href}">${text}</a>`;
  }).join("\n  ");
  return fill(header
    .replace("{{headerClass}}", url === "/" ? "site site--hero" : "site")
    .replace("{{nav}}", nav)
    .replace("{{drawerNav}}", drawer));
}

function renderMenu() {
  const dish = ([n, d, p, t]) => `<div class="dish"><h4>${esc(n)}${t ? `<span class="tag">${esc(t)}</span>` : ""}</h4>`
    + `<span class="price">${p ? "£" + esc(p) : ""}</span>${d ? `<p>${esc(d)}</p>` : ""}</div>`;
  return `<div data-menu>\n` + Object.entries(menu).map(([cat, items]) =>
    `  <div class="menu-cat" data-cat="${esc(cat)}"><h2 class="menu-cat-title">${esc(cat)}</h2>`
    + `<div class="dishes">${items.map(dish).join("")}</div></div>`).join("\n") + `\n</div>`;
}

function renderFaq() {
  let n = 0;
  return faq.map(([title, sub, items]) => `<div class="faq-group"><h2>${esc(title)}</h2>${sub ? `<p class="sub">${esc(sub)}</p>` : ""}<div class="faq">`
    + items.map(([q, ...paras]) => {
      const id = "faq" + (++n);
      return `<button type="button" aria-expanded="true" aria-controls="${id}">${esc(q)}<span class="chev"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></span></button>`
        + `<div class="ans" id="${id}" data-open="true">${paras.map(p => `<p>${esc(p)}</p>`).join("")}</div>`;
    }).join("") + `</div></div>`).join("\n");
}

const faqLd = () => `<script type="application/ld+json">${JSON.stringify({
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faq.flatMap(([, , items]) => items.map(([q, ...p]) => ({
    "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: p.join(" ") } })))
})}</script>`;

const SCRIPTS = `<script src="/assets/art.js"></script>
<script src="/assets/config.js"></script>
<script src="/assets/site.js"></script>`;

// links that pages mark with data-link="key" get their real address here,
// so they work before (or without) JavaScript
const LINK = k => k === "phone" ? "tel:" + site.phone
  : k === "email" ? "mailto:" + site.email
  : k === "jobsEmail" ? "mailto:" + site.jobsEmail
  : site[k];
function wireLinks(html) {
  return html.replace(/<a\b([^>]*?)\sdata-link="(\w+)"([^>]*)>/g, (m, a, key, b) => {
    const href = LINK(key);
    if (!href) throw new Error(`data-link="${key}" has no value in site.json`);
    const ext = /^https?:/.test(href) ? ' target="_blank" rel="noopener"' : "";
    return `<a${a} href="${esc(href)}"${ext}${b}>`;
  });
}

// old-style links (menu.html, index.html#visit) → clean URLs, so no redirect hop
const PAGES = fs.readdirSync(`${SRC}/pages`).filter(f => f.endsWith(".html"));
const names = PAGES.map(f => f.replace(/\.html$/, "")).join("|");
const cleanLinks = html => html
  .replace(new RegExp(`(href=")(?:\\./)?(${names})\\.html`, "g"), (m, pre, n) => pre + (n === "index" ? "/" : "/" + n))
  .replace(/(href=")\/([#?])/g, "$1/$2")
  .replace(/((?:href|src)=")assets\//g, "$1/assets/");

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
fs.cpSync(`${SRC}/assets`, `${OUT}/assets`, { recursive: true });

// config for the browser: same file as the build reads, photo paths made absolute
const img = Object.fromEntries(Object.entries(site.img).map(([k, v]) => [k, v.startsWith("assets/") ? "/" + v : v]));
fs.writeFileSync(`${OUT}/assets/config.js`, `window.SEASHANTY=${JSON.stringify({ ...site, img })};\n`);

for (const file of PAGES) {
  const url = urlFor(file);
  let html = read(`${SRC}/pages/${file}`);
  html = html
    .replace("<!-- @header -->", renderHeader(url))
    .replace("<!-- @footer -->", fill(footer))
    .replace("<!-- @scripts -->", SCRIPTS)
    .replace("<!-- @menu -->", renderMenu())
    .replace("<!-- @faq -->", renderFaq());
  if (file === "faq.html") html = html.replace("</head>", faqLd() + "\n</head>");
  html = cleanLinks(wireLinks(fill(html)));
  if (html.includes("<!-- @")) throw new Error(`${file}: unreplaced marker`);
  fs.writeFileSync(`${OUT}/${file}`, html);
}

// sitemap: every page except the 404
const today = new Date().toISOString().slice(0, 10);
const urls = PAGES.filter(f => f !== "404.html").map(urlFor);
fs.writeFileSync(`${OUT}/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`
  + urls.map(u => `  <url><loc>${site.siteUrl}${u === "/" ? "/" : u}</loc><lastmod>${today}</lastmod></url>`).join("\n")
  + `\n</urlset>\n`);
fs.copyFileSync(`${SRC}/robots.txt`, `${OUT}/robots.txt`);
fs.appendFileSync(`${OUT}/robots.txt`, `\nSitemap: ${site.siteUrl}/sitemap.xml\n`);

console.log(`Built ${PAGES.length} pages and a ${urls.length}-page sitemap into ${OUT}/`);
