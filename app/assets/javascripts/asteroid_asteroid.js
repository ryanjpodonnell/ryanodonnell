(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function (pos, vel) {
    Asteroids.MovingObject.call(this, pos, vel, Asteroid.RADIUS, Asteroid.COLOR);
  };

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.COLOR = "purple";
  Asteroid.RADIUS = 25;

  Asteroid.randomAsteroid = function(dimX, dimY){
    var x = dimX * Math.random();
    var y = dimY * Math.random();
    var vel = Asteroid.randomVel();
    return new Asteroid([x,y], vel);
  };

  Asteroid.randomVel = function(){
    var x = (Math.random() - 0.5)*1;
    var y = (Math.random() - 0.5)*1;
    return [x,y];
  };



})(this);

