
"use strict";

// Unik lagringsnyckel för denna uppgift
const STORAGE_KEY = "itlab08_moderkort_v2";

// De åtta komponenterna
const components = [
  {
    id: 1,
    name: "Processorsockel",
    x: 275,
    y: 180,
    description: "Här monteras processorn."
  },
  {
    id: 2,
    name: "RAM-platser",
    x: 425,
    y: 180,
    description: "Här monteras arbetsminnet."
  },
  {
    id: 3,
    name: "PCIe x16",
    x: 335,
    y: 318,
    description: "Här ansluts ofta ett dedikerat grafikkort."
  },
  {
    id: 4,
    name: "M.2-plats",
    x: 395,
    y: 372,
    description: "Här kan en kompatibel M.2-SSD monteras."
  },
  {
    id: 5,
    name: "SATA-anslutningar",
    x: 580,
    y: 345,
    description: "Används för kompatibla lagringsenheter."
  },
  {
    id: 6,
    name: "24-pins strömanslutning",
    x: 592,
    y: 178,
    description: "Förser moderkortet med huvudström."
  },
  {
    id: 7,
    name: "CPU-strömanslutning",
    x: 205,
    y: 68,
    description: "Ansluter separat ström till processorn."
  },
  {
    id: 8,
    name: "Bakre anslutningar",
    x: 128,
    y: 180,
    description: "Här ansluts externa enheter."
  }
];

// HTML-element
const hotspots = document.getElementById("hotspots");
const questionPanel = document.getElementById("questionPanel");
const questionTitle = document.getElementById("questionTitle");
const answerOptions = document.getElementById("answerOptions");
const answerFeedback = document.getElementById("answerFeedback");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const completionMessage = document.getElementById("completionMessage");
const resetButton = document.getElementById("resetMotherboard");

// Sparade framsteg
let completed = [];

// Läs tidigare framsteg
try {
  const saved = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
  );

  if (Array.isArray(saved)) {
    completed = saved.filter(id =>
      components.some(component => component.id === id)
    );
  }
} catch (error) {
  console.warn("Kunde inte läsa sparade svar.", error);
}

// Spara framsteg
function saveProgress() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(completed)
    );
  } catch (error) {
    console.warn("Kunde inte spara framsteg.", error);
  }
}

// Uppdatera resultat
function updateProgress() {
  const count = completed.length;

  progressText.textContent =
    `Identifierade: ${count} / ${components.length}`;

  progressBar.value = count;

  if (count === components.length) {
    completionMessage.textContent =
      "✓ Bra jobbat! Du har identifierat alla åtta delar.";
  } else {
    completionMessage.textContent = "";
  }
}

// Rita de numrerade punkterna
function renderHotspots() {
  hotspots.replaceChildren();

  components.forEach(component => {
    const isDone = completed.includes(component.id);

    const group = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );

    group.setAttribute("role", "button");
    group.setAttribute("tabindex", "0");
    group.setAttribute(
      "aria-label",
      `Punkt ${component.id}` +
      (isDone ? ", identifierad" : "")
    );
    group.style.cursor = "pointer";

    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );

    circle.setAttribute("cx", component.x);
    circle.setAttribute("cy", component.y);
    circle.setAttribute("r", "17");
    circle.setAttribute(
      "fill",
      isDone ? "#16a085" : "#8378d8"
    );
    circle.setAttribute("stroke", "white");
    circle.setAttribute("stroke-width", "3");

    const number = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );

    number.setAttribute("x", component.x);
    number.setAttribute("y", component.y + 6);
    number.setAttribute("text-anchor", "middle");
    number.setAttribute("font-size", "18");
    number.setAttribute("font-weight", "bold");
    number.setAttribute("fill", "white");
    number.textContent = component.id;

    group.appendChild(circle);
    group.appendChild(number);

    group.addEventListener("click", () => {
      openQuestion(component);
    });

    group.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openQuestion(component);
      }
    });

    hotspots.appendChild(group);
  });
}

// Öppna fråga
function openQuestion(component) {
  questionPanel.hidden = false;
  answerOptions.replaceChildren();
  answerFeedback.textContent = "";

  questionTitle.textContent =
    `Punkt ${component.id}`;

  if (completed.includes(component.id)) {
    answerFeedback.textContent =
      `✓ Redan identifierad: ${component.name}. ` +
      component.description;
    return;
  }

  // Rätt svar + tre felaktiga alternativ
  const wrongAnswers = components
    .filter(item => item.id !== component.id)
    .map(item => item.name)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const answers = [
    component.name,
    ...wrongAnswers
  ].sort(() => Math.random() - 0.5);

  answers.forEach(answer => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "option";
    button.textContent = answer;

    button.addEventListener("click", () => {
      checkAnswer(component, answer);
    });

    answerOptions.appendChild(button);
  });
}

// Kontrollera elevens svar
function checkAnswer(component, answer) {
  if (completed.includes(component.id)) {
    return;
  }

  if (answer === component.name) {
    completed.push(component.id);

    saveProgress();
    updateProgress();
    renderHotspots();

    answerFeedback.textContent =
      "✓ Rätt! " + component.description;

    // Ta bort svarsalternativen
    answerOptions.replaceChildren();

  } else {
    answerFeedback.textContent =
      "Inte riktigt. Försök igen!";

    // Eleven kan försöka igen
  }
}

// Gör om uppgiften
function resetExercise() {
  const confirmed = confirm(
    "Vill du börja om Moderkortsdetektiven? " +
    "Alla åtta identifieringar återställs."
  );

  if (!confirmed) return;

  // Radera endast denna uppgifts framsteg
  completed = [];

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn("Kunde inte radera framsteg.", error);
  }

  questionPanel.hidden = true;
  answerOptions.replaceChildren();
  answerFeedback.textContent = "";
  completionMessage.textContent = "";

  updateProgress();
  renderHotspots();
}

// Koppla återställningsknappen
resetButton.addEventListener("click", resetExercise);

// Starta övningen
updateProgress();
renderHotspots();
