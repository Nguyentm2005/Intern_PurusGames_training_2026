
"use strict";

let canvas;
let context;
let gamePlay;

let SPEED = 200;
window.onload = function(){
    canvas = document.getElementById("theCanvas");
    canvas.width = 700;
    canvas.height = 400;
    context = canvas.getContext('2d');
    gamePlay = new game(canvas,context);
    
    window.requestAnimationFrame((timeStamp) => gamePlay.gameLoop(timeStamp));
}

class game{
    constructor(canvas,context){
        this.canvas = canvas;
        this.context = context;

        
        this.oldTimestamp =0;
        this.secondPassed =0;
        this.timer=0;
        this.mouseDown = false;
        this.run = false;
        this.gameOver = false;
        this.count =0;
        this.score = 0;
        this.listofObj= [];
        this.listofBomb = [];
        this.instantiateFunc();
        this.instance.sliderObj.draw();
        
        this.instance.StartButton.setBool(true);
        this.instance.StartButton.draw();
        this.listenInput();
    }
    gameLoop(timeStamp){

        this.secondPassed = (timeStamp - this.oldTimestamp)/1000;
        this.oldTimestamp = timeStamp;

        this.update(this.secondPassed);
        this.draw();
        window.requestAnimationFrame((nextTimestamp)=>this.gameLoop(nextTimestamp));
    }
    update(secondPassed){
       
        if(this.run){
            this.timer += secondPassed;
            if(this.timer >1){
                this.timer -=1;
                let random = Math.random() > 0.3? 0:1;
                if(random === 0){
                    this.instantiateFallingObj();
                    this.count ++;
                }
                else if(random === 1){
                    this.instantiateBombObj();
                }
            }
            if(this.count >= 10 ){
                this.count = 0;
                SPEED = SPEED+50;
            }

            this.listofObj.forEach(obj => obj.update(secondPassed));
            this.listofBomb.forEach(bomb => bomb.update(secondPassed));

            this.detechCollision();
        }
    }

    draw(){
       
        if(this.run){
            
            this.context.clearRect(0,0,canvas.width,canvas.height);
            this.instance.heartUI.draw();
            this.instance.sliderObj.draw();
            this.instance.score.draw();
            this.listofObj.forEach(obj => obj.draw());
            this.listofBomb.forEach(bomb => bomb.draw());
        }
        else if(!this.run){
            this.instance.StartButton.draw();
        }
        if(!this.run && this.gameOver){
            this.instance.RestartButton.draw();
        }
    }
    instantiateFunc(){
        this.instance = new instantiate(this.context,this.canvas);
        this.instance.createSlider();     
        this.instance.createUIGame();  
    }
    instantiateFallingObj(){
        let posX = Math.random()*550+50;
        let size =Math.random();
        if(size > 0.3) size = 5;
        else if(size <0.3 && size > 0.1) size = 10;
        else size = 15;
        this.instance.createFallingObj(posX,size,SPEED)
        this.listofObj.push(
           this.instance.obj
        );
    }
    instantiateBombObj(){
        let posX = Math.random()*550+50;
        this.instance.createBomb(posX,SPEED)
        this.listofBomb.push(
            this.instance.bomb
        )
    }
    listenInput(){
        window.addEventListener('mouseup',event=>{
            this.mouseDown = false;
        });
        window.addEventListener('mousedown',event =>{
            this.mouseDown = true;
            if(this.instance.StartButton.isTouchButton(this.canvasX(event.clientX),this.canvasY(event.clientY),this.instance.StartButton)){
                this.run = true;
                this.instance.StartButton.setBool(false);
                this.resetGame();
            }
        });
        window.addEventListener('mousemove',event =>{
            if(this.mouseDown) this.instance.sliderObj.moveTo(this.canvasX(event.clientX),0,canvas.width);
            else if(!this.mouseDown) return;
        });
    }
    canvasX(x){
        let rect = this.canvas.getBoundingClientRect();
        return x - rect.left;
    }
    canvasY(y){
        let rect = this.canvas.getBoundingClientRect();
        return y - rect.top;
    }
    detechCollision(){
        for(let i =0;i<this.listofObj.length;i++){
            let obj = this.listofObj[i];
            if(this.instance.sliderObj.isCollisionWithObj(obj)){
                if(obj.width === 35) this.instance.score.getScore(2);
                if(obj.width === 70) this.instance.score.getScore(5);
                if(obj.width === 105) this.instance.score.getScore(7);
                this.listofObj.splice(i,1);
                
            }
        }
        for(let i =0;i<this.listofBomb.length;i++){
            let obj = this.listofBomb[i];
            if(this.instance.sliderObj.isCollisionWithObj(obj)){
                this.listofBomb.splice(i,1);
                this.instance.heartUI.collideBomb();
                console.log("-1 heart");
                if(this.instance.heartUI.heartValue <=0){
                    this.gameOver = true;
                    this.run = false;

                    console.log(" GAME OVER");
                }
            }
        }
        for(let i =0;i<this.listofObj.length;i++)
        {
            let obj = this.listofObj[i];
            if(obj.isCollisionWithBottomEdge(canvas.height)){
                this.listofObj.splice(i,1)
            }
        }
    }
    resetGame(){
        this.instance.heartUI.heartValue =3;
        this.instance.score.score = 0;
    }
}