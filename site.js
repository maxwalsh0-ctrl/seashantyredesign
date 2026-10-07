/* ============================================================
   Sea Shanty Cafe — shared config + behaviour
   Everything the client needs to change lives in SEASHANTY below.
   ============================================================ */

window.SEASHANTY = {
  /* ── links ── */
  booking:      "https://www.resdiary.com/restaurant/SeaShantyCafe",
  bookingPage:  "https://seashantycafe.uk/book-a-table/",
  /* ResDiary widgets are https://booking.resdiary.com/widget/Standard/<name>/<siteId>.
     The numeric siteId isn't public — grab it by opening the current
     book-a-table page, View Source, and searching for "booking.resdiary.com".
     Paste the number below and the widget embeds itself; leave it null and
     the page shows a direct link to the booking site instead. */
  resdiaryName:   "SeaShantyCafe",
  resdiarySiteId: null,

  phone:"+441407728200", phoneText:"01407 728 200",
  email:"info@seashantycafe.co.uk",
  jobsEmail:"info@seashantycafe.co.uk",
  facebook:"https://www.facebook.com/seashantycafe/",
  instagram:"https://www.instagram.com/seashantycafe/",
  tiktok:"https://www.tiktok.com/@seashantycafe",
  tripadvisor:"https://www.tripadvisor.co.uk/Restaurant_Review-g552032-d10595445-Reviews-Sea_Shanty_Cafe-Trearddur_Bay_Anglesey_North_Wales_Wales.html",
  maps:"https://maps.google.com/?q=Sea+Shanty+Cafe,+Lon+St+Ffraid,+Trearddur+Bay,+LL65+2YR",
  googleReviews:"https://search.google.com/local/reviews?placeid=REPLACE_WITH_PLACE_ID",
  easytide:"https://easytide.admiralty.co.uk/?PortID=0479",
  shop:"https://seashantycafe.co.uk/shop/",

  /* TBay webcam — the Angelcam stream behind trearddurbay.org/webcam.
     It belongs to trearddurbay.org (Richard Porter), so get his nod before
     embedding it on a commercial site, and credit it either way. */
  webcamEmbed:"https://v.angelcam.com/iframe?v=2dr60ojnrk&autoplay=1",
  webcamLink:"https://trearddurbay.org/webcam/",
  webcamCredit:"Live camera by trearddurbay.org",

  reviewsEndpoint:null, tidesEndpoint:null,
  hours:{open:"11:30",close:"23:00",foodFrom:"12:00",lastFood:"20:30"},

  /* ── interim photography ──
     Freely licensed Trearddur Bay shots from Wikimedia Commons
     (geograph, CC BY-SA 2.0). Replace with the restaurant's own. */
  img:{
    logo:"assets/images/logo.png",
    giftcard:"art:giftcard",   /* swap for the real card artwork */
    building:"assets/images/sea-shanty-dusk.jpg",   /* the café at dusk */
    portrait:"art:portrait",   /* placeholder until you have staff photos */
    hero:"https://commons.wikimedia.org/wiki/Special:FilePath/Trearddur_Bay%2C_Bae_Trearddur%2C_Holy_Island_%28507292%29_%2832302725344%29.jpg?width=2000",
    /* One illustration per space, drawn in assets/art.js. Replace any of
       these with a photo URL and the illustration drops out automatically. */
    restaurant:"art:restaurant",
    bar:"art:bar",
    parlour:"art:parlour",
    terrace:"art:terrace",
    story:"assets/images/old-sea-shanty.jpg",   /* the original Sea Shanty, pre-2002 */
    tide:"https://commons.wikimedia.org/wiki/Special:FilePath/Trearddur_Beach_-_geograph.org.uk_-_923913.jpg?width=1600",
    bay:"assets/images/trearddur-bay.jpg",   /* the bay looking back at the village */
    lifeboat:"https://commons.wikimedia.org/wiki/Special:FilePath/Trearddur_Bay_Lifeboat_Station_-_geograph.org.uk_-_5155028.jpg?width=1600"
  }
};

(() => {
const C = window.SEASHANTY;
const $  = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];

/* ── site map: one place to edit navigation ── */
const NAV = [
  ["index.html",      "HOME"],
  ["about.html",      "ABOUT"],
  ["menu.html", "MENU"],
  ["reserve.html",    "BOOK A TABLE"],
  ["webcam.html",     "WEBCAM"],
  ["gift-cards.html", "GIFT CARDS"],
  ["faq.html",        "FAQS"],
  ["jobs.html",       "JOBS"]
];

const LOGO = () =>
  '<img src="assets/images/logo.png" alt="" width="512" height="512" decoding="async">';

const ICON = {
  tt:'<svg viewBox="0 0 24 24"><path d="M16.9 5.6a5.1 5.1 0 0 1-1.4-3.6h-3.2v13.2a2.9 2.9 0 1 1-2.1-2.8V9.1a6 6 0 1 0 5.3 6V9.2a8.2 8.2 0 0 0 4.6 1.4V7.4a4.9 4.9 0 0 1-3.2-1.8Z"/></svg>',
  fb:'<svg viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z"/></svg>',
  ig:'<svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.9c-.1 3.2-1.6 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-3.3-.2-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.9s0-3.5.1-4.8C2.4 4 3.9 2.4 7.1 2.3c1.3-.1 1.7-.1 4.9-.1Zm0 5.6a4.2 4.2 0 1 0 0 8.4 4.2 4.2 0 0 0 0-8.4Zm0 6.9a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Zm5.4-7.1a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/></svg>',
  ta:'<svg viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="7.6" cy="13" r="4.6"/><circle cx="16.4" cy="13" r="4.6"/><path d="M9.4 8.7a9 9 0 0 1 5.2 0"/></g><circle cx="7.6" cy="13" r="1.8"/><circle cx="16.4" cy="13" r="1.8"/></svg>',
  phone:'<svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z"/></svg>',
  pin:'<svg viewBox="0 0 24 24"><path d="M12 21s-7-4.5-7-10a7 7 0 0 1 14 0c0 5.5-7 10-7 10Z"/><circle cx="12" cy="11" r="2.4"/></svg>'
};

/* ── header + drawer ── */
function renderHeader(){
  const slot=$("#siteHeader"); if(!slot)return;
  const here=(location.pathname.split("/").pop()||"index.html");
  const links=NAV.map(([h,t])=>{
    const cur = h===here ? ' aria-current="page"' : "";
    return `<a href="${h}"${cur}>${t}</a>`;
  }).join("");
  slot.outerHTML=`
  <header class="site">
    <div class="wrap bar">
      <a class="brand" href="index.html">${LOGO()}<span><b>Sea Shanty</b><i>TREARDDUR BAY</i></span></a>
      <nav aria-label="Primary">${links}</nav>
      <a class="btn btn--book btn--sm headBook" href="reserve.html">BOOK A TABLE</a>
      <button class="burger" id="openDrawer" aria-label="Open menu"><span></span><span></span><span></span></button>
    </div>
  </header>
  <div class="drawer" id="drawer" data-open="false" aria-hidden="true">
    <button class="x" id="closeDrawer" aria-label="Close menu">&#10005;</button>
    ${NAV.map(([h,t])=>`<a href="${h}">${t.charAt(0)+t.slice(1).toLowerCase()}</a>`).join("")}
    <a href="index.html#tides">Tide times</a>
    <a href="index.html#visit">Find us</a>
    <div class="sub">
      <a href="tel:${C.phone}">${C.phoneText}</a>
      <a href="mailto:${C.email}">${C.email}</a>
      <a href="${C.facebook}" target="_blank" rel="noopener">Facebook</a>
      <a href="${C.instagram}" target="_blank" rel="noopener">Instagram</a>
    </div>
  </div>`;

  const dr=$("#drawer");
  const set=o=>{dr.dataset.open=o;dr.setAttribute("aria-hidden",!o);
    document.body.style.overflow=o?"hidden":""};
  $("#openDrawer").onclick=()=>set(true);
  $("#closeDrawer").onclick=()=>set(false);
  $$("a",dr).forEach(a=>a.addEventListener("click",()=>set(false)));
  addEventListener("keydown",e=>{if(e.key==="Escape")set(false)});
}

/* ── footer + mobile action bar ── */
function renderFooter(){
  const slot=$("#siteFooter"); if(!slot)return;
  slot.outerHTML=`
  <div class="stripe"></div>
  <footer class="site">
    <div class="wrap">
      <div class="foot">
        <div>
          <h4>SEA SHANTY CAFE</h4>
          <p><a href="${C.maps}" target="_blank" rel="noopener" style="display:inline">Lon St Ffraid<br>Trearddur Bay<br>Anglesey LL65 2YR</a></p>
          <p style="margin-top:12px">
            <a href="tel:${C.phone}" style="display:inline;font-weight:600">${C.phoneText}</a><br>
            <a href="mailto:${C.email}" style="display:inline">${C.email}</a></p>
          <div class="soc">
            <a href="${C.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ICON.fb}</a>
            <a href="${C.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.ig}</a>
            <a href="${C.tiktok}" target="_blank" rel="noopener" aria-label="TikTok">${ICON.tt}</a>
            <a href="${C.tripadvisor}" target="_blank" rel="noopener" aria-label="Tripadvisor">${ICON.ta}</a>
          </div>
        </div>
        <div>
          <h4>VISIT</h4>
          <a href="menu.html">Menu</a>
          <a href="reserve.html">Book a table</a>
          <a href="index.html#tides">Tide times</a>
          <a href="webcam.html">TBay webcam</a>
          <a href="${C.maps}" target="_blank" rel="noopener">Directions</a>
        </div>
        <div>
          <h4>MORE</h4>
          <a href="about.html">About us</a>
          <a href="gift-cards.html">Gift cards</a>
          <a href="faq.html">FAQs</a>
          <a href="jobs.html">Jobs</a>
          <a href="index.html#reviews">Reviews</a>
          <a href="#">Allergens</a>
        </div>
        <div>
          <h4>NEWS &amp; OFFERS</h4>
          <p style="font-size:15px">Occasional emails about specials, events and off-season opening. We never share your details.</p>
          <div class="news">
            <label for="nlFoot" style="position:absolute;left:-9999px">Email address</label>
            <input id="nlFoot" type="email" placeholder="you@example.com" autocomplete="email">
            <button type="button">SIGN UP</button>
          </div>
        </div>
      </div>
      <div class="pay-icons">
        <span>We accept</span>
        <svg viewBox="0 0 38 24" fill="none"><rect width="38" height="24" rx="3" fill="#1A1F71"/><path d="M16.2 16.4h-2.5l1.6-9.8h2.5l-1.6 9.8Zm-4.3-9.8-2.4 6.7-.3-1.4-.9-4.5s-.1-.8-1.1-.8H4l-.1.3s1.2.3 2.6.9l2.2 8.3h2.6l4-9.5h-2.6Zm22.7 9.8h2.3l-2-9.8h-2c-.8 0-1.2.4-1.4 1l-3.8 8.8h2.6l.5-1.4h3.2l.6 1.4Zm-2.8-3.4 1.3-3.7.8 3.7h-2.1Zm-4-4.3-1.8 4.6-.2-1-.2-1.2s-.2-.9-.9-1.7c-.6-.6-1.2-.9-1.2-.9l2.2 8.2h2.7l4-9.8h-2.6l-2 1.8Z" fill="#fff"/><path d="M10.4 13.3l-.9-4.5s-.1-.8-1.1-.8H4l-.1.3s1.9.4 3.7 1.7l2.8 3.3Z" fill="#F7B600"/></svg>
        <svg viewBox="0 0 38 24" fill="none"><rect width="38" height="24" rx="3" fill="#252525"/><circle cx="15" cy="12" r="7" fill="#EB001B"/><circle cx="23" cy="12" r="7" fill="#F79E1B"/><path d="M19 6.6a7 7 0 0 1 2.6 5.4 7 7 0 0 1-2.6 5.4 7 7 0 0 1-2.6-5.4A7 7 0 0 1 19 6.6Z" fill="#FF5F00"/></svg>
        <svg viewBox="0 0 38 24" fill="none"><rect width="38" height="24" rx="3" fill="#2557D6"/><path d="M20.3 17.2V7h3.2l3.2 7.4V7h2.3v10.2h-3.1l-3.3-7.5v7.5h-2.3Zm-5.1 0V7h6.1v1.9h-3.8v2.3h3.7v1.8h-3.7v2.3h3.8v1.9h-6.1ZM9.3 17.2l3-5.1L9.5 7h2.7l1.7 3.2L15.6 7h2.6l-2.8 5 2.9 5.2h-2.7l-1.8-3.4-1.8 3.4H9.3Z" fill="#fff"/></svg>
        <svg viewBox="0 0 38 24" fill="none"><rect width="38" height="24" rx="3" fill="#000"/><path d="M19.6 7.8c-.8.1-1.8.4-2.4 1.1-.5.5-.9 1.3-.8 2 .9.1 1.8-.3 2.4-1 .5-.6.9-1.4.8-2.1Zm.8 1.2c-1.3-.1-2.5.8-3.1.8s-1.6-.7-2.7-.7c-1.4 0-2.6.8-3.4 2-.7 1.3-1 3.3.5 5.4.6.9 1.4 1.8 2.4 1.8s1.3-.7 2.5-.7 1.5.7 2.5.7 1.7-.9 2.3-1.8c.4-.6.7-1.2.9-1.9-1.2-.5-2.1-1.7-2.1-3.1 0-1.2.6-2.2 1.6-2.8-.7-.9-1.7-1.5-2.9-1.6h-.5Z" fill="#fff"/><path d="M28.3 17h1.5l-1.6-5.6H27c-.5 0-.9.3-1.1.7l-3 5h2.1l.4-1.1h2.6l.3 1Zm-2.2-2.6.8-2.1.7 2.1h-1.5Z" fill="#fff"/></svg>
        <svg viewBox="0 0 38 24" fill="none"><rect width="38" height="24" rx="3" fill="#fff" stroke="#ddd"/><path d="M7 14.3c0-.8.6-1.5 1.4-1.5.3 0 .5.1.7.2l.2-.5c-.3-.2-.6-.2-.9-.2-1.2 0-2 .9-2 2s.8 2 2 2c.3 0 .6-.1.9-.2l-.2-.5c-.2.1-.5.2-.7.2-.8 0-1.4-.7-1.4-1.5Zm4.3-1.6c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6 1.6-.7 1.6-1.6-.7-1.6-1.6-1.6Zm0 2.7c-.6 0-1-.5-1-1.1s.4-1.1 1-1.1 1 .5 1 1.1-.4 1.1-1 1.1Zm4.5-2.7c-.4 0-.7.2-.9.5v-.4h-.5v3.1h.6v-1.7c0-.6.3-1 .7-1 .4 0 .6.3.6.8v1.9h.5v-2c0-.8-.4-1.2-1-1.2Zm3.3 0h-.3c-.3 0-.6.1-.8.3v-.2h-.5v3.1h.5v-1.5c0-.9.4-1.3.9-1.3h.2v-.4Zm2.2 2.3-.2-.4c-.3.2-.5.3-.8.3-.4 0-.6-.2-.7-.5h1.8c0-.1 0-.2 0-.3 0-.8-.4-1.4-1.2-1.4-.7 0-1.3.6-1.3 1.6 0 1 .6 1.6 1.3 1.6.4 0 .8-.2 1.1-.4v-.5Zm-1.7-1c.1-.4.3-.6.7-.6s.6.3.7.6h-1.4Zm4.3-1.3v.4c-.2-.3-.5-.5-.9-.5-.8 0-1.3.7-1.3 1.6s.5 1.6 1.3 1.6c.4 0 .7-.2.9-.5v.4h.5v-3h-.5Zm-.8 2.6c-.5 0-.8-.5-.8-1.1s.3-1.1.8-1.1.8.5.8 1.1-.3 1.1-.8 1.1Zm4.2-1.1c0-.9-.5-1.6-1.3-1.6-.4 0-.7.2-.9.5v-.4h-.5v4.3h.5v-1.7c.2.3.5.5.9.5.8 0 1.3-.7 1.3-1.6Zm-.6 0c0 .6-.3 1.1-.8 1.1s-.8-.5-.8-1.1.3-1.1.8-1.1.8.5.8 1.1Zm2.2-1.5h-.6l.9 1.6-.9 1.5h.6l.6-1.1.6 1.1h.6l-.9-1.5.9-1.6h-.6l-.6 1.1-.6-1.1Z" fill="#000"/><path d="M11.7 9.7h-.8L9.7 8l-1.2 1.7h-.8L9 7.7 7.8 5.8h.8L9.7 7.4l1.1-1.6h.8l-1.5 2 1.6 1.9Zm5.5-2c0 1.2-.8 2-2 2h-1.8V5.8h1.8c1.2 0 2 .8 2 1.9Zm-.7 0c0-.8-.5-1.4-1.3-1.4h-1.1v2.8h1.1c.8 0 1.3-.6 1.3-1.4Z" fill="#000"/></svg>
      </div>
      <div class="legal">
        <span>&copy; ${new Date().getFullYear()} Sea Shanty Restaurants Ltd &middot;
          <a href="#">Privacy</a> &middot; <a href="#">Cookies</a> &middot; <a href="#">Accessibility</a></span>
        <span>Interim photography: Trearddur Bay via Wikimedia Commons, CC BY-SA 2.0</span>
      </div>
    </div>
  </footer>
  <div class="actionbar">
    <a href="tel:${C.phone}">${ICON.phone}Call</a>
    <a href="${C.maps}" target="_blank" rel="noopener">${ICON.pin}Directions</a>
    <a class="book" href="reserve.html">BOOK A TABLE</a>
  </div>`;
}

/* ── images: bind with graceful failure ── */
function bindImages(){
  $$("[data-img]").forEach(w=>{
    const key=w.dataset.img, url=C.img[key];
    if(typeof url==="string" && url.startsWith("art:")){
      const art=(window.SS_ART||{})[url.slice(4)];
      if(art){ w.innerHTML=art; w.classList.add("is-art"); return; }
      w.classList.add("failed"); return;
    }
    const im=document.createElement("img");
    im.alt=w.dataset.imgAlt||"";
    im.loading=w.dataset.eager?"eager":"lazy";
    im.onerror=()=>{
      im.remove();
      const art=(window.SS_ART||{})[key];              // drawn stand-in for this slot
      if(art){ w.innerHTML=art; w.classList.add("is-art"); }
      else w.classList.add("failed");
    };
    w.appendChild(im);
    im.src=url;
  });
}

/* ── open / closed ── */
const mins=t=>{const[h,m]=t.split(":").map(Number);return h*60+m};
function openStatus(){
  const n=new Date(),cur=n.getHours()*60+n.getMinutes();
  const open = cur>=mins(C.hours.open) && cur<mins(C.hours.close);
  const label = !open ? "Closed · opens "+C.hours.open
              : cur<mins(C.hours.lastFood) ? "Open now" : "Open — bar only";
  $$(".dot").forEach(d=>{
    d.classList.toggle("shut",!open);
    const t=$("span",d); if(t)t.textContent=label;
  });
}

/* ============================================================
   TIDES — harmonic estimate for Trearddur Bay.
   Swap for live UKHO data by setting SEASHANTY.tidesEndpoint
   and pointing it at /api/tides.
   ============================================================ */
const M2=12.4206, REF=Date.UTC(2026,7,7,3,44), SPR=Date.UTC(2026,7,14,0,0), Z0=3.1;
const height=d=>Z0+(1.9+1.0*Math.cos(2*Math.PI*((d-SPR)/36e5)/354.37))
                  *Math.cos(2*Math.PI*((d-REF)/36e5)/M2);
function extremes(a,b){const o=[];let p=height(a-6e5),c=height(a);
  for(let t=a+6e5;t<=b;t+=6e5){const n=height(t);
    if(c>p&&c>n)o.push({t:t-6e5,h:c,type:"High"});
    if(c<p&&c<n)o.push({t:t-6e5,h:c,type:"Low"});p=c;c=n}return o}
const hhmm=d=>new Date(d).toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"});
function sun(date,lat,lon){const rad=Math.PI/180,
  day=Math.floor((date-Date.UTC(2000,0,1,12))/864e5)+.0009-lon/360;
  const M=(357.5291+.98560028*day)*rad,
        L=M+(1.9148*Math.sin(M)+.02*Math.sin(2*M))*rad+102.9372*rad+Math.PI;
  const tr=Date.UTC(2000,0,1,12)+864e5*(day+.0053*Math.sin(M)-.0069*Math.sin(2*L));
  const dec=Math.asin(Math.sin(L)*Math.sin(23.44*rad));
  const w=Math.acos((Math.sin(-.833*rad)-Math.sin(lat*rad)*Math.sin(dec))
                    /(Math.cos(lat*rad)*Math.cos(dec)));
  const set=tr+864e5*(w/(2*Math.PI));return{rise:tr-(set-tr),set}}
const seaTemp=()=>{const doy=(Date.now()-Date.UTC(new Date().getFullYear(),0,1))/864e5;
  return (11.5-4.2*Math.cos(2*Math.PI*(doy-30)/365)).toFixed(1)};

function nextTide(){
  return extremes(Date.now(), Date.now()+18*36e5)[0];
}

function drawPanelCurve(svg){
  const now=Date.now(),d=new Date();
  const s=new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime(),e=s+864e5;
  const W=520,H=170,PAD=22,N=144;
  const hs=[];for(let i=0;i<=N;i++)hs.push(height(s+i*(864e5/N)));
  const lo=Math.min(...hs)-.4,hi=Math.max(...hs)+.4;
  const x=t=>((t-s)/864e5)*W, y=h=>PAD+(1-(h-lo)/(hi-lo))*(H-PAD*2);
  let line="";hs.forEach((h,i)=>line+=(i?"L":"M")+((i/N)*W).toFixed(1)+" "+y(h).toFixed(1));
  const area=line+`L${W} ${H} L0 ${H}Z`;
  const nx=Math.max(0,Math.min(W,x(now))), ny=y(height(now));
  let marks="";
  extremes(s,e).forEach(v=>{const px=x(v.t),py=y(v.h),up=v.type==="High",
    cx=Math.min(Math.max(px,26),W-26);
    marks+=`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="3.5" fill="#fff"/>
      <text x="${cx.toFixed(1)}" y="${(py+(up?-11:21)).toFixed(1)}" text-anchor="middle" fill="#EAF3F8"
        font-family="Instrument Sans,sans-serif" font-size="13" font-weight="600">${hhmm(v.t)}</text>`});
  let grid="";
  for(let h=0;h<24;h+=6){const px=(h/24)*W;
    grid+=`<line x1="${px}" y1="${PAD}" x2="${px}" y2="${H-PAD}" stroke="rgba(255,255,255,.1)"/>
      <text x="${px+5}" y="${H-5}" fill="#7BA3BC" font-family="Instrument Sans,sans-serif" font-size="10.5">${String(h).padStart(2,"0")}</text>`}
  svg.setAttribute("viewBox",`0 0 ${W} ${H}`);
  svg.innerHTML=`<defs>
      <linearGradient id="wgp" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#9CC6DE" stop-opacity=".5"/>
        <stop offset="1" stop-color="#2E77A6" stop-opacity="0"/></linearGradient>
      <clipPath id="pastp"><rect width="${nx.toFixed(1)}" height="${H}"/></clipPath></defs>
    ${grid}
    <path d="${area}" fill="url(#wgp)" opacity=".4"/>
    <path d="${area}" fill="url(#wgp)" clip-path="url(#pastp)"/>
    <path d="${line}" fill="none" stroke="#BFD8E6" stroke-width="1.8" opacity=".45"/>
    <path d="${line}" fill="none" stroke="#fff" stroke-width="2.6" clip-path="url(#pastp)"/>
    ${marks}
    <line x1="${nx.toFixed(1)}" y1="${PAD-4}" x2="${nx.toFixed(1)}" y2="${H-PAD}" stroke="#C8402E" stroke-width="2"/>
    <circle cx="${nx.toFixed(1)}" cy="${ny.toFixed(1)}" r="5.5" fill="#C8402E" stroke="#0B2C44" stroke-width="2.2"/>`;
}

function paintTides(){
  const n=nextTide(); if(!n)return;
  const now=Date.now(), mn=Math.round((n.t-now)/6e4);
  const inTxt=Math.floor(mn/60)+"h "+String(mn%60).padStart(2,"0")+"m";
  const set=(sel,val)=>$$(sel).forEach(el=>el.textContent=val);
  set("[data-tide=label]", "NEXT "+n.type.toUpperCase()+" WATER");
  set("[data-tide=time]",  hhmm(n.t));
  set("[data-tide=height]",n.h.toFixed(1)+" m above chart datum");
  set("[data-tide=in]",    inTxt);
  set("[data-tide=short]", n.type+" water "+hhmm(n.t)+" · in "+inTxt);
  set("[data-tide=now]",   height(now).toFixed(1)+" m "+(height(now+18e5)>height(now)?"rising":"falling"));
  set("[data-tide=temp]",  seaTemp()+" °C");
  const s=sun(now,53.2799,-4.6206);
  set("[data-tide=rise]",  hhmm(s.rise));
  set("[data-tide=set]",   hhmm(s.set));
  $$("svg.curve").forEach(drawPanelCurve);
}

/* ── boot ── */
function boot(){
  renderHeader(); renderFooter(); bindImages();
  openStatus(); setInterval(openStatus,60000);
  if($("[data-tide]")){ paintTides(); setInterval(paintTides,60000); }

  /* wire any element carrying a data-link key */
  $$("[data-link]").forEach(a=>{
    const k=a.dataset.link;
    a.href = k==="phone" ? "tel:"+C.phone
           : k==="email" ? "mailto:"+C.email
           : k==="jobsEmail" ? "mailto:"+C.jobsEmail
           : C[k] || "#";
    if(a.dataset.linkText) a.textContent = C[a.dataset.linkText] || a.textContent;
    if(/^https?:/.test(a.href) && !a.href.includes(location.hostname)){
      a.target="_blank"; a.rel="noopener";
    }
  });
}
document.readyState==="loading"
  ? addEventListener("DOMContentLoaded",boot)
  : boot();
})();
