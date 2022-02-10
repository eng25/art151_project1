// Art 151
// Project 1
// Ethan Ng
// Pixies
let p_list = [];
let color_list = [];
let t_color_list = [];
let newX, newY, flag;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // store a list colors
  color_list[0] = color("#42a7f5");
  color_list[1] = color("#ffb0d8");
  color_list[2] = color("#5ae665");
  t_color_list[0] = color("#62c7ff");
  t_color_list[1] = color("#ffd0f8");
  t_color_list[2] = color("#7aff85");

  for (let i = 1; i < 9; i++) {
    p_list.push(new Particle(width/2, height/2, i));
  }
  off = 0;
  window.alert("Pixies is about observing and interacting with pixes as they float around.\nMove your cursor over them to slow them down\nClick outside the circle to add more pixies")
}

function draw() {
  background(30);
  stroke(255);
  strokeWeight(1);
  noFill();
  ellipse(windowWidth/2, windowHeight/2, 300);
  for (let i = 0; i < p_list.length; i++) {
    p_list[i].show();
    p_list[i].update();
  }
}

function mouseClicked() 
{
  if (dist(mouseX, mouseY, windowWidth/2, windowHeight/2) > 150)
  {
    p_list.push(new Particle(width/2, height/2, p_list.length));
  }
}

class Particle {

  constructor(x, y, id) {
    this.x  = x;
    this.y  = y;
    this.id = id;
    this.off = (this.id + 1) * 100;
    this.dir = 1;
    this.spd = 1;
    this.history = [];
    let randomColor = int(random(0,3));
    this.color = color_list[randomColor];
    this.tColor = t_color_list[randomColor];
    this.tColor.setAlpha(75);
    console.log(this.id);
  }

  update() {
    // move to next spot
    if (dist(mouseX, mouseY, this.x, this.y) < 25)
    {
      this.spd = .25;
    }
    else
    {
      this.spd = 1;
    }
    flag = false;
    while (flag == false)
    {
      let vect = p5.Vector.fromAngle(noise(this.off) * TWO_PI, this.dir * this.spd); 
      newX = this.x + vect.x;
      newY = this.y + vect.y;
      this.off += 0.1;
      if (dist(windowWidth/2, windowHeight/2, newX, newY) < 150)
      {
        flag = true;
      }
      else
      {
        this.dir *= -1;
      }
    }
    
    this.x = newX;
    this.y = newY;
    // store vector in history
    let v = createVector(this.x, this.y);
    this.history.push(v);

    if (this.history.length > 10) {
      this.history.splice(0, 1);
    }
  }

  show() {
    stroke(this.tColor);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let i = 0; i < this.history.length; i++) {
      let pos = this.history[i];
      curveVertex(pos.x, pos.y);
    }
    endShape();
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, 7);
    // Glow
    let glow = random(0, 1);
    fill(255, 255, 255, 255 * (glow + .25));
    ellipse(this.x, this.y, 6);
    fill(255, 255, 255, 50 * glow);
    ellipse(this.x, this.y, 21);
  }
}