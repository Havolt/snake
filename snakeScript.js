
let snakeCan;
let ctx;
const tileSize = 20;
const canSize = 480;
const tileAmt = 12;
let gameSpeed = 400;
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
  snake.body = [[6,6], [6,7], [6,8]];
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
  if(e.key == 'ArrowUp'){
    snake.direction = 0;
  }
  else if(e.key == 'ArrowDown'){
    snake.direction = 2;
  }
  else if(e.key == 'ArrowLeft'){
    snake.direction = 1;
  }
  else if(e.key == 'ArrowRight'){
    snake.direction = 3;
  }
}

function snakeDraw(){
  ctx.fillStyle="#141619";
  ctx.fillRect(0,0,canSize,canSize);
  ctx.fillStyle="white";
  ctx.fillRect((snake.headX*tileSize),(snake.headY*tileSize),tileSize,tileSize);
}

function gameEngine(){
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
