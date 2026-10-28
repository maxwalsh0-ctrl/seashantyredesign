/* ============================================================
   Sea Shanty Cafe — shared behaviour for every page.
   The café's details live in src/data/site.json; the build turns
   that into /assets/config.js (window.SEASHANTY) before this runs.
   Header, footer, menu and FAQs are plain HTML written at build
   time, so the site still reads properly with JavaScript off.
   ============================================================ */

/* mobile drawer: "Menu" opens a sub-list instead of navigating */
function toggleDrawerSub(e){
  e.preventDefault();e.stopPropagation();
  var tog=document.getElementById('menuToggle'),sub=document.getElementById('menuSub');
  var open=tog.getAttribute('aria-expanded')==='true';
  tog.setAttribute('aria-expanded',!open);
  sub.style.display=open?'none':'block';
}

(() => {
const C = window.SEASHANTY || {img:{},hours:{open:"11:30",close:"23:00",lastFood:"20:30"}};
const $  = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];

/* ── drawer ── */
function bindDrawer(){
  const dr=$("#drawer"), ob=$("#openDrawer"); if(!dr||!ob)return;
  const set=o=>{dr.dataset.open=o;dr.setAttribute("aria-hidden",!o);ob.setAttribute("aria-expanded",o);
    document.body.style.overflow=o?"hidden":"";};
  ob.onclick=()=>set(true);
  $("#closeDrawer").onclick=()=>{set(false);const t=$("#menuToggle"),s=$("#menuSub");
    if(t){t.setAttribute("aria-expanded","false");s.style.display="none"}};
  $$("a",dr).forEach(a=>{if(!a.classList.contains("drawer-toggle"))a.addEventListener("click",()=>set(false))});
  addEventListener("keydown",e=>{if(e.key==="Escape"&&dr.dataset.open==="true")set(false)});
}

/* ── menu tabs: every category is in the HTML; JS shows one at a time ── */
function bindMenus(){
  $$("[data-menu]").forEach(root=>{
    const cats=$$(".menu-cat",root); if(!cats.length)return;
    const bar=document.createElement("div");
    bar.className="menubar";bar.setAttribute("role","tablist");
    const show=name=>{
      cats.forEach(c=>c.hidden=c.dataset.cat!==name);
      $$("button",bar).forEach(b=>b.setAttribute("aria-selected",b.textContent===name));
    };
    cats.forEach(c=>{
      const b=document.createElement("button");
      b.type="button";b.setAttribute("role","tab");b.textContent=c.dataset.cat;
      b.onclick=()=>show(c.dataset.cat);bar.appendChild(b);
    });
    root.prepend(bar);root.classList.add("is-tabbed");
    const want=new URLSearchParams(location.search).get("tab");
    show(cats.some(c=>c.dataset.cat===want)?want:cats[0].dataset.cat);
    /* fade the right edge while there are more tabs to scroll to */
    const edge=()=>bar.classList.toggle("more",bar.scrollWidth-bar.clientWidth-bar.scrollLeft>4);
    bar.addEventListener("scroll",edge,{passive:true});addEventListener("resize",edge);edge();
    root.showCategory=name=>show(name);
  });
}

/* ── FAQ accordion: answers are in the HTML, collapsed once JS runs ── */
function bindFaqs(){
  $$(".faq>button[aria-controls]").forEach(b=>{
    const a=document.getElementById(b.getAttribute("aria-controls")); if(!a)return;
    b.setAttribute("aria-expanded","false");a.dataset.open="false";
    b.onclick=()=>{const open=b.getAttribute("aria-expanded")==="true";
      b.setAttribute("aria-expanded",String(!open));a.dataset.open=String(!open);};
  });
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
  $$(".dot:not(#dot)").forEach(d=>{
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


/* shared tide maths, also used by the home and tide-times pages */
window.SS_TIDE={height,extremes,hhmm,sun,seaTemp};

/* ── boot ── */
function boot(){
  bindDrawer(); bindImages(); bindMenus(); bindFaqs();
  openStatus(); setInterval(openStatus,60000);
  if($("[data-tide]")){ paintTides(); setInterval(paintTides,60000); }
  const yr=$("#yr"); if(yr) yr.textContent=new Date().getFullYear();
}
document.readyState==="loading"
  ? addEventListener("DOMContentLoaded",boot)
  : boot();
})();
