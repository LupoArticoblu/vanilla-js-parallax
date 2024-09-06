/*==================Variabili==================== */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
let speedGame = 6;

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

// let x = 0;
// let x2 = 2400;
const slider = document.getElementById('gameSpeedRange');
slider.value = speedGame;

const gameSpeed = document.getElementById('gameSpeed');
gameSpeed.innerHTML = speedGame;



/*==================Classi==================== */
class Layer {
  constructor(image, speedModifier){
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    this.x2 = this.width;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = speedGame * this.speedModifier;
  }
  /**
   * update()
   * @description
   * aggiorna la posizione di una layer, tenendo conto del suo
   * speedModifier e della sua larghezza. Se la layer si trova
   * fuori dal canvas, la riporta all'inizio in modo da creare
   * l'effetto di un loop.
  */
 update(){
   this.speed = speedGame * this.speedModifier;
   if(this.x <= -this.width){ 
    this.x = this.width + this.x2 - this.speed;
   }
   if(this.x2 <= -this.width){ 
    this.x2 = this.width + this.x - this.speed;
   }
   this.x = Math.floor(this.x - this.speed);
   this.x2 = Math.floor(this.x2 - this.speed);
  }
  /**
   * draw()
   * @description
   * disegna la layer corrente su canvas, in due posizioni diverse:
   * la prima volta disegna la layer partendo da this.x e this.y,
   * la seconda volta disegna la layer partendo da this.x2 e this.y.
   * Questo serve per creare l'effetto di un parallax, ovvero per dare
   * l'impressione che le layer si muovano a velocità diverse.
  */
 draw(){
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
  }
}

//creo 5 layer con velocità diverse, in questo modo
//creo l'effetto di parallax, ovvero l'effetto per cui
//gli oggetti in primo piano appaiono muoversi più velocemente
//degli oggetti in secondo piano
const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1);

/*==================Funzioni==================== */
slider.addEventListener('change', function(event){
  speedGame = event.target.value;
  gameSpeed.innerHTML = speedGame;
});

function animate(){
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  
  //quello che succede qui è letteralmente un avanzamento di frame canvas fino a che x non supera il valore di backgroundLayer4.width e ricomincia l'animazione, un modo per ovviare a questo problema è creare una nuova variabile che parta dalla fine del canvas visibile
  // if(x <= -2400) x = 2400 - speedGame
  // else x-= speedGame;

  //nella funzione animazione richiamo i metodi della classe layer per ogni layer
  // layer1.update();
  // layer1.draw();

  // layer2.update();
  // layer2.draw();
  
  // layer3.update();
  // layer3.draw();

  // layer4.update();
  // layer4.draw();
  
  // layer5.update();
  // layer5.draw(); <- per rendere più leggero e funzionale il codice, raggruppo i layer in un array e faccio un ciclo forEach

  const layers = [layer1, layer2, layer3, layer4, layer5];
  layers.forEach(layer => {
    layer.update();
    layer.draw();
  });

  requestAnimationFrame(animate);
};

animate();