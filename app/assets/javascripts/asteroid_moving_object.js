Function.prototype.inherits = function(SuperClass) {
  function Surrogate() {};
  Surrogate.prototype = SuperClass.prototype;
  this.prototype = new Surrogate();
};

(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var MovingObject = Asteroids.MovingObject = function (pos, vel, radius, color) {
    this.pos = pos;
    this.vel = vel;
    this.color = color;
    this.radius = radius;
  };

  MovingObject.prototype.move = function() {
    this.pos = [this.pos[0] + this.vel[0] , this.pos[1] + this.vel[1]]
    if(this.pos[0] > Asteroids.Game.DIM_X + this.radius) {
      this.pos[0] = 0 - this.radius;
    }
    if(this.pos[0] < 0 - this.radius){
      this.pos[0] = Asteroids.Game.DIM_X + this.radius;
    }
    if(this.pos[1] > Asteroids.Game.DIM_Y + this.radius){
      this.pos[1] = 0 - this.radius;
    }
    if(this.pos[1] < 0 - this.radius){
      this.pos[1] = Asteroids.Game.DIM_Y + this.radius;
    }
  };

  MovingObject.prototype.draw = function(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.isCollideWith = function(otherObject) {
    var totalDist = Math.sqrt(Math.pow(this.pos[0]-otherObject.pos[0],2) +
                    Math.pow(this.pos[1]-otherObject.pos[1],2));
    var totalRadius = this.radius + otherObject.radius;
    if(totalRadius >= totalDist) {
      return true;
    }
    else {
      return false;
    }
  };

})(this);