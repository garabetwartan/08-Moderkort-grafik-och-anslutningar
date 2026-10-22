
"use strict";

// Komponenter som eleverna kan välja
const items = [
  ["Användning", [
    "Kontor",
    "Spel",
    "Programmering och media"
  ]],
  ["Processor", [
    "AMD Ryzen 5 7600 (AM5)",
    "Intel Core i5-12400 (LGA1700)"
  ]],
  ["Moderkort", [
    "AM5 / DDR5 / M.2 NVMe / SATA / HDMI",
    "LGA1700 / DDR4 / M.2 NVMe / SATA / HDMI"
  ]],
  ["Arbetsminne", [
    "16 GB DDR4",
    "16 GB DDR5",
    "32 GB DDR5"
  ]],
  ["Grafik", [
    "Integrerad grafik",
    "Dedikerat grafikkort"
  ]],
  ["Lagring", [
    "NVMe M.2 SSD",
    "SATA SSD"
  ]],
  ["Bildskärm", [
    "HDMI",
    "DisplayPort"
  ]]
];

// Hämta HTML-element
const builder = document.getElementById("builder");
const checkButton = document.getElementById("check");
const result = document.getElementById("result");

if (!builder || !checkButton || !result) {
  console.error("HTML-element för datorbyggaren saknas.");
} else {

  const selects = [];

  // Skapa val för varje komponent
  items.forEach(([labelText, options], index) => {

    const wrapper = document.createElement("div");
    wrapper.className = "card";
    wrapper.style.marginBottom = "15px";

    const label = document.createElement("label");
    label.textContent = `${index + 1}. ${labelText}`;

    const select = document.createElement("select");

    // Tomt alternativ
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Välj ett alternativ...";
    select.appendChild(placeholder);

    options.forEach(optionText => {
      const option = document.createElement("option");
      option.value = optionText;
      option.textContent = optionText;
      select.appendChild(option);
    });

    wrapper.appendChild(label);
    wrapper.appendChild(select);
    builder.appendChild(wrapper);

    selects.push(select);

    // Spara elevens val
    select.addEventListener("change", () => {
      try {
        localStorage.setItem(
          "itlab08_dator_val_" + index,
          select.value
        );
      } catch (error) {
        console.warn("Valet kunde inte sparas.", error);
      }
    });

    // Återställ tidigare val
    try {
      const saved = localStorage.getItem(
        "itlab08_dator_val_" + index
      );

      if (saved && options.includes(saved)) {
        select.value = saved;
      }
    } catch (error) {
      console.warn("Sparade val kunde inte läsas.", error);
    }
  });

  // Kontrollera datorn
  checkButton.addEventListener("click", () => {

    const values = selects.map(select => select.value);

    // Kontrollera att alla val är gjorda
    if (values.some(value => value === "")) {
      result.textContent =
        "Du måste välja alla komponenter innan du kontrollerar datorn.";
      return;
    }

    const [
      usage,
      cpu,
      motherboard,
      ram,
      graphics,
      storage,
      monitor
    ] = values;

    const errors = [];
    const recommendations = [];

    // 1. CPU och moderkort
    if (
      cpu.includes("AMD") &&
      !motherboard.startsWith("AM5")
    ) {
      errors.push(
        "Processorn använder AM5 men moderkortet har en annan sockel."
      );
    }

    if (
      cpu.includes("Intel") &&
      !motherboard.startsWith("LGA1700")
    ) {
      errors.push(
        "Processorn använder LGA1700 men moderkortet har en annan sockel."
      );
    }

    // 2. RAM och moderkort
    if (
      motherboard.includes("DDR5") &&
      !ram.includes("DDR5")
    ) {
      errors.push(
        "Moderkortet stöder DDR5 men du har valt DDR4."
      );
    }

    if (
      motherboard.includes("DDR4") &&
      !ram.includes("DDR4")
    ) {
      errors.push(
        "Moderkortet stöder DDR4 men du har valt DDR5."
      );
    }

    // 3. Lagring
    if (
      storage === "NVMe M.2 SSD" &&
      !motherboard.includes("M.2 NVMe")
    ) {
      errors.push(
        "Moderkortet saknar stöd för vald NVMe-SSD."
      );
    }

    if (
      storage === "SATA SSD" &&
      !motherboard.includes("SATA")
    ) {
      errors.push(
        "Moderkortet saknar SATA-anslutning."
      );
    }

    // 4. Grafik för spel
    if (
      usage === "Spel" &&
      graphics === "Integrerad grafik"
    ) {
      recommendations.push(
        "För moderna krävande spel rekommenderas ofta ett dedikerat grafikkort."
      );
    }

    // 5. RAM för mediearbete
    if (
      usage === "Programmering och media" &&
      ram.startsWith("16")
    ) {
      recommendations.push(
        "32 GB RAM kan vara lämpligare vid tung videoredigering och 3D-arbete."
      );
    }

    // 6. Bildanslutning
    if (
      monitor === "DisplayPort" &&
      graphics === "Integrerad grafik"
    ) {
      errors.push(
        "Moderkortet har endast HDMI i denna övning. " +
        "Du har valt DisplayPort utan ett dedikerat grafikkort."
      );
    }

    if (
      monitor === "DisplayPort" &&
      graphics === "Dedikerat grafikkort"
    ) {
      recommendations.push(
        "Kontrollera att det dedikerade grafikkortet har DisplayPort."
      );
    }

    // Visa resultat
    let message = "";

    if (errors.length === 0) {
      message += "✓ Inga kompatibilitetsfel upptäcktes.\n\n";
    } else {
      message += "Kompatibilitetsproblem:\n";

      errors.forEach(error => {
        message += "• " + error + "\n";
      });

      message += "\n";
    }

    if (recommendations.length > 0) {
      message += "Rekommendationer:\n";

      recommendations.forEach(recommendation => {
        message += "• " + recommendation + "\n";
      });
    }

    if (errors.length === 0 && recommendations.length === 0) {
      message += "Bra jobbat! Dina val fungerar i övningens kontroller.";
    }

    result.textContent = message;
    result.style.whiteSpace = "pre-line";

    // Spara resultat
    try {
      localStorage.setItem(
        "itlab08_dator_kontroll",
        JSON.stringify({
          val: values,
          kompatibilitetsfel: errors,
          rekommendationer: recommendations
        })
      );
    } catch (error) {
      console.warn("Resultatet kunde inte sparas.", error);
    }
  });
}
