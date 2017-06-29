function ballObj() {
    this.x = width/2,
    this.y = height/2,
    this.xVel = random(-2,2),
    this.yVel = random(1,2),
    this.xAcc = 0,
    this.yAcc = 0
}

function paddleObj() {
    this.x = width/2
}

function bodyObj(x,y,w) {
    this.x = x
    this.y = y
    this.w = w
    this.hit = false
}

var ball
var paddle
var bodies = []


function setup() {
    createCanvas(innerWidth,innerHeight)
    ellipseMode(CENTER)
    ball = new ballObj()
    paddle = new paddleObj()
    for (var i = 0; i < 5; i++) {
        bodies[i] = []
        var j = 0
        var k = 0
        var l = 0
        while (j < width) {
            k = floor(random(80,100))
            bodies[i][l] = new bodyObj(j,width / 8 + i * 20, k)
            j += k
            l++
        }
    }
}

function draw() {
    background(0)
    ball.update()
    ball.show()
    checkKeys()
    paddle.show()
    for (var i = 0; i < bodies.length; i++) {
        for (var j = 0; j < bodies[i].length; j++) {
            bodies[i][j].show()
        }
    }
}

ballObj.prototype.show = function() {
    fill(255)
    ellipse(ball.x,ball.y,20,20)
}

ballObj.prototype.update = function() {
    this.xVel += this.xAcc
    this.yVel += this.yAcc
    this.x += this.xVel
    this.y += this.yVel
    this.xAcc = 0
    this.yAcc = 0

    if (this.x <= 10 || this.x >= width - 10) {
        this.xVel *= -1.02
    }
    if (this.y <= 10) {
        this.yVel *= -1.02
    }
    if (abs(this.x - paddle.x) <= 25 && abs(this.y - height + 20) <= 15) {
        this.yVel *= -1.02
    }
}

paddleObj.prototype.show = function() {
    rectMode(CENTER)
    fill(255)
    rect(this.x,height-20,50,10)
}

function checkKeys() {
    if(keyIsDown(LEFT_ARROW)) {
        paddle.x += -5
    }
    if(keyIsDown(RIGHT_ARROW)) {
        paddle.x += 5
    }
}

bodyObj.prototype.show = function() {
    if(!this.hit) {
        rectMode(CORNER)
        fill(255)
        rect(this.x,this.y,this.w,20)
        if (abs(ball.x - (this.x + this.w/2)) <= this.w/2 && abs(ball.y - (this.y + 10)) <= 20) {
            console.log("Collision on side")
            this.hit = true;
            ball.yVel *= -1.02
        }
    }
}