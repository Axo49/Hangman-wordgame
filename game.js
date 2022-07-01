// Define variable
let wordList =[];
let canPlay = true;
function getData(){
    return fetch("https://raw.githubusercontent.com/dwyl/english-words/master/words.txt")
        .then(response => response.text())
};
// Please run *ALL* function inside main
async function main(){
    const result = await getData(); //wait for fetch to finish
    wordList = result.split("\n")/*.filter(char => /[a-zA-Z]+$/.test(char))*/;
    console.log(wordList);
}
main();
