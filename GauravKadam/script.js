const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");

const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;


// Items Array
const items = [
    { name: "car1", image: "./assets/car1.png" },
    { name: "car2", image: "./assets/car2.png" },
    { name: "car3", image: "./assets/car3.png" },
    { name: "car4", image: "./assets/car4.png" },
    { name: "car5", image: "./assets/car5.png" },
    { name: "car6", image: "./assets/car6.png" },
    { name: "car7", image: "./assets/car7.png" },
    { name: "car8", image: "./assets/car8.png" },

];

// intial time

let seconds = 0;
minutes = 0;
// initial moves and win count
let movesCount = 0,
    winCount;

// for timer
const timeGenrator = () => {
    seconds += 1;
    // minutes logic
    if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
    }
    // Format time before displaying

    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;

    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

const movesCounter = () => {
    movesCount += 1;
    moves.innerHTML = `<span>moves:</span>${movesCount}`;
};

// pick random objects from  the item array
const generateRandom = (size = 4) => {
    // temporary Array
    let tempArray = [...items];
    // initialize card values array
    let cardValues = [];
    // size should be double (4*4 matrix)/2 sinces pairs of objects world exist
    size = (size + size) / 2;
    // Random object selection 
    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() + tempArray.length);
        cardValues.push(tempArray[randomIndex]);
        // once selected remove the object from temp array
        tempArray.splice(randomIndex, 1);
    }
    return cardValues;
};
const matrixGenerator = (cardValues, size = 4) => {
    gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    // simple shuffle
    cardValues.sort(() => Math.random() - 0.5);
    for (let i = 0; i < size * size; i++) {
        /*create cards
        before =>frontside (contains question mark)
        after =>back side (contains actual image)
        data-card-values is a custom attribute which stores the name of cards to much letter\
         */
        gameContainer.innerHTML += `
        <div class="card-container" data-card-value="${cardValues[i].name}">
            <div class="card-before">?</div>
            <div class="card-after">
                <img src="${cardValues[i].image}"
                class="image"/></div>
        </div>`;
    }
    gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

    // card
    cards = document.querySelectorAll(".card-container");
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            //if selected card is not matched yet then
            // only run(i.e already matched ard when clicked will be ignored)
            if (!card.classList.contains("matched")) {
                // flip the clicked card
                card.classList.add("flipped");
                // if it the firstcard (!firstCard since firstCard is initially false)
                if (!firstCard) {
                    // so current card will become firstCard
                    firstCard = card;
                    // current cards value becomes firstcardvalue
                    firstCardValue = card.getAttribute("data-card-value");
                }
                else {
                    // increment moves since user selected second card
                    movesCounter();
                    // secondCard and value
                    secondCard = card;
                    let secondCardValue = card.getAttribute("data-card-value");
                    if (firstCardValue == secondCardValue) {
                        // if both cards match add matched class to thoes cards would be ignored next time
                        firstCard.classList.add("matched");
                        secondCard.classList.add("matched");
                        // set first card to flase since next card be first now
                        firstCard = false;
                        // wincount increase as userfound correct match
                        winCount += 1;
                        // cheack if winCount == half of cardVakues
                        if (winCount == Math.floor(cardValues.length / 2)) {
                            stopGame();
                            result.innerHtml = `<h2>You Won</h2>
                                <h4>Moves: ${movesCount}</h4>`;

                        }
                    } else {
                        // if the cards dont match
                        // flip the cards back to normal
                        let [tempFirst, tempSecond] = [firstCard, secondCard];
                        firstCard = false;
                        secondCard = false;
                        let delay = setTimeout(() => {
                            tempFirst.classList.remove("flipped");
                            tempSecond.classList.remove("flipped");
                        }, 900);

                    }
                }
            }
        });
    });
};


//  start game
startButton.addEventListener("click", () => {
    movesCount = 0;
    seconds = 0;
    minutes = 0;
    // controls and buttons visibility 
    controls.classList.add("hide");
    stopButton.classList.remove("hide");
    startButton.classList.add("hide");
    // start timmer
    interval = setInterval(timeGenrator, 1000);

    moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
    initializer();
});

// stop game
stopButton.addEventListener("click", (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
})
);

// Initialize Values and function calls
const initializer = () => {
    result.innerHTML = "";
    winCount = 0;
    let cardValues = generateRandom();
    // console.log(cardValues);
    matrixGenerator(items);
};

