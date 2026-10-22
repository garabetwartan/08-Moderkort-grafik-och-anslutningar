
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const exercise = document.getElementById("exercise");
  const result = document.getElementById("result");

  const scenarios = [
    {
      title: "Ett okänt USB-minne",
      question: "Du hittar ett USB-minne på golvet i skolan. Vad gör du?",
      options: [
        "Ansluter det till datorn",
        "Lämnar det till en lärare eller IT-ansvarig",
        "Öppnar filerna för att hitta ägaren"
      ],
      correct: 1,
      explanation: "Okända USB-minnen kan innehålla skadlig programvara. Anslut dem inte."
    },
    {
      title: "Ladda mobilen",
      question: "Du behöver ladda mobilen på en offentlig plats. Vilket alternativ är säkrast?",
      options: [
        "Använda egen laddare i ett eluttag",
        "Godkänna alla förfrågningar om dataåtkomst",
        "Låna en okänd USB-enhet"
      ],
      correct: 0,
      explanation: "En egen laddare i ett vanligt eluttag minskar riskerna med okända USB-anslutningar."
    },
    {
      title: "Extern hårddisk",
      question: "Du ska koppla in en extern hårddisk som tillhör skolan. Vad bör du göra?",
      options: [
        "Stänga av antivirusprogrammet",
        "Formatera den utan att fråga",
        "Följa skolans rutiner för externa lagringsenheter"
      ],
      correct: 2,
      explanation: "Skolans säkerhetsrutiner hjälper till att skydda datorer och information."
    },
    {
      title: "Dela filer",
      question: "Du ska flytta dokument med personuppgifter. Vad väljer du?",
      options: [
        "Ett okänt USB-minne",
        "En lösning som skolan har godkänt",
        "En öppen dator som alla kan använda"
      ],
      correct: 1,
      explanation: "Personuppgifter ska hanteras med godkända och säkra metoder."
    }
  ];

  const answers = new Array(scenarios.length).fill(null);
  const feedbackElements = [];

  scenarios.forEach((scenario, index) => {
    const card = document.createElement("article");
    card.className = "card";

    const heading = document.createElement("h2");
    heading.textContent = `${index + 1}. ${scenario.title}`;
    card.appendChild(heading);

    const question = document.createElement("p");
    question.textContent = scenario.question;
    card.appendChild(question);

    const feedback = document.createElement("div");
    feedback.className = "feedback";
    feedback.setAttribute("aria-live", "polite");

    scenario.options.forEach((option, optionIndex) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "choice";
      button.textContent = option;

      button.addEventListener("click", () => {
        answers[index] = optionIndex;

        card.querySelectorAll(".choice").forEach(b => {
          b.classList.remove("selected");
        });
        button.classList.add("selected");

        const correct = optionIndex === scenario.correct;

        feedback.textContent =
          (correct ? "✓ Rätt beslut! " : "✗ Inte det säkraste valet. ") +
          scenario.explanation;

        result.textContent = "";
      });

      card.appendChild(button);
    });

    card.appendChild(feedback);
    feedbackElements.push(feedback);
    exercise.appendChild(card);
  });

  document.getElementById("checkAnswers").addEventListener("click", () => {
    const correct = answers.filter(
      (answer, i) => answer === scenarios[i].correct
    ).length;

    const missing = answers.filter(answer => answer === null).length;

    result.textContent =
      `Du har ${correct} av ${scenarios.length} rätt.` +
      (missing ? ` Du har ${missing} obesvarade situationer.` : "");
  });

  document.getElementById("resetAnswers").addEventListener("click", () => {
    answers.fill(null);
    feedbackElements.forEach(el => el.textContent = "");
    document.querySelectorAll("#exercise .choice").forEach(button => {
      button.classList.remove("selected");
    });
    result.textContent = "";
  });
});
