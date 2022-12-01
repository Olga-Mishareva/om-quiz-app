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
