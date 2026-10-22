
"use strict";

// ========================================
// TEORIBILDER – MODERKORT OCH GRAFIK
// Informationsteknik nivå 1
// ========================================

const slides = [
  {
    title: "1. Vad gör moderkortet?",
    lines: [
      "Moderkortet är datorns centrala kretskort.",
      "Det kopplar samman processor, arbetsminne, lagring och andra komponenter.",
      "Moderkortet gör att komponenterna kan kommunicera med varandra.",
      "Det har anslutningar för både interna och externa enheter."
    ],
    image: "moderkort.png",
    caption: "Ett moderkort med flera olika anslutningar."
  },

  {
    title: "2. Processorsockel (CPU-sockel)",
    lines: [
      "Processorsockeln är platsen på moderkortet där processorn (CPU) monteras.",
      "Processorn och sockeln måste passa ihop för att datorn ska fungera.",
      "Olika processorer kan kräva olika typer av socklar.",
      "Kylpasta läggs mellan processorn och kylaren för att hjälpa till att leda bort värme.",
      "En liten mängd kylpasta, ungefär som en ärta, brukar räcka."
    ],
    image: "Processorsockel-kylpasta.png",
    caption: "Kylpasta hjälper till att överföra värme från processorn till kylaren."
  },

  {
    title: "3. RAM, PCIe och M.2",
    lines: [
      "RAM: Arbetsminnet monteras i särskilda minnesplatser på moderkortet.",
      "Moderkortet måste stödja rätt typ av RAM, exempelvis DDR4 eller DDR5.",
      "PCIe (PCI Express): Används för att ansluta extra komponenter, exempelvis grafikkort.",
      "PCIe finns bland annat som x1, x4, x8 och x16. Siffran visar antalet databanor.",
      "Fler banor gör att mer data kan överföras samtidigt. Grafikkort använder ofta PCIe x16.",
      "M.2: En anslutning som bland annat används för snabba SSD-enheter."
    ],
    image: "ram-pcie-m2.png",
    caption: "Moderkortet har olika platser för RAM, expansionskort och SSD-lagring."
  },

  {
    title: "4. Vad är chipset?",
    lines: [
      "Chipset (kretsuppsättning): Kretsar på moderkortet som hjälper till att hantera kommunikationen mellan olika delar.",
      "Chipsetet hanterar bland annat USB, SATA och vissa PCIe-anslutningar.",
      "Äldre datorer hade ofta två delar som kallades Northbridge och Southbridge.",
      "Northbridge hanterade snabb kommunikation med bland annat RAM och grafikkort.",
      "Southbridge hanterade bland annat USB och lagringsanslutningar.",
      "I moderna datorer finns flera av Northbridges tidigare funktioner inbyggda i processorn."
    ],
    image: "Chipset.png",
    caption: "Bilden visar hur Northbridge och Southbridge fungerade i äldre datorer."
  },

  {
    title: "5. Ström och anslutningar",
    lines: [
      "Nätaggregat (PSU): Förser datorns komponenter med elektrisk ström.",
      "24-pin ATX: Den stora strömanslutningen som ger ström till moderkortet.",
      "CPU-ström: En separat anslutning som ger ström till processorn.",
      "SATA: Används bland annat för att ansluta SSD och HDD till moderkortet.",
      "Startknapp: Datorns startknapp kopplas till moderkortets systempanelanslutning.",
      "Vissa komponenter, exempelvis kraftfulla grafikkort, behöver även egna strömkablar."
    ],
    image: "ström-anslutningar.png",
    caption: "Moderkortet har anslutningar för ström, lagring och andra komponenter."
  },

  {
    title: "6. Interna och externa gränssnitt",
    lines: [
      "Gränssnitt: Ett sätt för olika komponenter eller enheter att anslutas och kommunicera.",
      "Interna gränssnitt finns inuti datorn och kopplar samman datorns komponenter.",
      "Exempel på interna gränssnitt är PCIe, SATA och M.2.",
      "Externa gränssnitt används för att ansluta utrustning utanför datorn.",
      "Exempel på externa gränssnitt är USB, HDMI, DisplayPort och Ethernet."
    ],
    image: "gränssnitt.png",
    caption: "Moderkortet har både interna och externa anslutningar."
  },

  {
    title: "7. Externa anslutningar",
    lines: [
      "HDMI: Överför bild och ljud till exempelvis en skärm eller TV.",
      "DisplayPort: Överför bild och ljud, ofta med stöd för hög upplösning och uppdateringsfrekvens.",
      "USB 2.0: Används exempelvis för tangentbord, mus och USB-minnen.",
      "USB 3.2: Kan överföra data snabbare än USB 2.0.",
      "USB-C: En liten, vändbar USB-anslutning som används för data och ibland laddning eller bild.",
      "LAN (Ethernet): Ansluter datorn till ett nätverk med kabel.",
      "Ljudanslutningar: Används för exempelvis hörlurar, högtalare och mikrofon.",
      "Wi-Fi/Bluetooth: Antennanslutningar för trådlös kommunikation.",
      "Optical S/PDIF: Överför digitalt ljud till exempelvis ett ljudsystem."
    ],
    image: "Externa anslutningar.jpg",
    caption: "Vanliga anslutningar på baksidan av ett moderkort."
  },

  {
    title: "8. Integrerad eller dedikerad grafik?",
    lines: [
      "GPU (Graphics Processing Unit): En grafikprocessor som bearbetar bilder och grafik som visas på skärmen.",
      "En GPU kan utföra många liknande beräkningar samtidigt, exempelvis vid grafik och AI.",
      "Integrerad grafik: Finns inbyggd i processorn och behöver inget separat grafikkort.",
      "Dedikerad grafik: Ett separat grafikkort som monteras på moderkortet, oftast i en PCIe x16-plats.",
      "Ett dedikerat grafikkort har egen grafikprocessor och eget grafikminne (VRAM).",
      "Dedikerad grafik kan ge högre prestanda vid krävande spel, 3D-modellering och videoredigering.",
      "Integrerad grafik räcker oftast för vanligt skolarbete, internet och film."
    ],
    image: "Integrerad-dedikerad-grafik.png",
    caption: ""
  },

  {
    title: "9. Grafikkortets egenskaper",
    lines: [
      "Klockfrekvens (MHz/GHz): Visar hur snabbt GPU:ns klocka arbetar. Högre frekvens kan bidra till bättre prestanda.",
      "VRAM (grafikminne): Grafikkortets eget minne som lagrar exempelvis bilder och texturer.",
      "Minnesfrekvens: Påverkar hur snabbt grafikminnet kan överföra data.",
      "Minnesbuss: Anger hur många bitar som kan överföras samtidigt mellan GPU:n och grafikminnet, exempelvis 128 eller 256 bitar.",
      "Grafikkortets prestanda beror på flera egenskaper tillsammans, inte bara en."
    ],
    image: "grafikkortets-egenskaper.png",
    caption: "Grafikkortets egenskaper påverkar hur snabbt det kan bearbeta grafik."
  },

  {
    title: "10. Prestanda och strömförbrukning",
    lines: [
      "Prestanda: Visar hur bra grafikkortet klarar olika uppgifter.",
      "Olika behov: En vanlig skoldator behöver oftast inte lika kraftfull grafik som en speldator.",
      "Strömförbrukning: Kraftfulla grafikkort använder ofta mer elektrisk energi.",
      "TDP: Ett värde som används för att beskriva värmeutveckling och kylbehov. Det är inte alltid samma sak som faktisk effektförbrukning.",
      "Kylning: Grafikkort har ofta fläktar och kylflänsar som leder bort värme.",
      "Ett kraftfullt grafikkort kan behöva extra ström från nätaggregatet."
    ],
    image: "ström-grafik.png",
    caption: "Grafikkortets prestanda, strömförbrukning och kylning behöver vägas samman."
  },

  {
    title: "11. Kompatibilitet och felsökning",
    lines: [
      "Kompatibilitet betyder att datorns komponenter måste passa ihop för att fungera.",
      "Processor och sockel: Processorn måste passa i moderkortets processorsockel.",
      "RAM-minne: Moderkortet måste stödja rätt RAM-typ, exempelvis DDR4 eller DDR5.",
      "Grafikkort: Måste passa i datorn och få tillräckligt med ström.",
      "Nätaggregat: Måste kunna ge tillräckligt med ström till alla komponenter.",
      "Fysisk storlek: Komponenterna måste också få plats i datorns chassi.",
      "Felsökning: Om skärmen är svart kan man börja med att kontrollera skärmkabeln, rätt bildingång och att datorn är påslagen."
    ],
    image: "kompatibilitet.png",
    caption: "Datorns komponenter måste vara kompatibla för att fungera tillsammans."
  }
];

// ========================================
// BILDSPELETS FUNKTIONER
// ========================================

let currentSlide = 0;

const area = document.getElementById("slide");
const counter = document.getElementById("counter");
const bar = document.getElementById("bar");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

function showSlide() {
  const slide = slides[currentSlide];

  // Rensa föregående slide
  area.replaceChildren();

  // ----------------------------------------
  // TEXTINNEHÅLL
  // ----------------------------------------

  const content = document.createElement("div");
  content.className = "presentation-content";

  // Nummer på teoribilden
  const label = document.createElement("span");
  label.className = "eyebrow";
  label.textContent = `TEORIBILD ${currentSlide + 1}`;
  content.appendChild(label);

  // Rubrik
  const title = document.createElement("h2");
  title.textContent = slide.title;
  content.appendChild(title);

  // Punktlista
  const list = document.createElement("ul");

  slide.lines.forEach(line => {
    const li = document.createElement("li");
    li.textContent = line;
    list.appendChild(li);
  });

  content.appendChild(list);

  // ----------------------------------------
  // BILD
  // ----------------------------------------

  const imageBox = document.createElement("figure");
  imageBox.className = "presentation-image";

  const img = document.createElement("img");

  // Bildmappen ligger en nivå ovanför
  // JavaScript-filen.
  img.src = "../bilder/" + encodeURIComponent(slide.image);

  img.alt = slide.caption || slide.title;
  img.loading = "lazy";

  imageBox.appendChild(img);

  // Bildtext visas endast om den finns
  if (slide.caption) {
    const caption = document.createElement("figcaption");
    caption.textContent = slide.caption;
    imageBox.appendChild(caption);
  }

  // ----------------------------------------
  // LAYOUT
  // ----------------------------------------

  const layout = document.createElement("div");
  layout.className = "presentation-layout";

  layout.append(content, imageBox);
  area.appendChild(layout);

  // Ingen diskussionsruta skapas.

  // ----------------------------------------
  // RÄKNARE OCH PROGRESS
  // ----------------------------------------

  counter.textContent =
    `${currentSlide + 1} / ${slides.length}`;

  bar.style.width =
    `${((currentSlide + 1) / slides.length) * 100}%`;

  // ----------------------------------------
  // NAVIGERINGSKNAPPAR
  // ----------------------------------------

  prev.disabled = currentSlide === 0;
  next.disabled = currentSlide === slides.length - 1;
}

// ========================================
// FÖREGÅENDE SLIDE
// ========================================

prev.addEventListener("click", () => {
  if (currentSlide > 0) {
    currentSlide--;
    showSlide();
  }
});

// ========================================
// NÄSTA SLIDE
// ========================================

next.addEventListener("click", () => {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    showSlide();
  }
});

// ========================================
// VISA FÖRSTA SLIDEN
// ========================================

showSlide();
