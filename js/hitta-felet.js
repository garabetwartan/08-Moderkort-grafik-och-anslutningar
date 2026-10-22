
"use strict";

document.getElementById("pageTitle").textContent = "09. Hitta felet";
document.getElementById("pageIntro").textContent =
  "Fem datorbyggen innehåller tekniska problem. Kan du hitta dem?";
document.getElementById("instructions").textContent =
  "Granska komponenterna i varje dator. Välj vilket problem som finns och förklara hur du skulle lösa det.";

const cases = [
  {
    title: "Dator 1 – Fel processorsockel",
    specs: [
      "Processor: AMD Ryzen 5 7600",
      "Moderkort: Intel B760 med LGA1700",
      "RAM: 16 GB DDR5",
      "Lagring: 1 TB NVMe SSD"
    ],
    options: [
      "Processorn passar inte moderkortets sockel",
      "SSD-enheten är för stor",
      "Datorn har för mycket RAM"
    ],
    correct: 0,
    explanation:
      "Ryzen 5 7600 använder AM5. Moderkortet har LGA1700. De är inte kompatibla."
  },
  {
    title: "Dator 2 – Fel RAM-generation",
    specs: [
      "Processor: AMD Ryzen 5 7600",
      "Moderkort: AM5 med DDR5-stöd",
      "RAM: 16 GB DDR4",
      "Lagring: 512 GB SSD"
    ],
    options: [
      "Datorn behöver alltid 32 GB RAM",
      "RAM-minnet är av fel generation",
      "Processorn saknar stöd för SSD"
    ],
    correct: 1,
    explanation:
      "AM5-plattformen använder DDR5. DDR4-minnet passar inte i DDR5-platserna."
  },
  {
    title: "Dator 3 – Ingen bild",
    specs: [
      "Processor: Intel Core i5-12400F",
      "Moderkort: LGA1700 med HDMI",
      "Grafikkort: Saknas",
      "Bildskärm: Ansluten till moderkortets HDMI"
    ],
    options: [
      "Processorn saknar integrerad grafik",
      "HDMI kan aldrig överföra bild",
      "Moderkortet saknar processorsockel"
    ],
    correct: 0,
    explanation:
      "Intel Core i5-12400F saknar integrerad grafik. Datorn behöver ett separat grafikkort för bildutmatning."
  },
  {
    title: "Dator 4 – Fel SSD-anslutning",
    specs: [
      "Moderkort: Har endast SATA-portar för lagring",
      "SSD: M.2 NVMe",
      "Processor och RAM: Kompatibla",
      "Ingen M.2-plats eller lämplig adapter finns"
    ],
    options: [
      "NVMe-SSD:n kan inte anslutas direkt",
      "Alla SSD-enheter kräver HDMI",
      "SSD-enheten behöver mer RAM"
    ],
    correct: 0,
    explanation:
      "En M.2 NVMe-SSD kan inte kopplas direkt till en vanlig SATA-port. En kompatibel anslutning krävs."
  },
  {
    title: "Dator 5 – Strömförsörjning",
    specs: [
      "Grafikkort: Kräver enligt specifikationen minst 650 W nätaggregat",
      "Nätaggregat: 400 W",
      "Processor: Kompatibel",
      "RAM: Kompatibelt"
    ],
    options: [
      "Nätaggregatet uppfyller inte angivet effektkrav",
      "RAM-minnet är för snabbt",
      "Moderkortet har för många USB-portar"
    ],
    correct: 0,
    explanation:
      "I det här exemplet uppfyller 400 W inte det angivna effektkravet. Vid verkliga byggen måste man även kontrollera total effekt, kontakter och tillverkarens rekommendationer."
  }
];

const exercise = document.getElementById("exercise");
const answers = [];

cases.forEach((item, index) => {
  const card = document.createElement("article");
  card.className = "card case";

  const heading = document.createElement("h2");
  heading.textContent = item.title;
  card.appendChild(heading);

  const list = document.createElement("ul");

  item.specs.forEach(spec => {
    const li = document.createElement("li");
    li.textContent = spec;
    list.appendChild(li);
  });

  card.appendChild(list);

  const label = document.createElement("label");
  label.textContent = "Vad är problemet?";
  label.htmlFor = `problem${index}`;
  card.appendChild(label);

  const select = document.createElement("select");
  select.id = `problem${index}`;

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Välj problem...";
  select.appendChild(placeholder);

  item.options.forEach((option, optionIndex) => {
    const opt = document.createElement("option");
    opt.value = String(optionIndex);
    opt.textContent = option;
    select.appendChild(opt);
  });

  card.appendChild(select);

  const textLabel = document.createElement("label");
  textLabel.textContent = "Hur skulle du lösa problemet?";
  textLabel.htmlFor = `solution${index}`;
  card.appendChild(textLabel);

  const textarea = document.createElement("textarea");
  textarea.id = `solution${index}`;
  textarea.placeholder = "Beskriv din lösning...";
  card.appendChild(textarea);

  const feedback = document.createElement("div");
  feedback.className = "feedback";
  card.appendChild(feedback);

  answers.push({ select, textarea, feedback });
  exercise.appendChild(card);
});

document.getElementById("checkAnswers").addEventListener("click", () => {
  let correct = 0;

  cases.forEach((item, index) => {
    const answer = answers[index];

    if (answer.select.value === "") {
      answer.feedback.textContent = "Du behöver välja ett problem.";
      return;
    }

    const isCorrect = Number(answer.select.value) === item.correct;
    if (isCorrect) correct++;

    answer.feedback.textContent =
      (isCorrect ? "✓ Rätt problem!\n" : "Inte riktigt.\n") +
      item.explanation +
      (answer.textarea.value.trim()
        ? "\nJämför din egen lösning med förklaringen."
        : "\nSkriv också hur du skulle lösa problemet.");
  });

  document.getElementById("result").textContent =
    `${correct} av ${cases.length} problem identifierade korrekt. ` +
    "Dina egna lösningsförslag behöver bedömas separat.";

  try {
    localStorage.setItem("itlab_hitta_felet", JSON.stringify(
      answers.map(a => ({
        problem: a.select.value,
        solution: a.textarea.value
      }))
    ));
  } catch {}
});

document.getElementById("resetAnswers").addEventListener("click", () => {
  answers.forEach(a => {
    a.select.value = "";
    a.textarea.value = "";
    a.feedback.textContent = "";
  });

  document.getElementById("result").textContent = "";

  try {
    localStorage.removeItem("itlab_hitta_felet");
  } catch {}
});
