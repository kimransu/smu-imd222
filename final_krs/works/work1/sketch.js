let theta;
let branchHeight = 800;

function setup() {
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");
  rectMode(CENTER);
}

function draw() {
  background(0);
  //FPS 설정 1초에 30프레임 반복 (숫자가 클수록 부드럽다)
  frameRate(30);

  let r = map(mouseX, 0, width, 0, 255);
  let g = map(mouseY, 0, height, 0, 255);
  let b = map(noise(0, 1), 0, 1, 0, 255);
  stroke(r, g, b);
  noFill();
  let a = (mouseX / width) * 360;
  //a를 라디안(호도각)으로 바꿔주기 p5에서는 degree보다 radian 사용
  theta = radians(a);
  translate(width / 2, height / 2);
  star(0, 0, branchHeight * 0.5, branchHeight, 5);
  branch(branchHeight);
}
function branch(branchHeight) {
  branchHeight *= 0.9;
  strokeWeight(branchHeight * 0.005);

  if (branchHeight > 2) {
    push();
    rotate(theta);
    star(0, 0, branchHeight * 0.5, branchHeight, 5);
    branch(branchHeight);
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
