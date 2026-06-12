//@ts-check
class sliderBrick extends gameObject{
    static sprite;
    static spriteWidth = 32;
    static spriteHeight = 16;
    constructor(context,x,y,width,height,color) {
        super(context,x,y,0,0,color)
        this.width = width;
        this.height = height;
        this.loadImage();
    }
    draw(){
        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.fillRect(this.x,this.y,this.width,this.height);

            this.context.imageSmoothingEnabled = false;
            let scale = this.width/sliderBrick.spriteWidth;
            let heightSlider = sliderBrick.spriteHeight*scale;
            let widthSlider = this.width;
            this.context.drawImage(
                sliderBrick.sprite, 
               ( this.x + this.width/2)-widthSlider/2, 
                (this.y +this.height/2)-heightSlider/2, 
                widthSlider, 
                heightSlider 
            );
    }
    sliderInsideCanvas(minx,maxx){
        if(this.x<minx){
            this.x = 0;
        }
        else if(this.x > maxx){
            this.x = maxx ;
        }
    }
    loadImage() {
        if (!sliderBrick.sprite) {
            sliderBrick.sprite = new Image();
            
            // Đảm bảo đường dẫn này đúng với cấu trúc thư mục
            sliderBrick.sprite.src = "assetGame/slider.png";
    
            sliderBrick.sprite.onload = () => {
                console.log("Slider Image Loaded Success!");
            };
        }
    }
    moveTo(x,minx,maxx){
        this.x = x-this.width/2;
        this.sliderInsideCanvas(minx,maxx);
    }
    stop(){
        this.vx = 0;
    }
    collisionWithBall(ball){
        return (ball.y + ball.radius >= this.y && 
                ball.x + ball.radius > this.x &&
                ball.x - ball.radius < this.x + this.width);
    }
    
}