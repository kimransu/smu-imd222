let engine;
let mouseConstraint;

let boundaryObjs = [];
let matterObjs = [];

//7가지 색상
let colors = [
  "#e7007d",
  "#e72600",
  "#b26300",
  "#937300",
  "#6d7f00",
  "#008a39",
  "#008673",
];

let canvas;

function createBoundaries(thickness) {
  boundaryObjs.push(
    new Rect(width * 0.5, 0, width, thickness * 2, { isStatic: true })
  );
  boundaryObjs.push(
    new Rect(width * 0.5, height, width, thickness * 2, { isStatic: true })
  );
  boundaryObjs.push(
    new Rect(0, height * 0.5, thickness * 2, height, { isStatic: true })
  );
  boundaryObjs.push(
    new Rect(width, height * 0.5, thickness * 2, height, { isStatic: true })
  );
}

function setup() {
  let dom = document.getElementById("sketch");
  // 캔버스 설정
  canvas = createCanvas(
    dom.getBoundingClientRect().width,
    dom.getBoundingClientRect().height
  );
  canvas.parent("sketch");
  engine = Matter.Engine.create();
  // 마우스제어파트
  let mouseOnP5Cavas = Matter.Mouse.create(canvas.elt);
  mouseOnP5Cavas.pixelRatio = pixelDensity();
  mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouseOnP5Cavas,
    constraint: { stiffness: 0.2 },
  });
  //마우스 움직임 컨트롤을 세계로 보낸다.
  Matter.Composite.add(engine.world, mouseConstraint);
  //외곽에 둘러주는 4개의 구문을 한줄로 (숫자) 벽두께
  createBoundaries(80);
}
//그림그리는 용도라 별로 건드릴게없다.
function draw() {
  background("#ffffff");
  //1초마다 움직이게 기능해주는 엔진
  //% -> 모듈러연산자 = ~로 나누고 남은 나머지를 반환, n으로 나누면 나올수 있는 숫자는 n가지
  Matter.Engine.update(engine);
  noStroke();
  matterObjs.forEach((obj, idx) => {
    if (mouseConstraint.body === obj.body) {
      fill("#00daf2");
    } else {
      fill(colors[idx % colors.length]);
    }
    obj.render();
  });
  noFill();
  stroke(0);
  //방향알려주는 선그리기
  matterObjs.forEach((obj) => obj.renderDirVector());

  noStroke();
  fill("#919191");
  //외곽사각형 그리기
  boundaryObjs.forEach((obj) => obj.render());
}
