// Define variable
let wordList = [];
let canPlay = true;
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
  console.log(wordList);
}
main();
// filter out symbol and word.length <=2
function filterWord(word) {
  if (word.length <= 2) {
    return false;
  } else if (/[.'*+?^${}()|[\]\\|0-9]|[/]/.test(word)) {
    return false;
  } else if (word.includes("-") || word.includes("&")) {
    return false;
  } else {
    return true;
  }
}

// Andy part: check user input valid?
/*
 const userInput = "spring";
const answer = "spring";
const LowerUserInput = userInput.toLowerCase().split("");
const LowerAns = answer.toLowerCase().split("");
function checkUserInput() {
  if (userInput) {
    console.log("match");
  } else {
    console.log("no");
  }
}
checkUserInput();
LowerUserInput.forEach((singleLetter) => {
  if (isNaN(singleLetter)) {
    console.log("match");
  } else {
    console.log("no");
  }
});
function checkUserInputLength() {
  if (userInput.length === answer.length) {
    console.log("match");
  } else {
    console.log("no");
  }
}
checkUserInputLength(); 
*/
