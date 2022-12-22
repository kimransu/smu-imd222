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
  d = map(mouseX, 0, width, 0, 90);
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
  star(0, 0, -br * 0.9, -br, 10);
  translate(0, -br);
  if (br > 8) {
    push();
    rotate(d);
    branch(br * 0.1);
    pop();
    push();
    rotate(-d);
    branch(br * 0.9);
    pop();
  }
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
