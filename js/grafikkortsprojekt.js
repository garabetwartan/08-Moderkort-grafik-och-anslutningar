
"use strict";

document.addEventListener("DOMContentLoaded", () => {

  const gpuContainer = document.getElementById("gpuCards");
  const gpuInputs = [];

  for (let i = 0; i < 5; i++) {
    const card = document.createElement("div");
    card.className = "card";

    const heading = document.createElement("h3");
    heading.textContent = `Grafikkort ${i + 1}`;
    card.appendChild(heading);

    const fields = [
      ["Modell", "text"],
      ["Pris (kr)", "number"],
      ["Grafikminne (GB)", "number"],
      ["Klockfrekvens (MHz)", "number"],
      ["Effektförbrukning (W)", "number"],
      ["Användningsområde", "text"]
    ];

    const inputs = {};

    fields.forEach(([name, type]) => {
      const label = document.createElement("label");
      label.textContent = name;

      const input = document.createElement("input");
      input.type = type;
      input.placeholder = `Ange ${name.toLowerCase()}`;

      if (type === "number") {
        input.min = "0";
      }

      card.append(label, input);
      inputs[name] = input;
    });

    gpuInputs.push(inputs);
    gpuContainer.appendChild(card);
  }

  const questions = [
    "Är CPU eller GPU viktigast för en speldators prestanda? Förklara.",
    "Vad händer om du använder ett kraftfullt 4K-grafikkort med en enklare bildskärm?",
    "Vad händer om nätaggregatet är på 350 W och grafikkortet ensamt kan förbruka 350 W?",
    "Är två grafikkort alltid bättre än ett? Förklara.",
    "Vad är överklockning och vilka risker finns?",
    "Ge exempel på grafikkort i fem prisklasser och deras användningsområden.",
    "Hur mycket grafikminne behöver man för olika användningsområden?",
    "Vad påverkar grafikkortets fysiska storlek?",
    "Vad betyder TDP?",
    "Hur får ett grafikkort extra ström om PCIe-platsen inte räcker?",
    "Vilka bildskärmsanslutningar finns på grafikkort?",
    "Hur kan man förbättra en GPU:s prestanda och vilka begränsningar finns?"
  ];

  const questionContainer = document.getElementById("questions");
  const questionInputs = [];

  questions.forEach((question, index) => {
    const label = document.createElement("label");
    label.textContent = `${index + 1}. ${question}`;

    const textarea = document.createElement("textarea");
    textarea.placeholder = "Skriv ditt svar eller stödord...";

    questionContainer.append(label, textarea);
    questionInputs.push(textarea);
  });

  const checklistItems = [
    "Vi har valt fem olika grafikkort.",
    "Vi har undersökt pris och tekniska egenskaper.",
    "Vi har valt ett användningsområde.",
    "Vi har jämfört kortens prestanda.",
    "Vi har utsett bäst prestanda.",
    "Vi har utsett bäst pris/prestanda.",
    "Vi har besvarat fördjupningsfrågorna.",
    "Vi har skapat en PowerPoint eller Google Presentation.",
    "Vi har skrivit våra namn och angett källor."
  ];

  const checklist = document.getElementById("checklist");
  const checkboxes = [];

  checklistItems.forEach(text => {
    const label = document.createElement("label");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.style.width = "auto";
    checkbox.style.marginRight = "10px";

    label.append(checkbox, document.createTextNode(text));
    checklist.appendChild(label);
    checkboxes.push(checkbox);

    checkbox.addEventListener("change", updateProgress);
  });

  function updateProgress() {
    const completed = checkboxes.filter(box => box.checked).length;
    document.getElementById("progressText").textContent =
      `${completed} av ${checkboxes.length} delar klara.`;
  }

  updateProgress();

  document.getElementById("exportProject").onclick = () => {
    const lines = [
      "GRAFIKKORTSPROJEKTET",
      "Informationsteknik nivå 1",
      ""
    ];

    gpuInputs.forEach((gpu, index) => {
      lines.push(`GRAFIKKORT ${index + 1}`);

      Object.entries(gpu).forEach(([name, input]) => {
        lines.push(`${name}: ${input.value}`);
      });

      lines.push("");
    });

    lines.push("JÄMFÖRELSE");
    lines.push(
      "Bäst prestanda: " +
      document.getElementById("bestPerformance").value
    );
    lines.push(
      "Bäst pris/prestanda: " +
      document.getElementById("bestValue").value
    );
    lines.push(
      "Slutsats: " +
      document.getElementById("conclusion").value
    );

    lines.push("", "FÖRDJUPNINGSFRÅGOR");

    questions.forEach((question, index) => {
      lines.push(`${index + 1}. ${question}`);
      lines.push(questionInputs[index].value);
      lines.push("");
    });

    const blob = new Blob(
      [lines.join("\n")],
      { type: "text/plain;charset=utf-8" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "grafikkortsprojekt.txt";
    link.click();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
});
