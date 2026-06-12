class Bomb extends GameOject{
    static sprite;

    constructor(context,x,y,vy,width,height,typeObj){
        super(context,x,y,width,height,typeObj)
        this.vy = vy;
    }
    draw(){
        this.context.fillStyle = "blue";
        this.context.beginPath();
        this.context.fillRect(this.x,this.y,this.width,this.height);
    }
    update(secondPassed){
        this.y += this.vy *secondPassed;
    }
    loadImage(){
        Bomb.sprite = new Image();
        Bomb.sprite.src = "";
        Bomb.sprite.onload = function(){

        }
    }
    isCollisionWithBottomEdge(maxY){
        return this.y+this.height >= maxY;;
    }
}