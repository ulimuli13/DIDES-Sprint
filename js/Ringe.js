const Ringe = (p) => {
  let circles = [];
  let lastImpulseTime = 0;
  let impulseInterval = 790; // alle 800ms
  let startTime = 0;
  let animationEnded = false;
  let animationStarted = false;
  const delayBeforeStart = 7700; // 10 Sekunden Verzögerung

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    startTime = p.millis(); // Startzeit merken
  };

  p.draw = () => {
    p.clear();

    let currentTime = p.millis();
    let elapsed = currentTime - startTime;

    // Starte Animation erst nach dem Delay
    if (!animationStarted && elapsed > delayBeforeStart) {
      animationStarted = true;
      lastImpulseTime = currentTime; // Zurücksetzen, damit sofort Impuls möglich
    }

    // Animation läuft maximal 53 Sekunden ab Beginn der Seite (inkl. Delay)
    if (elapsed > 52210) {
      animationEnded = true;
    }

    if (animationStarted && !animationEnded) {
      if (currentTime - lastImpulseTime > impulseInterval) {
        let radii = [p.windowHeight / 2, p.windowHeight / 2 + 50, p.windowHeight, p.windowHeight / 2 - 200, p.windowWidth];
        for (let r of radii) {
          circles.push(new ExpandingCircle(p.width / 2, p.height / 2, r));
        }
        lastImpulseTime = currentTime;
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
      p.stroke(255, 74, 74);
      p.strokeWeight(5);
      p.circle(this.x, this.y, this.size);
    }

    isDone() {
      return this.opacity <= 0;
    }
  }
};
