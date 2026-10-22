
"use strict";

const generation = document.getElementById("generation");
const lanes = document.getElementById("lanes");
const result = document.getElementById("result");

// Ungefärlig maximal bandbredd per riktning
// och PCIe-bana, angiven i GB/s.
const bandwidth = {
  3: 0.985,
  4: 1.969,
  5: 3.938
};

// Beräkna bandbredd
function calculateBandwidth(gen, laneCount) {
  return bandwidth[gen] * laneCount;
}

// Knappen: Beräkna bandbredd
document.getElementById("calculate").onclick = () => {

  const gen = Number(generation.value);
  const count = Number(lanes.value);

  const value = calculateBandwidth(gen, count);

  result.textContent =
    `PCIe ${gen}.0 ×${count}\n\n` +

    `Ungefärlig maximal bandbredd: ` +
    `${value.toFixed(2)} GB/s per riktning.\n\n` +

    "SÅ RÄKNAR VI UT BANDBREDDEN\n\n" +

    "Steg 1 – Ta reda på hastigheten per bana\n" +
    `PCIe ${gen}.0 har ungefär ` +
    `${bandwidth[gen]} GB/s per bana.\n\n` +

    "Steg 2 – Kontrollera antalet banor\n" +
    `Du har valt ${count} banor.\n\n` +

    "Steg 3 – Beräkna den totala bandbredden\n" +
    "Formel: Bandbredd per bana × Antal banor\n" +
    `${bandwidth[gen]} × ${count} = ` +
    `${value.toFixed(2)} GB/s.\n\n` +

    "Observera: Detta är ett teoretiskt värde. " +
    "Den verkliga prestandan beror även på " +
    "komponenten och resten av systemet.";
};


// KUNSKAPSFRÅGOR

const tasks = [
  {
    question:
      "Hur stor är ungefärlig bandbredd för PCIe 4.0 x4?",

    options: [
      "3,94 GB/s",
      "7,88 GB/s",
      "31,51 GB/s"
    ],

    correct: 1,

    reason:
      "PCIe 4.0 har ungefär 1,969 GB/s per bana. " +
      "1,969 × 4 ≈ 7,88 GB/s."
  },

  {
    question:
      "Vad händer om antalet banor fördubblas " +
      "inom samma PCIe-generation?",

    options: [
      "Bandbredden halveras",
      "Bandbredden fördubblas",
      "Ingenting händer"
    ],

    correct: 1,

    reason:
      "När antalet banor fördubblas kan " +
      "också den teoretiska bandbredden fördubblas."
  },

  {
    question:
      "Vilken anslutning har högst " +
      "teoretisk bandbredd?",

    options: [
      "PCIe 3.0 x16",
      "PCIe 4.0 x8",
      "PCIe 5.0 x16"
    ],

    correct: 2,

    reason:
      "PCIe 5.0 x16 har ungefär " +
      "63 GB/s per riktning."
  }
];


// SKAPA FRÅGORNA

const exercise = document.getElementById("exercise");
const selects = [];

tasks.forEach((task, i) => {

  const label = document.createElement("label");

  label.htmlFor = `q${i}`;

  label.textContent =
    `${i + 1}. ${task.question}`;

  exercise.appendChild(label);


  const select = document.createElement("select");

  select.id = `q${i}`;

  select.add(new Option("Välj ditt svar...", ""));

  task.options.forEach((option, index) => {

    select.add(
      new Option(option, String(index))
    );

  });

  exercise.appendChild(select);

  selects.push(select);

});


// KONTROLLERA SVAREN

document.getElementById("checkAnswers").onclick = () => {

  let correct = 0;

  const messages = [];

  tasks.forEach((task, i) => {

    const answer = selects[i].value;

    if (answer === "") {

      messages.push(
        `Fråga ${i + 1}: Du måste välja ett svar.`
      );

      return;
    }

    const right =
      Number(answer) === task.correct;

    if (right) {
      correct++;
    }

    messages.push(
      `Fråga ${i + 1}: ` +
      `${right ? "✓ Rätt!" : "✗ Inte rätt."}\n` +
      `${task.reason}`
    );

  });

  document.getElementById("feedback").textContent =
    `Du fick ${correct} av ${tasks.length} rätt.\n\n` +
    messages.join("\n\n");

};


// GÖR OM UPPGIFTEN

document.getElementById("resetAnswers").onclick = () => {

  selects.forEach(select => {
    select.value = "";
  });

  document.getElementById("feedback").textContent = "";

  result.textContent = "";

};
