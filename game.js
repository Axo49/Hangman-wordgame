// Define variable
let wordList = [];
let canPlay = true;
let isSetUp = false;
let answerArr = [];
let blankArr = [];
let inputArr = [];
let life =5;
let counter = 0;
const output = document.querySelector(".CheckValue");
const output_life = document.querySelector(".life_board");
const userInput = document.querySelector(".UserInput");

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
    console.log(blankArr);
  }
  checkInput();
  checkAnswer();
  checkWin();
}
main();
// filter out symbol, number, word.length <=2 and repeating letters
function filterWord(word) {
  if (word.length <= 2) {
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
  testInput = userInput.value.toLowerCase().trim().split("");
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
  inputArr = testInput;
  life -=1;
  console.log(inputArr);
}
//Check answer, if any letter(s) match, change blankArr and show the correct letter(s)
function checkAnswer() {
  for (let i = 0; i < answerArr.length; i++) {
    for (let j = 0; j < inputArr.length; j++) {
      if (inputArr[j] === answerArr[i]) {
        blankArr[i] = answerArr[i];
        counter += 1;
      }else{
        checkLose();
      }
    }
  }
  console.log(blankArr);
}

function checkLose(){
  if (life < 1) {
    output.innerHTML = "You Lose!";
    canPlay = false;
    return;
  }
}
function checkWin(){
  if (counter == answerArr.length){
    output.innerHTML = "You Win!";
    canPlay = false;
    return;
  }
}

function genElement(text, messageType="warning", tag="div", location=board) {
	// generates HTML elements which displays text
	let newElement = document.createElement(tag);
	newElement.innerHTML = text;
	newElement.classList.add(messageType); // add class for styling
	location.appendChild(newElement);
	location.scrollTo(0, board.scrollHeight); // jump to bottom to show latest element
}
