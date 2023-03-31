let computerGuess;
let userGuess = [];
let userGuessUpdate = document.getElementById("textOutput");
let userNumberUpdate = document.getElementById("inputBox");
let audio1 = new Audio("./audio/music.mp3");
let audio2 = new Audio("./audio/2music.mp3");

// const playnow_btn_click = () =>{
//     document.getElementById("section1").style.display="none";
    document.getElementById("welcomeScreen").style.display="block";
// }

const init = () => {
    computerGuess = Math.floor(Math.random() * 100);
    document.getElementById("newGameButton").style.display = "none";
    document.getElementById("gameArea").style.display = "none";
};
const startGame = () => {
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("gameArea").style.display = "block";
};
// ========================reload the page======
const newGamebegin = () => {
    audio1.play();
    window.location.reload();
}

// =======================start new game====
const startNewGame = () => {
    audio2.play();
    document.getElementById("newGameButton").style.display = "inline";
    userNumberUpdate.setAttribute("disabled", true);
}

// =======================main logic======
const compareGuess = () => {
    audio1.play();
    const userNumber = Number(document.getElementById("inputBox").value);
    userGuess = [...userGuess, userNumber];
    document.getElementById("guesses").innerHTML = userGuess;

    // ==================check the value low or high=======
    if (userGuess.length < maxGuess) {
        if (userNumber > computerGuess) {
            userGuessUpdate.innerHTML = "Your guess is High";
            userNumberUpdate.value = "";
        } else if (userNumber < computerGuess) {
            userGuessUpdate.innerHTML = "Your guess is Low";
            userNumberUpdate.value = "";
        } else {
            userGuessUpdate.innerHTML = "It's Correct";
            userNumberUpdate.value = "";
            startNewGame();
        }
    }
    else {
        if (userNumber > computerGuess) {
            userGuessUpdate.innerHTML = `You Loose!! correct number was ${computerGuess}`;
            userNumberUpdate.value = "";
            startNewGame();
        } else if (userNumber < computerGuess) {
            userGuessUpdate.innerHTML = `You Loose!! correct number was ${computerGuess}`;
            userNumberUpdate.value = "";
            startNewGame();
        } else {
            userGuessUpdate.innerHTML = "It's Correct";
            userNumberUpdate.value = "";
            startNewGame();
        }
    }
    document.getElementById("attempts").innerHTML = userGuess.length;
};
const easyMode = () => {
    audio1.play();
    maxGuess = 10;
    startGame();
}
const hardMode = () => {
    audio1.play();
    maxGuess = 5;
    startGame();
}
