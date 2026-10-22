
"use strict";

document.addEventListener("DOMContentLoaded", () => {

  const $ = id => document.getElementById(id);

  const usb = $("usb");
  const size = $("size");
  const sizeValue = $("sizeValue");
  const result = $("result");
  const exercise = $("exercise");
  const feedback = $("feedback");

  // VISA VALD FILSTORLEK
  size.addEventListener("input", () => {
    sizeValue.textContent = size.value;
    result.textContent = "";
  });

  usb.addEventListener("change", () => {
    result.textContent = "";
  });

  // BERÄKNA ÖVERFÖRINGSTID
  $("calculate").addEventListener("click", () => {

    const gb = Number(size.value);
    const speed = Number(usb.value);

    if (
      !Number.isFinite(gb) ||
      !Number.isFinite(speed) ||
      gb <= 0 ||
      speed <= 0
    ) {
      result.textContent =
        "Välj en giltig filstorlek och USB-hastighet.";
      return;
    }

    // 1 GB = 8000 Mbit
    const mbit = gb * 8000;

    // Tid = datamängd / hastighet
    const seconds = mbit / speed;

    // Omvandla till minuter och sekunder
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);

    const formattedTime =
      seconds < 60
        ? `${seconds.toFixed(1)} sekunder`
        : `${minutes} minuter och ${remainingSeconds} sekunder`;

    // Visa resultat och uträkning
    result.textContent =
      `DU ÖVERFÖR ${gb} GB\n\n` +

      `Beräknad överföringstid: ${seconds.toFixed(1)} sekunder\n` +
      `Det motsvarar ungefär ${formattedTime}.\n\n` +

      `SÅ RÄKNAR VI UT TIDEN\n\n` +

      `Steg 1 – Omvandla GB till Mbit\n` +
      `1 byte = 8 bitar.\n` +
      `1 GB = 8000 Mbit.\n` +
      `${gb} × 8000 = ${mbit} Mbit.\n\n` +

      `Steg 2 – Ta reda på hastigheten\n` +
      `USB-anslutningens hastighet är ${speed} Mbit/s.\n` +
      `Det betyder att upp till ${speed} megabit kan överföras per sekund.\n\n` +

      `Steg 3 – Beräkna tiden\n` +
      `Formel: Tid = Filstorlek ÷ Hastighet\n` +
      `${mbit} ÷ ${speed} = ${seconds.toFixed(1)} sekunder.\n\n` +

      `VIKTIGT ATT VETA\n` +
      `Detta är en teoretisk beräkning.\n` +
      `I verkligheten kan överföringen ta längre tid eftersom ` +
      `USB-enheten, datorn och andra begränsningar påverkar hastigheten.`;
  });

  // FRÅGOR
  const questions = [
    {
      question: "Vilken anslutning kan användas för ett USB-minne?",
      options: [
        "HDMI",
        "USB-A eller USB-C",
        "RJ-45"
      ],
      correct: 1,
      explanation:
        "USB-minnen ansluts vanligtvis via USB-A eller USB-C."
    },
    {
      question:
        "Vad händer vanligtvis när du väljer en USB-anslutning med högre överföringshastighet?",
      options: [
        "Filer kan överföras snabbare",
        "Filerna blir automatiskt mindre",
        "Datorn får mer RAM"
      ],
      correct: 0,
      explanation:
        "Högre hastighet kan minska överföringstiden om övrig utrustning stöder hastigheten."
    },
    {
      question:
        "Du ska kopiera en stor videofil. Vad är viktigast att kontrollera?",
      options: [
        "Skärmens ljusstyrka",
        "Musens känslighet",
        "USB-anslutningens och lagringsenhetens hastighet"
      ],
      correct: 2,
      explanation:
        "Den långsammaste delen av överföringen kan begränsa hastigheten."
    }
  ];

  const selects = [];

  // SKAPA FRÅGORNA
  questions.forEach((q, index) => {

    const card = document.createElement("div");
    card.className = "card";

    const heading = document.createElement("h3");
    heading.textContent = `Uppgift ${index + 1}`;
    card.appendChild(heading);

    const paragraph = document.createElement("p");
    paragraph.textContent = q.question;
    card.appendChild(paragraph);

    const select = document.createElement("select");
    select.setAttribute("aria-label", q.question);

    select.add(new Option("Välj ditt svar", ""));

    q.options.forEach((option, i) => {
      select.add(new Option(option, String(i)));
    });

    card.appendChild(select);
    exercise.appendChild(card);

    selects.push(select);
  });

  // RÄTTA SVAREN
  $("checkAnswers").addEventListener("click", () => {

    let points = 0;
    const messages = [];

    questions.forEach((q, i) => {

      const answer = selects[i].value;

      if (answer === "") {
        messages.push(
          `Uppgift ${i + 1}: Välj ett svar först.`
        );
        return;
      }

      const correct = Number(answer) === q.correct;

      if (correct) {
        points++;

        messages.push(
          `Uppgift ${i + 1}: ✓ Rätt!\n` +
          q.explanation
        );

      } else {

        messages.push(
          `Uppgift ${i + 1}: ✗ Inte riktigt.\n` +
          `Ledtråd: ${q.explanation}`
        );
      }
    });

    feedback.textContent =
      `Du fick ${points} av ${questions.length} rätt.\n\n` +
      messages.join("\n\n");
  });

  // GÖR OM UPPGIFTEN
  $("resetAnswers").addEventListener("click", () => {

    selects.forEach(select => {
      select.value = "";
    });

    feedback.textContent = "";
    result.textContent = "";
  });

});
