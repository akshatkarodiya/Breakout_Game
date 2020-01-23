let canvas = document.getElementById("myCanvas");
let ct = canvas.getContext("2d");
let x_coordinate = canvas.width/2;
let y_coordinate = canvas.height/2;
let d_x = 2;
let d_y = -2;
let ballRadius=10;
let paddleHeight = 10;
let paddleWidth = 75;

let paddleX = (canvas.width-paddleWidth) / 2
let  rightPressed=false;
let leftPressed=false;

let brickRoCount = 3;
let brickColumnCount = 5;
let brickW = 75;
let brickH = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let bricks=[];
let score=0;
let lives =3;

for(let i=0;i<brickColumnCount;i++){
    bricks[i]=[];
    for(let j=0;j<brickRoCount;j++){
        bricks[i][j]={ x:0, y:0, status: 1};
    }
}
document.addEventListener("keydown" , keyDownHandler ,false);
document.addEventListener("keyup" , keyUpHandler ,false);
document.addEventListener("mousemove",mouseMoveHandler, false);
function mouseMoveHandler(e){
    let relativeX=e.clientX - canvas.offsetLeft;
    if(relativeX >0 && relativeX <canvas.width){
        paddleX = relativeX -paddleWidth/2;
    }
}
function keyDownHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed=true;
    }
    if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed=true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function collisionDetection(){
    for(let i=0;i < brickColumnCount;i++){
        for(let j=0;j<brickRoCount;j++){
            let b= bricks[i][j];
            if(b.status == 1){
            if(x_coordinate>b.x && x_coordinate< b.x+brickW && y_coordinate>b.y &&y_coordinate< b.y+brickH){
                d_y = -d_y;
                b.status = 0;
                score++;
                if(score==brickColumnCount*brickRoCount){
                    alert("YOU WIN< CONGRATULATION");
                    clearInterval(interval);
                }
            }
        }
        }
    }
}
function drawScore(){
    ct.font="16px Arial";
    ct.fillStyle="#0095DD";
    ct.fillText('Score:'+score,8,20);
}
function drawLives(){
    ct.font = "16 px Arial"
    ct.fillStyle="#0095DD";
    ct.fillText("Lives :"+lives,canvas.width-65, 20);
}
function drawBall(){
   
    ct.beginPath();
    ct.arc(x_coordinate,y_coordinate,ballRadius,0,Math.PI*2);
    ct.fillStyle="#0095DD";
    ct.fill();
    ct.closePath();}
function drawPaddle() {
        ct.beginPath();
        ct.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ct.fillStyle = "#0095DD";
        ct.fill();
        ct.closePath();
        } 
        function drawBricks(){
            for(let i=0;i<brickColumnCount;i++){
                for(let j=0;j<brickRoCount;j++){
                    if(bricks[i][j].status == 1){
                    let brickX=(i*(brickW+brickPadding))+brickOffsetLeft;
                    let brickY=(j*(brickH+brickPadding))+brickOffsetTop;
                    bricks[i][j].x=brickX;
                    bricks[i][j].y=brickY;
                    ct.beginPath();
                    ct.rect(brickX, brickY, brickW,brickH);
                    ct.fillStyle="#F4B400";
                    ct.fill();
                    ct.closePath();
                    }
                }
            }
        }           
   
function draw(){
    ct.clearRect(0,0, canvas.width, canvas.height);
    drawBricks();
     drawBall();
    
      drawPaddle();
      drawScore();
      drawLives();
      collisionDetection();
    if(x_coordinate + d_x > canvas.width-ballRadius|| x_coordinate + d_x < ballRadius) {

         d_x = -d_x;
     }
    if(y_coordinate + d_y < ballRadius){
        d_y = -d_y;
     } else if(y_coordinate + d_y > canvas.height-ballRadius ) {
        if(x_coordinate>paddleX && x_coordinate<paddleX+paddleWidth){
            d_y=-d_y;
        }
        else{
            lives--;
             if(!lives){
               alert("GAME OVER");
               document.location.reload();
        
        }
    
            else {
              x_coordinate = canvas.width/2;
              y_coordinate = canvas.height/2;
              d_x = 2;
              d_y = -2;
              paddleX =(canvas.width-paddleWidth)/2;

    }
}
        
      }
    

      if(rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if(leftPressed) {
        paddleX -= 7;
        if (paddleX < 0){
            paddleX = 0;
        }
    }
    x_coordinate += d_x;
    y_coordinate += d_y;
    requestAnimationFrame(draw);
}

draw();
