let correctAnswer = 0;

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

  } while (result < 2 || result > 6);  // теперь только 2–6

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
      `Вот сколько стикеров нужно наклеить на ракету 🚀: ${correctAnswer}`;
    document.getElementById("result-modal").classList.add("active");
  } else {
    alert("Попробуй ещё раз 😉");
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
