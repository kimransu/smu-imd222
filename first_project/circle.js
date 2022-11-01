// matter의 body 속성중에 restitution이 튕기는 속성인듯해서 시도해봤지만 잘 안됨
// restitution 값이 0이면 디폴트, 1에 가까울수록 튕기는거 같은데 사용법을 정확히 모르겠음

class Circle {
  constructor(x, y, d, r, c, opt) {
    this.d = d;
    this.r = r;
    this.c = c;
    this.bodies = Bodies.circle(x, y, this.d * 0.5, this.r, opt);
  }

  render() {
    push();
    translate(this.bodies.position.x, this.bodies.position.y);
    rotate(this.bodies.angle);
    fill(this.c);
    circle(0, 0, this.d);
    pop();
  }
}
