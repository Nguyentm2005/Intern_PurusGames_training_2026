class fallingObj extends GameOject{
    static sprite;
    static frameHeight;
    static frameWidth;
    static numColumn =0;
    static numRow =0;
    constructor(context,x,y,vy,width,height,typeObj){
        super(context,x,y,width,height,typeObj);

        this.vy =vy;
        
    }
    draw(){
        this.context.fillStyle = 'green';
        this.context.beginPath();
        this.context.fillRect(this.x,this.y,this.width,this.height);

    }
    update(secondPassed){
        this.y += this.vy*secondPassed;
    }

    loadImage(){
        fallingObj.sprite = new Image();
        fallingObj.sprite.src = "";
        fallingObj.onload =function(){

        };
    }
    isCollisionWithBottomEdge(maxY){
        return this.y+this.height >= maxY;;
    }

}