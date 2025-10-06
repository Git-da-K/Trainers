let correctAnswer = 0;

// Словарь переводов
const translations = {
  ru: {
    title: "Emoji Math Game",
    startText: "Реши пример, чтобы узнать, сколько стикеров нужно для ракеты 🚀",
    startBtn: "Старт",
    checkBtn: "Проверить",
    restartBtn: "Рестарт",
    correct: (n) => `Вот сколько стикеров нужно наклеить на ракету 🚀: ${n}`,
    tryAgain: "Попробуй ещё раз 😉"
  },
  pl: {
    title: "Gra matematyczna z emotikonami",
    startText: "Rozwiąż zadanie, aby dowiedzieć się, ile naklejek potrzeba na rakietę 🚀",
    startBtn: "Start",
    checkBtn: "Sprawdź",
    restartBtn: "Restart",
    correct: (n) => `Tyle naklejek trzeba przykleić na rakietę 🚀: ${n}`,
    tryAgain: "Spróbuj ponownie 😉"
  },
  en: {
    title: "Emoji Math Game",
    startText: "Solve the problem to find out how many stickers are needed for the rocket 🚀",
    startBtn: "Start",
    checkBtn: "Check",
    restartBtn: "Restart",
    correct: (n) => `This is how many stickers to put on the rocket 🚀: ${n}`,
    tryAgain: "Try again 😉"
  },
  pt: {
    title: "Jogo de Matemática com Emojis",
    startText: "Resolva o exercício para descobrir quantos adesivos são necessários para o foguete 🚀",
    startBtn: "Iniciar",
    checkBtn: "Verificar",
    restartBtn: "Reiniciar",
    correct: (n) => `Aqui está a quantidade de adesivos para colar no foguete 🚀: ${n}`,
    tryAgain: "Tente novamente 😉"
  },
  tr: {
    title: "Emoji Matematik Oyunu",
    startText: "Roket için kaç çıkartma gerektiğini öğrenmek için örneği çöz 🚀",
    startBtn: "Başla",
    checkBtn: "Kontrol Et",
    restartBtn: "Yeniden Başlat",
    correct: (n) => `Rokete yapıştırman gereken çıkartma sayısı 🚀: ${n}`,
    tryAgain: "Tekrar dene 😉"
  },
  es: {
    title: "Juego de Matemáticas con Emojis",
    startText: "Resuelve el ejercicio para saber cuántas pegatinas necesita el cohete 🚀",
    startBtn: "Comenzar",
    checkBtn: "Comprobar",
    restartBtn: "Reiniciar",
    correct: (n) => `Estas son las pegatinas que debes poner en el cohete 🚀: ${n}`,
    tryAgain: "Inténtalo de nuevo 😉"
  },
  it: {
    title: "Gioco di Matematica con Emoji",
    startText: "Risolvi l'esercizio per scoprire quanti adesivi servono per il razzo 🚀",
    startBtn: "Avvia",
    checkBtn: "Verifica",
    restartBtn: "Ricomincia",
    correct: (n) => `Ecco quanti adesivi devi mettere sul razzo 🚀: ${n}`,
    tryAgain: "Riprova 😉"
  }
};

// Определяем язык: берём системный (первые 2 буквы) или EN по умолчанию
const systemLang = navigator.language.slice(0, 2).toLowerCase();
const lang = translations.hasOwnProperty(systemLang) ? systemLang : "en";

// Применяем переводы
function setTexts() {
  const t = translations[lang];

  const title = document.getElementById("game-title");
  const startText = document.getElementById("start-text");
  const startBtn = document.getElementById("start-btn");
  const checkBtn = document.getElementById("check-btn");
  const restartBtn = document.getElementById("restart-btn");

  if (title) title.textContent = t.title;
  if (startText) startText.textContent = t.startText;
  if (startBtn) startBtn.textContent = t.startBtn;
  if (checkBtn) checkBtn.textContent = t.checkBtn;
  if (restartBtn) restartBtn.textContent = t.restartBtn;
}

const emojis = ["🍎","🍌","🍒","🍇","🍉","🍓","🥕","🌸","⭐","⚽"];

function randomEmoji() {
  return emojis[Math.floor(Math.random() * emojis.length)];
}

function generateNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateGame() {
  const leftCard = document.getElementById("left");
  const rightCard = document.getElementById("right");
  const operatorEl = document.getElementById("operator");

  leftCard.innerHTML = "";
  rightCard.innerHTML = "";

  let leftCount, rightCount, operator, result;

  do {
    leftCount = generateNumber(1, 5);
    rightCount = generateNumber(1, 5);
    operator = Math.random() < 0.5 ? "+" : "-";
    result = operator === "+" ? leftCount + rightCount : leftCount - rightCount;
  } while (result < 2 || result > 6);

  correctAnswer = result;

  for (let i = 0; i < leftCount; i++) {
    const span = document.createElement("span");
    span.className = "emoji";
    span.textContent = randomEmoji();
    leftCard.appendChild(span);
  }

  for (let i = 0; i < rightCount; i++) {
    const span = document.createElement("span");
    span.className = "emoji";
    span.textContent = randomEmoji();
    rightCard.appendChild(span);
  }

  operatorEl.textContent = operator;
}

function checkAnswer() {
  const input = document.getElementById("answer");
  const value = Number(input.value);
  const t = translations[lang];

  if (value === correctAnswer) {
    document.getElementById("modal-text").textContent = t.correct(correctAnswer);
    document.getElementById("result-modal").classList.add("active");
  } else {
    alert(t.tryAgain);
  }
}

function restartGame() {
  document.getElementById("result-modal").classList.remove("active");
  document.getElementById("answer").value = "";
  generateGame();
}

function startGame() {
  document.getElementById("start-screen").classList.remove("active");
  generateGame();
}

// Применяем переводы при загрузке страницы
setTexts();

function closeApp() {
  document.body.innerHTML = "<h2 style='text-align:center; margin-top:40px;'>🚀</h2>";
}
