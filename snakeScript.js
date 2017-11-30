
let snakeCan;
let ctx;
const tileSize = 20;
const canSize = 480;
const tileAmt = 12;
let gameSpeed = 300;
let snake = {};

function createCanvas(){
  const c = document.createElement('canvas');
  c.id = "snakeCan";
  app.appendChild(c);
  snakeCan = document.getElementById('snakeCan');
  ctx = snakeCan.getContext('2d');
  ctx.canvas.width = canSize;
  ctx.canvas.height = canSize;
}

function createMenu(){
  ctx.fillStyle="#141619";
  ctx.fillRect(0,0,canSize,canSize);
  const bu = document.createElement('button');
  bu.id="startButton";
  bu.innerHTML="Start";
  app.appendChild(bu);
  startButton.addEventListener('click', startGame);
}

function createSnake(){
  snake.length = 3;
  snake.headX = 6;
  snake.headY = 6;
  snake.direction = 0;
  snake.body = [{x:6, y:6}, {x:6, y:7}, {x:6, y:8}];
}

function snakeMove(){
  if(snake.direction == 0){
    snake.headY--;
  }
  else if(snake.direction == 1){
    snake.headX--;
  }
  else if(snake.direction == 2){
    snake.headY++;
  }
  else if(snake.direction == 3){
    snake.headX++;
  }
}

function changeDir(e){
  if(e.key == 'ArrowUp' && snake.direction != 2){
    snake.direction = 0;
  }
  else if(e.key == 'ArrowDown' && snake.direction != 0){
    snake.direction = 2;
  }
  else if(e.key == 'ArrowLeft' && snake.direction != 3){
    snake.direction = 1;
  }
  else if(e.key == 'ArrowRight' && snake.direction != 1){
    snake.direction = 3;
  }
}

function snakeDraw(){
  ctx.fillStyle="#141619";
  ctx.fillRect(0,0,canSize,canSize);
  ctx.fillStyle="white";
  ctx.fillRect((snake.headX*tileSize),(snake.headY*tileSize),tileSize,tileSize);
  for(var i = 1; i < snake.body.length;i++){
    ctx.fillStyle="white";
    ctx.fillRect((snake.body[i].x*tileSize),(snake.body[i].y*tileSize),tileSize,tileSize);
  }
}

function snakeTail(){
  snake.body[0].x = snake.headX;
  snake.body[0].y = snake.headY;
  for(var i = snake.body.length-1; i > 0; i--){
    snake.body[i].x = snake.body[i-1].x;
    snake.body[i].y = snake.body[i-1].y;
  }
  
}

function gameEngine(){
  snakeTail();
  snakeMove();
  snakeDraw();
  
}

function startGame(){
  startButton.style.display="none";
  setInterval(gameEngine, gameSpeed);
  document.addEventListener('keydown', changeDir);
}




(function init(){
  createCanvas();
  createMenu();
  createSnake();
  //assigner();
})();
