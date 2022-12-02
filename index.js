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

from.addEventListener("submit", (event) => {
  event.preventDefault();
  const { question, answer, tags } = Object.fromEntries(
    new FormData(event.target)
  );

  console.log(question, answer, tags);

  const template = document.querySelector('[data-js="template"]');
  const newCard = template.content.cloneNode(true);
  cardBox.append(newCard);

  const questionList = Array.from(
    document.querySelectorAll('[data-js="question"]')
  );
  const cardQuestion = questionList.find((item, i) => i == cardCounter);
  cardQuestion.textContent = question;

  console.log(cardQuestion);

  const answerList = Array.from(
    document.querySelectorAll('[data-js="answer"]')
  );
  const cardAnswer = answerList.find((item, i) => i == cardCounter);
  console.log(answerList);

  cardAnswer.textContent = answer;
  cardCounter++;
  from.reset();
});
