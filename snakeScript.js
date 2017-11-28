
let snakeCan;
let ctx;
const tileSize = 20;
const canSize = 480;
const tileAmt = 12;
let gameSpeed = 500;
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
}


function gameEngine(){
  console.log('yes mate');
}

function startGame(){
  startButton.style.display="none";
  setInterval(gameEngine, gameSpeed);
}




(function init(){
  createCanvas();
  createMenu();
  createSnake();
  //assigner();
})();
