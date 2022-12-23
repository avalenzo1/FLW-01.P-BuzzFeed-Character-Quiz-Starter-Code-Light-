import {
  ViewController,
  Snackbar,
  clearEvents,
  hideElement,
  showElement,
} from "./components.js";

let form = document.getElementById("bf-quiz");
let submit = document.getElementById("bf/submit");

const controller = new ViewController({
  id: "bf-quiz",
  default: "home-view",
});

controller.mount({
  "section-0": {
    mounted(view) {
      let inputs = view.querySelectorAll("input[type='radio']");
      console.log(inputs)
      for (let radio of inputs) {
        radio.onclick = () => {
          controller.mountView("section-1");
        };
      }
    }
  },
  "section-1": {
    mounted(view) {
      let audioList = [
        new Audio("./audio/fishwithlegs.mp3"),
        new Audio("./audio/meaningoflife.mp3"),
        new Audio("./audio/lazy.mp3"),
        new Audio("./audio/slackers.mp3"),
      ];

      let inputs = view.querySelectorAll("input[type='radio']");
      let labels = view.querySelectorAll("label");

      for (const [index, audio] of audioList.entries()) {
        audio.onloadstart = () => {
          labels[index].onmouseover = () => {
            audio.play();
          };
  
          labels[index].onmouseout = labels[index].onclick = () => {
            audio.pause();
            audio.currentTime = 0;
          };
        };
      }

      for (let radio of inputs) {
        radio.onclick = () => {
          controller.mountView("section-2");
        };
      }
    }
  },
  "section-2": {
    mounted(view) {
      let inputs = view.querySelectorAll("input[type='radio']");
      console.log(inputs)
      for (let radio of inputs) {
        radio.onclick = () => {
          controller.mountView("result-view");
        };
      }
    }
  },
  "result-view": {
    mounted() {
      // simulates a form submit
      submit.click();
    }
  }
})

form.onsubmit = (e) => {
  e.preventDefault();

  let name = document.getElementById("character-name");
  let image = document.getElementById("character-image");
  let result = document.getElementById("character-score");

  let score = 0;
  let source;
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

  // if (score > 12) {
  //   character = "Edd";
  //   source = 'https://static.wikia.nocookie.net/edwikia/images/7/72/Edd.1.png'
  // } else if
  if (score === 9) {
    character = "Mordecai";
    source = 'https://i.pinimg.com/564x/a0/56/5d/a0565d70b854d402461afb6c07d06557.jpg';
  } else if (score > 6) {
    character = "Gumball";
    source = 'https://i.embed.ly/1/display/resize?width=800&height=800&key=3e750996b20f47be9451da09d3fffa5b&url=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FqthE1bMTdXUas%2Fgiphy.gif';
  } else if (score > 2) {
    character = "Finn";
    source = 'https://media.tenor.com/-VGT1mQDFLUAAAAM/adventuretime-finn.gif';
  } else {
    character = "Darwin";
    source = 'https://i.pinimg.com/564x/9d/a3/c7/9da3c7a727a6abbdf748118f9f4e48e2.jpg';
  }

  image.src = source;
  name.innerHTML = character;
  result.innerHTML = score;
}