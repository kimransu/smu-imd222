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
    fill(this.c);
    circle(0, 0, this.d);
    pop();
  }
}
