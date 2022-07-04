// Define variable
let wordList = [];
let canPlay = true;
let isSetUp = false;
let answerArr = [];
let blankArr = [];
let inputArr = [];
const output = document.querySelector(".CheckValue");
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
}
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
  testInput = userInput.value.trim().split("");
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
        output.innerHTML += "<p>Please type in ony letter.</p>";
        return;
      }
    }
  }
  inputArr = testInput;
  console.log(inputArr);
}

function checkAnswer() {
  for (let i = 0; i < inputArr.length; i++) {
    for (let j = 0; j < answerArr.length; j++) {
      if (inputArr[i] === answerArr[j]) {
        blankArr[j] = answerArr[j];
      }
    }
  }
  console.log(blankArr);
}
//Paul Part - using for loop to check answer
/*
var lives;
var guess;
var counter;
var geusses;
var space=0;
   check = function () {
    wordlist.onclick = function () {
      var geuss = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          geusses[i].innerHTML = geuss;
          counter += 1;
        } 
      }
      var j = (word.indexOf(geuss));
      if (j === -1) {
        lives -= 1;
        comments();
        animate();
      } else {
        comments();
      }
    }
  }
*/

//Paul part - check life and lose
/*
  var showLives = document.getElementById("mylives");
   comments = function () {
    showLives.innerHTML = "You have " + lives + " lives";
    if (lives < 1) {
      showLives.innerHTML = "You Lose!";
    }
    for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        showLives.innerHTML = "You Win!";
      }
    }
  }
  */
