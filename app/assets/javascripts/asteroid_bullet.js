(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function(pos, vel, game) {
    Asteroids.MovingObject.call(this, pos, vel, Bullet.RADIUS, Bullet.COLOR);
    this.game = game;
  };

  Bullet.RADIUS = 2;
  Bullet.COLOR = "black";
  Bullet.SPEED = 15;

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.prototype.hitAsteroids = function() {
    var hit = false
    for (var i = 0; i < this.game.asteroids.length; i++) {
      if (this.isCollideWith(this.game.asteroids[i])) {
        this.game.removeAsteroid(i);
        this.game.removeBullet();
        hit = true;
        break;
      }
    }
    return hit;
  };
})(this);