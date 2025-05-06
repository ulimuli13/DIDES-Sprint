const Beat = (p) => {
  let circles = [];
  let lastImpulseTime = 0;
  let impulseInterval = 800; // alle 800ms
  let startTime = 0;
  let animationEnded = false;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    startTime = p.millis(); // Startzeit speichern
  };

  p.draw = () => {
    p.clear();

    // Nach 6 Sekunden aufhören
    if (p.millis() - startTime > 7000) {
      animationEnded = true;
    }

    if (!animationEnded) {
      if (p.millis() - lastImpulseTime > impulseInterval) {
        let radii = [p.windowHeight / 2, p.windowHeight / 2 + 50, p.windowHeight, p.windowHeight / 2 - 200, p.windowWidth]; // Verschiedene Startgrößen
        for (let r of radii) {
          circles.push(new ExpandingCircle(p.width / 2, p.height / 2, r));
        }
        lastImpulseTime = p.millis();
      }
    }

    for (let i = circles.length - 1; i >= 0; i--) {
      circles[i].update();
      circles[i].display();
      if (circles[i].isDone()) {
        circles.splice(i, 1);
      }
    }
  };

  class ExpandingCircle {
    constructor(x, y, startSize) {
      this.x = x;
      this.y = y;
      this.size = startSize;
      this.opacity = 255;
      this.growthSpeed = 10;
      this.fadeSpeed = 5;
    }

    update() {
      this.size += this.growthSpeed;
      this.opacity -= this.fadeSpeed;
    }

    display() {
      p.noFill();
      p.stroke(185, 232, 120, this.opacity);
      p.strokeWeight(3);
      p.circle(this.x, this.y, this.size);
    }

    isDone() {
      return this.opacity <= 0;
    }
  }
};
