
"use strict";

const components = [
  {
    name: "Processor",
    description: "Processorn utför instruktioner och behandlar data. Den kommunicerar med RAM och andra delar genom processorns och moderkortets anslutningar.",
    question: "Vad är processorns huvudsakliga uppgift?",
    options: ["Lagra filer permanent", "Utföra instruktioner", "Visa bilden direkt på skärmen"],
    correct: 1
  },
  {
    name: "RAM",
    description: "RAM är arbetsminnet där data och instruktioner som används för tillfället kan lagras. Processorn har snabb åtkomst till arbetsminnet.",
    question: "Varför används RAM?",
    options: ["För tillfällig arbetsdata", "För att ansluta bildskärmen", "För att ersätta moderkortet"],
    correct: 0
  },
  {
    name: "SSD",
    description: "SSD lagrar data beständigt. En NVMe-SSD kommunicerar vanligtvis via PCIe och kan överföra data till arbetsminnet.",
    question: "Vilket påstående stämmer om en NVMe-SSD?",
    options: ["Den använder alltid SATA", "Den kommunicerar vanligtvis via PCIe", "Den fungerar som en bildskärm"],
    correct: 1
  },
  {
    name: "Grafik",
    description: "Grafikprocessorn bearbetar grafikdata. Den kan vara integrerad eller sitta på ett separat grafikkort. Resultatet skickas till bildskärmen.",
    question: "Vad gör grafikprocessorn?",
    options: ["Bearbetar grafik", "Lagrar operativsystemet permanent", "Tillhandahåller nätverksadresser"],
    correct: 0
  }
];

const diagram = document.getElementById("diagram");
const details = document.getElementById("details");
const exercise = document.getElementById("exercise");
const selections = [];

const visual = document.createElement("div");
visual.className = "component-grid";
diagram.appendChild(visual);

components.forEach((item, index) => {
  const button = document.createElement("button");
  button.className = "component-button";
  button.textContent = item.name;
  button.addEventListener("click", () => {
    document.querySelectorAll(".component-button").forEach(b => {
      b.classList.remove("selected");
    });
    button.classList.add("selected");
    details.textContent = item.description;
  });
  visual.appendChild(button);

  const label = document.createElement("label");
  label.textContent = `${index + 1}. ${item.question}`;
  label.htmlFor = `q${index}`;
  exercise.appendChild(label);

  const select = document.createElement("select");
  select.id = `q${index}`;
  select.add(new Option("Välj svar...", ""));

  item.options.forEach((option, i) => {
    select.add(new Option(option, String(i)));
  });

  exercise.appendChild(select);
  selections.push(select);
});

document.getElementById("checkAnswers").onclick = () => {
  let correct = 0;
  const messages = [];

  components.forEach((item, index) => {
    if (Number(selections[index].value) === item.correct &&
        selections[index].value !== "") {
      correct++;
    } else {
      messages.push(`${index + 1}: ${item.options[item.correct]}`);
    }
  });

  document.getElementById("result").textContent =
    `${correct} av ${components.length} rätt.` +
    (messages.length ? "\nRepetera:\n" + messages.join("\n") : "\n✓ Alla rätt!");
};

document.getElementById("resetAnswers").onclick = () => {
  selections.forEach(select => select.value = "");
  document.getElementById("result").textContent = "";
  details.textContent = "";
  document.querySelectorAll(".component-button").forEach(b => {
    b.classList.remove("selected");
  });
};
