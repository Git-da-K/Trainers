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
    startText: "Solve the example to find out how many stickers are needed for the rocket 🚀",
    startBtn: "Start",
    checkBtn: "Check",
    restartBtn: "Restart",
    correct: (n) => `This is how many stickers to put on the rocket 🚀: ${n}`,
    tryAgain: "Try again 😉"
  },
  pt: { // Португальский (Бразилия)
    title: "Jogo de Matemática com Emojis",
    startText: "Resolva o exercício para descobrir quantos adesivos são necessários para o foguete 🚀",
    startBtn: "Iniciar",
    checkBtn: "Verificar",
    restartBtn: "Reiniciar",
    correct: (n) => `Aqui está a quantidade de adesivos para colar no foguete 🚀: ${n}`,
    tryAgain: "Tente novamente 😉"
  },
  tr: { // Турецкий
    title: "Emoji Matematik Oyunu",
    startText: "Roket için kaç çıkartma gerektiğini öğrenmek için örneği çöz 🚀",
    startBtn: "Başla",
    checkBtn: "Kontrol Et",
    restartBtn: "Yeniden Başlat",
    correct: (n) => `Rokete yapıştırman gereken çıkartma sayısı 🚀: ${n}`,
    tryAgain: "Tekrar dene 😉"
  },
  es: { // Испанский
    title: "Juego de Matemáticas con Emojis",
    startText: "Resuelve el ejercicio para saber cuántas pegatinas necesita el cohete 🚀",
    startBtn: "Comenzar",
    checkBtn: "Comprobar",
    restartBtn: "Reiniciar",
    correct: (n) => `Estas son las pegatinas que debes poner en el cohete 🚀: ${n}`,
    tryAgain: "Inténtalo de nuevo 😉"
  },
  it: { // Итальянский
    title: "Gioco di Matematica con Emoji",
    startText: "Risolvi l'esercizio per scoprire quanti adesivi servono per il razzo 🚀",
    startBtn: "Avvia",
    checkBtn: "Verifica",
    restartBtn: "Ricomincia",
    correct: (n) => `Ecco quanti adesivi devi mettere sul razzo 🚀: ${n}`,
    tryAgain: "Riprova 😉"
  }
};

// Определяем язык
const userLang = navigator.language.slice(0,2); // например "ru", "pl", "en", "pt", "tr", "es", "it"
const lang = translations[userLang] ? userLang : "en";

// Применяем переводы на страницу
function setTexts() {
  document.getElementById("game-title").textContent = translations[lang].title;
  document.getElementById("start-text").textContent = translations[lang].startText;
  document.getElementById("start-btn").textContent = translations[lang].startBtn;
  document.getElementById("check-btn").textContent = translations[lang].checkBtn;
  document.getElementById("restart-btn").textContent = translations[lang].restartBtn;
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

    result = operator === "+"
      ? leftCount + rightCount
      : leftCount - rightCount;

  } while (result < 2 || result > 6);  // результат только 2–6

  correctAnswer = result;

  // Эмодзи слева
  for (let i = 0; i < leftCount; i++) {
    const span = document.createElement("span");
    span.className = "emoji";
    span.textContent = randomEmoji();
    leftCard.appendChild(span);
  }

  // Эмодзи справа
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

  if (value === correctAnswer) {
    document.getElementById("modal-text").textContent =
      translations[lang].correct(correctAnswer);
    document.getElementById("result-modal").classList.add("active");
  } else {
    alert(translations[lang].tryAgain);
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

// применяем переводы при загрузке
setTexts();
