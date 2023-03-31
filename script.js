let gameAddresses = 
[
    "../ABDURRAHMAN/index.html",
    "../GauravKadam/index.html",
    "../ANANDRAJAARYAN/index.html",
    "../SACHINPATEL/index.html",
    "../Durga Raghav/index.html"
]
const game = document.querySelectorAll(".game");
for(let i=0;i<game.length;i++){
    game[i].addEventListener("click",()=>{
        window.open(gameAddresses[i]);
    });
}
