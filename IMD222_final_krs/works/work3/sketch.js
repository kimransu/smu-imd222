let bubbleDiameter = 1000;
let bubbleRadius = bubbleDiameter * 0.5;

function setup() {
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");
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
  let a = (mouseX / width) * 1;
  translate(width / 2, height / 2);
  star(0, 0, bubbleDiameter * 0.5, bubbleDiameter, 5);

  //거품 재귀적 분기 시작
  bubble(bubbleDiameter);
}
function bubble(bubbleDiameter) {
  bubbleDiameter *= random(0.1, 0.9);
  strokeWeight(floor(random(0.05, 10)));
  // 재귀 함수는 무한루프에 빠질 수 있기때문에 종료조건이 필요
  if (bubbleDiameter > 10) {
    push();
    let a = (mouseX / width) * 1;
    star(0, 0, bubbleDiameter * 0.5 * a, bubbleDiameter * a, 5);
    bubble(bubbleDiameter);
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
