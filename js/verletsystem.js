var VerletSystem = function VerletSystem(w,h) {
    var VS = {},
    width = w,
    height = h,
    points = [],
    sticks = [],
    gravity = 0.4,
    showPoints = true,
    updatePoint,
    updateStick,
    constrainPoint;

    VS.addPoint = function(index, x, y, vx, vy) {
        var pint = {x:x, y:y, oldx:x - (vx || 0), oldy:y - (vy || 0)};

        points[index] = pint;
        return pint;
    };


    VS.addStick = function(indexA, indexB, style, width) {
        var pointA = points[indexA],
        pointB = points[indexB],
        dx,
        dy,
        dist,
        stick;

        dx = pointB.x - pointA.x;
        dy = pointB.y - pointA.y;
        dist = Math.sqrt(dx * dx + dy * dy);

        stick = {a:pointA, b:pointB, dist:dist, style:style || "#000000", width:width || 1, angle : 0 };
        sticks.push(stick);

        return stick;
    };

    VS.dimensions = function(w,h) {
        width = w;
        height = h;
    };

    updatePoint = function(p) {
        var vx, vy;
        vx = p.x - p.oldx;
        vy = p.y - p.oldy;
        vy += gravity;
        vx *= 0.96;
        p.oldx = p.x;
        p.oldy = p.y;
        p.x += vx;
        p.y += vy;
    };

    constrainPoint = function(p) {
        if(p.x > width) p.x = width;
        if(p.x < 0) p.x = 0;
        if(p.y > height)  p.y = height;
        if(p.y < 0) p.y = 0 ;
    };

    updateStick = function(s) {
        var dx, dy, cx, cy, angle;
        dx = s.b.x - s.a.x;
        dy = s.b.y - s.a.y;
        cx = s.a.x + dx / 2;
        cy = s.a.y + dy / 2;
        angle = Math.atan2(dy, dx);
        s.angle = angle;
        s.a.x = cx - Math.cos(angle) * s.dist / 2;
        s.a.y = cy - Math.sin(angle) * s.dist / 2;
        s.b.x = cx + Math.cos(angle) * s.dist / 2;
        s.b.y = cy + Math.sin(angle) * s.dist / 2;
    };

    VS.update = function() {
        var i, j;
        for(i = 0; i < points.length; i += 1) {
           updatePoint(points[i]);
        }
        for(j = 0; j < 3; j += 1) {
            for(i = 0; i < points.length; i += 1) {
                constrainPoint(points[i]);
            }
            for(i = 0; i < sticks.length; i += 1) {
                updateStick(sticks[i]);
            }
        }
    };

    return VS;

};

// module.exports = VerletSystem;
