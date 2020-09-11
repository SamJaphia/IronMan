(() => {

const DISPLAY = document.querySelector("canvas").getContext('2d', { alpha:false });

const keys = [];

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

const tile_size = 166;

const MAP = {
    height: 10,
    width: 10,
    tiles: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 1, 0, 0, 0, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]
}; 

var tile_pic = new Image();
tile_pic.src = "Images/tilemap.png";

function renderTiles() {
    var map_index = 0;

    const mapTileSize = 24
    for (var left = 0; left < MAP.width * mapTileSize; left += mapTileSize) {
        for (var top= 0; top < MAP.height* mapTileSize; top += mapTileSize) {
            var tile_value = MAP.tiles[map_index];
            
            DISPLAY.drawImage(tile_pic, tile_value * tile_size, 0, tile_size, tile_size, top, left, mapTileSize, mapTileSize);
    
            map_index ++;   
        }
    }
}

function resize(event) {
    var height = document.documentElement.clientHeight;
    var width = document.documentElement.clientWidth;

    if (width / height < MAP.width_height_ratio) {
        height = Math.floor(width / MAP.width_height_ratio);
    }else                                        {
        width = Math.floor(width * MAP.width_height_ratio);
    }
    DISPLAY.canvas.style.height = height + 'px';
    DISPLAY.canvas.style.width = width + 'px';

}

window.addEventListener('resize', resize)

resize()

const playerSprite = new Image();
playerSprite.src = "./Images/Ironman.png";

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

function handlePlayerFrame() {
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
    elapsed = now - then;

    DISPLAY.clearRect(0, 0, DISPLAY.width, DISPLAY.height);
    renderTiles();
    DISPLAY.drawImage(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width * 3, player.height * 3);

    if(elapsed > fpsInterval){
        then = now - (elapsed % fpsInterval);
        movePlayer();
        handlePlayerFrame();
    }
}

startAnimating(10);

})()