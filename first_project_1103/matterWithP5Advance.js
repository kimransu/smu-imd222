// 물리 시뮬레이션 및 렌더링을 위한 모듈들.
// 당연하지만 좌변 이름은 마음대로, 우변은 그대로.
let Engine = Matter.Engine,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;
// 물리 엔진 생성.
let engine;
// 벽면 생성
let wallLeft;
let wallRight;
let wallTop;
// 튕기는 공 생성
let pingPongBall;
// 공을 쳐내는 바 생성
let bar;

function setup() {
  createCanvas(800, 600);
  engine = Engine.create();
  wallLeft = new Walls(30, 300, 60, 600, "#ccc", { isStatic: true });
  wallRight = new Walls(770, 300, 60, 600, "#ccc", { isStatic: true });
  wallTop = new Walls(400, 30, 800, 60, "#ccc", { isStatic: true });
  pingPongBall = new Circle(400, 70, 30, "blue", {
    friction: 0.00001,
    restitution: 0.5,
  });
  bar = new Rect(400, 500, 150, 15, "#C0AAA9", { isStatic: false });
  // 바의움직임을 주기위한 시도
  // bar = new Rect(400, 500, 150, 15, "#C0AAA9", {
  //   restitution: 0,
  //   frictionAir: 0,
  // });
  Composite.add(engine.world, [
    wallLeft.bodies,
    wallRight.bodies,
    wallTop.bodies,
    pingPongBall.bodies,
    bar.bodies,
  ]);
}

function draw() {
  background("#F8F3FD");
  Engine.update(engine);
  noStroke();
  wallLeft.render();
  wallRight.render();
  wallTop.render();
  pingPongBall.render();
  bar.render();
  mouseMove();

  // 핑퐁볼이 바닥으로 떨어지면 다시 위에서 시작하게
  // if (pingPongBall.positionY() >= 600) {
  //   pingPongBall = new Circle(400, 70, 30, "pink", {
  //     friction: 0.00001,
  //     restitution: 0.5,
  //   });
  // }
}
// 마우스이동에 따라 bar가 이동 할 수 있도록
function mouseMove() {
  bar = new Rect(mouseX, 500, 150, 15, "#C0AAA9", { isStatic: false });
}
