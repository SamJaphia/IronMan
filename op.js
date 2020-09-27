(() => {

const DISPLAY = document.querySelector("canvas").getContext('2d', { alpha:false });

const keys = [];

const player = {
    x: 100,
    y: 100,
    width: 55,
    height: 83,
    screenHeight: 27,
    screenWidth: 18,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving:false
};



const tile_size = 166;

const mapTileSize = 24;

const MAP = {

    width_height_ratio: 10/10,

    height: 10,
    width: 10,
    tiles: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
    ],
}; 

const mapWidth = MAP.width * mapTileSize;
const mapHeight = MAP.height * mapTileSize;

var tile_pic = new Image();
tile_pic.src = "Images/tilemap.png";

function renderTiles() {
    var map_index = 0;

    for (var left = 0; left < MAP.height * mapTileSize; left += mapTileSize) {
        for (var top = 0; top < MAP.width * mapTileSize; top += mapTileSize) {
            var tile_value = MAP.tiles[map_index];

            DISPLAY.drawImage(tile_pic, tile_value * tile_size, 0, tile_size, tile_size, top, left, mapTileSize, mapTileSize)   
            map_index ++;
        }
    }
}

function collisionTime(player) {
    if(MAP > player || MAP < player || MAP < player || MAP > player) {

        return false;
    }

    return true;
}
function resize(e) {

    const rectangle = DISPLAY.canvas.getBoundingClientRect()

    const output = document.createElement('p')

    output.style.frameY = rectangle.frameY + 'px';
    output.style.frameX =rectangle.frameX + 'px';

    const window_width = document.documentElement.clientWidth;
    const window_height = document.documentElement.clientHeight;

    const display_width = DISPLAY.canvas.width;
    const display_height = DISPLAY.canvas.height;

    const width_ratio = window_width / display_width;
    const height_ratio = window_height / display_height;

    const scale = width_ratio > height_ratio ? width_ratio : height_ratio;

    DISPLAY.canvas.style.height = Math.floor(display_height * scale) + 'px';
    DISPLAY.canvas.style.width = Math.floor(display_width * scale) + 'px'
  
  }



const playerSprite = new Image();
playerSprite.src = "Images/ironman.png";

window.addEventListener("keydown", function(e){
    keys[e.key] = true;
    player.moving = true;
  
});

window.addEventListener("keyup", function(e) {
    delete keys[e.key];
    player.moving = false;
});

function movePlayer() {
    if (keys['ArrowLeft'] && player.x > 0){
        player.x -= player.speed;
        player.frameY = 1;
    }
    if (keys['ArrowRight'] && player.x < mapWidth - player.screenWidth) {
        player.x += player.speed;
        player.frameY = 2;
    }

    if (keys['ArrowUp'] && player.y > 0) {
        player.y -= player.speed;
        player.frameY = 3;
        
    }
    if (keys['ArrowDown'] && player.y < mapHeight  - player.screenHeight){
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
    elapsed = now - then

    DISPLAY.clearRect(0, 0, DISPLAY.width, DISPLAY.height);
    renderTiles();
    DISPLAY.drawImage(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.screenWidth, player.screenHeight);

    if(elapsed > fpsInterval){
        then = now - (elapsed % fpsInterval);
        movePlayer();
        handlePlayerFrame();
    }
}

window.addEventListener('resize', resize);

resize();

startAnimating(10);

collisionTime()

})();


