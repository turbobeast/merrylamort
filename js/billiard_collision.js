function collisionReboundSingleAxis (particle1, particle2, vel1, vel2) {
  var collisionForce = ((particle1.mass - particle2.mass) * vel1.x + (2 * particle2.mass * vel2.x)) / (particle1.mass + particle2.mass);
  return collisionForce;
}

function invertMatrix2x2 (matrix) {
return [matrix[0], matrix[2], matrix[1], matrix[3]];
}

function createRotationMatrixFromAngle (theta) {
var cos = Math.cos(theta);
var sin = Math.sin(theta);

// 2d rotation matrix is just a truncated z-axis rotation matrix
// it would still work if it was 3x3
// [cos, sin,
// -sin, cos];

return [cos, sin, -sin, cos];
}

function matrix2x2MultiplyVector2 (matrix, vector) {
var x = vector[0] * matrix[0] + vector[1] * matrix[1];
var y = vector[0] * matrix[2] + vector[1] * matrix[3];

return { x: x, y:y };
}

function billiardCollision (ball1, ball2, h, b, particles, gameOn, onCollision) {
  var dx = ball2.x - ball1.x,
    dy = ball2.y - ball1.y,
    dist = Math.sqrt(dx * dx + dy * dy),
    minDist = ball2.radius + ball1.radius,
    superV = 12,
    angle = 0,
    sin = 0,
    cos = 0,
    cX = 0,
    cY = 0,
    pos1 = 0,
    pos2 = 0,
    vel1,
    vel2,
    vxTotal,
    absV,
    overlap,
    pos1f,
    pos2f,
    vel1f,
    vel2f;

  if( dist < minDist ) {
    //calculate the angle
    // if( ball1.canMakeSound  ) {
    //   ball1.canMakeSound = false;
    //   if( canPlaySound === true ) {
    //     smashSound.play();
    //     ball1.isInArray = false;
    //     //snowballs.splice(b, 1);
    //   }
    //
    // }

    ball1.rotationVelocity = Math.random() * 20 - 10;
    ball2.rotationVelocity = Math.random() * 20 - 10;
    ball2.active = true;

    if (ball2.brother1 !== null ) {
      ball2.brother1.active = true;
      ball2.brother2.active = true;
    }

    angle = Math.atan2(dy, dx);
    sin = Math.sin(angle);
    cos = Math.cos(angle);

    cX = ball1.x + ball1.radius * cos;
    cY = ball1.y + ball1.radius * sin;
      if (Math.abs( ball1.dx * ball1.dy ) > (ball2.dx * ball2.dy) ) {
      superV = ball1.dx * ball1.dy;
    } else { superV = ball2.dx * ball2.dy; }

    ball1.rotationVelocity = superV * 0.2;
    ball2.rotationVelocity = (superV * 0.2) * -1;
    // if(particles.length < 1000) {
    //   if( Math.abs(superV) > 22){
    //     makeExplosion( cX, cY, superV *0.04 );
    //   }
    // }

    // if(ball2.hasarms === true) {
    //   ball2.hasarms = false;
    //   addArms( ball2.x, ball2.y);
    // }
    //rotate ball1's position
    pos1 = {x: 0, y : 0};
    //rotate ball two's position
    // pos2 = rotate(dx, dy, sin, cos, true);
    var mat = createRotationMatrixFromAngle(angle);
    pos2 = matrix2x2MultiplyVector2(mat, [dx, dy] );
    //rotate ball1's velocity
    vel1 = matrix2x2MultiplyVector2(mat, [ball1.dx, ball1.dy] ); // rotate(ball1.dx, ball1.dy,sin,cos,true);
    //rotate ball2's velocity
    vel2 = matrix2x2MultiplyVector2(mat, [ball2.dx, ball2.dy] ) //rotate(ball2.dx, ball2.dy, sin, cos, true);
    //collision reacton
    vxTotal = vel1.x - vel2.x;
    vel1.x = collisionReboundSingleAxis(ball1, ball2, vel1, vel2);
    // vel1.x = ( (ball1.mass - ball2.mass)  * vel1.x + 2 * ball2.mass * vel2.x ) / (ball1.mass + ball2.mass);
    vel2.x = vxTotal + vel1.x;
    //stuck together fix
    absV = Math.abs(vel1.x) + Math.abs(vel2.x);
    overlap = (ball1.radius + ball2.radius) - Math.abs(pos1.x - pos2.x);
    pos1.x += vel1.x / absV * overlap;
    pos2.x += vel2.x / absV * overlap;
    //rotate positions back
    var inverseRotation = invertMatrix2x2(mat);
    pos1F = matrix2x2MultiplyVector2(inverseRotation, [pos1.x, pos1.y] ); //rotate(pos1.x,pos1.y,sin,cos,false);
    pos2F = matrix2x2MultiplyVector2(inverseRotation, [pos2.x, pos2.y] ); // rotate(pos2.x,pos2.y,sin,cos,false);
    //adjust positions
    ball2.x = ball1.x + pos2F.x;
    ball2.y = ball1.y + pos2F.y;
    ball1.x = ball1.x + pos1F.x;
    ball1.y = ball1.y + pos1F.y;
    //rotate velocities back
    vel1f = matrix2x2MultiplyVector2(inverseRotation, [vel1.x, vel1.y] ); // rotate(vel1.x, vel1.y, sin, cos, false);
    vel2f = matrix2x2MultiplyVector2(inverseRotation, [vel2.x, vel2.y] ); // rotate(vel2.x, vel2.y, sin, cos, false);

    ball1.dx = vel1f.x;
    ball1.dy = vel1f.y;
    if( gameOn ) {

      if (Math.abs(superV) < 2000) {
        ball2.dx = vel2f.x;
        ball2.dy = vel2f.y;
      }
      // if( ball2.corpsehead === false && Math.abs(superV) > 2000 ){
      //   snowballs.splice(h, 1);
      // } else {
      //   ball2.dx = vel2f.x;
      //   ball2.dy = vel2f.y;
      // }

      if(Math.abs(superV) > 1000 ) {
        firstBallFired = true;
      }
    }

    if (typeof onCollision === 'function') {
      onCollision(superV, ball1, ball2, { x: cX, y: cY}, h);
    }

    return true;
  }

  return false;
}
