class Circle {
  constructor(x, y, radius, options) {
    this.radius = radius;
    this.body = Matter.Bodies.circle(x, y, this.radius, options);
    Matter.Composite.add(engine.world, this.body);
    //무한하게 튕기는 공을 만들기 위한 소스?
    if (!this.setInMotion) {
      Matter.Body.setVelocity(this.body, {
        x: (Math.random() - 0.9) * 2,
        y: (Math.random() - 0.9) * 2,
      });
      this.setInMotion = true;
    }
  }

  render() {
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    circle(0, 0, this.radius * 2);
    pop();
  }

  renderDirVector() {
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    // line(0, 0, this.radius, 0);
    pop();
  }
}
