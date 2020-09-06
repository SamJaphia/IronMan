const canvas = document.getElementById("canvas1")
const context = canvas.getContext('2d')
canvas.width = 3000;
canvas.height = 2000;

var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;

const keys =[];

const player = {
    x: 500,
    y: 800,
    width:55.4,
    height: 83,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving:false
};

this.columns = 10;
this.rows = 10;
this.tile_size = 16;
this.map = [
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
]



const playerSprite = new Image();
playerSprite.src="./Images/Good one121.png"
const background = new Image();


function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
}

window.addEventListener("keydown", function(e){
    keys[e.keyCode] = true;
    player.moving = true
  
});

window.addEventListener("keyup", function(e) {
    delete keys[e.keyCode]
    player.moving = false
});

function movePlayer() {
    if (keys[38] && player.y > 100) {
        player.y -= player.speed;
        player.frameY = 3;
        
    }
    if (keys[37] && player.x > 0){
        player.x -= player.speed;
        player.frameY = 1;
        
        
    }
    if (keys[39] && player.x > 0) {
        player.x += player.speed;
        player.frameY =2;
        
    }
    if (keys[40] && player.y > 0){
        player.y += player.speed;
        player.frameY = 0;
        
    }
}

function handlePlayerFrame(){
    if (player.frameX < 3 && player.moving) player.frameX++;
    else player.frameX = 0;
}

var tile_pic = new Image();
function loop() {

    window.requestAnimationFrame(loop)
    var height = document.documentElement.clientHeight;
    var width = document.documentElement.clientWidth;

    context.canvas.height = height;
    context.canvas.width = width;

tile_pic.addEventListener("load", (event)=> {loop(); });
console.log(tile_pic)

tile_pic.src = "Images/Background6.png";



for (let x = 0; x < columns; x++){
    for (let y = 0; y < rows; y++){
        let value =map[y * columns + x];
        let tile_x = x * tile_size;
        let tile_y = y* tile_size;
        context.drawImage(tile_pic, value * tile_size, 0, tile_size, tile_size, tile_x, tile_y, player.x * 3, player.y * 3)
    }
}
}

let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps){
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate(){
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now -then;
    if(elapsed > fpsInterval){
        then = now -(elapsed % fpsInterval);
        context.clearRect(0,0,canvas.width, canvas.height);
        context.drawImage(background, 0 ,0, 600, 600);
        drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width * 3, player.height * 3);
        movePlayer();
        handlePlayerFrame();
    }
}

startAnimating(10);

