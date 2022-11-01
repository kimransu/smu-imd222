// 물리 시뮬레이션 및 렌더링을 위한 모듈들.
// 당연하지만 좌변 이름은 마음대로, 우변은 그대로.
let Engine = Matter.Engine,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

// 물리 엔진 생성.
let engine;

// 튕기는 공 생성
let pingPongBall;
// 바닥 역할을 할 박스를 생성.
let ground;

function setup() {
  createCanvas(800, 600);
  engine = Engine.create();
  pingPongBall = new Circle(400, -10, 30, 0.8, "blue");
  ground = new Rect(400, 500, 150, 15, "#C0AAA9", { isStatic: true });
  Composite.add(engine.world, [pingPongBall.bodies, ground.bodies]);
}

function draw() {
  background("#F8F3FD");
  Engine.update(engine);
  noStroke();
  pingPongBall.render();
  ground.render();
}

function mouseMove() {
  ground(mouseX, 500, 150, 15, "#C0AAA9", { isStatic: true });
}
