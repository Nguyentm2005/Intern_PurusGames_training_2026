class monster extends gameObject{
    static monsterSprite;
    static frameHeight;
    static frameWidth;
    static Cols = 4;
    static Rows = 3;
    constructor(context,canvas,x,y,vx,vy,radius,monsterLv){
        super(context,canvas,x,y,radius)

        this.monsterLv = monsterLv;
        this.monsterSpeed=0;
        this.vx = vx;
        this.vy = vy;
    
        this.loadImage();
        this.setUpMonster(monsterLv);
    }
    setUpMonster(monsterLv){
        switch(monsterLv){
            case 0:
                this.numRow = monsterLv;
                this.numCol = Math.floor(Math.random()*4);
                this.heartValue =1;
                this.maxHeartValue =1;
                this.radius = this.radius*1.5;
                this.scale = 3;
                this.monsterSpeed = 120;
                break;
            case 1:
                this.numRow = monsterLv;
                this.numCol = Math.floor(Math.random()*4);
                this.heartValue =2;
                this.maxHeartValue =2;
                this.radius = this.radius*2;
                this.scale = 3.5;
                this.monsterSpeed = 100;
                break;
            case 2:
                this.numRow = monsterLv;
                this.numCol = Math.floor(Math.random()*4);
                this.heartValue =3;
                this.maxHeartValue =3;
                this.radius = this.radius*3;
                this.scale = 4;
                this.monsterSpeed = 80;
                break;
        }
    }
    loadImage(){
        monster.monsterSprite = new Image();
        monster.monsterSprite.src = "assetGame/monsterSprite.png";
        monster.monsterSprite.onload = function(){
            monster.frameWidth = monster.monsterSprite.width/monster.Cols;
            monster.frameHeight = monster.monsterSprite.height/monster.Rows;
        }
    }
    draw(){
        this.context.save();
        this.context.imageSmoothingEnabled = false;
       
        this.context.translate(this.x,this.y);
        this.context.rotate(this.Angle);

        this.context.drawImage(
            monster.monsterSprite,
            this.numCol*monster.frameWidth,
            this.numRow*monster.frameHeight,
            monster.frameWidth,
            monster.frameHeight,
            -monster.frameWidth*this.scale/2,
            -monster.frameHeight*this.scale/2,
            monster.frameWidth*this.scale,
            monster.frameHeight*this.scale
        );

        this.context.restore();
        this.context.beginPath();
        this.context.fillStyle = "red";
        this.context.arc(this.x,this.y,this.radius,0,2*Math.PI);
        this.context.stroke();
    }
    update(secondPassed, shooterX,shooterY){
        this.x += this.vx * this.monsterSpeed * secondPassed;
        this.y += this.vy * this.monsterSpeed * secondPassed;
        let deltaX = shooterX - this.x;
        let deltaY = shooterY - this.y;
        this.Angle = Math.atan2(deltaY, deltaX) - Math.PI/2;
    }
    isCollision(gun){
        let distance = (this.x - gun.x)*(this.x - gun.x) + (this.y - gun.y)*(this.y - gun.y );
        return distance <= (this.radius + gun.radius)*(this.radius + gun.radius)
    }
    // monsterAngle(gun){
    //     let X = gun.x - this.x;
    //     let Y = gun.y - this.y;

    //     this.Angle = Math.atan2(Y,X);
    // }
}