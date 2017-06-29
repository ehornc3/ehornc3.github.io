var date
var vars
var colors
var Inconsolata
var scripts = []
var preScripts

function preload() {
    Inconsolata = loadFont("assets/Inconsolata.ttf") // Ensure that the font is loaded.
    preScripts = loadJSON("scripts.json")
}

function setup() {
    createCanvas(innerWidth,innerHeight)
    noStroke()
    textFont(Inconsolata)
    setInterval(setDate(), 60000) // SHOULD Reset the date every 60 seconds.
    colors = new colors()
    vars = new vars()
    processScripts()
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
    for (var i = 0; i < scripts.length; i++) {
        switch(scripts[i].col) {
            case "seat1":
                fill(colors.seat1)
            break;
            case "seat2":
                fill(colors.seat2)
            break;
            case "seat3":
                fill(colors.seat3)
            break;
            case "void":
                fill(colors.void)
            break;
        }
        rect(vars.margin,vars.margin + vars.loc + (vars.fontSize + vars.fontSize/4) * i,textWidth(scripts[i].content),vars.fontSize)

        fill(colors.text)
        text(scripts[i].content,vars.margin,vars.margin + vars.loc + (vars.fontSize + vars.fontSize/4) * i)

    }
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
        case 32:
            vars.timer = millis()
        break;
    }
}

function keyDown() {
    if (keyIsDown(UP_ARROW)) {
        vars.loc += vars.speed
    }
    if (keyIsDown(DOWN_ARROW)) {
        vars.loc -= vars.speed
    }

}

// function promptValues() {
//     vars.
// }

function windowResized() {resizeCanvas(innerWidth,innerHeight)} // Makes sure that there isn't any space on the page that isn't canvas.
function setDate() {date = new Date()} // Makes new date, ensures the date is current.

function processScripts() {
    for (var i = 0; i < preScripts.scripts.length; i++) {
        preScripts.scripts[i].content = preScripts.scripts[i].content.replace("{{fullDate}}",dispDay[date.getDay()] + ", " + dispMonth[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear())
        preScripts.scripts[i].content = preScripts.scripts[i].content.replace("{{quote}}",vars.templateQuote)
        preScripts.scripts[i].content = preScripts.scripts[i].content.replace("{{quoteAuth}}",vars.templateQuoteauth)
        preScripts.scripts[i].content = preScripts.scripts[i].content.replace("{{band}}",vars.templateBand)
        preScripts.scripts[i].content = preScripts.scripts[i].content.replace("{{history}}",vars.templateHistory)
        preScripts.scripts[i].content = preScripts.scripts[i].content.replace("{{birthdays}}",vars.templateBirthdays)
        preScripts.scripts[i].content = preScripts.scripts[i].content.replace("{{word}}",vars.templateWord)
        scripts.push(preScripts.scripts[i])
    }
}