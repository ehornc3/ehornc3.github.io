var date
var vars
var colors
var Inconsolata

function preload() {
    Inconsolata = loadFont("assets/Inconsolata.ttf") // Ensure that the font is loaded.
}

function setup() {
    createCanvas(innerWidth,innerHeight)
    noStroke()
    textFont(Inconsolata)
    setInterval(setDate(), 60000) // SHOULD Reset the date every 60 seconds.
    colors = new colors()
    vars = new vars()
}

function draw() {
    background(colors.background)

    // Ensure that settings are applied
    textSize(vars.fontSize)
    keyDown()
    drawLines()
    drawTimer()
}

function drawLines() {
    textAlign(LEFT,TOP)
    text("joke",vars.margin,vars.loc + vars.fontSize + vars.fontSize/4)
}

function drawTimer() {
    fill(colors.timer)
    textFont("courier new")
    if (vars.timerMode) {
        textAlign(RIGHT, BOTTOM)
        text(floor(millis()/1000 - vars.timer/1000) + ":" + floor(millis())%1000,width - vars.margin, height - vars.margin)
    } else {
        textAlign(LEFT, BOTTOM)
        text("Hi", vars.margin, height - vars.margin)
    }
    textFont(Inconsolata)
}

function keyPressed() {
    switch(keyCode) {
        case 77:
            vars.timerMode = !vars.timerMode
        break;
    }
}

function keyDown() {
    if (keyIsDown(UP_ARROW)) {
        vars.loc -= vars.speed
    }
    if (keyIsDown(DOWN_ARROW)) {
        vars.loc += vars.speed
    }

}

function windowResized() {resizeCanvas(innerWidth,innerHeight)} // Makes sure that there isn't any space on the page that isn't canvas.
function setDate() {date = new Date()} // Makes new date, ensures the date is current.