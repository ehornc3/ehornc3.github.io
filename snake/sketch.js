//  Snake!
// Featuring....
/*
 *
 * INCREDIBLY SLOPPY CODE!
 *
 */


var cols;
var rows;
var x;
var y;
var ax;
var ay;
var trail = []
var traillength;

function setup() {
    // createCanvas(innerWidth-4,innerHeight-4)
    createCanvas(innerWidth,innerHeight)
    frameRate(15)
    noStroke()
    cols = floor(width/20)
    rows = floor(height/20)
    x = floor(random(cols))
    y = floor(random(rows))
    xv = 1
    yv = 0
    trail = []
    traillength = 5
    ax = 2
    ay = 2
}

function draw() {
    background(0)
    for(var i=0;i<trail.length;i++) {
        trail[i].show()
    }
    fill(255,0,0)
    rect(ax*20,ay*20,20,20)
    fill(0,255,0)
    rect(x*20,y*20,20,20)
    trail.splice(traillength)
    trail.unshift(new trailitem(x,y))
    x += xv
    y += yv
    if (x>=cols) {
        x = 0
    }
    if (x<0) {
        x = cols-1
    }
    if (y>=rows) {
        y = 0
    }
    if (y<0) {
        y = rows-1
    }
    appleCheck();
}

function appleCheck() {
    if (ax == x && ay == y) {
        newApple()
    }
}

function newApple() {
    traillength += 1
    while (ax == x || ay == y) {
        ax = floor(random(cols))
        ay = floor(random(rows))
    }
}

function trailitem(x,y) {
    this.x = x
    this.y = y
}
function reset() {
    console.log("Reset")
    x = floor(random(cols))
    y = floor(random(rows))
    traillength = 5
    trail = []
}
trailitem.prototype.show = function() {
    fill(255);
    rect(this.x*20,this.y*20,20,20);
    if (this.x == x && this.y == y) {
        reset()
    }
}

function keyPressed() {
    switch(keyCode) {
        case UP_ARROW:
            if (xv == 0 && yv == 1) {
                console.log("Tried to go backwards")
            } else {
                xv = 0
                yv = -1
            }
        break;
        case DOWN_ARROW:
            if (xv == 0 && yv == -1) {
                console.log("Tried to go backwards")
            } else {
                xv = 0
                yv = 1
            }
        break;
        case LEFT_ARROW:
            if (xv == 1 && yv == 0) {
                console.log("Tried to go backwards")
            } else {
                xv = -1
                yv = 0
            }
        break;
        case RIGHT_ARROW:
            if (xv == -1 && yv == 0) {
                console.log("Tried to go backwards")
            } else {
                xv = 1
                yv = 0
            }
        break;
    }
}