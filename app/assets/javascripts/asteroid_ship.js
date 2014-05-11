(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function(pos, vel) {
    Asteroids.MovingObject.call(this, pos, vel, Ship.RADIUS, Ship.COLOR);
  };

  Ship.inherits(Asteroids.MovingObject);

  Ship.RADIUS = 10;
  Ship.COLOR = "green";

  Ship.prototype.power = function(impulse){
    var x = this.vel[0]+impulse[0];
    var y = this.vel[1]+impulse[1];
    if (x > 10) {
      x = 10;
    }
    if (x < -10) {
      x = -10;
    }
    if (y < -10) {
      y = -10;
    }
    if (y > 10) {
      y = 10;
    }
    this.vel = [x, y];
  };

  Ship.prototype.fireBullet = function(game) {
    if (this.vel === [0,0]){
      return;
    }
    var shipSpeed = Math.sqrt(Math.pow(this.vel[0], 2) +
                              Math.pow(this.vel[1], 2));
    var direction = [this.vel[0]/shipSpeed,
                     this.vel[1]/shipSpeed];

    var pos = this.pos;
    var vel = [Asteroids.Bullet.SPEED * direction[0],
               Asteroids.Bullet.SPEED * direction[1]];
    return (new Asteroids.Bullet(pos, vel, game));
  };

})(this);