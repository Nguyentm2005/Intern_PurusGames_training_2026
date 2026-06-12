"use strict";
let canvas;
let context;

let game;

window.onload = function(){
    canvas = document.getElementById("theCanvas");
    canvas.width = 600;
    canvas.height = 500;
    
    game = new world(canvas);
    window.requestAnimationFrame((timeStamp) => game.gameloop(timeStamp));
};

class world{
    constructor(canvas){

        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        this.gameWidth = canvas.width;
        this.gameHeight = canvas.height;
        this.numColumns = 4;
        this.numRow = 3;
        this.mouseDown = false;

        this.oldTimstamp = 0;
        this.secondsPassed = 0;
        this.gameOver = false;
        this.createBall();
        this.createBrick();
        this.createSlider();
        this.listenInput();
        this.draw();
    }
    gameloop(timeStamp){
        this.secondsPassed = (timeStamp - this.oldTimstamp)/1000;
        this.oldTimstamp = timeStamp;
        this.update(this.secondsPassed);
        this.draw();
        window.requestAnimationFrame((nextTimestamp) => this.gameloop(nextTimestamp));
    }
    update(secondPassed){
        if(!this.gameOver){
            this.ball.update(secondPassed);
            if(!this.ball.detectedgeCollision(0,canvas.width,0,canvas.height))
            this.gameOver = true;
            this.detectCollision();
        }
    }
    draw(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
        if(!this.gameOver){
          
            this.listBrick.forEach(brick => brick.draw());
            this.ball.draw();
            this.slider.draw();  
        }
        else{
            this.context.font = "30px Arial";
            this.context.textAlign = 'center';
            this.context.fillText("GAME OVER",this.canvas.width/2,this.canvas.height/2);
        }
        
    }
    createBrick(){
        //create 4 brick
        let brickWidth = this.gameWidth * 0.2;
        let brickHeight = this.gameHeight * 0.05;
        let margin = 20;
        let x=0;
        let y=0;
        this.listBrick = [];
        for (let j = 0; j < this.numRow; j++) {
            y = margin + 50 + j * (brickHeight + margin);
            for (let i = 0; i < this.numColumns; i++) {
                x = margin + i * (brickWidth + margin);      
                this.listBrick.push(
                    new brick(this.context, x, y, brickWidth, brickHeight, 'green', i)  
                );
            }
        }
        
    }
    createSlider(){
        let sliderWidth = this.gameWidth * 0.2;
        let sliderHeight = this.gameHeight * 0.02;

        this.slider = new sliderBrick(
            this.context,
            this.gameWidth/2-sliderWidth/2,
            this.gameHeight-sliderHeight/2-50,
            sliderWidth,
            sliderHeight,
            'blue');
    }
    createBall(){
        let radiusBallgame = this.gameHeight * 0.02
        this.ball = new ball(
            this.context,
            this.gameWidth/2,
            this.gameHeight/2,200,200,
            radiusBallgame,'red');
    }
    detectCollision(){
        if(this.slider.collisionWithBall(this.ball)){
            this.ball.vy = -Math.abs(this.ball.vy);
           
        }
        for(let i=0; i<this.listBrick.length;i++){
            let brick = this.listBrick[i];
            if(brick.isCollisionWithBall(this.ball)){
                
                if (this.ball.x >= brick.x && this.ball.x <= brick.x + brick.width) {
                    this.ball.vy = -this.ball.vy; 
                } 

                else {
                    this.ball.vx = -this.ball.vx; 
                }
    
                this.listBrick.splice(i--, 1);
            }
        }
    }
    listenInput(){
        window.addEventListener('mousedown',(event =>{
            this.mouseDown = true;
        }));
        window.addEventListener('mouseup',(event=>{
            this.mouseDown = false;
            this.slider.stop();
        }));
        window.addEventListener('mousemove',(event)=>{
            if(this.mouseDown) this.slider.moveTo(this.canvasX(event.clientX),0,this.maxSliderX());
            else if(!this.mouseDown) this.slider.stop();
        });
    }
    canvasX(x){
        let rect = this.canvas.getBoundingClientRect();
        return x - rect.left;
    }
    maxSliderX(){
        return this.canvas.width - this.slider.width;
    }
}