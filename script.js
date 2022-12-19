let form = document.getElementById("bf-quiz");
let result = document.getElementById("result");

form.onsubmit = (e) => {
  e.preventDefault();

  let score = 0;
  let character;

  // Section #1

  let questionOne = document.querySelector("[name=question-wyr]:checked");
  let questionTwo = document.querySelector("[name=question-slacker]:checked");
  let questionThree = document.querySelector("[name=question-mood]:checked");

  if (questionOne !== null && Number(questionOne.value) !== NaN) {
    score += Number(questionOne.value);
  }

  if (questionTwo !== null && Number(questionTwo.value) !== NaN) {
    score += Number(questionTwo.value);
  }

  if (questionThree !== null && Number(questionThree.value) !== NaN) {
    score += Number(questionThree.value);
  }

  alert(score)

  if (score > 100) {
    character = "Edd";
  } else if (score > 80) {
    character = "Mordecai";
  } else if (score > 40) {
    character = "Finn";
  } else {
    character = "Darwin";
  }

  result.innerHTML = character;
}