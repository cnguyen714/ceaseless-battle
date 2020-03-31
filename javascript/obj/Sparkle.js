import Vector from "../lib/Vector";
import EnemyCircle from "./EnemyCircle";
import GameObject from "./GameObject";
import DamageNumber from "./DamageNumber";
import Slam from "./Slam";

const RADIUS = 2;
const COLOR = "white";
const DECAY = 0.7;

class Sparkle extends GameObject {
  constructor(
    game,
    {  
      coords = {x: 0, y: 0},
      vel = new Vector(0, 0),
      cb = () => { },
      color = COLOR,
      r = RADIUS,
      decayRate = DECAY,
    }
  ) {
    super(game);
    this.pos = new Vector(coords.x, coords.y);
    this.vel = vel;
    this.r = r;
    this.color = color;
    this.cb = cb;
    this.aliveTime = 20;
    this.decayRate = decayRate;

    this.game.vanity.push(particle);

    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
  }

  validatePosition(rectX, rectY) {
    if (this.pos.x > rectX + this.r
      || this.pos.x < 0 - this.r
      || this.pos.y > rectY + this.r
      || this.pos.y < 0 - this.r) {
      this.alive = false;
    };
  }

  checkCollision(obj) {
    return;
  }

  update() {
    if (!this.alive) return; //Don't check collision if object is not alive
    if (!this.active) return;
    this.r *= this.decayRate;
    this.pos = this.pos.add(this.vel);
    this.aliveTime--;
    if (this.aliveTime <= 0) this.alive = false;

    this.addVelocityTimeDelta();
    this.validatePosition(this.cvs.width, this.cvs.height);
  }

  // ctx.arc(x, y, r, sAngle, eAngle, [counterclockwise])
  draw() {
    if (!this.alive) return;
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();

    this.ctx.closePath();
    this.ctx.restore();
  }
}

export default Sparkle;