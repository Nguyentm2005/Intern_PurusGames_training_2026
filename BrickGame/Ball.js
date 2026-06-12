//@ts-check
//Ball file
class ball extends gameObject{
    constructor(context,x,y,vx,vy,r,color){
        super(context,x,y,vx,vy,color)
        this.radius = r;
    }
    draw(){

        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.arc(this.x,this.y,this.radius,0,2*Math.PI);
        this.context.fill();
    }
    update(secondPassed){
        this.x += this.vx*secondPassed;
        this.y += this.vy *secondPassed;
    }
    detectedgeCollision(minx, maxx,miny,maxy){
        if(this.x<minx){
            this.vx =Math.abs(this.vx);
            this.x = 0;
        }
        else if(this.x +this.radius*2 > maxx){
            this.vx = -Math.abs(this.vx);
            this.x = maxx-this.radius*2;
        }
        if(this.y<miny){
            this.vy = Math.abs(this.vy);
            this.y =0;
        }
        else if(this.y + this.radius*2 > maxy){
            this.vy = -Math.abs(this.vy);
            this.y = maxy - this.radius *2;
        }
    }
}