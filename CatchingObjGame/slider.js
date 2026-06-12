class slider extends GameOject{
    static sprite;
    constructor(context,x,y,width,height,typeObj) {
        super(context,x,y,width,height,typeObj)

    }
    draw(){
        this.context.fillstyle = "red";
        this.context.beginPath();
        this.context.fillRect(this.x,this.y,this.width,this.height);

    }
    moveTo(x,minx,maxx){
        this.x = x-this.width/2;
        this.keepInside(minx,maxx);
    }
    keepInside(minx,maxx){
        if(this.x<minx) this.x = 0;
        else if(this.x +this.width >maxx) this.x = maxx-this.width;
    }
    loadImage(){
        slider.sprite = new Image();
        slider.sprite,src = "";
        slider.sprite.onload = function(){

        }
    }
    isCollisionWithObj(obj) {
        let padding = 5; // Trừ hao 5 pixel cho "vừa khít"
        return (
            this.x + padding < obj.x + obj.width &&
            this.x + this.width - padding > obj.x &&
            obj.y + obj.height >= this.y &&
            obj.y < this.y + this.height
        );
    }
}