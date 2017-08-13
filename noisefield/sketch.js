var grid = []
var rows, cols
var scl = 20
var res = .03
var off = 0
var z = 0
var zin = .001
var particles = []
var debug = false
var mag

var setup = function() {
    createCanvas(innerWidth,innerHeight)
    noStroke()
    cols = ceil(width/scl)+1
    rows = ceil(height/scl)+1
    background(0)
    mag = .3
    for (var i = 0; i < 1000; i++) {   
        particles.push(new Particle(random(0,width),random(0,height)))
    }
}

var draw = function() {
    if(debug){background(0)}
    background(0,25)
    for (var i = 0; i < cols; i++) {
        grid[i] = []
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new p5.Vector.fromAngle(map(noise(i*res,j*res,z),0,1,-TWO_PI,TWO_PI))
            grid[i][j].setMag(mag)
        }
    }
    if (debug) {for (var i = 0; i < cols; i++) {for (var j = 0; j < rows; j++) {push();fill(255);stroke(255);strokeWeight(2);translate(i*scl,j*scl);rotate(grid[i][j].heading());line(0,0,10,0);pop();}}}
    for (var i = 0; i < particles.length; i++) {
        particles[i].tick()
    }
    z += zin
}
var windowResized = function() {
    resizeCanvas(innerWidth,innerHeight)
    cols = ceil(width/scl)+1
    rows = ceil(height/scl)+1
}
var Particle = function(x,y) {
    this.pos = new p5.Vector(x,y)
    this.vel = new p5.Vector(0,0)
    this.acc = new p5.Vector(0,0)
    this.tick = function() {
        //BOUNDS
        if (this.pos.x < 0) {
            this.pos.x = width
        }
        if (this.pos.x > width) {
            this.pos.x = 0
        }
        if (this.pos.y < 0) {
            this.pos.y = height
        }
        if (this.pos.y > height) {
            this.pos.y = 0
        }
        this.vel.limit(3)

        //UPDATE
        this.acc.add(grid[floor(this.pos.x/scl)][floor(this.pos.y/scl)])
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        this.acc.mult(0)

        //RENDER
        fill(255,255,255,10)
        ellipse(this.pos.x,this.pos.y,scl/2,scl/2)

    }
}

var mouseDragged = function() {
    particles.push(new Particle(mouseX,mouseY))
}