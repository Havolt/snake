
let snakeCan;
let ctx;
const canSize = 480;

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
}

function assigner(){

}




(function init(){
  createCanvas();
  createMenu();
  assigner();
})();
