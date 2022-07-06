// Define variable
let wordList = [];
let canPlay = true;
let isSetUp = false;
let answerArr = [];
let blankArr = [];
let inputArr = [];
let life = 5;
// set local win and lose to zero after fresh log in, but not after reloads
if (!sessionStorage.getItem('localWin')){
  sessionStorage.setItem('localWin', 0);
}
if (!sessionStorage.getItem('localLose')){
  sessionStorage.setItem('localLose', 0);
}
const winOutput = document.querySelector(".winOutput");
const loseOutput = document.querySelector(".loseOutput");
const output = document.querySelector(".CheckValue");
const userInput = document.querySelector(".UserInput");
const lifeLost = document.querySelector(".LifeLost");
const lifeLostWord = document.querySelector(".LifeLostWord");
const showAns = document.querySelector(".showAns");
const gameForm = document.querySelector(".game");
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
    return false;
  }
  if (isSetUp == false) {
    // if we haven't set up yet, get random answer and make blank array
    setUp();
    console.log(wordList);
    console.log('answer:'+answerArr);
  }
  // use EventListener to track the submit event, while submit, checking input, answer and winlose
  gameForm.addEventListener('submit', (event) => {
    event.preventDefault(); // add this line
    checkInput();
    checkAnswer();
    checkWinandLose();
  })
}
main();
// filter out symbol, number, word.length <=2 and repeating letters
function filterWord(word) {
  if (word.length <= 2 || word.length >6) {
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
  showAns.innerText = `(${answerArr.length}) `+blankArr.join(" ");
  updatesessionStorage();
  isSetUp = true;
}
// Andy part: check user input valid?
function checkInput() {
  testInput = userInput.value.toLowerCase().trim();
  userInput.value = "";
  const checkValue = /^[a-zA-Z]$/;
  if (testInput.length > answerArr.length) {
    output.innerHTML += "<p>The word you guessed is too long.</p>";
    return false;
  } else if (testInput.length < answerArr.length) {
    output.innerHTML += "<p>The word you guessed is too short.</p>";
    return false;
  } else {
    for (let i = 0; i < answerArr.length; i++) {
      if (checkValue.test(testInput[i]) === false) {
        output.innerHTML += "<p>Please type in only letter.</p>";
        return false;
      }
    }
  }
  inputArr = testInput.split("");
  output.innerHTML += `<p>You guessed "${testInput}".</p>`;
  console.log('user input:'+inputArr);
  // subtract life and delete pic
  life -= 1;
  lifeLost.removeChild(lifeLost.firstElementChild);
  lifeLostWord.innerHTML = `<p class="LifeLostWord">You have ${life} chance(s) left.</p>`;
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
  //show answer
  showAns.innerText = `(${answerArr.length}) `+blankArr.join(" ");
}

//check win first, or not, check lose
function checkWinandLose() {
  if (answerArr.join('') == inputArr.join('')) {
    output.innerHTML += "<p>The answer is correct, You Win!</p>";
    sessionStorage.localWin = parseInt(sessionStorage.getItem('localWin'))+1;
    updatesessionStorage();
    canPlay = false;
    return false;
  }else{
    if (life < 1) {
    output.innerHTML += "<p>You Lose!</p>";
    output.innerHTML += `<p>The correct answer is "${answerArr.join('')}".</p>`;
    sessionStorage.localLose = parseInt(sessionStorage.getItem('localLose'))+1;
    updatesessionStorage();
    canPlay = false;
    return false;
    }
  }
}
//update local number of win and lose
function updatesessionStorage(){
  winOutput.innerHTML = `<p>Total win: ${sessionStorage.getItem('localWin')}</p>`;
  loseOutput.innerHTML = `<p>Total lose: ${sessionStorage.getItem('localLose')}</p>`;
}


function restart() {
  //clean borad
  output.replaceChildren();
  //clear user input
  userInput.value = '';
  canPlay = true;
  answerArr.length = 0;
  blankArr.length = 0;
  inputArr.length = 0;
  //reset life
  life = 5;
  lifeLostWord.innerHTML = `<p class="LifeLostWord">You have ${life} chance(s) left.</p>`;
  // reset life pic
  lifeLost.innerHTML =
  `<img
  src="img/life1.png"
  alt="life1.png"
  width="50"
  height="300"
  />
  <img
    src="img/life2.png"
    alt="life2.png"
    width="50"
    height="300"
  />
  <img
    src="img/life3.png"
    alt="life3.png"
    width="50"
    height="300"
  />
  <img
    src="img/life4.png"
    alt="life4.png"
    width="50"
    height="300"
  />
  <img
    src="img/life5.png"
    alt="life5.png"
    width="50"
    height="300"
  />
  <img
    src="img/life6.png"
    alt="life6.png"
    width="50"
    height="300"
  />`;
  setUp();
  console.log('answer:'+answerArr);
}
