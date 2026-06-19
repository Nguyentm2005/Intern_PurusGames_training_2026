class shooter extends gameObject{
    static sprite;
    constructor(context,canvas,x,y,radius){
        super(context,canvas,x,y,radius);

        this.bulletArmor =5;
        this.recoil = 0;
        
        this.isShootAllowed = true;
        this.reloadTime = 0;

        this.isReload = false;
        this.reloadDuraion = 0.7;
        this.bulletDamage = 0.5;
        this.recoilForce = 70;
        this.reloadProgress = 0;

        this.loadImage();
        
    }
    loadImage(){
        shooter.sprite = new Image();
        shooter.sprite.src = "assetGame/magnumGun.png";
        
    }   
    update(secondPassed){
        if(!this.isReload){
            if(this.recoil>0){
                this.recoil -= this.recoilForce * secondPassed;
                this.isShootAllowed = false;
            }
            else this.isShootAllowed = true;
        }
        else if(this.isReload){
            this.reloadProgress += secondPassed/this.reloadDuraion;
            if(this.reloadProgress>=1){
                this.bulletArmor = 5;
                this.isReload = false;
            }
        }
        

        // if(this.bulletArmor<=-1){
        //     this.reloadTime +=secondPassed;
        //     if(this.reloadTime>2){
        //         this.reloadTime -=2;
        //         this.reload();
        //     }
        // }
    }
    draw(){
        this.context.save();
        let shooterWidth = this.radius*2;
        let shooterHeight = shooterWidth * (shooter.sprite.height / shooter.sprite.width);
        this.context.translate(this.x-Math.cos(this.Angle)*this.recoil,this.y-Math.sin(this.Angle)*this.recoil);
        if(this.isReload && Math.cos(this.Angle)>0){
            let reloadAngle = this.reloadProgress * (2*Math.PI);
            this.context.rotate(this.Angle + reloadAngle);
        }
        else if(this.isReload && Math.cos(this.Angle)<0){
            let reloadAngle = this.reloadProgress * (2*Math.PI);
            this.context.rotate(this.Angle - reloadAngle);
        }
        else{
            this.context.rotate(this.Angle);
        }
        if(Math.cos(this.Angle)<0){
            this.context.scale(1,-1);
        }
        this.context.drawImage(shooter.sprite,-shooterWidth/4,-shooterHeight/2+15,shooterWidth,shooterHeight);
        this.context.restore();
    }
    MovingGun(mouseX,mouseY){
        let distanceX = mouseX - this.x;
        let distanceY = mouseY - this.y;

        this.Angle = Math.atan2(distanceY,distanceX);
    }
    reload(){
       if(this.isReload) return;
       this.reloadProgress =0;
       this.isReload = true;
    }
    isShoot(){
        if(this.isReload) return;
        this.recoil = 30;
    }
    reset(){
        this.reloadDuraion = 0.7;
        this.bulletDamage = 0.5;
        this.recoilForce = 70;
    }
}
//-1.57 -> 1.57