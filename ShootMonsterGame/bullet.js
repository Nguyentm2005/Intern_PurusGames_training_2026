class bullet extends gameObject{
    static spriteBullet;
    constructor(context,canvas,x,y,vx,vy,radius,Angle){
        super(context,canvas,x,y,radius);
        this.vx = vx;
        this.vy = vy;
        this.loadImage();
        this.Angle = Angle;
    }
    loadImage(){
        bullet.spriteBullet = new Image();
        bullet.spriteBullet.src = "assetGame/bulletOutput.png";
    }
    update(secondPassed){
        this.x += this.vx * secondPassed;
        this.y += this.vy * secondPassed;
    }
    draw(){
        this.context.save();
        this.context.translate(this.x,this.y);
        this.context.rotate(this.Angle);

        let bulletWidth = this.radius*2;
        let bulletHeight = bulletWidth * (bullet.spriteBullet.height/bullet.spriteBullet.width);
        
        this.context.drawImage(
            bullet.spriteBullet,
            -bulletWidth/2,
            -bulletHeight/2,
            bulletWidth,
            bulletHeight
        );
        this.context.restore();
    }
    isCollisionWithMonster(Monster){
        let distance = (this.x - Monster.x)*(this.x - Monster.x) + (this.y - Monster.y)*(this.y - Monster.y );
        return distance <= (this.radius + Monster.radius)*(this.radius + Monster.radius)
    }
}