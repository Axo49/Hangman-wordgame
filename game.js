// Define variable
let wordList = [];
let canPlay = true;
let isSetUp = false;
let answerArr = [];
let blankArr = [];
let inputArr = [];
let life = 5;
let counter = 0;
const output = document.querySelector(".CheckValue");
const output_life = document.querySelector(".life_board");
const userInput = document.querySelector(".UserInput");
const lifeLost = document.querySelector(".LifeLost");
const lifeLostWord = document.querySelector(".LifeLostWord");
const showAns = document.querySelector(".showAns");
// Get data from internet word list
function getData() {
  return fetch(
    "https://raw.githubusercontent.com/dwyl/english-words/master/words.txt"
  ).then((response) => response.text());
}
// Please run *ALL* function inside main
async function main() {
  const result = await getData(); //wait for fetch to finish
  wordList = result.split("\n").filter((word) => filterWord(word));
  if (canPlay == false) {
    return;
  }
  if (isSetUp == false) {
    // if we haven't set up yet, get random answer and make blank array
    setUp();
    console.log(wordList);
    console.log(answerArr);
  }
  checkInput();
  checkAnswer();
  checkWinandLose();
}
main();
// filter out symbol, number, word.length <=2 and repeating letters
function filterWord(word) {
  if (word.length <= 2 || word.length > 10) {
    return false;
  } else if (/[.'*+?^${}()|[\]\\|0-9]|[/]/.test(word)) {
    // filter out symbol and number
    return false;
  } else if (word.includes("-") || word.includes("&")) {
    // filter out - and &
    return false;
  } else if (/^(?!.*([ -])\1)(?!.*([A-Za-z])\2{2})\w[a-zA-Z]*$/gm.test(word)) {
    // filter out repeating letters
    return true;
  } else {
    return false;
  }
}
//get random answer, split answer into array and fill '_' into blankArr
function setUp() {
  let answer =
    wordList[Math.floor(Math.random() * wordList.length)].toLowerCase();
  answerArr = answer.split(""); //split answer into array
  blankArr = Array(answerArr.length).fill("_");
  isSetUp = true;
}
// Andy part: check user input valid?
function checkInput() {
  testInput = userInput.value.toLowerCase().trim();
  userInput.value = "";
  const checkValue = /^[a-zA-Z]$/;
  if (testInput.length > answerArr.length) {
    output.innerHTML += "<p>The word you guess is too long.</p>";
    return;
  } else if (testInput.length < answerArr.length) {
    output.innerHTML += "<p>The word you guess is too short.</p>";
    return;
  } else {
    for (let i = 0; i < answerArr.length; i++) {
      if (checkValue.test(testInput[i]) === false) {
        output.innerHTML += "<p>Please type in only letter.</p>";
        return;
      }
    }
  }
  inputArr = testInput.split("");
  output.innerHTML += `<p>You guess "${testInput}".</p>`;
  life -= 1;
  lifeLost.removeChild(lifeLost.firstElementChild);
  lifeLostWord.innerHTML = `<p class="LifeLostWord">You have ${life} chance(s) left.</p>`;
  console.log(inputArr);
}
//Check answer, if any letter(s) match, change blankArr and show the correct letter(s)
function checkAnswer() {
  for (let i = 0; i < answerArr.length; i++) {
    for (let j = 0; j < inputArr.length; j++) {
      if (inputArr[j] === answerArr[i]) {
        blankArr[i] = answerArr[i];
      }
    }
  }
  console.log(blankArr);
  showAns.innerText = blankArr.join(" ");
}

function checkWinandLose() {
  if (answerArr.join("") == inputArr.join("")) {
    output.innerHTML += "<p>You Win!</p>";
    canPlay = false;
    return;
  } else {
    if (life < 1) {
      output.innerHTML += "<p>You Lose!</p>";
      output.innerHTML += `<p>The correct answer is "${answerArr.join(
        ""
      )}".</p>`;
      canPlay = false;
      return;
    }
  }
}

/*function genElement(text, messageType="warning", tag="div", location=board) {
	// generates HTML elements which displays text
	let newElement = document.createElement(tag);
	newElement.innerHTML = text;
	newElement.classList.add(messageType); // add class for styling
	location.appendChild(newElement);
	location.scrollTo(0, board.scrollHeight); // jump to bottom to show latest element
}
*/
function restart() {
  location.reload();
}
