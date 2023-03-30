import Ball from "./Ball.js";
import Paddle from "./Paddle.js"
const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("paddle-left"));
const computerPaddle = new Paddle(document.getElementById("paddle-right"));
const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");
const maximumHeight = 25;



let lastTime;
function update(time){
    if(lastTime!=null){
        const delta = time - lastTime;
        // ball.update(delta, [playerPaddle.rect(),computerPaddle.rect()]);
        computerPaddle.update(delta,ball.y);
        // playerPaddle.update(delta,ball.y);
        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"));
        document.documentElement.style.setProperty("--hue",hue+(delta*0.01));
        if(isLose())  handleLose();
    }
    lastTime = time;
    window.requestAnimationFrame(update);
}

function isLose(){
    const rect = ball.rect();
    return (rect.right >= window.innerWidth || rect.left<=0);
}
function handleLose(){
    const rect = ball.rect();
    if(rect.right >= window.innerWidth){
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
        if(playerPaddle.height<=maximumHeight){
            playerPaddle.height *=1.1;
        }
        else{
            playerPaddle.height *=1;
        }
    }
    else if(rect.left<=0){
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
    }
    ball.reset();
    computerPaddle.reset();
}

function Video(src, append) {
    var v = document.createElement("video");
    if (src != "") {
      v.src = src;
    }
    if (append == true) {
      document.body.appendChild(v);
    }
    return v;
  }
//   var video = new Video("./videorun.mp4", true);
//   // do whatever you want...
//   video.height = 280;
//   video.width = 500;
//   video.controls = "controls";
// video.autoplay = true;
// video.loop = true;
//   video.play();

document.addEventListener("mousemove",e =>{
    playerPaddle.position = (e.y / window.innerHeight) * 100;
})
document.getElementById("startBtn").addEventListener("click",()=>{
    const startContainer = document.querySelector(".start");
    const overlayContainer = document.getElementById("overlay");
    startContainer.classList.add("hide");
    overlayContainer.classList.add("hide");
    window.requestAnimationFrame(update);  
})
// window.requestAnimationFrame(update);   