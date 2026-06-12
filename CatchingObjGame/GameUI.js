class GameUI{
    constructor(context,canvas){
        this.context = context;
        this.canvas = canvas;


    }
}

//Nút bắt đầu
class startButton extends GameUI{
    static sprite;
    constructor(context,canvas,x,y,width,height){
        super(context,canvas)
        
        this.width = width;
        this.height = height;
        this.x = this.canvas.width/2-this.width/2;
        this.y = this.canvas.height/2-this.height/2;
        this.start = false;
    }
    loadImage(){
        
        GameUI.startGame = new Image();
        GameUI.startGame.src = "";
        
    }
    draw(){
        if(this.start){
            context.beginPath();
            context.fillStyle = "black";
            context.font = '60px Arial';
            context.textAlign = 'center';
            context.fillStyle = "gray";
            this.context.fillText('!CATCHING GAME!', this.canvas.width / 2, this.canvas.height / 2 - 80);
            
            
            context.beginPath();
            context.fillRect(this.x,this.y,this.width,this.height);
        }
    }
    setBool(start){
        return this.start = start;
    }
    isTouchButton(mouseX,mouseY,btn){
        return mouseX >= btn.x &&
                mouseX <= btn.x + btn.width &&
                mouseY >= btn.y &&
                mouseY<= btn.y +btn.height;
    }
}

class restartButton extends GameUI{
    static sprite;
    constructor(context,canvas,x,y,width,height){
        super(context,canvas)
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.gameOver = false;
    }
    loadImage(){
        
        GameUI.startGame = new Image();
        GameUI.startGame.src = "";
        
    }
    draw(){
        
            context.beginPath();
            context.fillStyle = "black";
            context.fillText('!GAME OVER!',canvas.width/2,this.canvas.height / 2 - 80);
            context.font = '60px Arial';
            context.textAlign = 'center';
            
            context.beginPath();
            context.fillStyle = "green";
            let posX = this.canvas.width/2 - this.width/2;
            let posY = this.canvas.height/2;
            context.beginPath();
            context.fillRect(posX,posY,this.width,this.height);
        
    }
    
    isTouchButton(mouseX,mouseY,btn){
        return mouseX >= btn.x &&
                mouseX <= btn.x + btn.width &&
                mouseY >= btn.y &&
                mouseY<= btn.y +btn.height;
    }
}

//Máu người chơi
class heart extends GameUI{
    static sprite;
    constructor(context,canvas,x,y,radius, heartValue){
        super(context,canvas);

        this.x = x;
        this.y = y;
        this.radius = radius;
        this.heartValue = heartValue;
    }
    heart(){
        this.heartValue = 3;
        
        GameUI.Heartsprite  = new Image();
        GameUI.Heartsprite.src = "";
        
        
    }
    draw(){
        let margin = 20;
        let posX =0;
        for(let i=0;i<this.heartValue;i++){
            posX = posX + this.radius + margin;
            context.fillStyle = "red";
            context.arc(posX,50,this.radius, 0,2*Math.PI);
            context.fill();
            //drawImage later
        }
    }
    collideBomb(){
        this.heartValue -=1;
    }
}

class score extends GameUI{
    constructor(context,canvas,x,y){
        super(context,canvas)
        this.x =x;
        this.y = y; 
        this.score =0;
    }
    draw(){
        this.context.save();
        this.context.fillStyle = 'black';
        this.context.textAlign = 'center';
        this.context.textBaselign ='middle';
        this.context.font = 'bold 20px Arial';
        this.context.fillText(this.score,this.x,this.y);
        this.context.restore();
    }
    getScore(score){
        return this.score +=score;
    }
}