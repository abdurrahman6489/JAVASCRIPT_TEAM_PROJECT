const SPEED = 0.02;

export default class Paddle{
    constructor(paddleElem){
        this.paddleElem = paddleElem;
    }
    //position is the propery of the paddles, through this 
    //paddle y position is only changed, as paddle only moves 
    //vertically
    get position(){
        return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue("--position"));
    }
    set position(value){
        this.paddleElem.style.setProperty("--position",value);
    }
    //this is only for computer paddle which will change its position
    //according to the difference in vertical height of the ball and
    //the computer paddle changing with time
    update(delta,ballHeight){
        this.position += delta * SPEED * (ballHeight - this.position);
    }
    //reset the ball to initial position of 50, at the start of each point 
    //or score
    reset(){
        this.position = 50;
    }
    //this is used to compare the relative position 
    //of the paddles with the ball and check 
    //if the paddle hits the ball or not
    rect(){
        return this.paddleElem.getBoundingClientRect();
    }
    //this is for increasing the height of player paddle by 10%
    //whenever it scores a point
    get height(){
        return parseInt(getComputedStyle(this.paddleElem).getPropertyValue("--height"));
    }
    set height(value){
        this.paddleElem.style.setProperty("--height",value);
    }
}