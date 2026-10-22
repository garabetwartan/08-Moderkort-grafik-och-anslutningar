
"use strict";

const watts = document.getElementById("watts");
const hours = document.getElementById("hours");
const price = document.getElementById("price");
const result = document.getElementById("result");

document.getElementById("calculate").onclick = () => {
  const w = Number(watts.value);
  const h = Number(hours.value);
  const p = Number(price.value);

  if (
    watts.value === "" || hours.value === "" || price.value === "" ||
    !Number.isFinite(w) || !Number.isFinite(h) || !Number.isFinite(p) ||
    w <= 0 || w > 2000 || h < 0 || h > 24 || p < 0 || p > 20
  ) {
    result.textContent = "Ange giltiga värden i samtliga fält.";
    return;
  }

  const yearly = w * h * 365 / 1000;
  const cost = yearly * p;

  result.textContent =
    `Energianvändning per år: ${yearly.toFixed(1)} kWh\n` +
    `Beräknad elkostnad: ${cost.toFixed(0)} kr/år\n\n` +
    "Beräkningen antar samma effekt och användningstid varje dag. Den inkluderar inte tillverkning eller återvinning.";
};

const tasks = [
  {
    question: "En dator använder 100 W i 5 timmar. Hur många kWh är det?",
    options: ["0,5 kWh", "5 kWh", "50 kWh"],
    correct: 0,
    reason: "100 × 5 / 1000 = 0,5 kWh."
  },
  {
    question: "Vilken åtgärd kan minska datorns elanvändning?",
    options: ["Höja skärmens ljusstyrka", "Använda viloläge", "Låta datorn arbeta i onödan"],
    correct: 1,
    reason: "Viloläge kan minska energianvändningen när datorn inte används."
  },
  {
    question: "Vad är viktigt vid hållbar uppgradering?",
    options: ["Alltid köpa helt ny dator", "Undersöka om befintlig utrustning kan uppgraderas", "Alltid välja högst effekt"],
    correct: 1,
    reason: "Att förlänga livslängden kan minska behovet av nytillverkning."
  }
];

const exercise = document.getElementById("exercise");
const selects = [];

tasks.forEach((task, i) => {
  const label = document.createElement("label");
  label.htmlFor = `q${i}`;
  label.textContent = `${i + 1}. ${task.question}`;
  exercise.appendChild(label);

  const select = document.createElement("select");
  select.id = `q${i}`;
  select.add(new Option("Välj...", ""));

  task.options.forEach((option, index) => {
    select.add(new Option(option, String(index)));
  });

  exercise.appendChild(select);
  selects.push(select);
});

document.getElementById("checkAnswers").onclick = () => {
  let correct = 0;
  const messages = [];

  tasks.forEach((task, i) => {
    const right = selects[i].value !== "" &&
      Number(selects[i].value) === task.correct;

    if (right) correct++;
    messages.push(`${i + 1}. ${right ? "✓ Rätt" : "Inte rätt"} – ${task.reason}`);
  });

  document.getElementById("feedback").textContent =
    `${correct} av ${tasks.length} rätt.\n${messages.join("\n")}`;
};

document.getElementById("resetAnswers").onclick = () => {
  selects.forEach(s => s.value = "");
  document.getElementById("feedback").textContent = "";
};
