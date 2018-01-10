var t = []
var mode = 0
var modeLang = [
    "0: Circumcenter",
    "1: Incenter",
    "2: Centroid",
    "3: Orthocenter"
]
var m1,m2,m3
var a1,a2,a3
var b1,b2,b3
var c1,c2,c3

var setup = function() {
    reset()
    colorMode(HSB)
}

var windowResized = function() {
    reset()
}

function reset() {
    createCanvas(innerWidth, innerHeight)
    t = []
    console.log("reset")
    textAlign(LEFT,TOP)
}
var mouseClicked = function() {
    switch (t.length) {
        case 0:
            t.push({x:mouseX,y:mouseY})
            break;
        
        case 1:
            t.push({x:mouseX,y:mouseY})
            break;

        case 2:
            t.push({x:mouseX,y:mouseY})
            break;

        default:
            reset()
            break;
    }
}
var keyPressed = function() {
    mode++
}

var draw = function() {
    if(t.length < 3) {
        background(120,0,255)

        strokeWeight(4)
        for (var i = 0; i < t.length; i++) {
            point(t[i].x,t[i].y)
        }


    } else {
        background(120,40,255)

        strokeWeight(4)
        for (var i = 0; i < t.length; i++) {
            point(t[i].x,t[i].y)
        }
        strokeWeight(2)
        stroke(0,0,0)
        line(t[0].x,t[0].y,t[1].x,t[1].y)
        line(t[1].x,t[1].y,t[2].x,t[2].y)
        line(t[2].x,t[2].y,t[0].x,t[0].y)

        fill(0,0,0)
        textSize(72)
        text(modeLang[mode%4],20,20)
        switch (mode%4) {
            case 0:
                /* CIRCUMCENTER */

                // Locate Midpoints
                m1 = {x:(t[0].x + t[1].x)/2,y:(t[0].y + t[1].y)/2}
                m2 = {x:(t[1].x + t[2].x)/2,y:(t[1].y + t[2].y)/2}
                m3 = {x:(t[2].x + t[0].x)/2,y:(t[2].y + t[0].y)/2}

                strokeWeight(4)
                stroke(0,255,255)
                point(m1.x,m1.y)
                point(m2.x,m2.y)
                point(m3.x,m3.y)

                // Get Perp Bisectors
                a1 = atan2(t[0].y - t[1].y, t[0].x - t[1].x) + Math.PI/2
                a2 = atan2(t[1].y - t[2].y, t[1].x - t[2].x) + Math.PI/2
                a3 = atan2(t[2].y - t[0].y, t[2].x - t[0].x) + Math.PI/2

                stroke(0,255,255)
                push()
                    strokeWeight(1)
                    translate(m1.x,m1.y)
                    rotate(a1)
                    line(-width,0,width,0)
                pop()
                push()
                    strokeWeight(1)
                    translate(m2.x,m2.y)
                    rotate(a2)
                    line(-width,0,width,0)
                pop()
                push()
                    strokeWeight(1)
                    translate(m3.x,m3.y)
                    rotate(a3)
                    line(-width,0,width,0)
                pop()
                break;
        
            case 1:
                /* INCENTER */

                // Get Angle Bisectors
                b1 = (atan2(t[0].y - t[1].y, t[0].x - t[1].x) + atan2(t[0].y - t[2].y, t[0].x - t[2].x)) / 2
                b2 = (atan2(t[1].y - t[0].y, t[1].x - t[0].x) + atan2(t[1].y - t[2].y, t[1].x - t[2].x)) / 2
                b3 = (atan2(t[2].y - t[0].y, t[2].x - t[0].x) + atan2(t[2].y - t[1].y, t[2].x - t[1].x)) / 2
                push()
                    strokeWeight(1)
                    translate(t[0].x,t[0].y)
                    rotate(b1)
                    line(-width,0,width,0)
                pop()
                push()
                    strokeWeight(1)
                    translate(t[1].x,t[1].y)
                    rotate(b2)
                    line(-width,0,width,0)
                pop()
                push()
                    strokeWeight(1)
                    translate(t[2].x,t[2].y)
                    rotate(b3)
                    line(-width,0,width,0)
                pop()
                break;
        
            case 2:
                /* CENTROID */

                // Locate Midpoints
                m1 = {x:(t[0].x + t[1].x)/2,y:(t[0].y + t[1].y)/2}
                m2 = {x:(t[1].x + t[2].x)/2,y:(t[1].y + t[2].y)/2}
                m3 = {x:(t[2].x + t[0].x)/2,y:(t[2].y + t[0].y)/2}

                strokeWeight(4)
                stroke(0,255,255)
                point(m1.x,m1.y)
                point(m2.x,m2.y)
                point(m3.x,m3.y)

                // Get Medians
                c1 = atan2(m1.y - t[2].y, m1.x - t[2].x)
                c2 = atan2(m2.y - t[0].y, m2.x - t[0].x)
                c3 = atan2(m3.y - t[1].y, m3.x - t[1].x)

                push()
                    strokeWeight(1)
                    translate(m1.x,m1.y)
                    rotate(c1)
                    line(-width,0,width,0)
                pop()
                push()
                    strokeWeight(1)
                    translate(m2.x,m2.y)
                    rotate(c2)
                    line(-width,0,width,0)
                pop()
                push()
                    strokeWeight(1)
                    translate(m3.x,m3.y)
                    rotate(c3)
                    line(-width,0,width,0)
                pop()
                break;
        
            case 3:
                /* ORTHOCENTER */

                // Get Perp Bisectors
                a1 = atan2(t[0].y - t[1].y, t[0].x - t[1].x) + Math.PI/2
                a2 = atan2(t[1].y - t[2].y, t[1].x - t[2].x) + Math.PI/2
                a3 = atan2(t[2].y - t[0].y, t[2].x - t[0].x) + Math.PI/2

                stroke(0,255,255)
                push()
                    strokeWeight(1)
                    translate(t[2].x,t[2].y)
                    rotate(a1)
                    line(-width,0,width,0)
                pop()
                push()
                    strokeWeight(1)
                    translate(t[0].x,t[0].y)
                    rotate(a2)
                    line(-width,0,width,0)
                pop()
                push()
                    strokeWeight(1)
                    translate(t[1].x,t[1].y)
                    rotate(a3)
                    line(-width,0,width,0)
                pop()
                break;
        }
    }
}
