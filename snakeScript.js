
let snakeCan;

function createCanvas(){
  const c = document.createElement('canvas');
  c.id = "snakeCan";
  app.appendChild(c);
}

function assigner(){
  snakeCan = document.getElementById('snakeCan');
}


(function init(){
  createCanvas();
  assigner();
})();
