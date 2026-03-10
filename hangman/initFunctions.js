const displayChoices = (choicesMapping) => {
  const choicesHtml = choicesMapping.map((letterMapping) => {
    if (letterMapping.isChosen) {
      return `<li class="${letterMapping.class}">${letterMapping.letter}</li>`;
    } else {
      return `<li>${letterMapping.letter}</li>`;
    }
  });
  els.choices.querySelector("ul").innerHTML = choicesHtml.join("");
};

const displayScore = () => {
  if (scoreCount > 0) {
    els.score.innerHTML = `<img src="img/00${scoreCount}.png" alt="hangman" />`;
  }
};

const displayWord = (wordMapping) => {
  const ulElement = els.answer.querySelector("ul");
  if (ulElement) {
    const wordHtml = wordMapping.map((letterMapping) => {
      if (letterMapping.isVisible === true) {
        return `<li>${letterMapping.letter}</li>`;
      } else {
        return `<li>_</li>`;
      }
    });
    ulElement.innerHTML = wordHtml.join("");
  }
};

const generateChoices = () => {
  const choices = [];
  for (let index = 65; index <= 90; index++) {
    choices.push(String.fromCharCode(index));
  }
  return choices;
};

const getChoicesMapping = (choices) => {
  const choicesMapping = choices.map((letter) => {
    return {
      letter,
      isChosen: false,
    };
  });
  return choicesMapping;
};

const getWordMapping = (word) => {
  const wordArr = word.split("");
  const wordMapping = wordArr.map((letter, index) => {
    let isVisible = false;
    if (index === 0 || index == wordArr.length - 1) {
      isVisible = true;
    }
    return {
      letter,
      isVisible,
    };
  });
  return wordMapping;
};
