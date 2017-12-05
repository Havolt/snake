
let snakeCan;
let ctx;
const tileSize = 20;
const canSize = 480;
const tileAmt = 12;
let gameSpeed = 200;
let snake = {};
let food = {size:10, new: true};
let score = 0;

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
  if(snake.headX == food.x && snake.headY == food.y){
    food.new = true;
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

function snakeAdd(){
  let obj = {};
  obj.x = snake.body[snake.body.length-1].x;
  obj.y = snake.body[snake.body.length-1].y;
  snake.body.push(obj);
  score++;
  if(gameSpeed > 85){
    gameSpeed -= 20;
  }
}

function createFood(){
  if(food.new){
    food.prevX = food.x;
    food.prevY = food.y;
    food.x = Math.floor(Math.random()*tileAmt);
    console.log(food.x);
    food.y = Math.floor(Math.random()*tileAmt);
    while(food.x == food.prevX && food.y == food.prevY){
      food.x = Math.floor(Math.random()*tileAmt);
      food.y = Math.floor(Math.random()*tileAmt);
    }
    snakeAdd();
    food.new = false;
  }
  ctx.fillStyle="white";
  ctx.fillRect(food.x*tileSize+5, food.y*tileSize+5, food.size, food.size);
}

function hitDetect(){
  for(var i = 0; i < snake.body.length; i++){
    if( snake.headX == snake.body[i].x && snake.headY == snake.body[i].y){
      console.log('happening');
    }
  }
}

function gameEngine(){
  snakeTail();
  snakeMove();
  snakeDraw();
  createFood();
  hitDetect();
  setTimeout(gameEngine, gameSpeed);
}

function startGame(){
  startButton.style.display="none";
  gameEngine();
  document.addEventListener('keydown', changeDir);
}




(function init(){
  createCanvas();
  createMenu();
  createSnake();
  //assigner();
})();
