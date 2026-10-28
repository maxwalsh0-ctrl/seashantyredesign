
/* ============================================================
   Sea Shanty Cafe — illustrated stand-ins
   ------------------------------------------------------------
   One scene per space, drawn in the brand palette, so every tile
   shows the right room instead of a grey box. These are here to
   be REPLACED: swap the matching "art:*" value in SEASHANTY.img
   for a real photo URL and the illustration disappears.

   Square viewBox, drawn so the subject sits in the upper two
   thirds — the tile captions overlay the bottom.
   ============================================================ */

window.SS_ART = (() => {
const ink="#062F45", navy="#12455F",
      brand="#A1B2CE",          /* the exact stripe blue from the logo */
      blue="#2E77A6",           /* deeper blue, for depicted sea and glass */
      sky="#C3D0E5",
      sand="#F7F2E9", sand2="#E7DAC4", buoy="#C8402E", brass="#C99A3E",
      deep="#08243A", pale="#D7E7F1";

/* horizontal plank texture for salvaged-timber walls */
const planks=(y,h,n,c,o)=>Array.from({length:n},(_,i)=>
  `<rect x="0" y="${y+i*(h/n)}" width="1200" height="1" fill="${c}" opacity="${o}"/>`).join("");

/* a hanging pendant light */
const pendant=(x,y,w)=>`
  <line x1="${x}" y1="0" x2="${x}" y2="${y}" stroke="${ink}" stroke-width="4" opacity=".5"/>
  <path d="M${x-w} ${y+w*.62} L${x-w*.34} ${y} L${x+w*.34} ${y} L${x+w} ${y+w*.62}Z" fill="${brass}"/>
  <ellipse cx="${x}" cy="${y+w*.62}" rx="${w}" ry="${w*.17}" fill="#EBC97E"/>
  <circle cx="${x}" cy="${y+w*.8}" r="${w*.2}" fill="#FFF3D2"/>`;

/* ── THE RESTAURANT — inside, looking out at the bay ── */
const restaurant = `
<svg viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration of the restaurant interior looking out over the bay">
  <rect width="1200" height="1200" fill="${sand}"/>
  ${planks(0,1200,26,"#C9B896",.45)}

  <!-- window -->
  <rect x="150" y="120" width="900" height="560" rx="8" fill="${pale}"/>
  <rect x="150" y="120" width="900" height="230" fill="#BFDCEC"/>
  <circle cx="880" cy="235" r="52" fill="#FFF0CE" opacity=".9"/>
  <rect x="150" y="350" width="900" height="180" fill="${blue}"/>
  <g opacity=".45" fill="#fff">
    <rect x="190" y="392" width="300" height="4"/><rect x="560" y="418" width="380" height="4"/>
    <rect x="240" y="452" width="240" height="4"/><rect x="640" y="482" width="290" height="4"/>
  </g>
  <path d="M150 530h900v150H150z" fill="${sand2}"/>
  <!-- a dinghy on the water -->
  <path d="M690 392h96l-16 30h-64z" fill="${ink}"/>
  <path d="M738 300l40 88h-40z" fill="#fff"/>
  <!-- window frame -->
  <g fill="none" stroke="${ink}" stroke-width="14">
    <rect x="150" y="120" width="900" height="560" rx="8"/>
    <line x1="600" y1="120" x2="600" y2="680"/>
    <line x1="150" y1="400" x2="1050" y2="400"/>
  </g>

  ${pendant(310,60,74)}
  ${pendant(600,60,90)}
  ${pendant(890,60,74)}

  <!-- banquette + tables -->
  <rect x="0" y="700" width="1200" height="60" fill="${navy}"/>
  <rect x="0" y="760" width="1200" height="440" fill="${ink}"/>
  <rect x="120" y="820" width="440" height="26" rx="6" fill="${sand2}"/>
  <rect x="640" y="820" width="440" height="26" rx="6" fill="${sand2}"/>
  <rect x="320" y="846" width="26" height="180" fill="#8B7A5E"/>
  <rect x="840" y="846" width="26" height="180" fill="#8B7A5E"/>
  <!-- table settings -->
  <g fill="${sand}">
    <rect x="190" y="778" width="70" height="42" rx="4"/>
    <rect x="420" y="778" width="70" height="42" rx="4"/>
    <rect x="710" y="778" width="70" height="42" rx="4"/>
    <rect x="940" y="778" width="70" height="42" rx="4"/>
  </g>
  <rect x="318" y="742" width="30" height="78" rx="6" fill="${buoy}"/>
  <rect x="838" y="742" width="30" height="78" rx="6" fill="#2F6B4F"/>
  <g fill="${pale}" opacity=".9">
    <path d="M282 776h26v40h-26z"/><path d="M362 776h26v40h-26z"/>
    <path d="M802 776h26v40h-26z"/><path d="M882 776h26v40h-26z"/>
  </g>
</svg>`;

/* ── THE BAR ── */
const bar = `
<svg viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration of the bar with cask ale taps and bottle shelves">
  <rect width="1200" height="1200" fill="${navy}"/>
  ${planks(0,1200,30,"#0A314C",.65)}

  <!-- back-bar shelving -->
  <g>
    <rect x="90" y="150" width="1020" height="470" fill="${deep}"/>
    <g fill="${ink}">
      <rect x="90" y="286" width="1020" height="14"/>
      <rect x="90" y="430" width="1020" height="14"/>
      <rect x="90" y="574" width="1020" height="14"/>
    </g>
  </g>
  <!-- bottles -->
  <g>
    ${[["#8DBF6A",150],["#C99A3E",212],["#C8402E",274],["#6FA9C9",336],["#8DBF6A",398],
       ["#C99A3E",460],["#B06BA0",522],["#C8402E",584],["#6FA9C9",646],["#8DBF6A",708],
       ["#C99A3E",770],["#C8402E",832],["#6FA9C9",894],["#B06BA0",956],["#8DBF6A",1018]]
      .map(([c,x],i)=>`
      <g fill="${c}" opacity=".92">
        <rect x="${x}" y="${196+(i%3)*8}" width="34" height="${76-(i%3)*8}" rx="5"/>
        <rect x="${x+12}" y="${178+(i%3)*8}" width="10" height="24"/>
      </g>`).join("")}
    ${[["#C99A3E",170],["#6FA9C9",250],["#C8402E",330],["#8DBF6A",410],["#B06BA0",490],
       ["#C99A3E",570],["#6FA9C9",650],["#C8402E",730],["#8DBF6A",810],["#B06BA0",890],
       ["#C99A3E",970]]
      .map(([c,x],i)=>`
      <g fill="${c}" opacity=".85">
        <rect x="${x}" y="${338+(i%2)*10}" width="38" height="${84-(i%2)*10}" rx="5"/>
        <rect x="${x+13}" y="${318+(i%2)*10}" width="12" height="26"/>
      </g>`).join("")}
  </g>
  <!-- glassware row -->
  <g fill="${sky}" opacity=".55">
    ${Array.from({length:12},(_,i)=>`<path d="M${160+i*76} 494h44l-6 66h-32z"/>`).join("")}
  </g>

  ${pendant(300,40,70)}
  ${pendant(600,40,86)}
  ${pendant(900,40,70)}

  <!-- counter -->
  <rect x="0" y="700" width="1200" height="34" fill="${brass}"/>
  <rect x="0" y="734" width="1200" height="466" fill="${ink}"/>
  ${planks(734,466,10,"#0A2436",.8)}

  <!-- cask taps -->
  <g>
    ${[["#C8402E",370],["#2E9E96",520],["#C99A3E",670],["#9CC6DE",820]].map(([c,x])=>`
      <rect x="${x}" y="596" width="26" height="104" fill="${ink}"/>
      <rect x="${x-16}" y="560" width="58" height="46" rx="8" fill="${c}"/>
      <rect x="${x+2}" y="700" width="22" height="18" fill="${brass}"/>`).join("")}
  </g>
  <!-- pint on the bar -->
  <path d="M148 640h74l-10 96h-54z" fill="#E8A63C"/>
  <path d="M146 626h78v20h-78z" fill="#FFF6E4"/>
  <path d="M148 640h74l-10 96h-54z" fill="none" stroke="${pale}" stroke-width="5" opacity=".8"/>
</svg>`;

/* ── THE ICE CREAM PARLOUR ── */
const parlour = `
<svg viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration of the Edwardian ice cream parlour counter and nickelodeon">
  <rect width="1200" height="1200" fill="${sand}"/>
  ${planks(0,1200,24,"#D8C7A5",.5)}

  <!-- blue and white awning -->
  <g>
    <rect x="0" y="0" width="1200" height="96" fill="${brand}"/>
    ${Array.from({length:10},(_,i)=>`<rect x="${i*120+60}" y="0" width="60" height="96" fill="#fff"/>`).join("")}
    <path d="M0 96h1200v18H0z" fill="${ink}"/>
    ${Array.from({length:20},(_,i)=>`<path d="M${i*60} 114a30 30 0 0 0 60 0z" fill="${i%2?"#fff":brand}"/>`).join("")}
  </g>

  <!-- nickelodeon cabinet, right -->
  <g>
    <path d="M930 250q120 0 120 110v340H930z" fill="#7A4A22"/>
    <path d="M930 250q120 0 120 110v340H930z" fill="none" stroke="${brass}" stroke-width="9"/>
    <rect x="962" y="330" width="86" height="120" rx="6" fill="${ink}"/>
    <g fill="${brass}" opacity=".9">
      ${Array.from({length:6},(_,i)=>`<rect x="${974+i*13}" y="${350+(i%3)*10}" width="6" height="${80-(i%3)*10}" rx="3"/>`).join("")}
    </g>
    <circle cx="1005" cy="510" r="30" fill="${brass}"/>
    <circle cx="1005" cy="510" r="14" fill="${ink}"/>
    <rect x="962" y="566" width="86" height="16" rx="6" fill="${brass}"/>
  </g>

  <!-- menu board, left -->
  <g>
    <rect x="110" y="230" width="270" height="330" rx="6" fill="${ink}"/>
    <rect x="110" y="230" width="270" height="330" rx="6" fill="none" stroke="${brass}" stroke-width="10"/>
    <g fill="${sand}" opacity=".85">
      <rect x="146" y="278" width="150" height="13" rx="6"/>
      <rect x="146" y="322" width="198" height="9" rx="4"/>
      <rect x="146" y="352" width="170" height="9" rx="4"/>
      <rect x="146" y="382" width="188" height="9" rx="4"/>
      <rect x="146" y="412" width="140" height="9" rx="4"/>
      <rect x="146" y="442" width="176" height="9" rx="4"/>
      <rect x="146" y="472" width="120" height="9" rx="4"/>
    </g>
  </g>

  <!-- cones in a stand -->
  <g transform="translate(470,360)">
    ${[0,1,2].map(i=>`
      <path d="M${i*84} 96l30 118 30-118z" fill="#D9A55E"/>
      <circle cx="${i*84+30}" cy="86" r="34" fill="${["#F3D9C6","#F6EFE0","#C0DCE8"][i]}"/>
      <circle cx="${i*84+16}" cy="62" r="24" fill="${["#EFC9AE","#F2E6D0","#AED0E0"][i]}"/>
      <circle cx="${i*84+44}" cy="60" r="22" fill="${["#F3D9C6","#F6EFE0","#C0DCE8"][i]}"/>
      <rect x="${i*84+26}" y="34" width="8" height="26" fill="${buoy}" transform="rotate(14 ${i*84+30} 46)"/>`).join("")}
  </g>

  <!-- curved glass display case -->
  <path d="M60 660q540-120 1080 0v70H60z" fill="${pale}" opacity=".75"/>
  <path d="M60 660q540-120 1080 0" fill="none" stroke="${ink}" stroke-width="10"/>
  <!-- tubs -->
  <g>
    ${[["#F3D9C6",120],["#C9E2EA",250],["#EBC97E",380],["#D9A9B4",510],
       ["#B9D6BF",640],["#F6EFE0",770],["#C7B49B",900],["#E9C0A2",1010]]
      .map(([c,x])=>`
      <ellipse cx="${x+55}" cy="690" rx="58" ry="20" fill="${c}"/>
      <path d="M${x} 690h110v46H${x}z" fill="${ink}" opacity=".18"/>
      <ellipse cx="${x+55}" cy="678" rx="42" ry="14" fill="#fff" opacity=".35"/>`).join("")}
  </g>

  <!-- counter -->
  <rect x="0" y="736" width="1200" height="28" fill="${brass}"/>
  <rect x="0" y="764" width="1200" height="436" fill="${ink}"/>
  <g fill="none" stroke="${brass}" stroke-width="7" opacity=".75">
    ${Array.from({length:5},(_,i)=>`<rect x="${60+i*230}" y="820" width="180" height="240" rx="8"/>`).join("")}
  </g>
</svg>`;

/* ── THE TERRACE ── */
const terrace = `
<svg viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration of the terrace looking out over the beach">
  <defs>
    <linearGradient id="ssky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#BADCEE"/><stop offset="1" stop-color="#EAF3F7"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="1200" fill="url(#ssky)"/>
  <circle cx="960" cy="180" r="76" fill="#FFF0CE"/>

  <!-- headland -->
  <path d="M0 470q160-70 330-30t250 22V470z" fill="#8FA98F" opacity=".7"/>

  <!-- sea -->
  <rect x="0" y="468" width="1200" height="190" fill="${blue}"/>
  <rect x="0" y="468" width="1200" height="40" fill="#3E86B4"/>
  <g fill="#fff" opacity=".4">
    <rect x="80" y="520" width="230" height="5" rx="2"/><rect x="420" y="548" width="300" height="5" rx="2"/>
    <rect x="180" y="586" width="200" height="5" rx="2"/><rect x="700" y="512" width="260" height="5" rx="2"/>
    <rect x="620" y="606" width="330" height="5" rx="2"/><rect x="140" y="640" width="280" height="5" rx="2"/>
  </g>
  <!-- dinghies -->
  <g>
    <path d="M250 520h84l-14 26h-56z" fill="${ink}"/><path d="M292 442l34 76h-34z" fill="#fff"/>
    <path d="M760 552h70l-12 22h-46z" fill="${ink}"/><path d="M795 490l28 62h-28z" fill="#fff"/>
  </g>
  <!-- beach -->
  <path d="M0 658q600-46 1200 0v96H0z" fill="#E8DCC0"/>
  <path d="M0 658q600-46 1200 0" fill="none" stroke="#fff" stroke-width="7" opacity=".8"/>

  <!-- gulls -->
  <g fill="none" stroke="${ink}" stroke-width="6" stroke-linecap="round" opacity=".65">
    <path d="M150 250q22-20 44 0M194 250q22-20 44 0"/>
    <path d="M420 178q16-15 32 0M452 178q16-15 32 0"/>
  </g>

  <!-- parasol, blue and white -->
  <g transform="translate(300,300)">
    <rect x="-7" y="60" width="14" height="440" fill="#9A8258"/>
    <path d="M-230 66q230-190 460 0z" fill="#fff"/>
    <g fill="${brand}">
      <path d="M-230 66q40-33 80-53l14 53z"/>
      <path d="M-108 13q40-14 80-15l6 68h-72z"/>
      <path d="M42 0q42 4 82 20l-28 46H48z"/>
      <path d="M154 33q42 15 76 33H176z"/>
    </g>
    <path d="M-230 66h460" stroke="${ink}" stroke-width="8" fill="none"/>
    <circle cx="0" cy="-6" r="12" fill="${ink}"/>
  </g>

  <!-- table and chairs -->
  <g>
    <ellipse cx="300" cy="812" rx="188" ry="42" fill="${sand}"/>
    <ellipse cx="300" cy="800" rx="188" ry="42" fill="#fff"/>
    <rect x="288" y="812" width="24" height="150" fill="#9A8258"/>
    <g fill="${ink}">
      <rect x="86" y="742" width="18" height="180" rx="8"/>
      <rect x="76" y="742" width="86" height="16" rx="8"/>
      <rect x="500" y="742" width="18" height="180" rx="8"/>
      <rect x="460" y="742" width="86" height="16" rx="8"/>
    </g>
    <path d="M242 742h36l-6 58h-24z" fill="#E8A63C"/>
    <path d="M240 730h40v16h-40z" fill="#FFF6E4"/>
    <rect x="326" y="754" width="52" height="34" rx="5" fill="${buoy}"/>
  </g>

  <!-- deck rail -->
  <g fill="${ink}">
    <rect x="620" y="700" width="16" height="200"/><rect x="740" y="700" width="16" height="200"/>
    <rect x="860" y="700" width="16" height="200"/><rect x="980" y="700" width="16" height="200"/>
    <rect x="1100" y="700" width="16" height="200"/>
    <rect x="600" y="690" width="600" height="20" rx="8"/>
    <rect x="600" y="790" width="600" height="12"/>
  </g>

  <!-- decking -->
  <rect x="0" y="920" width="1200" height="280" fill="#C4A87C"/>
  ${planks(920,280,9,"#9E8558",.9)}
</svg>`;

/* ── THE BUILDING / STORY — salvaged interior wall ── */
const story = `
<svg viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration of the salvaged interior wall with oars, lifebuoy and portholes">
  <rect width="1200" height="1200" fill="${sand2}"/>
  ${planks(0,1200,22,"#C4AF8B",.7)}

  <!-- crossed oars -->
  <g stroke="#9A8258" stroke-width="26" stroke-linecap="round">
    <line x1="120" y1="200" x2="470" y2="620"/>
    <line x1="470" y1="200" x2="120" y2="620"/>
  </g>
  <g fill="#8B7A5E">
    <ellipse cx="470" cy="620" rx="42" ry="66" transform="rotate(-40 470 620)"/>
    <ellipse cx="120" cy="620" rx="42" ry="66" transform="rotate(40 120 620)"/>
  </g>

  <!-- lifebuoy -->
  <g transform="translate(760,330)">
    <circle r="150" fill="#fff"/>
    <circle r="150" fill="none" stroke="${ink}" stroke-width="6"/>
    <g fill="${buoy}">
      <path d="M-150 0a150 150 0 0 1 44-106l53 53A75 75 0 0 0-75 0z"/>
      <path d="M150 0a150 150 0 0 1-44 106l-53-53A75 75 0 0 0 75 0z"/>
    </g>
    <circle r="76" fill="${sand2}"/>
    <circle r="76" fill="none" stroke="${ink}" stroke-width="6"/>
  </g>

  <!-- portholes -->
  <g transform="translate(1020,700)">
    ${[0,1].map(i=>`
      <circle cx="0" cy="${i*180}" r="76" fill="${brass}"/>
      <circle cx="0" cy="${i*180}" r="58" fill="${blue}"/>
      <path d="M-58 ${i*180}a58 58 0 0 1 58-58v58z" fill="${sky}" opacity=".55"/>
      ${Array.from({length:6},(_,k)=>{
        const a=k*Math.PI/3, x=Math.cos(a)*67, y=Math.sin(a)*67+i*180;
        return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6" fill="${ink}"/>`;}).join("")}
    `).join("")}
  </g>

  <!-- framed pictures -->
  <g>
    <rect x="600" y="600" width="230" height="180" fill="#fff" stroke="${ink}" stroke-width="12"/>
    <rect x="624" y="624" width="182" height="70" fill="${blue}"/>
    <rect x="624" y="694" width="182" height="62" fill="#E8DCC0"/>
    <path d="M700 660h40l-7 14h-26z" fill="${ink}"/>

    <rect x="180" y="720" width="190" height="150" fill="#fff" stroke="${ink}" stroke-width="12"/>
    <circle cx="275" cy="795" r="42" fill="${brass}"/>
    <path d="M204 846h142v12H204z" fill="${sand2}"/>
  </g>

  <!-- shelf with jars -->
  <rect x="0" y="960" width="1200" height="18" fill="#8B7A5E"/>
  <g>
    ${[["#C9E2EA",90],["#EBC97E",230],["#D9A9B4",370],["#B9D6BF",510],
       ["#F6EFE0",650],["#C0DCE8",790],["#E9C0A2",930],["#CDBDA0",1060]]
      .map(([c,x],i)=>`
      <rect x="${x}" y="${880+(i%2)*22}" width="76" height="${80-(i%2)*22}" rx="8" fill="${c}"/>
      <rect x="${x+8}" y="${868+(i%2)*22}" width="60" height="16" rx="5" fill="${brass}"/>`).join("")}
  </g>
  <rect x="0" y="978" width="1200" height="222" fill="${ink}" opacity=".08"/>
</svg>`;


/* ── generic PORTRAIT placeholder — swap for real staff photos ── */
const portrait = `
<svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Portrait placeholder">
  <rect width="600" height="600" fill="${sand2}"/>
  <g fill="${blue}" opacity=".55">
    <rect y="0"   width="600" height="60"/><rect y="120" width="600" height="60"/>
    <rect y="240" width="600" height="60"/><rect y="360" width="600" height="60"/>
    <rect y="480" width="600" height="60"/>
  </g>
  <circle cx="300" cy="600" r="210" fill="${ink}" opacity=".9"/>
  <circle cx="300" cy="258" r="112" fill="${ink}" opacity=".9"/>
</svg>`;


/* ── THE BUILDING FROM THE BEACH — hero / bay fallback ── */
const bay = `
<svg viewBox="0 0 1600 1000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration of the Sea Shanty seen from the beach">
  <defs>
    <linearGradient id="bsky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#7FA3C4"/><stop offset=".55" stop-color="#BBD2E4"/>
      <stop offset="1" stop-color="#EADFC8"/></linearGradient>
    <linearGradient id="bsea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2E77A6"/><stop offset="1" stop-color="#5C97BC"/></linearGradient>
  </defs>
  <rect width="1600" height="1000" fill="url(#bsky)"/>
  <circle cx="1290" cy="235" r="88" fill="#FFEFC9" opacity=".92"/>

  <!-- headlands -->
  <path d="M0 430q210-92 430-52t250 30V430z" fill="#6E8A85" opacity=".55"/>
  <path d="M1600 442q-230-86-430-40t-190 26V442z" fill="#6E8A85" opacity=".4"/>

  <!-- sea -->
  <rect x="0" y="428" width="1600" height="150" fill="url(#bsea)"/>
  <g fill="#fff" opacity=".33">
    <rect x="90" y="474" width="240" height="5" rx="2"/><rect x="520" y="500" width="300" height="5" rx="2"/>
    <rect x="980" y="466" width="270" height="5" rx="2"/><rect x="300" y="536" width="330" height="5" rx="2"/>
    <rect x="880" y="546" width="380" height="5" rx="2"/>
  </g>
  <path d="M470 486h84l-14 26h-56z" fill="#062F45"/><path d="M512 410l32 74h-32z" fill="#fff"/>
  <path d="M1080 512h70l-12 22h-46z" fill="#062F45"/><path d="M1115 452l28 60h-28z" fill="#fff"/>

  <!-- beach -->
  <path d="M0 574q800-56 1600 0v426H0z" fill="#E4D8BC"/>
  <path d="M0 574q800-56 1600 0" fill="none" stroke="#fff" stroke-width="8" opacity=".75"/>

  <!-- the building -->
  <g transform="translate(430,300)">
    <path d="M-30 300 L370 300 L340 196 L0 196Z" fill="#3B4550"/>
    <path d="M-30 300 L370 300 L340 196 L0 196Z" fill="none" stroke="#2A323B" stroke-width="4"/>
    <rect x="-14" y="296" width="368" height="204" fill="#FBFAF4"/>
    <rect x="-14" y="296" width="368" height="46" fill="#062F45"/>
    ${Array.from({length:11},(_,i)=>`<rect x="${2+i*32}" y="308" width="18" height="22" rx="3" fill="#fff"/>`).join("")}
    <!-- windows -->
    <g fill="#A1B2CE" stroke="#062F45" stroke-width="5">
      <rect x="14" y="366" width="118" height="86"/>
      <rect x="208" y="366" width="118" height="86"/>
    </g>
    <g stroke="#062F45" stroke-width="4">
      <line x1="73" y1="366" x2="73" y2="452"/><line x1="14" y1="409" x2="132" y2="409"/>
      <line x1="267" y1="366" x2="267" y2="452"/><line x1="208" y1="409" x2="326" y2="409"/>
    </g>
    <rect x="152" y="356" width="36" height="14" fill="#fff" stroke="#062F45" stroke-width="4"/>
    <rect x="150" y="378" width="40" height="122" fill="#062F45"/>
    <rect x="158" y="392" width="24" height="40" fill="#A1B2CE"/>
    <rect x="-14" y="490" width="368" height="12" fill="#062F45"/>
  </g>

  <!-- parasols on the sand -->
  <g transform="translate(1090,540)">
    <rect x="-5" y="40" width="10" height="150" fill="#9A8258"/>
    <path d="M-120 44q120-104 240 0z" fill="#fff"/>
    <g fill="#A1B2CE">
      <path d="M-120 44q22-19 44-30l8 30z"/><path d="M-52 5q22-8 44-8l4 47h-40z"/>
      <path d="M32 -1q22 3 44 12l-16 33H36z"/><path d="M92 24q16 8 28 20H104z"/>
    </g>
    <path d="M-120 44h240" stroke="#062F45" stroke-width="6" fill="none"/>
  </g>
  <g transform="translate(1330,600) scale(.8)">
    <rect x="-5" y="40" width="10" height="150" fill="#9A8258"/>
    <path d="M-120 44q120-104 240 0z" fill="#fff"/>
    <g fill="#A1B2CE">
      <path d="M-120 44q22-19 44-30l8 30z"/><path d="M-52 5q22-8 44-8l4 47h-40z"/>
      <path d="M32 -1q22 3 44 12l-16 33H36z"/><path d="M92 24q16 8 28 20H104z"/>
    </g>
    <path d="M-120 44h240" stroke="#062F45" stroke-width="6" fill="none"/>
  </g>

  <!-- gulls -->
  <g fill="none" stroke="#062F45" stroke-width="6" stroke-linecap="round" opacity=".55">
    <path d="M980 190q18-16 36 0M1016 190q18-16 36 0"/>
    <path d="M1220 120q14-12 28 0M1248 120q14-12 28 0"/>
  </g>
</svg>`;


/* ── GIFT CARD — stand-in until the real card artwork is dropped in ── */
const giftcard = `
<svg viewBox="0 0 1586 1000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Sea Shanty Cafe gift card">
  <defs>
    <linearGradient id="gcbg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0A3550"/><stop offset="1" stop-color="#062F45"/></linearGradient>
    <radialGradient id="gcglow" cx="0.85" cy="0.9" r="0.6">
      <stop offset="0" stop-color="#A1B2CE" stop-opacity=".3"/>
      <stop offset="1" stop-color="#A1B2CE" stop-opacity="0"/></radialGradient>
    <clipPath id="gcclip"><rect width="1586" height="1000" rx="26"/></clipPath>
  </defs>

  <g clip-path="url(#gcclip)">
    <rect width="1586" height="1000" fill="url(#gcbg)"/>
    <rect width="1586" height="1000" fill="url(#gcglow)"/>

    <!-- brand stripe across the top -->
    <rect width="1586" height="86" fill="#A1B2CE"/>
    ${Array.from({length:9},(_,i)=>`<rect x="${i*176+88}" y="0" width="88" height="86" fill="#fff"/>`).join("")}

    <!-- striped roundel -->
    <g transform="translate(150,300)">
      <circle cx="112" cy="112" r="112" fill="#fff"/>
      <g clip-path="url(#gcroundel)">
        <clipPath id="gcroundel"><circle cx="112" cy="112" r="112"/></clipPath>
        <g fill="#A1B2CE">
          <rect y="24" width="224" height="26"/><rect y="76" width="224" height="26"/>
          <rect y="128" width="224" height="26"/><rect y="180" width="224" height="26"/>
        </g>
      </g>
      <circle cx="112" cy="112" r="112" fill="none" stroke="#062F45" stroke-width="10"/>
    </g>

    <text x="150" y="620" fill="#fff" font-family="Fraunces,Georgia,serif"
          font-size="96" font-weight="700" letter-spacing="-2">Sea Shanty</text>
    <text x="156" y="678" fill="#A1B2CE" font-family="Instrument Sans,sans-serif"
          font-size="30" letter-spacing="9">TREARDDUR BAY &#183; ANGLESEY</text>

    <text x="150" y="852" fill="#C3D0E5" font-family="Instrument Sans,sans-serif"
          font-size="30" font-weight="600" letter-spacing="7">GIFT VOUCHER</text>
    <text x="1436" y="862" text-anchor="end" fill="#C3D0E5"
          font-family="Instrument Sans,sans-serif" font-size="30" letter-spacing="5">NO EXPIRY DATE</text>

    <!-- value panel: 40px padding on every edge -->
    <g transform="translate(1094,327)">
      <rect width="342" height="171" rx="10" fill="none" stroke="#A1B2CE" stroke-width="4" opacity=".65"/>
      <text x="171" y="57" text-anchor="middle" fill="#A1B2CE"
            font-family="Instrument Sans,sans-serif" font-size="24" letter-spacing="5">ANY AMOUNT</text>
      <text x="171" y="118" text-anchor="middle" fill="#fff"
            font-family="Fraunces,Georgia,serif" font-size="54" font-weight="600">&#163;10 &#8211; &#163;200</text>
    </g>

    <!-- waterline -->
    <path d="M0 940c160-30 260 22 420 22s260-52 420-52 260 52 420 52 220-40 326-52v90H0z"
          fill="#A1B2CE" opacity=".18"/>
  </g>
</svg>`;

return { restaurant, bar, parlour, terrace, story, portrait, bay, giftcard,
         hero:bay, tide:terrace, lifeboat:bay };
})();

