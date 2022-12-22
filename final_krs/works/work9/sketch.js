let theta;
let branchHeight = 800;
let green = 42;

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
  rect(0, 0, branchHeight, branchHeight);
  branch(branchHeight);
}
function branch(branchHeight) {
  branchHeight *= 0.9;
  strokeWeight(branchHeight * 0.005);

  if (branchHeight > 2) {
    push();
    rotate(theta);
    rect(0, 0, branchHeight, branchHeight);
    branch(branchHeight);
    pop();
  }
}
