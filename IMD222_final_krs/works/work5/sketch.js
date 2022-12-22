let theta;
//첫 나무가지 길이 180px
let branchHeight = 180;

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
  // stroke(255);
  //캔버스 상에서 마우스 위치에 따라 0부터 90까지의 값을 가질 수 있는 변수 a
  //캔버스 밖으로 나가면 0 혹은 90으로 값 고정
  if (mouseX > 0 && mouseX < width) {
    let a = (mouseX / width) * 75;
    //a를 라디안(호도각)으로 바꿔주기 p5에서는 degree보다 radian 사용
    theta = radians(a);
    // theta += random(theta * 0.01);
    //원점을 화면 중앙 아래로 이동시킴
    translate(width / 2, height);
    //수직 상승하는 선 (시작x,시작y,끝x,끝y)
    line(0, 0, 0, -branchHeight);
    //선의 끝지점으로 원점 이동
    translate(0, -branchHeight);
    //나뭇가지의 재귀적 분기 시작
    branch(branchHeight);
  } else if (mouseX < 0) {
    let a = 0;
    theta = radians(a);
    translate(width / 2, height);
    line(0, 0, 0, -branchHeight);
    translate(0, -branchHeight);
    branch(branchHeight);
  } else if (mouseX > width) {
    let a = 75;
    theta = radians(a);
    translate(width / 2, height);
    line(0, 0, 0, -branchHeight);
    translate(0, -branchHeight);
    branch(branchHeight);
  }
}
function branch(branchHeight) {
  // 각 나뭇가지의 길이는 이전 가지의 2/3가 되도록
  branchHeight *= 0.66;
  strokeWeight(branchHeight * 0.08);

  // 재귀 함수는 무한루프에 빠질 수 있기때문에 종료조건이 필요
  // 나뭇 가지의 길이가 2픽셀과 같거나 적으면 종료하도록 if문 만들어주기
  if (branchHeight > 1) {
    push();
    rotate(theta); //0~90도 사이의 값으로 회전하기(마우스위치에 따라 달라짐)
    line(0, 0, 0, -branchHeight); //나뭇가지 그리기
    translate(0, -branchHeight); //나뭇가지 끝으로 원점 이동
    branch(branchHeight);
    pop();

    //왼쪽으로 가지 생성
    push();
    rotate(-theta);
    line(0, 0, 0, -branchHeight);
    translate(0, -branchHeight);
    branch(branchHeight);
    pop();
  }
}
