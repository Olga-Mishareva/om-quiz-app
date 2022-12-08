const cardColors = [
  "#edb5bf", // rosa
  "#fcbd96", // peach
  "#9fcce4", // light blue
  "#9fedd7", // light green
  "#fce181", // light yellow
];

const from = document.querySelector('[data-js="form"]');
const cardBox = document.querySelector('[data-js="cardbox"]');
console.log(cardBox);

function getTemplate() {
  const template = document.querySelector('[data-js="template"]');
  const cardElement = template.content.cloneNode(true);
  return cardElement;
}

function handleCardColor() {
  let index = Math.random() * 10;
  index = index > 5 ? Math.floor(index / 2) : Math.floor(index - 1);
  return cardColors[index];
}

function createCard(question, answer, tags) {
  const newCard = getTemplate();
  newCard.querySelector('[data-js="card"]').style.backgroundColor =
    handleCardColor();
  const cardQuestion = newCard.querySelector('[data-js="question"]');
  const answerButton = newCard.querySelector('[data-js="answer-btn"]');
  const cardAnswer = newCard.querySelector('[data-js="answer"]');

  handleAnswerButton(answerButton, cardAnswer);
  handleBookmarkButton(newCard);
  handleTags(newCard, tags);

  cardQuestion.textContent = question;
  cardAnswer.textContent = answer;
  cardBox.append(newCard);
}

function handleAnswerButton(answerButton, cardAnswer) {
  answerButton.addEventListener("click", () => {
    cardAnswer.classList.toggle("card__answer--visible");
    if (cardAnswer.classList.contains("card__answer--visible")) {
      answerButton.textContent = "Hide answer";
    } else {
      answerButton.textContent = "Show answer";
    }
  });
}

function handleBookmarkButton(newCard) {
  const bookmarkButton = newCard.querySelector('[data-js="bookmark-btn"]');
  bookmarkButton.addEventListener("click", () => {
    bookmarkButton.classList.toggle("card__bookmark--active");
  });
}

function handleTags(newCard, tags) {
  const tagsBox = newCard.querySelector('[data-js="tags"]');
  const tagsList = tags.split(",");

  if (tagsList[0] !== "") {
    tagsList.forEach((item) => {
      const tag = document.createElement("li");
      tag.classList.add("card__tag");
      tag.textContent = item;
      tagsBox.append(tag);
    });
  }
}

from.addEventListener("submit", (event) => {
  event.preventDefault();
  const { question, answer, tags } = Object.fromEntries(
    new FormData(event.target)
  );

  createCard(question, answer, tags);
  from.reset();
  event.target.elements.question.focus();
});
