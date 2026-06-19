class GameUI{
    constructor(context,canvas,x,y,width,height){
        this.context = context;
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

class bulletUI extends GameUI{
    static bulletUI;
    static col = 2;
    static frameWidth =0;
    static frameHeight = 0;
    constructor(context, canvas, x, y, width, height){
        super(context,canvas,x,y,width,height);

        this.loadImage();
    }
    loadImage(){
        bulletUI.bulletUI = new Image();
        bulletUI.bulletUI.src = "assetGame/bullet.png";
        bulletUI.bulletUI.onload = function(){
            bulletUI.frameWidth = bulletUI.bulletUI.width/bulletUI.col;
            bulletUI.frameHeight = bulletUI.bulletUI.height;
        }
    }
    draw(numBullet){
        this.context.imageSmoothingEnabled = false;
        let maxbullet = 6;
        let margin = 50;
    
        let bulletWidth = this.width;
        let bulletHeight = bulletWidth * (bulletUI.frameHeight/bulletUI.frameWidth);

        for(let i=0;i<maxbullet;i++){

            let posX= this.x + (i*margin);
            let posY = this.y;

            let drawX = 0;
            if(i>numBullet) drawX = bulletUI.frameWidth;
            this.context.drawImage(
                bulletUI.bulletUI,
                drawX,
                0,
                bulletUI.frameWidth,
                bulletUI.frameHeight,
                posX,
                posY,
                bulletWidth,
                bulletHeight
            );
        }   
    }
}

class heartUI extends GameUI{
    static heart;
    constructor(context,canvas,x,y,width){
        super(context,canvas,x,y,width,0);

        this.heartValue = 3;
        this.loadImage();
    }
    loadImage(){
        heartUI.heart = new Image();
        heartUI.heart.src = 'assetGame/heart.png';
    }
    draw(){
        this.context.imageSmoothingEnabled = false;
        let heartSize = this.width;
        let margin = 60;
        let x = this.x ;
        for(let i=0;i<this.heartValue;i++){
            x = x +margin; 
            this.context.drawImage(
                heartUI.heart,
                x,
                this.y,
                heartSize,
                heartSize
            );
        }
    }
    hurt(){
        this.heartValue--;
    }
}
//Score UI game
class Score extends GameUI{
    static scoreBoard;
    constructor(context,canvas,x,y,width,height){
        super(context,canvas,x,y,width,height);

        this.gameScore = 0;
        this.maxScore = 0;
        this.loadImage();
    }
    loadImage(){
        Score.scoreBoard = new Image();
        Score.scoreBoard.src = "assetGame/scoreBoard.png";
    }
    draw(){
        this.context.imageSmoothingEnabled = false;
        let scoreWidth = this.width;
        let scoreHeight = scoreWidth *(Score.scoreBoard.height/Score.scoreBoard.width);
        this.context.drawImage(
            Score.scoreBoard,
            this.x,
            this.y,
            scoreWidth,
            scoreHeight
        );
        this.context.beginPath();

        this.context.font = "Bold 20px Arial";
        this.context.textAlign = "center";
        let posX = this.x + scoreWidth/2;
        let posY = this.y + scoreHeight/2+10;
        this.context.fillText(this.gameScore,posX,posY);
    }
    settleScore(gameScore){
        this.gameScore += gameScore;
        this.maxScore += gameScore;
    }
    reset(){
        this.gameScore =0;
        this.maxScore =0;
    }
}

//Upgrade UI game
class UpgradeUI extends GameUI{
    static boardUpgrade;
    constructor(context,canvas,x,y,width){
        super(context,canvas,x,y,width,0);
       
       this.loadImage();
    }
    loadImage(){
        UpgradeUI.boardUpgrade = new Image();
        UpgradeUI.boardUpgrade.src = 'assetGame/BoardUpgrade.png';
        UpgradeUI.boardUpgrade.onload =()=>{
            this.BoardWidth = this.width;
            this.BoardHeight = this.BoardWidth * (UpgradeUI.boardUpgrade.height/UpgradeUI.boardUpgrade.width);
      
            this.createUpgradeSection(this.x,this.y,this.BoardWidth,this.BoardHeight);
        };
    }
    draw(){
        this.context.imageSmoothingEnabled = false;
        this.context.drawImage(
            UpgradeUI.boardUpgrade,
            this.x,
            this.y,
            this.BoardWidth,
            this.BoardHeight
        )
        this.fastReload.draw();
        this.increaseDamage.draw();
        this.decreaseRecoil.draw();
    }
    createUpgradeSection(x,y,width,height){
        let ySection1 = y+height/3*0.5;
        let ySection2 = y +(height/3) + (height/3)*0.5;
        let ySection3 = y +(height/3)*2 + (height/3)*0.5;
        let xSection = x+width/2;
        this.fastReload = new UIUpgradeHolder(this.context,this.canvas,xSection,ySection1,width-40,'assetGame/reloadIcon.png');
        this.increaseDamage = new UIUpgradeHolder(this.context,this.canvas,xSection, ySection2,width-40,'assetGame/increaseDamageIcon.png');
        this.decreaseRecoil = new UIUpgradeHolder(this.context,this.canvas,xSection,ySection3,width-40,'assetGame/recoilIcon.png');
    }
    reset(){
        this.fastReload.reset();
        this.increaseDamage.reset();
        this.decreaseRecoil.reset();
    }
}
class UIUpgradeHolder extends GameUI{
    static Holder;
    static points;
    static plusButton;
    constructor(context,canvas,x,y,width, srcImage){
        super(context,canvas,x,y,width,0);
        

        this.loadImage();
        this.IconImage = new Image();
        this.IconImage.src = srcImage;
        this.numPoint = 0;
        this.numPrice = 30;
    }
    loadImage(){
        UIUpgradeHolder.Holder = new Image();
        UIUpgradeHolder.Holder.src = 'assetGame/UIHolder.png';

        UIUpgradeHolder.points = new Image();
        UIUpgradeHolder.points.src = 'assetGame/pointIncrease.png';

        UIUpgradeHolder.plusButton = new Image();
        UIUpgradeHolder.plusButton.src = 'assetGame/plusButton.png';
    }
    draw(){
        this.context.imageSmoothingEnabled = false;
        let holderWidth = this.width;
        let holderHeight = holderWidth * (UIUpgradeHolder.Holder.height/UIUpgradeHolder.Holder.width);

        let holderDrawX =  this.x-holderWidth/2;
        let holderDrawY =  this.y-holderHeight/2;
        this.context.drawImage(
            UIUpgradeHolder.Holder,
            holderDrawX,
            holderDrawY,
            holderWidth,
            holderHeight
        );
        
        this.context.drawImage(
            this.IconImage,
            holderDrawX+20,
            this.y-holderHeight/2*0.5,
            holderWidth*0.2,
            holderWidth*0.2
        );

        this.context.filStyle = 'white';
        this.context.font ='Bold 15px Arial';
        this.context.textAlign = 'center';
        this.context.fillText(
            this.numPrice,
            holderDrawX+20+(holderWidth*0.2)/2,
            (this.y-holderHeight/2*0.5) + holderWidth*0.27
        )


        let margin = 20;
        let x=holderDrawX+47;
        for(let i=0;i<this.numPoint;i++){
            x = x + margin;
            this.context.drawImage(
                UIUpgradeHolder.points,
                x,
                this.y - holderHeight/2*0.5,
                holderWidth*0.08,
                (holderWidth*(UIUpgradeHolder.points.height/UIUpgradeHolder.points.width))*0.08
            );
        }
        this.plusButtonX=holderDrawX+this.width-25-(holderWidth*0.3)/2;
        this.plusButtonY=this.y-holderHeight/2*0.5;
        this.plusButtonSize=holderWidth*0.2;
        this.context.drawImage(
            UIUpgradeHolder.plusButton,
            this.plusButtonX,
            this.plusButtonY,
            this.plusButtonSize,
            this.plusButtonSize
        );
    }
    isTouchingPlusButton(mouseX,mouseY){
        return mouseX > this.plusButtonX &&
                mouseX < this.plusButtonX + this.plusButtonSize &&
                mouseY > this.plusButtonY && 
                mouseY < this.plusButtonY + this.plusButtonSize;
    }

    upgradeGun(type, value, scoreUI){
      
        if (scoreUI.gameScore < this.numPrice || this.numPoint >= 5) {
            return value; 
        }
        
        scoreUI.gameScore -= this.numPrice;
        
        this.numPrice = this.numPrice * 2;
        this.numPoint += 1;
        
        switch(type){
            case 'fastReload':
                return value - 0.1; 
            case 'increaseDamage':
                return value + 0.5;
            case 'decreaseRecoil':
                return value + 20; 
        }
        return value;
    }
    reset(){
        this.numPrice =30;
        this.numPoint = 0;
    }
}
//Start game
class GameStart extends GameUI{
    static startgameButton;
    static titleGame;
    constructor(context, canvas, x, y, width, height){
        super(context,canvas,x,y,width,height);

        this.loadImage();
    }
    loadImage(){
        GameStart.startgameButton = new Image();
        GameStart.startgameButton.src = "assetGame/shootMonsterButton.png";
        GameStart.titleGame = new Image();
        GameStart.titleGame.src = "assetGame/Tittle.png";
    }
    draw(){
        //Vẽ tiêu đề
        this.context.imageSmoothingEnabled = false;
        let titleWidth = this.canvas.width/2;
        let tilleHeight = titleWidth * (GameStart.titleGame.height/GameStart.titleGame.width);
        let drawX = this.canvas.width/2 - titleWidth/2*1.5;
        let drawY = this.canvas.height/2-300;

        this.context.drawImage(
            GameStart.titleGame,
            drawX,
            drawY,
            titleWidth*1.5,
            tilleHeight*1.5
        );

        //Vẽ button
        this.buttonWidth = this.width;
        this.buttonHeight = this.buttonWidth * (GameStart.startgameButton.height/GameStart.startgameButton.width);
        this.drawx = this.x - this.buttonWidth/2;
        this.drawy = this.y +50;
        
        this.context.beginPath();
        this.context.drawImage(
            GameStart.startgameButton,
            this.drawx,
            this.drawy,
            this.buttonWidth,
            this.buttonHeight
        );
    }
    isTouchingButton(mouseX, mouseY){
        return mouseX>this.drawx &&
                mouseX<this.drawx+this.buttonWidth &&
                mouseY>this.drawy&&
                mouseY<this.drawy+this.buttonHeight;
    }
}
//Restart game
class restartGame extends GameUI{
    static RestartButtonUI
    constructor(context,canvas,x,y,width){
        super(context,canvas,x,y,width,0);
        this.loadImage();
    }
    loadImage(){
        restartGame.RestartButtonUI = new Image();
        restartGame.RestartButtonUI.src  = 'assetGame/shootMonsterButton_Again.png';
    }
    draw(){
        //Vẽ GAME OVER
        this.context.imageSmoothingEnabled = false;
        this.context.font = 'Bold 35px Arial';
        this.context.textAlign = 'center';
        this.context.textBaselign = 'middle';
        this.context.fillText('!GAME OVER!',this.canvas.width/2,this.canvas.height/2);

        //Vẽ button
        this.buttonWidth = this.width;
        this.buttonHeight = this.buttonWidth * (restartGame.RestartButtonUI.height/restartGame.RestartButtonUI.width);
        this.drawx = this.x - this.buttonWidth/2;
        this.drawy = this.y +50;
        
        this.context.beginPath();
        this.context.drawImage(
            restartGame.RestartButtonUI,
            this.drawx,
            this.drawy,
            this.buttonWidth,
            this.buttonHeight
        );
    }
    isTouchingButton(mouseX, mouseY){
        return mouseX>this.drawx &&
                mouseX<this.drawx+this.buttonWidth &&
                mouseY>this.drawy&&
                mouseY<this.drawy+this.buttonHeight;
    }
}
