const wordBank = [
  "terrance",
  "anette",
  "babyd",
  "booboo",
  "blackstar",
  "anthony",
  "geneva",
  "baldy",
  "deszie",
  "breanna",
  "vanessa",
  "nick",
  "steffy",
  "rayray",
  "raymond",
  "nini",
  "rayla",
  "ninj",
  "woopwoop",
  "emma",
  "chanel",
];
const keyboard = document.querySelector(".keyboard");
// const hiddenWord = document.querySelector(".wordSpotlight");
const currentWord = [];
const resetButton = document.querySelector(".resetbutton");
const startButton = document.querySelector(".beginbutton");
let maxWrong = 10;
let mistakes = 0;
const guessedCorrect = [];
let wordStatus = null;
// Generate The Game on Load

resetButton.addEventListener("click", resetGame);
startButton.addEventListener("click", gamePlay);

generateButtons();

function resetGame() {
  let answerWord = wordBank[Math.floor(Math.random() * wordBank.length)];
  currentWord.push(answerWord);
  console.log(mistakes);
  console.log(currentWord);
  console.log(guessedCorrect);
  console.log("game reset");
  console.log(answerWord);

  let disableButton = document.querySelectorAll(".gamebuttons");
  for (let k = 0; k < disableButton.length; k++) {
    disableButton[k].classList.remove(
      "opacity-25",
      "pointer-events-none",
      "duration-300"
    );
  }
  document.querySelector(".mistakes").innerHTML = 0;
  mistakes = 0;

  document.querySelector(".winlose").innerHTML = "";
  hideWord(answerWord);
}

function gamePlay() {
  startButton.classList.add(
    "opacity-25",
    "pointer-events-none",
    "duration-300"
  );
  console.log("gameStart");
  let answerWord = wordBank[Math.floor(Math.random() * wordBank.length)];
  currentWord.push(answerWord);
  hideWord(answerWord);

  mistakes = 0;
}

function hideWord(word) {
  var tempArray = [];
  let hidden = word.split("");

  for (let i = 0; i < hidden.length; i++) {
    let placeholder = `<span class=${hidden[i]}>_</span>`;
    tempArray.push(placeholder);
  }
  let final = tempArray.join(" ");
  document.querySelector(".wordSpotlight").innerHTML = `
<span class ='text-2xl font-black tracking-widest mb-4'>
${final}
</span>`;
}

function handleGuess(input) {
  // Disable the button
  let disableButton = document.querySelectorAll("button." + input);
  for (let k = 0; k < disableButton.length; k++) {
    disableButton[k].classList.add(
      "opacity-25",
      "pointer-events-none",
      "duration-300"
    );
  }

  // Handle Correct Answer
  let parseArray = currentWord[currentWord.length - 1].split("");
  if (parseArray.indexOf(input) >= 0) {
    for (let c = 0; c < parseArray.length; c++) {
      if (input == parseArray[c]) {
        let targets = document.querySelectorAll("span." + input);

        for (let r = 0; r < targets.length; r++) {
          document
            .querySelectorAll("span." + input)
            [r].classList.add("correct");
          console.log(document.querySelectorAll("span." + input));
        }
      }
      let guessLetter = document.querySelectorAll("span." + input + "");
      for (let r = 0; r < guessLetter.length; r++) {
        guessLetter[r].innerHTML = input;
      }
    }
    console.log(document.querySelectorAll(".correct").length);
  } else {
    mistakes++;
    document.querySelector(".mistakes").innerHTML = mistakes;
  }

  if (mistakes == maxWrong) {
    document.querySelector(".winlose").innerHTML = "YOU LOSE";
    let gamebuttons = document.querySelectorAll(".gamebuttons");

    for (let m = 0; m < gamebuttons.length; m++) {
      gamebuttons[m].classList.add(
        "opacity-25",
        "pointer-events-none",
        "duration-300"
      );
    }
    document.querySelector(".graveyard").innerHTML = currentWord.join(", ");
  } else if (
    document.querySelectorAll(".correct").length ===
    currentWord[currentWord.length - 1].length
  ) {
    document.querySelector(".winlose").innerHTML = "YOU WIN";
    let gamebuttons = document.querySelectorAll(".gamebuttons");
    for (let m = 0; m < gamebuttons.length; m++) {
      gamebuttons[m].classList.add(
        "opacity-25",
        "pointer-events-none",
        "duration-300"
      );
    }
    document.querySelector(".graveyard").innerHTML = currentWord.join(", ");
  }
}
function generateButtons() {
  let buttonsHTML = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(function (letter) {
      return (
        `
     <button 
     class="${letter} gamebuttons bg-red-600 px-6 py-3 rounded-lg" 
     onClick ="handleGuess('` +
        letter +
        `')">
     ${letter}
     </button>
     `
      );
    });

  for (let i = 0; i < buttonsHTML.length; i++) {
    if (keyboard.innerHTML !== "") keyboard.innerHTML += buttonsHTML[i];
  }
}
