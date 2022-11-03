// 물리 시뮬레이션 및 렌더링을 위한 모듈들.
// 당연하지만 좌변 이름은 마음대로, 우변은 그대로.
let Engine = Matter.Engine,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;
// 물리 엔진 생성.
let engine;
// 튕기는 공 생성
let pingPongBall;
// 받아칠 막대기 생성
let bar;

function setup() {
  createCanvas(800, 600);
  engine = Engine.create();
  pingPongBall = new Circle(400, -15, 30, "blue", {
    frictionAir: 0.001,
    friction: 0.5,
    frictionSatatic: 1,
    restitution: 1,
  });
  bar = new Rect(400, 500, 100, 15, "pink", { isStatic: true });
  Composite.add(engine.world, [bar.bodies, pingPongBall.bodies]);
}

function draw() {
  background("#F8F3FD");
  Engine.update(engine);
  noStroke();
  pingPongBall.render();
  bar.render();
  console.log(pingPongBall);
  mouseOver();
  // 핑퐁볼이 바닥으로 떨어지면 다시 위에서 시작하게
  if (pingPongBall.getPositionY() >= 600 + 15) {
    pingPongBall = new Circle(400, -15, 30, "blue", {
      frictionAir: 0.001,
      friction: 0.5,
      frictionSatatic: 1,
      restitution: 1,
    });
    Composite.add(engine.world, [bar.bodies, pingPongBall.bodies]);
  }
}
//화면에 마우스오버시 바가 마우스를따라 X축이동
function mouseOver() {
  bar = new Rect(mouseX, 500, 100, 15, "pink", { isStatic: false });
}

// function mouseOver() {
//   if (mouseOver() === ture) {
//     bar = new Rect(mouseX, 500, 100, 15, "pink", { isStatic: false });
//   } else if (mouseOver() === false) {
//     bar = new Rect(400, 500, 100, 15, "pink", { isStatic: true });
//   }
// }

// function mouseMoved() {
//   bar = new Rect(mouseX, 500, 100, 15, "pink", { isStatic: false });
// }
