
"use strict";

document.getElementById("pageTitle").textContent = "Sant eller falskt?";
document.getElementById("pageIntro").textContent =
  "Testa dina kunskaper om datorns komponenter.";
document.getElementById("instructions").textContent =
  "Läs varje påstående och välj Sant eller Falskt. Rätta alla svar när du är klar.";

const questions = [
  ["Moderkortet kopplar samman datorns komponenter.", true,
   "Moderkortet gör att komponenterna kan kommunicera."],
  ["Alla processorer passar i alla moderkort.", false,
   "Processorsockeln och moderkortets stöd måste passa processorn."],
  ["DDR5-minne passar direkt i en DDR4-plats.", false,
   "DDR4 och DDR5 har olika elektriska och fysiska krav."],
  ["PCIe x16 används ofta för grafikkort.", true,
   "Grafikkort ansluts vanligtvis via PCIe."],
  ["Alla M.2-SSD använder NVMe.", false,
   "M.2-SSD kan exempelvis använda SATA eller NVMe via PCIe."],
  ["En dator kan ha grafik inbyggd i processorn.", true,
   "Många processorer har integrerad grafik."],
  ["HDMI kan överföra både bild och ljud.", true,
   "HDMI används för digital bild och ljud."],
  ["Ethernet används för trådlöst nätverk.", false,
   "Ethernet används bland annat för trådbundna nätverksanslutningar."],
  ["Ett dedikerat grafikkort är alltid nödvändigt för skolarbete.", false,
   "Integrerad grafik räcker ofta för vanligt skolarbete."],
  ["En svart skärm kan bero på fel bildingång.", true,
   "Skärmen kan vara inställd på fel HDMI- eller DisplayPort-ingång."]
];

const exercise = document.getElementById("exercise");
const selects = [];

questions.forEach((q, index) => {
  const card = document.createElement("article");
  card.className = "card";

  const title = document.createElement("h2");
  title.textContent = `${index + 1}. ${q[0]}`;
  card.appendChild(title);

  const label = document.createElement("label");
  label.textContent = "Välj ditt svar";
  label.htmlFor = `answer${index}`;
  card.appendChild(label);

  const select = document.createElement("select");
  select.id = `answer${index}`;

  [
    ["", "Välj..."],
    ["true", "Sant"],
    ["false", "Falskt"]
  ].forEach(([value, text]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    select.appendChild(option);
  });

  selects.push(select);
  card.appendChild(select);

  const feedback = document.createElement("p");
  feedback.className = "feedback";
  feedback.id = `feedback${index}`;
  card.appendChild(feedback);

  exercise.appendChild(card);
});

document.getElementById("checkAnswers").addEventListener("click", () => {
  let correct = 0;
  let answered = 0;

  questions.forEach((q, index) => {
    const value = selects[index].value;
    const feedback = document.getElementById(`feedback${index}`);

    if (value === "") {
      feedback.textContent = "Du har inte svarat på frågan.";
      return;
    }

    answered++;

    if ((value === "true") === q[1]) {
      correct++;
      feedback.textContent = `✓ Rätt! ${q[2]}`;
    } else {
      feedback.textContent = `Inte riktigt. ${q[2]}`;
    }
  });

  document.getElementById("result").textContent =
    `Du fick ${correct} av ${questions.length} rätt. ` +
    `Besvarade frågor: ${answered} av ${questions.length}.`;

  try {
    localStorage.setItem("itlab_sant_falskt", JSON.stringify({
      correct,
      total: questions.length,
      answers: selects.map(select => select.value)
    }));
  } catch {
    // Uppgiften fungerar även om lokal lagring är blockerad.
  }
});

document.getElementById("resetAnswers").addEventListener("click", () => {
  selects.forEach(select => select.value = "");
  document.querySelectorAll("#exercise .feedback")
    .forEach(element => element.textContent = "");
  document.getElementById("result").textContent = "";

  try {
    localStorage.removeItem("itlab_sant_falskt");
  } catch {}
});
