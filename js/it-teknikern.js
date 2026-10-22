
"use strict";

// Sidans rubrik och instruktioner
document.getElementById("pageTitle").textContent = "IT-teknikern";

document.getElementById("pageIntro").textContent =
  "Du arbetar i en datorbutik och ska hjälpa fyra kunder.";

document.getElementById("instructions").textContent =
  "Läs kundens behov och välj den datorlösning som passar bäst.";

// Kunduppgifter
const cases = [
  {
    customer: "Kund 1 – Gymnasieelev",
    need: "Behöver dator för webbläsare, dokument, videomöten och skolarbete. Vill undvika onödiga kostnader.",
    options: [
      "16 GB RAM, integrerad grafik, 512 GB SSD",
      "64 GB RAM, kraftfullt grafikkort, 4 TB SSD",
      "8 GB RAM, långsam HDD, inget SSD"
    ],
    correct: 0,
    reason: "En dator med 16 GB RAM, SSD och integrerad grafik räcker vanligtvis bra för skolarbete."
  },
  {
    customer: "Kund 2 – Spelentusiast",
    need: "Vill spela moderna, krävande 3D-spel med höga grafikinställningar.",
    options: [
      "Enkel kontorsdator med integrerad grafik",
      "16–32 GB RAM, dedikerat grafikkort och SSD",
      "Dator med mycket lagring men svag processor och grafik"
    ],
    correct: 1,
    reason: "Ett dedikerat grafikkort och en lämplig processor är viktiga för krävande spel."
  },
  {
    customer: "Kund 3 – Videoredigerare",
    need: "Arbetar med stora videoprojekt, flera program samtidigt och högupplöst material.",
    options: [
      "8 GB RAM och liten HDD",
      "Enkel dator med 4 GB RAM",
      "32 GB RAM, snabb SSD och lämpligt grafikkort"
    ],
    correct: 2,
    reason: "Videoredigering gynnas ofta av mer RAM, snabb lagring och god grafikprestanda."
  },
  {
    customer: "Kund 4 – Kontorsföretag",
    need: "Ska köpa 15 datorer för e-post, kalkylblad, webbtjänster och möten. Kostnad och driftsäkerhet är viktiga.",
    options: [
      "15 datorer med 16 GB RAM, SSD och integrerad grafik",
      "15 avancerade gamingdatorer",
      "15 datorer med 4 GB RAM och enbart HDD"
    ],
    correct: 0,
    reason: "En standardiserad kontorsdator med SSD och tillräckligt RAM ger bra funktion utan onödiga grafikkostnader."
  }
];

// Hämta HTML-element
const exercise = document.getElementById("exercise");
const result = document.getElementById("result");

const answers = [];
const storageKey = "itlab_teknikern";

// Skapa kunduppgifterna
cases.forEach((item, index) => {

  const card = document.createElement("article");
  card.className = "card";

  const title = document.createElement("h2");
  title.textContent = item.customer;
  card.appendChild(title);

  const need = document.createElement("p");
  need.textContent = item.need;
  card.appendChild(need);

  const label = document.createElement("label");
  label.textContent = "Välj datorlösning";
  label.htmlFor = `choice${index}`;
  card.appendChild(label);

  const select = document.createElement("select");
  select.id = `choice${index}`;

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Välj lösning...";
  select.appendChild(placeholder);

  item.options.forEach((option, optionIndex) => {
    const element = document.createElement("option");
    element.value = String(optionIndex);
    element.textContent = option;
    select.appendChild(element);
  });

  card.appendChild(select);

  const feedback = document.createElement("div");
  feedback.className = "feedback";
  feedback.setAttribute("role", "status");
  card.appendChild(feedback);

  answers.push({ select, feedback });

  exercise.appendChild(card);
});

// Spara elevens val
function saveAnswers() {
  try {
    const data = answers.map(answer => ({
      choice: answer.select.value
    }));

    localStorage.setItem(storageKey, JSON.stringify(data));
  } catch {
    // Webbplatsen fungerar även om lagring är blockerad.
  }
}

// Återställ tidigare sparade val
try {
  const saved = JSON.parse(localStorage.getItem(storageKey));

  if (Array.isArray(saved)) {
    saved.forEach((item, index) => {
      if (answers[index] && item) {
        const value = String(item.choice ?? "");

        const valid = Array.from(
          answers[index].select.options
        ).some(option => option.value === value);

        if (valid) {
          answers[index].select.value = value;
        }
      }
    });
  }
} catch {
  // Ignorera felaktiga sparade uppgifter.
}

// Spara när eleven ändrar ett val
answers.forEach(answer => {
  answer.select.addEventListener("change", () => {
    answer.feedback.textContent = "";
    result.textContent = "";
    saveAnswers();
  });
});

// Kontrollera elevens svar
document.getElementById("checkAnswers")
  .addEventListener("click", () => {

    let correct = 0;
    let unanswered = 0;

    cases.forEach((item, index) => {

      const answer = answers[index];
      const selected = answer.select.value;

      if (selected === "") {
        unanswered++;
        answer.feedback.textContent =
          "Välj först en datorlösning.";
        return;
      }

      const isCorrect =
        Number(selected) === item.correct;

      if (isCorrect) {
        correct++;
        answer.feedback.textContent =
          "✓ Rätt val! " + item.reason;
      } else {
        answer.feedback.textContent =
          "✗ Inte det bästa alternativet. " +
          "Försök igen och fundera på kundens behov.";
      }

    });

    if (unanswered > 0) {
      result.textContent =
        `Du har ${correct} rätt av ${cases.length}. ` +
        `Du har ${unanswered} obesvarade frågor.`;
    } else {
      result.textContent =
        `Du fick ${correct} av ${cases.length} rätt!`;

      if (correct === cases.length) {
        result.textContent +=
          " Bra jobbat! Du har hjälpt alla fyra kunder.";
      }
    }

    saveAnswers();
  });

// Gör om uppgiften
document.getElementById("resetAnswers")
  .addEventListener("click", () => {

    answers.forEach(answer => {
      answer.select.value = "";
      answer.feedback.textContent = "";
    });

    result.textContent = "";

    try {
      localStorage.removeItem(storageKey);
    } catch {
      // Ignorera om lagring inte är tillgänglig.
    }

  });
