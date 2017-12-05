
let snakeCan;
let ctx;
const tileSize = 20;
const canSize = 480;
const scoreSize = 40;
const tileAmt = 24;
let gameSpeed = 200;
let snake = {};
let food = {size:10, new: true};
let score = -1;
let gameOverBool = false;
let topScore = 0;

function createCanvas(){
  const c = document.createElement('canvas');
  c.id = "snakeCan";
  app.appendChild(c);
  snakeCan = document.getElementById('snakeCan');
  ctx = snakeCan.getContext('2d');
  ctx.canvas.width = canSize;
  ctx.canvas.height = canSize;
}

function createScoreboard(){
  const c = document.createElement('canvas');
  c.id = "scoreboard";
  app.appendChild(c);
  scoreboard = document.getElementById('scoreboard');
  ctx2 = scoreboard.getContext('2d');
  ctx2.canvas.width = canSize;
  ctx2.canvas.height = scoreSize;
  ctx2.fillStyle = '#344d72';
  ctx2.fillRect(0, 0, canSize, scoreSize);
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
  snake.prevDir = snake.direction;
}

function changeDir(e){
  if(e.key == 'ArrowUp' && snake.prevDir != 2 ){
    snake.direction = 0;
  }
  else if(e.key == 'ArrowDown' && snake.prevDir != 0 ){
    snake.direction = 2;
  }
  else if(e.key == 'ArrowLeft' && snake.prevDir != 3 ){
    snake.direction = 1;
  }
  else if(e.key == 'ArrowRight' && snake.prevDir != 1 ){
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

function newPos(){
  food.x = Math.floor(Math.random()*tileAmt);
  food.y = Math.floor(Math.random()*tileAmt);
}

function posCheck(){
  for(var i = 0; i < snake.body.length; i++){
    if(snake.body[i].x == food.x && snake.body[i].y == food.y){
      newPos();
      posCheck();
      break;
    }
  }
  while(food.x == food.prevX && food.y == food.prevY){
    newPos();
    posCheck();
    break;
  }
}

function createFood(){
  if(food.new){
    food.prevX = food.x;
    food.prevY = food.y;
    food.x = Math.floor(Math.random()*tileAmt);
    console.log(food.x);
    food.y = Math.floor(Math.random()*tileAmt);
    posCheck();

    snakeAdd();
    food.new = false;
  }
  ctx.fillStyle="white";
  ctx.fillRect(food.x*tileSize+5, food.y*tileSize+5, food.size, food.size);
}

function hitDetect(){
  for(var i = 0; i < snake.body.length; i++){
    if( snake.headX == snake.body[i].x && snake.headY == snake.body[i].y){
      gameOverBool = true;
      gameOver();
      break;
    }
    if(snake.headX < 0 || snake.headY < 0 || snake.headX >= tileAmt || snake.headY >= tileAmt){
      gameOverBool = true;
      gameOver();
      break;
    }
  }
}

function gameOver(){

  ctx.fillStyle= "#141619";
  ctx.fillRect(0,0, canSize, canSize);
  ctx.fillStyle="white";
  ctx.font="40px arial";
  ctx.fillText('GAME OVER', 120, 160);
  gameSpeed = 200;
  if(topScore < score){topScore = score};
  snake = {};
  food = {size:10, new: true};
  score = -1;
  startButton.style.display="block";
  createSnake();
  
  
}

function scoreKeeper(){
  ctx2.fillStyle="#344d72";
  ctx2.fillRect(0, 0, canSize, scoreSize);
  ctx2.fillStyle="white";
  ctx2.font="24px arial";
  if(score < 0){
    ctx2.fillText('Score: ' + 0, 20, 25);
  }else{ctx2.fillText('Score: ' + score, 20, 25);}
  ctx2.fillText('Top Score: ' + topScore, 320, 25);
}

function gameEngine(){
  snakeTail();
  snakeMove();
  snakeDraw();
  createFood();
  hitDetect();
  scoreKeeper();
  if(!gameOverBool){
    setTimeout(gameEngine, gameSpeed);
  }
}

function startGame(){
  startButton.style.display="none";
  gameOverBool = false;
  gameEngine();
  document.addEventListener('keydown', changeDir);
}




(function init(){
  createCanvas();
  createScoreboard();
  createMenu();
  createSnake();
  //assigner();
})();
