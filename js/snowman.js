const makeSnowManFactory = (snowballs, zombieNames) => (x, y, left, snowballs) => {
  const snoMan = {}

  const num = Math.floor( Math.random() * zombieNames.length );
  const nam = zombieNames[num];
  const rNum = Math.floor( Math.random () * 100 );  //Wavy random num.

  //var rType = Math.round(Math.random() * 1)  +2;
  const rType = 3;
  const rRadii = [];

  for (f=0; f < rType; f+= 1) {
    rRadii.push(Math.floor(Math.random() * 20) + 30);
  }
  const headRadius = 34;
  const midriff_radius = 55;
  const base_radius = 60;
  snoMan.ball1 = makeSnowball( x, y, base_radius, false); //bottom body
  snoMan.ball2 = makeSnowball( x, y, midriff_radius, false); //body
  snoMan.ball3 = makeSnowball( x, y, headRadius, false); //head

  snoMan.ball1.brother1 = snoMan.ball2;
  snoMan.ball1.brother2 = snoMan.ball3;
  snoMan.ball2.brother1 = snoMan.ball3;
  snoMan.ball2.brother2 = snoMan.ball3;
  snoMan.ball3.body1 = snoMan.ball2;
  snoMan.ball3.body2 = snoMan.ball1;
  snoMan.ball1.isLeft = left;
  snoMan.ball2.isLeft = left;
  snoMan.ball3.isLeft = left;

  snoMan.ball1.corpsebase = true;
  snoMan.ball2.corpsebody = true;
  snoMan.ball3.brother1 = null;
  snoMan.ball3.brother2 = null;
  snoMan.ball3.corpsehead = true;
  snoMan.ball3.alpha = 1;

  snoMan.ball3.wasundead = true;

  snoMan.ball2.hasarms = true;

  snoMan.ball1.imgSize = base_radius * 2.2;						//bottom body
  snoMan.ball2.imgSize = midriff_radius * 2;						//middle body
  snoMan.ball3.imgSize = headRadius * 2;						//head

  snoMan.ball1.xVelo = 2;
  snoMan.ball2.xVelo = 2;
  snoMan.ball3.xVelo = 2;

  snoMan.ball1.placement = (base_radius*0.4) + 28;
  snoMan.ball2.placement = (base_radius*2*0.7) + 28;
  snoMan.ball3.placement = (base_radius*2*0.7) + (midriff_radius*2*0.5) + 28;

  snoMan.ball1.offsetY = snoMan.ball1.placement -190;
  snoMan.ball2.offsetY = snoMan.ball2.placement -190;
  snoMan.ball3.offsetY = snoMan.ball3.placement -190;

  snoMan.ball1.targetY = snoMan.ball1.placement;
  snoMan.ball2.targetY = snoMan.ball2.placement;
  snoMan.ball3.targetY = snoMan.ball3.placement;

  snoMan.ball1.has_shadow = false;
  snoMan.ball2.has_shadow = false;
  snoMan.ball3.has_shadow = false;

  snoMan.ball1.rNum = rNum;
  snoMan.ball2.rNum = rNum;
  snoMan.ball3.rNum = rNum;

  snoMan.ball3.name = nam;
  snowballs.push(snoMan.ball1, snoMan.ball2, snoMan.ball3)

  return 1
}
