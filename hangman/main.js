const els = {
  score: null,
  answer: null,
  choices: null,
};

let choices = [];
let word = "";
let wordMapping = [];
let choicesMapping = [];
let scoreCount = 0;
let maxScore = 8;

const init = () => {
  els.score = document.querySelector("#score");
  els.answer = document.querySelector("#answer");
  els.choices = document.querySelector("#choices");
  if (!els.score || !els.answer || !els.choices) {
    return;
  }
  const categorySelect = document.querySelector("#category");
  const startGameButton = document.querySelector("#start-game");
  if (!categorySelect || !startGameButton) {
    return;
  }
  startGameButton.addEventListener("click", () => {
    const selectedCategory = categorySelect.value;
    startGame(selectedCategory);
  });
};

const startGame = (category) => {
  document.getElementById("category-selection").style.display = "none";
  document.getElementById("wrapper").style.display = "flex";
  word = pickWord(category);
  wordMapping = getWordMapping(word);
  choices = generateChoices();
  choicesMapping = getChoicesMapping(choices);
  displayWord(wordMapping);
  displayChoices(choicesMapping);
  displayScore();
  els.choices.addEventListener("click", ({ target }) => {
    if (target.matches("li")) {
      checkLetter(target.innerHTML);
    }
  });

  document.addEventListener("keydown", ({ keyCode }) => {
    const letter = String.fromCharCode(keyCode);
    if (keyCode >= 65 && keyCode <= 90) {
      const alreadyChosen = choicesMapping.some(
        (letterMapping) =>
          letterMapping.letter === letter && letterMapping.isChosen
      );
      if (!alreadyChosen) {
        checkLetter(letter);
      }
    }
  });
};

const pickWord = (category) => {
  const wordsInCategory = words[category];
  if (!wordsInCategory || wordsInCategory.length === 0) {
    return "";
  }
  return wordsInCategory[Math.floor(Math.random() * wordsInCategory.length)];
};

const checkLetter = (letter) => {
  letter = letter.toUpperCase();
  let isLetterInWord = false;
  let isAllLettersFound = true;
  choicesMapping.forEach((letterMapping) => {
    if (letterMapping.letter.toUpperCase() === letter) {
      if (!letterMapping.isChosen) {
        letterMapping.isChosen = true;
        wordMapping.forEach((w) => {
          if (w.letter.toUpperCase() === letter) {
            w.isVisible = true;
            isLetterInWord = true;
          }
          if (!w.isVisible) {
            isAllLettersFound = false;
          }
        });
        if (isLetterInWord) {
          letterMapping.class = "correct";
          displayWord(wordMapping);
        } else {
          letterMapping.class = "incorrect";
          scoreCount++;
          displayScore();
        }
      }
    }
  });
  displayChoices(choicesMapping);
  if (scoreCount === maxScore) {
    endGame();
  }
  if (isAllLettersFound) {
    winGame();
  }
};

const endGame = () => {
  wordMapping.forEach((w) => (w.isVisible = true));
  displayWord(wordMapping);
  els.choices.innerHTML = `<h1 class="lose">Perdu!</h1>`;
  createReplayButton();
};

const winGame = () => {
  els.score.innerHTML = `<img src="img/009.png" alt="win" />`;
  els.choices.innerHTML = `<h1 class="win">Gagné!</h1>`;
  createReplayButton();
};

function createReplayButton() {
  const replayButton = document.createElement("button");
  replayButton.textContent = "Rejouer";
  replayButton.style.cssText =
    "margin-top: 20px; padding: 10px 20px; font-size: 16px; background-color: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer;";
  replayButton.addEventListener("click", function () {
    window.location.reload();
  });
  els.choices.appendChild(replayButton);
}

window.addEventListener("load", () => {
  init();
});

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
