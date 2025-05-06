class Waveline {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.points = [];
        this.duration = 500;
        this.startTime;
        this.lastCycle = -1;
        this.dyRanges = [
            [2, 5],    // 1. Zyklus: random zwischen 5 und 10
            [3, 10],   // 2. Zyklus: random zwischen 5 und 20
            [5, 10],   // 3. Zyklus: random zwischen 10 und 30
            [8, 18],   // 4. Zyklus: random zwischen 15 und 40
            [10, 20],  // 5. Zyklus: random zwischen 20 und 50
            [10, 20]   // 6. Zyklus: random zwischen 25 und 55
        ];
        this.animationStarted = false;
        this.p = new p5((sketch) => this.sketch(sketch), this.container);
    }

    sketch(p) {
        p.setup = () => {
            this.canvas = p.createCanvas(this.container.offsetWidth, this.container.offsetHeight);
            this.canvas.parent(this.container);
            this.startTime = p.millis();

            this.config = [
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

            for (let c of this.config) {
                this.points.push({
                    x: c.x,
                    y: 200,
                    moveDir: c.move,
                    dy: p.random(this.dyRanges[0][0], this.dyRanges[0][1]) // Start mit dem ersten Bereich
                });
            }
        }

        p.draw = () => {
            if (!this.animationStarted) return;

            p.clear();

            let elapsed = p.millis() - this.startTime;
            let cycleTime = 2 * this.duration;
            let currentCycle = Math.floor(elapsed / cycleTime);
            let t = (elapsed % cycleTime) / this.duration;

            if (currentCycle !== this.lastCycle) {
                // Bereich aus dem dyRanges-Array auswählen
                this.rangeIndex = currentCycle % this.dyRanges.length;
                for (let p of this.points) {
                    p.dy = p.random(this.dyRanges[this.rangeIndex][0], this.dyRanges[this.rangeIndex][1]); // Zufallswert im neuen Bereich
                    p.moveDir *= -1; // Richtung ändern (oben ↔ unten)
                }
                this.lastCycle = currentCycle;
            }

            // Berechne die aktuellen Y-Positionen
            let movementFactor = (t <= 1) ? t : 2 - t;
            let offset = 0;
            this.positions = this.points.map(p => {
                offset = (p.moveDir !== 0) ? p.dy * movementFactor * p.moveDir : 0;
                return { x: p.x, y: p.y + offset };
            });

            // Linie mit Rundungen zeichnen
            p.stroke(0);
            p.noFill();
            p.beginShape();
            // Doppelter Startpunkt
            p.curveVertex(this.positions[0].x, this.positions[0].y);
            for (let pos of this.positions) {
                p.curveVertex(pos.x, pos.y);
            }
            // Doppelter Endpunkt
            p.curveVertex(this.positions[this.positions.length - 1].x, this.positions[this.positions.length - 1].y);
            p.endShape();
        }
    }

    start() {
        // Verzögerung von 8.265 Sekunden (8265 ms)
        setTimeout(() => {
            this.animationStarted = true;  // Animation starten
            this.p.loop();  // Animation starten
        }, 8265);  // Verzögerung von 8,265 Sekunden
    }

    stop() {
        this.p.noLoop();
        this.p.clear();
    }
}

// Startanimation beim Klick
function startAnimation() {
    const canvas = new Waveline('canvas-container-Waveline');
    canvas.start();  // Startet die Animation nach der Verzögerung
}
