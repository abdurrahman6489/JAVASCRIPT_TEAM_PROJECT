//initial velocity of the ball and increase in 
//velocity with time
const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.00001;
//ball colliding soind
const ballHit = new Audio("./ball.wav");

export default class Ball{
    constructor(ballElem){
        this.ballElem = ballElem;
        this.reset();
    }
    //x and y are the properties of the ballElem 
    //giving the position of ball
    get x(){
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"));
    }
    set x(value){
        this.ballElem.style.setProperty("--x",value);
    }
    get y(){
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"));
    }
    set y(value){
        this.ballElem.style.setProperty("--y",value);
    }
    //rect function gives the relatie position of the ball
    //it is being used to check whether ball has collied with 
    //upper, lower walls or with the paddles or not
    rect(){
        return this.ballElem.getBoundingClientRect();
    }
    //this is the reset function where ball position is set to 
    //top and left to 50vh and 50vw and it always 
    //starts in a random direction
    reset(){
        this.x = 50;
        this.y = 50;
        //direction is given so that ball always starts
        //in a new direction, it acts as a unit vector
        //for displacement
        this.direction = {x : 0};
        while(Math.abs(this.direction.x) <= 0.2 || 
              Math.abs(this.direction.x)>=0.9){
                const heading = randomNumberBetween(0, 2 * Math.PI);
                this.direction = {x : Math.cos(heading), y : Math.sin(heading)};
        }
        //velocity is initially set to initial velocity
        this.velocity = INITIAL_VELOCITY;
    }
    //update function for ball, velocity, x and y is increased gradually
    //with time
    update(delta, paddleRects){
        this.velocity += VELOCITY_INCREASE*delta;
        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;
        const rect = this.rect();
        //this condition is for checking if ball collides with
        //up or down walls of the container, if true, then
        //its y property is reversed, to reflect the ball
        if(rect.bottom >= window.innerHeight || rect.top<=0){
            this.direction.y *= -1;
            ballHit.play();
        }
        //this is used to check if ball is collided with
        //left or right paddle, if true, then change
        //its x property to reflec to left or right
        if(paddleRects.some(r => isCollision(r, rect))){
            this.direction.x *= -1;
            ballHit.play();
        }
    }
}
function randomNumberBetween(min,max){
    return Math.random()*(max - min) + min;
}
//this function is to check whether the ball 
//is collliding with any paddle
function isCollision(rect1, rect2){
    return (rect1.right>=rect2.left 
        && rect1.left<=rect2.right 
        && rect1.top<=rect2.bottom
        && rect1.bottom>=rect2.top);
}
