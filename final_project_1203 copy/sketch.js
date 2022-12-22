"use strict";

/*
    개발자 왈
    var 변수 말고 let, const를 사용하기.
    let : 값을 변경하는 변수에 사용
    const : 값을 변경하지 않는 변수에 사용
 */

let x = 0;
let y = 0;
let stepSize = 5.0;

const font = "Georgia";
const letters =
  "나는 지금 종강이 몹시 간절하다. 잠이 너무 자고싶다. 집에가고싶다. 교수님 23일 종강 미쳤습니까 휴먼?";
const fontSizeMin = 3;
let angleDistortion = 0.0;

let counter = 0;

function setup() {
  const boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  const canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");
  background(0);
  cursor(CROSS);

  x = mouseX;
  y = mouseY;

  textFont(font);
  textAlign(LEFT);
  fill(255);
}

function draw() {
  // if (mouseIsPressed && mouseButton == LEFT) {
  const d = dist(x, y, mouseX, mouseY);
  textSize(fontSizeMin + d / 2);
  const newLetter = letters.charAt(counter);
  stepSize = textWidth(newLetter);

  if (d > stepSize) {
    const angle = atan2(mouseY - y, mouseX - x);

    push();
    translate(x, y);
    rotate(angle + random(angleDistortion));
    text(newLetter, 0, 0);
    pop();

    counter++;
    //letters 배열 맨마지막번째 + 1 (= length)이되면 다시 0번째 letters로 시작
    if (counter >= letters.length) counter = 0;

    x = x + cos(angle) * stepSize;
    y = y + sin(angle) * stepSize;
  }
  // }
}

function mousePressed() {
  x = mouseX;
  y = mouseY;
}

function keyPressed() {
  // angleDistortion ctrls arrowkeys up/down
  if (keyCode == UP_ARROW) angleDistortion += 0.1;
  if (keyCode == DOWN_ARROW) angleDistortion -= 0.1;
}
