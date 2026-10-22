
"use strict";

const answer = document.getElementById("answer");
const hint = document.getElementById("hint");
const feedback = document.getElementById("feedback");

const hintBtn = document.getElementById("hintBtn");
const checkBtn = document.getElementById("checkBtn");
const resetBtn = document.getElementById("resetBtn");

const key = "itlab_felsokning";

answer.value = localStorage.getItem(key) || "";

answer.addEventListener("input", () => {
  localStorage.setItem(key, answer.value);
});

hintBtn.addEventListener("click", () => {
  hint.textContent =
    "Ledtråd: En dator med separat grafikkort " +
    "har ofta egna bildutgångar. " +
    "Vilken HDMI-port används just nu?";

  hint.classList.remove("hidden");
});

checkBtn.addEventListener("click", () => {
  const text = answer.value.toLowerCase().trim();

  if (text.length < 15) {
    feedback.textContent =
      "Skriv en lite tydligare förklaring " +
      "innan du kontrollerar svaret.";
    return;
  }

  const mentionsGraphics =
    /grafikkort|gpu|grafikport/.test(text);

  const mentionsConnection =
    /hdmi|kabel|anslut|koppla|port|utgång/.test(text);

  const mentionsMotherboard =
    /moderkort/.test(text);

  if (mentionsGraphics && mentionsConnection) {
    feedback.textContent =
      "Bra! Du har uppmärksammat grafikkortet " +
      "och bildanslutningen. " +
      "Kontrollera om kabeln ska flyttas till " +
      "det separata grafikkortets bildutgång.";
  } else if (mentionsMotherboard) {
    feedback.textContent =
      "Du är på rätt spår! Fundera på " +
      "skillnaden mellan moderkortets " +
      "bildutgång och grafikkortets bildutgång.";
  } else {
    feedback.textContent =
      "Bra försök! Undersök var bildskärmens " +
      "kabel är ansluten och vilken komponent " +
      "som ska skicka bilden till skärmen.";
  }
});

resetBtn.addEventListener("click", () => {
  answer.value = "";
  feedback.textContent = "";
  hint.textContent = "";
  hint.classList.add("hidden");
  localStorage.removeItem(key);
});
