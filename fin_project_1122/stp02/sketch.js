//파일링 만드는 소스
function setup() {
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");
}

let howManyX = 20;
let howManyY = 20;

function draw() {
  background(255);
  stroke(0);
  noFill();

  for (let tileCntX = 0; tileCntX < howManyX; tileCntX++) {
    for (let tileCntY = 0; tileCntY < howManyY; tileCntY++) {
      let tileX = (width / (howManyX + 1.0)) * (tileCntX + 1);
      let tileY = (height / (howManyY + 1.0)) * (tileCntY + 1);
      circle(tileX, tileY, 10);
    }
  }
}
