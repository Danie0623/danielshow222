let bg = ["#060301"];


let gradationpallet1 = [
  "#193c46",
  "#f34e3f",
  "#775954",
];
let gradationpallet2 = [
  "#d99830",
  "#d6ccc4",
  "#341d17",
];

class Ball {
  constructor(x, y, radius, speedX, speedY, color1, color2) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color1 = color1;
    this.color2 = color2;
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x <= 0 || this.x >= width) {
      this.speedX *= -1;
    }
    if (this.y <= 0 || this.y >= height) {
      this.speedY *= -1;
    }
  }

  draw() {
    push();
    translate(this.x, this.y);

    
    let gradient = drawingContext.createLinearGradient(
      0,
      -this.radius / 2,
      0,
      this.radius / 2
    );

   
    gradient.addColorStop(0, this.color1);
    gradient.addColorStop(1, this.color2);

    
    drawingContext.strokeStyle = gradient;

    let d = this.radius * 0.6;
    strokeWeight(d);
    line(-d / 6, -d / 6, d / 4, d / 6);

    strokeWeight(d / 2);
    stroke(bg);
    line(-d / 6, -d / 6, d / 4, d / 6);

    pop();
  }
}

let balls = [];

function setup() {
  createCanvas(380, 380);
  angleMode(DEGREES);
  background(bg);

  let cols = 8;
  let rows = cols;
  let cellW = width / cols;
  let cellH = height / rows;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * cellW;
      let y = j * cellH;

      let speedX = random(-3, 3); 
      let speedY = random(-3, 3); 
      let color1 = random(gradationpallet1);
      let color2 = random(gradationpallet2);
      let radius = random(10, 30);

      balls.push(new Ball(x + cellW / 2, y + cellH / 2, radius, speedX, speedY, color1, color2));
    }
  }
}

function draw() {
  background(bg);

  for (let ball of balls) {
    ball.move();
    ball.draw();
  }
}