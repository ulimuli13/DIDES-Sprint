const DottedCircle = (p) => {

  let dottedCircles = [];
  let baseRadius = 150;
  let animationStarted = false;
  let startTime;
  let animationDuration = 35000; // Standardwert für 60 Sekunden, kann nach Bedarf geändert werden
  
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noFill();
    p.stroke(251, 255, 136);
    p.strokeWeight(3);
    p.noLoop();  // Animation startet erst nach Delay

    initDottedCircles();
    startTime = p.millis();

    // Startet nach 8.265 Sekunden
    setTimeout(() => {
      animationStarted = true;
      p.loop();
    }, 8585);
  };

  p.draw = () => {
    if (!animationStarted) return;

    p.clear();

    const centerX = p.width / 2;
    const centerY = p.height / 2;

    for (let c of dottedCircles) {
      drawDottedCircle(centerX, centerY, c);
      c.offset += c.speed;
    }

    // Stoppe die Animation nach der festgelegten Dauer
    if (p.millis() - startTime > animationDuration) {
      p.noLoop();  // Stoppt die Animation
      p.clear();
    }
  };

  function initDottedCircles() {
    dottedCircles = [
      { offset: 0, minR: -25, maxR: 15, speed: 0.03 },
      { offset: 1000, minR: -25, maxR: 40, speed: 0.02 },
      { offset: 2000, minR: -37, maxR: 20, speed: 0.04 },
      { offset: 2000, minR: -70, maxR: 60, speed: 0.01 },
      { offset: 3000, minR: 150, maxR: 95, speed: 0.05 },
      { offset: 1000, minR: 190, maxR: 90, speed: 0.02 },
      { offset: 2000, minR: 170, maxR: 110, speed: 0.04 },
      { offset: 3000, minR: 190, maxR: 100, speed: 0.03 },
      { offset: 1000, minR: 260, maxR: 180, speed: 0.03 },
      { offset: 2000, minR: 310, maxR: 210, speed: 0.02 },
      { offset: 3000, minR: 500, maxR: 250, speed: 0.02 },
      { offset: 1000, minR: 550, maxR: 250, speed: 0.01 },
      { offset: 1000, minR: 680, maxR: 500, speed: 0.03 },
      { offset: 3000, minR: 310, maxR: 180, speed: 0.02 }
    ];

    dottedCircles.sort((a, b) => {
      const avgA = baseRadius + (a.minR + a.maxR) / 2;
      const avgB = baseRadius + (b.minR + b.maxR) / 2;
      return avgA - avgB;
    });
  }

  function drawDottedCircle(cx, cy, c) {
    for (let i = 0; i < p.TWO_PI; i += 0.035) {
      let n = p.noise(Math.cos(i) * 5, Math.sin(i) * 5, c.offset);
      let r = baseRadius + p.map(n, 0, 1, c.minR, c.maxR);
      let x = cx + r * Math.cos(i);
      let y = cy + r * Math.sin(i);
      p.point(x, y);
    }
  }
};
