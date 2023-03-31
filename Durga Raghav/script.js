score = 0;
cross = true;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);
document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {
        man = document.querySelector('.man');
        man.classList.add('animateMan');
        setTimeout(() => {
            man.classList.remove('animateMan')
        }, 700);
    }
    if (e.keyCode == 39) {
        man = document.querySelector('.man');
        manX = parseInt(window.getComputedStyle(man, null).getPropertyValue('left'));
        man.style.left = manX + 112 + "px";
    }
    if (e.keyCode == 37) {
        man = document.querySelector('.man');
    manX = parseInt(window.getComputedStyle(man, null).getPropertyValue('left'));
        man.style.left = (manX - 112) + "px";
    }
}

setInterval(() => {
    man = document.querySelector('.man');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(man, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(man, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    // console.log(offsetX, offsetY)
    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}