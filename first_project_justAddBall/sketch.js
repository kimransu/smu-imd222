let engine;
let mouseConstraint;

let boundaryObjs = [];
let matterObjs = [];

let colors = [
  "#ff676d",
  "#ffa767",
  "#ffdd67",
  "#95e281",
  "#7dd0e8",
  "#799de6",
  "#8379e6",
];

// let ballSize = [20, 40, 60, 80];

let canvas;

function createBoundaries(thickness) {
  const thickValue = 1;
  // top
  boundaryObjs.push(
    new Rect(width * 0.5, 0, width, thickness * thickValue, { isStatic: true })
  );

  // bottom;
  boundaryObjs.push(
    new Rect(width * 0.5, height, width, thickness * thickValue, {
      isStatic: true,
    })
  );

  // left
  boundaryObjs.push(
    new Rect(0, height * 0.5, thickness * thickValue, height, {
      isStatic: true,
    })
  );

  // right
  boundaryObjs.push(
    new Rect(width, height * 0.5, thickness * thickValue, height, {
      isStatic: true,
    })
  );
}

//초기화를 원할때에는 setup(){}부분을 반복해주면된다
function setup() {
  //<div id="sketch"></div>의 사이즈를 그대로가져와서 나의 캔버스 사이즈로 만든다.
  let dom = document.getElementById("sketch");
  canvas = createCanvas(
    dom.getBoundingClientRect().width,
    dom.getBoundingClientRect().height
  );
  //canvas를 html"sketch"에 넣는다
  canvas.parent("sketch");
  engine = Matter.Engine.create();
  let mouseOnP5Cavas = Matter.Mouse.create(canvas.elt);
  mouseOnP5Cavas.pixelRatio = pixelDensity();
  mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouseOnP5Cavas,
    constraint: { stiffness: 0.2 },
  });
  Matter.Composite.add(engine.world, mouseConstraint);
  createBoundaries(80);
  matterObjs.push(
    new Circle(width * 0.5, 80, 40, {
      restitution: 1,
      friction: 0,
      frictionAir: 0,
      frictionStatic: 0,
      // inertia: Infinity,
      collisionFilter: {
        mask: 0x001,
      },
    })
  );
}

function keyPressed() {
  // 공 크기 랜덤
  let size = random(10, 80);
  if (key == "a") {
    console.log("나 여기 살아있다");
    // matterObjs[0];
    matterObjs.push(
      new Circle(width * 0.5, 80, size, {
        restitution: 1,
        friction: 0,
        frictionAir: 0,
        frictionStatic: 0,
        // inertia: Infinity,
        collisionFilter: {
          mask: 0x001,
        },
      })
    );
  }
}

function draw() {
  background("#000");
  Matter.Engine.update(engine);
  noStroke();
  matterObjs.forEach((obj, idx) => {
    if (obj != null) {
      if (mouseConstraint.body === obj.body) {
        fill("#fff");
      } else {
        fill(colors[idx % colors.length]);
      }
      obj.render();
    }
  });
  noFill();
  stroke(0);
  matterObjs.forEach((obj) => {
    if (obj != null) {
      obj.renderDirVector();
    }
  });

  noStroke();
  fill("#333");
  boundaryObjs.forEach((obj) => {
    if (obj != null) {
      obj.render();
    }
  });
  outOfCanvas();
}

//캔버스 밖으로 나간 공을 null처리
function outOfCanvas() {
  for (let i = 0; i < matterObjs.length; i++) {
    if (matterObjs[i] != null) {
      let cBody = matterObjs[i].body;
      let overY = cBody.position.y;
      if (overY >= canvas.height) {
        console.log("죽기 직전...", matterObjs);
        matterObjs[i] = null;
        console.log("나 죽는다...", matterObjs);
      }
    }
  }
}
