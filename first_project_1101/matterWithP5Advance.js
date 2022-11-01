// 물리 시뮬레이션 및 렌더링을 위한 모듈들.
// 당연하지만 좌변 이름은 마음대로, 우변은 그대로.
let Engine = Matter.Engine,
  // Render = Matter.Render,
  // Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

// 물리 엔진 생성.
// let engine = Engine.create();
let engine;

// 렌더러 생성.
// P5를 이용해 렌더링할거라면 필요없.
// let dom = document.querySelector(".matterDiv");
// let render = Render.create({
//   element: dom,
//   engine: engine,
// });

// 두개의 박스를 생성.
// let boxA = Bodies.rectangle(400, 200, 80, 80);
// let boxB = Bodies.rectangle(450, 50, 80, 80);
let pingPongBall;
// 바닥 역할을 할 박스를 생성.
// let ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
let ground;

// 생성한 박스를 물리 엔진 속 세계에 추가.
// Composite.add(engine.world, [boxA, boxB, ground]);

// 렌더링.
// Render.run(render);

// 무한 반복 실행하게 할 러너 생성.
// let runner = Runner.create();

// 무한 반복.
// Runner.run(runner, engine);

function setup() {
  createCanvas(800, 600);
  engine = Engine.create();
  // pingPongBall = new Circle(400, 200, 80, 80);
  pingPongBall = new Circle(400, -10, 30, 0.8, "blue");
  ground = new Rect(400, 500, 150, 15, "#C0AAA9", { isStatic: true });
  Composite.add(engine.world, [pingPongBall.bodies, ground.bodies]);
}

// 궤적지우기 도구
// 물리엔진에서는 중앙을 기준으로 좌표를 잡는다
// rectMode(CENTER); 좌표 중앙으로 잡아주는 역할
// translate(boxA.position.x, boxA.position.y); 좌표계의 0,0 위치 변경
// push();와 pop(); 사이에 좌표변화를 주면 그 바깥에서는 영향을 안받음
// rotate(boxA.angle); 박스가 아니라 화면을 돌리는것이다 여기서 angle은 라디안 값으로 들어가있다
// rect(0, 0, 80, 80); 좌표를 이동시켰기때문에 0,0좌표로하면 박스의 위치에서 박스 생성
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
