// @ts-check
//Brick file
// static sprite;
//     static numColumn = 2; // Giả sử ảnh có 2 cột
//     static numRow = 3;    // Giả sử ảnh có 3 hàng
//     static frameWidth = 0;
//     static frameHeight = 0;

//     constructor(context, x, y, width, height, color, frame) {
//         super(context, x, y, 0, 0, color);
//         this.width = width;
//         this.height = height;
//         this.isBreak = false;
//         this.frame = frame;
//         this.loadImage();
//     }

//     draw() {
//         if (!brick.sprite || !brick.sprite.complete || brick.frameWidth === 0) {
//             // Vẽ hình chữ nhật dự phòng nếu ảnh chưa load
//             this.context.fillStyle = this.color;
//             this.context.fillRect(this.x, this.y, this.width, this.height);
//             return;
//         }

//         // 1. Xác định vị trí ô ảnh trong Sprite Sheet (Source)
//         let col = this.frame % brick.numColumn;
//         let row = Math.floor(this.frame / brick.numColumn);
        
//         let sourceX = col * brick.frameWidth;
//         let sourceY = row * brick.frameHeight;

//         // 2. Tính toán Scale để ảnh khớp với Hitbox mà không méo
//         let scale = this.width / brick.frameWidth;
//         let drawW = this.width;
//         let drawH = brick.frameHeight * scale;

//         // Căn giữa ảnh vào hitbox theo chiều dọc (imgY)
//         let drawPosY = this.y + (this.height / 2) - (drawH / 2);

//         this.context.imageSmoothingEnabled = false;
//         this.context.drawImage(
//             brick.sprite,
//             sourceX, sourceY, brick.frameWidth, brick.frameHeight, // Cắt từ đâu (Source)
//             this.x, drawPosY, drawW, drawH                        // Vẽ ở đâu (Destination)
//         );
//     }

//     loadImage() {
//         if (!brick.sprite) {
//             brick.sprite = new Image();
//             brick.sprite.src = "assetGame/brick.png";
//             brick.sprite.onload = () => {
//                 brick.frameWidth = brick.sprite.width / brick.numColumn;
//                 brick.frameHeight = brick.sprite.height / brick.numRow;
//                 console.log("Brick Sprite Loaded: ", brick.frameWidth, "x", brick.frameHeight);
//             };
//         }
//     }

    class brick extends gameObject{
        //image later
        static sprite;
        static numColumn = 2;
        static numRow = 3;
        static frameWidth = 0;
        static frameHeight =0;
        constructor(context,x,y,width,height,color,frame){
            super(context,x,y,0,0,color)
            this.width = width;
            this.height = height;
            this.isBreak = false;
            this.frame = frame;
            this.loadImage();
        }

        draw(){
            this.context.fillStyle = this.color;
            this.context.beginPath();
            this.context.fillRect(this.x, this.y,this.width,this.height);
            
            // this.context.drawImage();
           
            

            let column = this.frame%brick.numColumn;
            let row = Math.floor(this.frame/brick.numColumn);

            let sX = column * brick.frameWidth;
            let sY = row * brick.frameHeight;

            let scale = this.width/ brick.frameWidth;

            let spriteWidth = this.width;
            let spriteHeight = brick.frameHeight * scale;

            
            let drawPosY = this.y + (this.height / 2) - (spriteHeight / 2);

            this.context.drawImage(brick.sprite,sX,sY,brick.frameWidth,brick.frameHeight,
                this.x,
                drawPosY,
                spriteWidth,
                spriteHeight
            );
        }
        loadImage(){
            if(!brick.sprite){
                brick.sprite = new Image();
                brick.sprite.src = "assetGame/brick.png";
                brick.sprite.onload = function(){
                    brick.frameWidth = brick.sprite.width / brick.numColumn;
                    brick.frameHeight = brick.sprite.height / brick.numRow;
                };  
            }
            
        }
        isCollisionWithBall(ball){
            return !(ball.y - ball.radius < this.y ||
                    ball.y + ball.radius > this.y + this.height ||
                    ball.x + ball.radius < this.x ||
                    ball.x - ball.radius > this.x + this.width);
                    // return !(
                    //     ball.x + ball.radius < this.x ||
                    //     ball.x - ball.radius > this.x + this.width ||
                    //     ball.y + ball.radius < this.y ||
                    //     ball.y - ball.radius > this.y + this.height
                    // );
        }
    }