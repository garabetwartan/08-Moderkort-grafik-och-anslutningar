
"use strict";

document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // DEL 1 – UNDERSÖK KONTAKTERNA
  // ==========================================

  const connections = [
    {
      name: "HDMI",
      answer: "Bild och ljud",
      info: "En platt kontakt som bara passar åt ett håll."
    },
    {
      name: "DVI",
      answer: "Bildsignal",
      info: "En bred kontakt med många små hål."
    },
    {
      name: "S/PDIF",
      answer: "Digitalt ljud",
      info: "Finns i olika former, bland annat optisk och elektrisk."
    },
    {
      name: "USB-C",
      answer: "USB-anslutning för data och ibland laddning eller bild",
      info: "En liten, oval kontakt som passar åt båda hållen."
    },
    {
      name: "PS/2",
      answer: "Äldre tangentbord och möss",
      info: "En rund kontakt som ofta är grön eller lila."
    },
    {
      name: "SATA",
      answer: "Intern lagring",
      info: "En smal kontakt som är formad som ett L."
    },
    {
      name: "PCI Express x16",
      answer: "Expansionskort, ofta grafikkort",
      info: "En lång plats på moderkortet där man kan sätta in en komponent."
    },
    {
      name: "AUX (3,5 mm)",
      answer: "Analogt ljud",
      info: "En liten, rund kontakt med en metallspets."
    },
    {
      name: "Thunderbolt",
      answer: "Snabb anslutning för data och ibland bild",
      info: "En kontakt som ofta har en blixtsymbol."
    },
    {
      name: "RJ-45",
      answer: "Ethernet-nätverk",
      info: "En rektangulär kontakt med en liten plastflärp."
    }
  ];

  // Blanda alternativen
  function shuffle(array) {
    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [result[i], result[j]] =
        [result[j], result[i]];
    }

    return result;
  }

  const container = document.getElementById("connections");

  const selects = [];
  const feedbackElements = [];

  const options = shuffle(
    [...new Set(connections.map(item => item.answer))]
  );

  connections.forEach((item, index) => {

    const wrapper = document.createElement("div");
    wrapper.style.marginBottom = "25px";

    // Namn på anslutningen
    const label = document.createElement("label");
    label.htmlFor = `connection${index}`;
    label.textContent = `${index + 1}. ${item.name}`;

    // Enkel förklaring
    const info = document.createElement("p");
    info.textContent = item.info;

    info.style.color = "#61708a";
    info.style.fontSize = "0.95rem";
    info.style.margin = "5px 0 10px";

    // Rullista
    const select = document.createElement("select");
    select.id = `connection${index}`;

    select.add(
      new Option("Välj användningsområde...", "")
    );

    options.forEach(option => {
      select.add(new Option(option, option));
    });

    // Feedback för varje fråga
    const feedback = document.createElement("div");
    feedback.className = "feedback";

    wrapper.append(
      label,
      info,
      select,
      feedback
    );

    container.appendChild(wrapper);

    selects.push(select);
    feedbackElements.push(feedback);
  });

  // Rätta svaren
  document.getElementById("checkConnections")
    .addEventListener("click", () => {

      let correct = 0;
      let unanswered = 0;

      connections.forEach((item, index) => {

        const selected = selects[index].value;
        const feedback = feedbackElements[index];

        if (selected === "") {
          unanswered++;

          feedback.textContent =
            "Välj ett alternativ först.";

          return;
        }

        if (selected === item.answer) {

          correct++;

          feedback.textContent = "✓ Rätt svar!";

        } else {

          feedback.textContent =
            "✗ Inte riktigt. Försök igen!";

        }

      });

      const result =
        document.getElementById("connectionResult");

      result.textContent =
        `Du fick ${correct} av ${connections.length} rätt.` +
        (unanswered > 0
          ? ` Du har ${unanswered} obesvarade frågor.`
          : "") +
        (correct === connections.length
          ? "\nBra jobbat! Du har identifierat alla anslutningar."
          : "\nFörsök igen på de frågor som blev fel.");

    });

  // Gör om
  document.getElementById("resetConnections")
    .addEventListener("click", () => {

      selects.forEach(select => {
        select.value = "";
      });

      feedbackElements.forEach(feedback => {
        feedback.textContent = "";
      });

      document.getElementById("connectionResult")
        .textContent = "";

    });


  // ==========================================
  // DEL 2 – MODERKORTETS EGENSKAPER
  // ==========================================

  document.getElementById("showHints")
    .addEventListener("click", () => {

      const hints = document.getElementById("hints");

      hints.textContent =
        "1. ATX och micro-ATX\n\n" +
        "ATX är ett större moderkort än micro-ATX.\n" +
        "ATX har ofta fler platser för extra komponenter.\n" +
        "Micro-ATX är mindre och passar i mindre datorlådor.\n\n" +

        "2. Chipset\n\n" +
        "Chipset är kretsar på moderkortet.\n" +
        "De hjälper datorns olika delar att kommunicera.\n" +
        "Chipset hanterar bland annat vissa USB-, SATA- och PCIe-anslutningar.";

    });


  // ==========================================
  // DEL 3 – BYGG FÖR 6 000 KR
  // ==========================================

  const parts = [
    "Moderkort",
    "Processor",
    "RAM-minne 16 GB"
  ];

  const budgetContainer =
    document.getElementById("budget");

  const priceInputs = [];
  const nameInputs = [];

  parts.forEach((part, index) => {

    const wrapper = document.createElement("div");
    wrapper.className = "card";

    const title = document.createElement("h3");
    title.textContent = `${index + 1}. ${part}`;

    // Modell
    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Tillverkare och modell";
    nameLabel.htmlFor = `partName${index}`;

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.id = `partName${index}`;

    nameInput.placeholder =
      "Skriv tillverkare och modell";

    // Pris
    const priceLabel = document.createElement("label");
    priceLabel.textContent = "Pris i kronor";
    priceLabel.htmlFor = `partPrice${index}`;

    const priceInput = document.createElement("input");
    priceInput.type = "number";
    priceInput.id = `partPrice${index}`;

    priceInput.min = "0";
    priceInput.step = "1";
    priceInput.placeholder = "Ange pris";

    wrapper.append(
      title,
      nameLabel,
      nameInput,
      priceLabel,
      priceInput
    );

    budgetContainer.appendChild(wrapper);

    nameInputs.push(nameInput);
    priceInputs.push(priceInput);

  });


  // Beräkna budget
  document.getElementById("calculate")
    .addEventListener("click", () => {

      const result =
        document.getElementById("budgetResult");

      const validPrices = priceInputs.every(input =>
        input.value.trim() !== "" &&
        Number.isFinite(Number(input.value)) &&
        Number(input.value) >= 0
      );

      const validNames = nameInputs.every(input =>
        input.value.trim() !== ""
      );

      if (!validNames) {
        result.textContent =
          "Fyll i tillverkare och modell för alla tre komponenterna.";
        return;
      }

      if (!validPrices) {
        result.textContent =
          "Fyll i giltiga priser för alla tre komponenterna.";
        return;
      }

      const total = priceInputs.reduce(
        (sum, input) => sum + Number(input.value),
        0
      );

      const budget = 6000;
      const difference = budget - total;

      let message =
        `Totalsumma: ${total.toLocaleString("sv-SE")} kr.\n\n`;

      if (difference > 0) {

        message +=
          `Du har ${difference.toLocaleString("sv-SE")} kr kvar till 6 000 kr.`;

      } else if (difference === 0) {

        message +=
          "Du har använt exakt 6 000 kr!";

      } else {

        message +=
          `Du ligger ${Math.abs(difference).toLocaleString("sv-SE")} kr över budgeten.`;

      }

      message +=
        "\n\nKom ihåg att kontrollera att processorn passar moderkortets sockel och att RAM-minnet har rätt typ, exempelvis DDR4 eller DDR5.";

      result.textContent = message;

    });


  // ==========================================
  // DEL 4 – AVSLUTANDE KONTROLL
  // ==========================================

  const checklistItems = [
    "Jag har undersökt de tio kontakterna.",
    "Jag kan förklara skillnaden mellan ATX och micro-ATX.",
    "Jag kan förklara vad chipset är.",
    "Jag har valt ett moderkort.",
    "Jag har valt en kompatibel processor.",
    "Jag har valt rätt typ av RAM-minne.",
    "Jag har jämfört priser och valt mina komponenter."
  ];

  const checklist =
    document.getElementById("checklist");

  const checkboxes = [];

  checklistItems.forEach((text, index) => {

    const label = document.createElement("label");

    label.style.display = "flex";
    label.style.alignItems = "center";
    label.style.gap = "10px";
    label.style.marginBottom = "15px";

    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.id = `check${index}`;

    checkbox.style.width = "auto";
    checkbox.style.margin = "0";

    const span = document.createElement("span");
    span.textContent = text;

    label.append(checkbox, span);

    checklist.appendChild(label);

    checkboxes.push(checkbox);

    checkbox.addEventListener("change", updateProgress);

  });


  function updateProgress() {

    const completed =
      checkboxes.filter(checkbox => checkbox.checked).length;

    document.getElementById("progressText")
      .textContent =
      `${completed} av ${checkboxes.length} delar klara.`;

  }

  updateProgress();

});
