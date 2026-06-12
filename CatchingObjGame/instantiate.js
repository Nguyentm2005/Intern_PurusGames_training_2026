class instantiate{
    constructor(context,canvas) {
       this.context = context;
       this.canvas = canvas;
        
    }
    createSlider(){
        let sliderWidth = this.canvas.width * 0.2;
        let sliderHeight = this.canvas.height * 0.05;
        let posX = this.canvas.width/2-sliderWidth/2;
        let posY = this.canvas.height - 20;
        this.sliderObj = new slider(this.context,posX,posY,sliderWidth,sliderHeight,"slider");
    }
    createFallingObj(posX, size, speed){
        let objSize = (this.canvas.width * 0.01)*size;
        this.obj = new fallingObj(this.context,posX,0,speed,objSize,objSize,"FallingObjects");
    }
    createBomb(posX,speed){
        let objSize  = this.canvas.width * 0.04;
        let bombSpeed = speed*1.5;
        this.bomb = new Bomb(this.context,posX,0,bombSpeed,objSize,objSize,"Bomb");
    }
    createUIGame(){
        this.StartButton = new startButton(this.context,this.canvas,0,0,160,60);
        this.RestartButton = new restartButton(this.context,this.canvas,this.canvas.width/2,this.canvas.height/2,160,60);
        this.heartUI = new heart(this.context,this.canvas,0,0,15,3);
        this.score = new score(this.context,this.canvas,this.canvas.width/2,this.canvas.height/2-150);
    }
}