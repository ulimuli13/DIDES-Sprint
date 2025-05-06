let p5Instance; // Referenz für die p5.js-Instanz

// Deine Waveline-Logik bleibt unverändert
const wavelineSketch = (p) => {
  let points = [];
  let duration = 500;
  let startTime;
  let lastCycle = -1;

  const dyRanges = [
    [2, 5],
    [3, 10],
    [5, 10],
    [8, 18],
    [10, 20],
    [10, 20]
  ];

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.canvas.parent("canvas-container-Waveline"); 
    startTime = p.millis();

    let config = [
      { x: 25, move: 0 },
      { x: 50, move: 1 },
      { x: 75, move: 0 },
      { x: 100, move: -1 },
      { x: 125, move: 0 },
      { x: 150, move: 1 },
      { x: 175, move: 0 },
      { x: 200, move: -1 },
      { x: 225, move: 0 },
      { x: 250, move: 1 },
      { x: 275, move: 0 },
      { x: 300, move: -1 },
      { x: 325, move: 0 },
      { x: 350, move: 1 },
      { x: 375, move: 0 }
    ];

    for (let c of config) {
      points.push({
        x: c.x,
        y: p.height / 2, // Zentriere die Linie vertikal
        moveDir: c.move,
        dy: p.random(dyRanges[0][0], dyRanges[0][1]) // Start mit dem ersten Bereich
      });
    }
  };

  p.draw = () => {
    p.clear();

    let elapsed = p.millis() - startTime;
    let cycleTime = 2 * duration;
    let currentCycle = p.floor(elapsed / cycleTime);
    let t = (elapsed % cycleTime) / duration;

    if (currentCycle !== lastCycle) {
      // Bereich aus dem dyRanges-Array auswählen
      let rangeIndex = currentCycle % dyRanges.length;
      for (let pnt of points) {
        pnt.dy = p.random(dyRanges[rangeIndex][0], dyRanges[rangeIndex][1]); // Zufallswert im neuen Bereich
        pnt.moveDir *= -1; // Richtung ändern (oben ↔ unten)
      }
      lastCycle = currentCycle;
    }

    // Berechne die aktuellen Y-Positionen
    let positions = points.map((pnt) => {
      let movementFactor = t <= 1 ? t : 2 - t;
      let offset = pnt.moveDir !== 0 ? pnt.dy * movementFactor * pnt.moveDir : 0;
      return { x: pnt.x, y: pnt.y + offset };
    });

    // Linie mit Rundungen zeichnen
    p.stroke(0);
    p.noFill();
    p.beginShape();
    // Doppelter Startpunkt
    p.curveVertex(positions[0].x, positions[0].y);
    for (let pos of positions) {
      p.curveVertex(pos.x, pos.y);
    }
    // Doppelter Endpunkt
    p.curveVertex(positions[positions.length - 1].x, positions[positions.length - 1].y);
    p.endShape();
  };
};

// Funktion, die beim Klick auf den Body ausgeführt wird
function startAnimation() {
  // Wenn die p5-Instanz noch nicht erstellt wurde, dann erstelle sie jetzt
  if (!p5Instance) {
    p5Instance = new p5(wavelineSketch); // Startet den Sketch, wenn startAnimation aufgerufen wird
  }
  console.log("Animation gestartet!");
}
