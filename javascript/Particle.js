import Vector from "./Vector";

class Particle {
  constructor(
    game, 
    startX = 0, 
    startY = 0, 
    vel = new Vector(0,0), 
    cb = () => {} 
  ) {
    this.cvs = game.cvs;
    this.ctx = game.ctx;
    this.x = startX;
    this.y = startY;
    this.vel = vel;
    this.cb = cb;
    this.alive = true;

    this.r = 2;
    this.fillColor = 'red';
    this.outline = 'none';
  }

  validatePosition(rectX, rectY) {
    if ( this.x > rectX + this.r 
      || this.x < 0 - this.r 
      || this.y > rectY + this.r 
      || this.y < 0 - this.r ) { 
        this.alive = false;
      };
  }

  update(game) {
    this.x += this.vel.x;
    this.y += this.vel.y;
    this.cb();

    this.validatePosition(this.cvs.width, this.cvs.height);
  }

  // ctx.arc(x, y, r, sAngle, eAngle, [counterclockwise])
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.fillColor;
    this.ctx.strokeStyle = this.fillColor;
    this.ctx.fill();
    this.ctx.stroke();
  }
}

export default Particle;