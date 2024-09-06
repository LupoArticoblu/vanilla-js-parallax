/*==================Variabili==================== */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
let speedGame = 5;

const backgroundLayer1 = new Image();
backgroundLayer1.src = './backgrounds/layer-1.png';

const backgroundLayer2 = new Image();
backgroundLayer2.src = './backgrounds/layer-2.png';

const backgroundLayer3 = new Image();
backgroundLayer3.src = './backgrounds/layer-3.png';

const backgroundLayer4 = new Image();
backgroundLayer4.src = './backgrounds/layer-4.png';

const backgroundLayer5 = new Image();
backgroundLayer5.src = './backgrounds/layer-5.png';

let x = 0;
let x2 = 2400;

/*==================Array==================== */



/*==================Funzioni==================== */
function animate(){
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.drawImage(backgroundLayer4, x, 0);
  //quello che succede qui è letteralmente un avanzamento di frame canvas fino a che x non supera il valore di backgroundLayer4.width e ricomincia l'animazione, un modo per ovviare a questo problema è creare una nuova variabile che parta dalla fine del canvas visibile
  if(x <= -2400) x = 2400
  else x-= speedGame;

  ctx.drawImage(backgroundLayer4, x2, 0);
  if(x2 <= -2400) x2 = 2400
  else x2-= speedGame;

  requestAnimationFrame(animate);
};

animate();