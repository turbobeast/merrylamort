function makeSnowball (x, y, radius, active) {
  var snowball = {};
  snowball.bg = false;
  snowball.untouchable = false;
  snowball.x = x;
  snowball.y = y;
  snowball.radius = radius;
  snowball.mass = snowball.radius * 0.1;
  snowball.dx = 0;
  snowball.dy = 0;
  snowball.drag = false;
  snowball.mouseOffsetX = 0;
  snowball.mouseOffsetY = 0;
  snowball.oldX = snowball.x;
  snowball.oldY = snowball.y;
  snowball.active = active;
  snowball.brother1 = null;
  snowball.corpsehead = false;
  snowball.brother2 = null;
  snowball.lifeCounter = 0;
  snowball.offsetY = 0;
  snowball.rotationVelocity = 0;
  snowball.rotation = 0;
  snowball.deathCounter = 3;
  snowball.canMakeSound = false;
  snowball.alpha = 1;
  snowball.has_shadow = true;
  return snowball;
}
