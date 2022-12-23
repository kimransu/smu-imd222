let d;
let num = 10;
let sym = 360 / num;

function setup() {
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");
  angleMode(DEGREES);
}

function draw() {
  background(0);
  let r = map(mouseX, 0, width, 0, 255);
  let g = map(mouseY, 0, height, 0, 255);
  let b = map(noise(0, 1), 0, 1, 0, 255);
  stroke(r, g, b);
  noFill();
  d = map(mouseX, 0, 100, 0, 90);
  for (idx = 0; idx < 360; idx += sym) {
    push();
    translate(width / 2, height / 2);
    rotate(idx);
    branch(100);
    pop();
  }
}

function branch(br) {
  strokeWeight(br * 0.01);
  circle(0, 0, -br);
  translate(0, -br);
  if (br > 12) {
    push();
    rotate(d);
    branch(br * 0.7);
    pop();
    push();
    rotate(-d);
    branch(br * 0.7);
    pop();
  }
}
