import Ball from "./Ball.js";
import Paddle from "./Paddle.js"
const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("paddle-left"));
const computerPaddle = new Paddle(document.getElementById("paddle-right"));
const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");
//this is maximum height of the left paddle (for user)
const maximumHeight = 25;


let lastTime;
//this is the main function for the game, as all the movements are started and continued
//through this function, it basically updates the movements of the balls and the paddles
//with the delta time - delta time is the time interval between the last time and the curren time function
//is called
function update(time){
    if(lastTime!=null){
        const delta = time - lastTime;
        ball.update(delta, [playerPaddle.rect(),computerPaddle.rect()]); 
        computerPaddle.update(delta,ball.y);
        // playerPaddle.update(delta,ball.y);
        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"));
        document.documentElement.style.setProperty("--hue",hue+(delta*0.01));

        //if a player lost, then call the handleLose function
        if(isLose())  handleLose();
    }
    lastTime = time;
    window.requestAnimationFrame(update);
}

//to check if any one has lost, i.e. ball is missed by any paddle
function isLose(){
    const rect = ball.rect();
    return (rect.right >= window.innerWidth || rect.left<=0);
}
function handleLose(){

    //calling the rect function of the ball to ascertain its position
    //so that if the ball is moved far away from the left or right side
    const rect = ball.rect();
    //if the ball is gone far right to the right of the window, then the player
    //in the right is lost
    if(rect.right >= window.innerWidth){
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
        if(playerPaddle.height<=maximumHeight){
            //if player wins, increase its height by 10% every time
            playerPaddle.height *=1.1;
        }
        else{
            playerPaddle.height *=1;
        }
    }
    //if the ball is gone far left to the left of the window, then the player
    //in the left is lost
    else if(rect.left<=0){
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
    }
    ball.reset();
    computerPaddle.reset();
}


document.addEventListener("pointermove",e =>{
    playerPaddle.position = (e.y / window.innerHeight) * 100;
})
//this is for starting the gmae when start button in the middle
//of the screen is clicked
document.getElementById("startBtn").addEventListener("click",()=>{
    const startContainer = document.querySelector(".start");
    const overlayContainer = document.getElementById("overlay");
    startContainer.classList.add("hide");
    overlayContainer.classList.add("hide");
    window.requestAnimationFrame(update);  
})