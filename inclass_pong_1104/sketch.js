let engine;
let mouseConstraint;

//여러개가 들어갈수있는 상태지만 아무것도 들어가있지않은상태
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
  // boundaryObjs.push(
  //   new Rect(width * 0.5, 0, width, thickness * 2, { isStatic: true })
  // );
  boundaryObjs.push(
    new Rect(width * 0.5, height, width, thickness * 2, {
      isStatic: true,
      restitution: 1,
      friction: 0,
    })
  );
  boundaryObjs[0].body.isStatic = true;
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
  //push(); -> 여러개의 데이터를 저장할수 있는 Array에 새로운 값을 추가해줌
  matterObjs.push(
    new Circle(width * 0.5, 0, 50, {
      restitution: 1,
      friction: 0,
      frictionAir: 0,
      frictionStatic: 0,
    })
  );
  matterObjs.push(
    new Rect(width * 0.5, height * 0.5, 100, 20, {
      restitution: 1,
      friction: 0,
      frictionAir: 0,
      frictionStatic: 0,
      isStatic: true,
    })
  );
  console.log(boundaryObjs[0].body);
  console.log(matterObjs[0].body);
  console.log(matterObjs[1].body);
}
//그림그리는 용도라 별로 건드릴게없다.
function draw() {
  background("#ffffff");
  let tBody = matterObjs[1].body;
  let originY = tBody.position.y;
  let newX = mouseX;
  Matter.Body.setPosition(tBody, { x: newX, y: originY });
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
