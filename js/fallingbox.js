var FallingBox = function (x,y,w,h,img) {
    var FB = {},
    xPos = x,
    yPos = y,
    wide = w,
    high = h,
    cornerPoint,
    leftStick,
    items = img,
    system = VerletSystem(w,h);

    FB.alpha = 1;

    function radians(grees) {return grees / 180 * Math.PI; }

    function makeBox (widf,hite,angle) {
        var hypot = Math.sqrt(widf * widf + hite * hite),
        secondPoint = { x : xPos + widf * Math.cos(radians(angle)),
                            y : yPos + widf * Math.sin(radians(angle))
                        };

        cornerPoint = system.addPoint(0, xPos, yPos);
        system.addPoint(1,
                         secondPoint.x,
                         secondPoint.y );
        system.addPoint(2, 
                      secondPoint.x + hite * Math.cos(radians(angle + 90)),
                       secondPoint.y + hite * Math.sin(radians(angle + 90)));
        system.addPoint(3,
                        xPos + hite * Math.cos(radians(angle + 90)),
                        yPos + hite * Math.sin(radians(angle + 90)));
        leftStick = system.addStick(0,1);
        system.addStick(1,2);
        system.addStick(3,1);
        system.addStick(2,3);
        system.addStick(3,0);

    };

    FB.fade = function () {
        FB.alpha = FB.alpha - 0.006;
        if(FB.alpha < 0) {
            FB.alpha = 0;
        }
    };

    FB.render = function (ctx,cWidth,cHeight) {
        //ctx.clearRect(0,0,cWidth,cHeight);
        ctx.save();
        ctx.setTransform(1,0,0,1,0,0);
        ctx.globalAlpha = FB.alpha;
        ctx.translate(cornerPoint.x, cornerPoint.y);
        ctx.rotate( leftStick.angle );
        ctx.beginPath();
        ctx.drawImage(items, 0,0);
        ctx.restore();
    };

    makeBox(wide,high,-25);
    FB.system = system;

    return FB;
};