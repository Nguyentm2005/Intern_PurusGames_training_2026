    "use strict";

    let canvas;
    let context;
    let game;
    window.onload = function(){
        canvas = document.getElementById('theCanvas');
        canvas.width = 1000;
        canvas.height = 700;
        context = canvas.getContext('2d');
        game = new gameWorld(context,canvas);
        window.requestAnimationFrame((timeStamp) => game.gameLoop(timeStamp));
    }
    class gameWorld{
        static background;
        constructor(context,canvas){
            this.context = context;
            this.canvas = canvas;

            this.run = false;
            this.gameOver = false;
            this.oldTimestamp =0;
            this.secondPassed=0;

            this.bulletSpeed = 2000;
            
            this.timer = 0;
            this.timerAccountant = 2.5;
            this.increaseLevel = 100;
            this.createShooter();
            this.createUI();
            this.loadImage();
            this.listenInput();
            this.bulletInstance = [];
            this.monsterlist = [];
            
        }
        gameLoop(Timestamp){
            this.secondPassed = (Timestamp - this.oldTimestamp)/1000;
            this.oldTimestamp = Timestamp;

            this.update(this.secondPassed);
            this.draw();
            window.requestAnimationFrame((nextTimestamp) => this.gameLoop(nextTimestamp));
        }
        update(secondPassed){
            if(this.run && !this.gameOver){
                this.shooterGun.update(secondPassed);
                this.bulletInstance.forEach(bulletOutput => bulletOutput.update(secondPassed));
                this.monsterlist.forEach(monsterInstance => monsterInstance.update(secondPassed,this.shooterGun.x,this.shooterGun.y));
                this.timer+=secondPassed;
                this.increaseMonsterOvertime();
            } 
        }
        draw(){
            this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
            if(!this.run && !this.gameOver){
                this.drawBackground();
                this.GameStart.draw();
            }
            else if(this.run && !this.gameOver){
            
                this.drawBackground();
                this.bulletInstance.forEach(bulletOutput => bulletOutput.draw());
                this.shooterGun.draw();
                this.BulletUI.draw(this.shooterGun.bulletArmor);
                this.monsterlist.forEach(monsterInstance => monsterInstance.draw());
                this.ScoreUI.draw();
                this.UpgradeUI.draw();
                this.heartUI.draw();
            }
            else if(!this.run && this.gameOver){
                this.drawBackground();
                this.RestartGameUI.draw();
            }
        }
        detectColision(){
            //đạn va chạm quái
            for(let i=0;i<this.bulletInstance.length;i++){
                let obj = this.bulletInstance[i];
                for(let j=0;j<this.monsterlist.length;j++){
                    let obj2 = this.monsterlist[j];
                    if(obj.isCollisionWithMonster(obj2)){
                    
                        this.bulletInstance.splice(i,1);
                        obj2.heartValue -= this.shooterGun.bulletDamage;
                        if(obj2.heartValue<=0){
                            this.monsterlist.splice(j,1);
                            switch(obj2.maxHeartValue){
                                case 1:
                                    this.ScoreUI.settleScore(5);
                                    break;
                                case 2:
                                    this.ScoreUI.settleScore(10);
                                    break;
                                case 3:
                                    this.ScoreUI.settleScore(15);
                                    break;
                            }
                            
                        }
                    }
                }
            }
        
            //quái va chạm súng
            for(let i=0;i<this.monsterlist.length;i++){
                if(this.monsterlist[i].isCollision(this.shooterGun)){
                    this.monsterlist.splice(i,1);
                    this.heartUI.hurt();
                    if(this.heartUI.heartValue <=0){
                        this.gameOver = true;
                        this.run = false;
                    }
                }
            }
        }
        listenInput(){
            window.addEventListener('mousemove',event =>{
                this.shooterGun.MovingGun(this.canvaX(event.clientX),this.canvasY(event.clientY));
            });
            window.addEventListener('mousedown', event =>{
                if(!this.run && !this.gameOver){
                    if(this.GameStart.isTouchingButton(this.canvaX(event.clientX),this.canvasY(event.clientY))) this.run = true;
                }
                else if (!this.run && this.gameOver){
                    if(this.RestartGameUI.isTouchingButton(this.canvaX(event.clientX),this.canvasY(event.clientY))){
                        this.run = true;
                        this.gameOver = false;
                        this.resetGame();
                        console.log(this.run);
                        console.log(this.gameOver);
                    }
                }
                else if(this.run && this.UpgradeUI.fastReload.isTouchingPlusButton(this.canvaX(event.clientX),this.canvasY(event.clientY))){
                    console.log(this.ScoreUI.gameScore);
                    this.shooterGun.reloadDuraion = this.UpgradeUI.fastReload.upgradeGun('fastReload',this.shooterGun.reloadDuraion,this.ScoreUI);
                }
                else if(this.run && this.UpgradeUI.increaseDamage.isTouchingPlusButton(this.canvaX(event.clientX),this.canvasY(event.clientY))){
                    this.shooterGun.bulletDamage = this.UpgradeUI.increaseDamage.upgradeGun('increaseDamage',this.shooterGun.bulletDamage,this.ScoreUI);
                }
                else if(this.run && this.UpgradeUI.decreaseRecoil.isTouchingPlusButton(this.canvaX(event.clientX),this.canvasY(event.clientY))){
                    this.shooterGun.recoilForce = this.UpgradeUI.decreaseRecoil.upgradeGun('decreaseRecoil',this.shooterGun.recoilForce,this.ScoreUI);
                }
                else if(this.run && !this.gameOver){
                    let vx = Math.cos(this.shooterGun.Angle) * this.bulletSpeed;
                    let vy = Math.sin(this.shooterGun.Angle) * this.bulletSpeed;
                    if(this.shooterGun.bulletArmor<=-1){
                        this.shooterGun.reload();
                    }
                    if(this.shooterGun.bulletArmor>-1 && this.shooterGun.isShootAllowed){
                        let bulletOutput = this.createbullet(this.shooterGun.x,this.shooterGun.y,vx,vy,this.shooterGun.Angle);
                        this.shooterGun.bulletArmor -=1;
                        this.shooterGun.isShoot();
                        this.bulletInstance.push(bulletOutput);
                    }
                }  
                
            });
            window.addEventListener('keydown',event =>{
                if(event.code === 'KeyR'){
                    if (this.run && !this.shooterGun.isReload) {
                        this.shooterGun.reload();
                    }
                }
            });
        }
        canvaX(mouseX){
            let rect = this.canvas.getBoundingClientRect();
            return mouseX - rect.left;
        }
        canvasY(mouseY){
            let rect = this.canvas.getBoundingClientRect();
            return mouseY - rect.top;
        }
        createShooter(){
            let gunX = this.canvas.width / 2;
            let gunY = this.canvas.height - 50;
            this.shooterGun = new shooter(this.context,this.canvas,gunX,gunY,75);
        }
        createbullet(x,y,vx,vy,Angle){
            return new bullet(this.context,this.canvas,x,y,vx,vy,20,Angle);
        }
        createUI(){
            this.BulletUI = new bulletUI(this.context,this.canvas,0,this.canvas.height-100,100,100);
            this.GameStart = new GameStart(this.context,this.canvas,this.canvas.width/2, this.canvas.height/2,200,100);
            this.ScoreUI = new Score(this.context,this.canvas,this.canvas.width-100,this.canvas.height-100,100,100);
            this.UpgradeUI = new UpgradeUI(this.context,this.canvas,this.canvas.width-250,this.canvas.height-450,250);
            this.heartUI = new heartUI(this.context,this.canvas,0, 50,50);
            this.RestartGameUI = new restartGame(this.context,this.canvas,this.canvas.width/2, this.canvas.height/2,200,100);
        }
        increaseMonsterOvertime(){
            if(this.timer>this.timerAccountant){
                this.timer -=this.timerAccountant;
                if(this.monsterlist.length<=10){
                    this.spawnMonster();
                }
            }
            if(this.ScoreUI.maxScore > this.increaseLevel){
                this.timerAccountant -= 0.35;
                this.increaseLevel +=100;  
            }
            
            this.detectColision();
        }
        spawnMonster(){
            let minAngle = -2.2;
            let maxAngle = -0.9;

            let randomAngle = minAngle + Math.random()* (maxAngle-minAngle);
            let spawnRadius = 700;

            let x = this.shooterGun.x + Math.cos(randomAngle) * spawnRadius;
            let y = this.shooterGun.y + Math.sin(randomAngle) * spawnRadius;

            let vx = -Math.cos(randomAngle) ;
            let vy = -Math.sin(randomAngle) ;

            let monsterLv = Math.floor(Math.random() * 3);
            this.monsterlist.push(new monster(this.context,this.canvas,x,y,vx,vy,10,monsterLv));
        }
        loadImage(){
            gameWorld.background = new Image();
            gameWorld.background.src = 'assetGame/background.png';
        }
        drawBackground(){   
            this.context.save();
            this.context.imageSmoothingEnabled =false;
            let bgWidth = this.canvas.width*1.5;
            let bgheight = bgWidth * (gameWorld.background.height/gameWorld.background.width);
            this.context.translate(this.canvas.width/2,this.canvas.height);
            this.context.drawImage(gameWorld.background,-bgWidth/2,-bgheight/2,bgWidth,bgheight);
            this.context.restore();
        }
        resetGame() {
            this.run = true;
            this.gameOver = false;
            this.timer = 0;
            this.bulletInstance = [];
            this.monsterlist = [];
            this.heartUI.heartValue = 3; 
            this.shooterGun.bulletArmor = 5; 
            
            this.shooterGun.x = this.canvas.width / 2;
            this.shooterGun.reset();
            this.UpgradeUI.reset();
            this.ScoreUI.reset();
        }
    }