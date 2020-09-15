(() => {

const DISPLAY = document.querySelector("canvas").getContext('2d', { alpha:false, desynchronized:false});
const buffer = document.createElement('canvas').getContext('2d', { alpha: false, desynchronized: true});


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
tile_size = 16;

const MAP = {

columns: 10,
rows: 10,
height: 10 * tile_size,
width: 10* tile_size,

tiles: [
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
=======
    height: 16,
    width: 16,
    tiles: [
        0, 1, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,
        0, 1, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,
        0, 1, 0, 0, 1, 0, 0, 0, 0, 0,0,0,0,0,0,0,
        0, 1, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,
        0, 1, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,
        0, 1, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,
        0, 1, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,
        0, 1, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,
        0, 1, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,
        0, 1, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,
        0, 1, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,
        0, 1, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,
        0, 1, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,
        0, 1, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,
        0, 1, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,
        0, 1, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,
    ]
>>>>>>> Stashed changes
}; 

var tile_pic = new Image();
tile_pic.src = "Images/Background6.png";

function renderTiles(){
    var map_index = 0;

    for (var top= 0; top < MAP.height; top += tile_size) {
        for (var left = 0; left < MAP.width; left += tile_size){
            var tile_value = MAP.tiles[map_index]
            
            buffer.fillStyle = tile_pic;

            buffer.fillRect(left, top, tile_size, tile_size)

            map_index ++;   
            
        }
    }
}
function renderDisplay(){

DISPLAY.drawImage(buffer.canvas, 0, 0)
}

function resize(event) {

    var height = document.documentElement.clientHeight;
    var width = document.documentElement.clientWidth;

    if (width / height < MAP.width_height_ratio) height = Math.floor(width / MAP.width_height_ratio);
    else                                         width = Math.floor(width * MAP.width_height_ratio);

    DISPLAY.canvas.style.height = height + 'px';
    DISPLAY.canvas.style.width = width + 'px';

}

buffer.canvas.width = DISPLAY.canvas.width=MAP.width;
buffer.canvas.height = DISPLAY.canvas.height= MAP.height;


renderTiles();

renderDisplay();

window.addEventListener('resize', resize)

resize()



const playerSprite = new Image();
playerSprite.src="./Images/Ironman.png"
const background = new Image();


function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    DISPLAY.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
}

window.addEventListener("keydown", function(e){
    keys[e.key] = true;
    player.moving = true
  
});

window.addEventListener("keyup", function(e) {
    delete keys[e.key]
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
        DISPLAY.clearRect(0,0,DISPLAY.width,DISPLAY.height);
        DISPLAY.drawImage(background, 0 ,0, 600, 600);
        drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width * 3, player.height * 3);
        movePlayer();
        handlePlayerFrame();
    }
}

startAnimating(10);

})()