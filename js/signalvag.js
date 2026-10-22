
"use strict";

document.getElementById("pageTitle").textContent =
  "Datorns signalväg";
document.getElementById("pageIntro").textContent =
  "Förstå hur datorns komponenter samverkar.";
document.getElementById("instructions").textContent =
  "Läs varje scenario och placera stegen i rätt ordning. Välj ett steg på varje rad. Varje steg ska användas en gång per scenario.";

const scenarios = [
  {
    title: "Scenario 1 – Du skriver en bokstav",
    description:
      "Du trycker på bokstaven A på tangentbordet. Hur kommer bokstaven fram på skärmen?",
    steps: [
      "Tangentbordet registrerar knapptryckningen.",
      "Indata skickas till datorn via USB.",
      "Operativsystemet och programmet behandlar indata med hjälp av processorn och arbetsminnet.",
      "Grafiksystemet förbereder bilden som ska visas.",
      "Skärmen visar bokstaven A."
    ]
  },
  {
    title: "Scenario 2 – Du öppnar en fil",
    description:
      "Du dubbelklickar på en sparad bildfil. Vad händer i en förenklad beskrivning?",
    steps: [
      "Du dubbelklickar på filen.",
      "Operativsystemet tar emot begäran och startar eller aktiverar rätt program.",
      "Filens data läses från SSD:n till arbetsminnet.",
      "Processorn och programmet behandlar bildfilens data.",
      "Grafiksystemet skickar den färdiga bilden till skärmen."
    ]
  }
];

const exercise = document.getElementById("exercise");
const answers = [];

scenarios.forEach((scenario, scenarioIndex) => {
  const card = document.createElement("article");
  card.className = "card";

  const heading = document.createElement("h2");
  heading.textContent = scenario.title;
  card.appendChild(heading);

  const description = document.createElement("p");
  description.textContent = scenario.description;
  card.appendChild(description);

  const selects = [];

  // Alternativen visas i blandad ordning.
  const order = scenarioIndex === 0
    ? [3, 0, 4, 1, 2]
    : [2, 4, 0, 3, 1];

  scenario.steps.forEach((_, position) => {
    const label = document.createElement("label");
    label.textContent = `Steg ${position + 1}`;
    label.htmlFor = `step${scenarioIndex}_${position}`;
    card.appendChild(label);

    const select = document.createElement("select");
    select.id = `step${scenarioIndex}_${position}`;

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Välj vad som händer...";
    select.appendChild(placeholder);

    order.forEach(stepIndex => {
      const option = document.createElement("option");
      option.value = String(stepIndex);
      option.textContent = scenario.steps[stepIndex];
      select.appendChild(option);
    });

    selects.push(select);
    card.appendChild(select);
  });

  const feedback = document.createElement("div");
  feedback.className = "feedback";
  card.appendChild(feedback);

  answers.push({ selects, feedback });
  exercise.appendChild(card);
});

document.getElementById("checkAnswers").addEventListener("click", () => {
  let totalCorrect = 0;
  let totalSteps = 0;

  scenarios.forEach((scenario, scenarioIndex) => {
    const answer = answers[scenarioIndex];
    const selected = answer.selects.map(select => select.value);

    const correct = selected.filter(
      (value, index) => value !== "" && Number(value) === index
    ).length;

    totalCorrect += correct;
    totalSteps += scenario.steps.length;

    const unique = selected.filter(value => value !== "");
    const hasDuplicates = new Set(unique).size !== unique.length;

    let message =
      `${correct} av ${scenario.steps.length} steg i rätt position.`;

    if (hasDuplicates) {
      message += "\nDu har använt samma steg flera gånger.";
    }

    if (correct === scenario.steps.length && !hasDuplicates) {
      message += "\n✓ Hela signalvägen är rätt!";
    } else {
      message += "\nKontrollera ordningen och försök igen.";
    }

    answer.feedback.textContent = message;
  });

  document.getElementById("result").textContent =
    `${totalCorrect} av ${totalSteps} steg i rätt position.`;

  try {
    localStorage.setItem("itlab_signalvag", JSON.stringify(
      answers.map(a => a.selects.map(select => select.value))
    ));
  } catch {}
});

document.getElementById("resetAnswers").addEventListener("click", () => {
  answers.forEach(answer => {
    answer.selects.forEach(select => select.value = "");
    answer.feedback.textContent = "";
  });

  document.getElementById("result").textContent = "";

  try {
    localStorage.removeItem("itlab_signalvag");
  } catch {}
});
