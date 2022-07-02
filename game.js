//Login page
function Login() {
	// validates inputs and alerts mistakes
	const username = document.getElementsById("InputUserName").value;
	const password = document.grtElementsById("InputPassword").value;
	let alertMessage = "";
	let incorrect = false;
	
	// username missing
	if (username.value === "") {
		alertMessage += "Please enter your name";
		incorrect = true;
	}
	// username wrong format
	else if (! /^[A-Za-z0-9]*$/.test(username.value)) {
		alertMessage += "Username can only contain letters and numbers";
		incorrect = true;
	}
	// password incorrect (or missing)
	if (password.value.toLowerCase() !== "hangman") {
		if (incorrect) {alertMessage += "\n";}
		alertMessage += "Password incorrect";
		incorrect = true;
	}
	// pops alert box
	if (incorrect) {
		alert(alertMessage);
		return;
	}

	// when validation passed, redirect to game page
	sessionStorage.clear();
	sessionStorage.setItem("username", username.value);
	window.location.href = game.html;
}


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
async function main(){
    const result = await getData(); //wait for fetch to finish
    wordList = result.split("\n").filter(word => filterWord(word));
    if (canPlay == false){
        return
    }
    console.log(wordList);
}
main();
// filter out symbol, number, word.length <=2 and repeating letters
function filterWord (word){
    if (word.length <=2) {
        return false;
    }else if (/[.'*+?^${}()|[\]\\|0-9]|[/]/.test(word)){ // filter out symbol and number
        return false;
    }else if (word.includes('-') || word.includes('&')){ // filter out - and & 
        return false;
    }else if (/^(?!.*([ -])\1)(?!.*([A-Za-z])\2{2})\w[a-zA-Z]*$/gm.test(word)){ // filter out repeating letters
        return true;
    }else{
        return false;
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


//Paul Part - using for loop to check answer [conbine]
/*
var lives;
var guess;
var counter;
var geusses;
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