
"use strict";

const rows = [
  ["Bildskärm", "HDMI / DisplayPort", "Överför bild och ofta ljud"],
  ["Tangentbord", "USB", "Skickar indata"],
  ["Nätverkskabel", "Ethernet", "Trådbundet nätverk"],
  ["Hörlurar", "3,5 mm / USB", "Överför ljud"],
  ["NVMe-SSD", "M.2 med NVMe-stöd", "Intern lagring"],
  ["SATA-SSD", "SATA", "Intern lagring"],
  ["Grafikkort", "PCIe x16", "Bearbetar grafik"],
  ["USB-minne", "USB", "Flyttbar lagring"]
];

const ports = [...new Set(rows.map(row => row[1]))];

const box = document.getElementById("matching");
const checkButton = document.getElementById("check");
const result = document.getElementById("result");

if (!box || !checkButton || !result) {
  console.error("HTML-element för matchningsuppgiften saknas.");
} else {
  const selects = [];

  rows.forEach((row, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.marginBottom = "15px";

    const title = document.createElement("h3");
    title.textContent = `${index + 1}. ${row[0]}`;

    const description = document.createElement("p");
    description.textContent = `Funktion: ${row[2]}`;
    description.className = "muted";

    const label = document.createElement("label");
    label.textContent = "Välj rätt anslutning";

    const select = document.createElement("select");

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Välj anslutning...";
    select.appendChild(placeholder);

    ports.forEach(port => {
      const option = document.createElement("option");
      option.value = port;
      option.textContent = port;
      select.appendChild(option);
    });

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(label);
    card.appendChild(select);

    box.appendChild(card);
    selects.push(select);
  });

  checkButton.addEventListener("click", () => {
    let correct = 0;
    const errors = [];

    rows.forEach((row, index) => {
      const selected = selects[index].value;

      if (selected === row[1]) {
        correct++;
      } else {
        errors.push(`${row[0]}: ${row[1]}`);
      }
    });

    let message = `${correct} av ${rows.length} rätt.`;

    if (errors.length > 0) {
      message += "\n\nKontrollera:\n" + errors.join("\n");
    } else {
      message += "\n\n✓ Alla rätt! Bra jobbat!";
    }

    result.textContent = message;
    result.style.whiteSpace = "pre-line";

    try {
      localStorage.setItem(
        "itlab08_anslutningar_resultat",
        JSON.stringify({
          ratt: correct,
          totalt: rows.length
        })
      );
    } catch (error) {
      console.warn("Resultatet kunde inte sparas.", error);
    }
  });
}
