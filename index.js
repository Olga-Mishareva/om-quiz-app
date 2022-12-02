const bookmarkButtons = document.querySelectorAll('[data-js="bookmark-btn"]');
const answerButtons = document.querySelectorAll('[data-js="answer-btn"]');

Array.from(bookmarkButtons).forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("card__bookmark--active");
  });
});

Array.from(answerButtons).forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest("li");
    const answer = card.querySelector('[data-js="answer"]');
    answer.classList.toggle("card__answer--visible");
    if (answer.classList.contains("card__answer--visible")) {
      button.textContent = "Hide answer";
    } else {
      button.textContent = "Show answer";
    }
  });
});

const from = document.querySelector('[data-js="form"]');
const cardBox = document.querySelector('[data-js="cardbox"]');
let cardCounter = 0;

function getTemplate() {
  const template = document.querySelector('[data-js="template"]');
  const cardElement = template.content.cloneNode(true);

  return cardElement;
}

function createCard() {
  const newCard = getTemplate();
  handleAnswerButton(newCard);
  cardBox.append(newCard);
}

function handleAnswerButton(card) {
  const answerButton = card.querySelector('[data-js="answer-btn"]');
  const answer = card.querySelector('[data-js="answer"]');
  answerButton.addEventListener("click", () => {
    answer.classList.toggle("card__answer--visible");
    if (answer.classList.contains("card__answer--visible")) {
      answerButton.textContent = "Hide answer";
    } else {
      answerButton.textContent = "Show answer";
    }
  });
}

function handleQuestion(question) {
  const questionList = Array.from(
    document.querySelectorAll('[data-js="question"]')
  );
  const cardQuestion = questionList.find((item, i) => i == cardCounter);
  cardQuestion.textContent = question;
}

function handleAnswer(answer) {
  const answerList = Array.from(
    document.querySelectorAll('[data-js="answer"]')
  );
  const cardAnswer = answerList.find((item, i) => i == cardCounter);
  cardAnswer.textContent = answer;
}

// function handleTags(tags) {}

from.addEventListener("submit", (event) => {
  event.preventDefault();
  const { question, answer, tags } = Object.fromEntries(
    new FormData(event.target)
  );

  createCard();
  handleQuestion(question);
  handleAnswer(answer);
  // handleTags(tags)

  cardCounter++;
  from.reset();
  event.target.elements.question.focus();
});
