var date
var vars
var colors
var Inconsolata
var scripts = []
var preScripts

function preload() {
    Inconsolata = loadFont("assets/Inconsolata.ttf")
    preScripts = loadJSON("scripts.json")
}

function setup() {
    createCanvas(innerWidth,innerHeight)
    noStroke()
    textFont(Inconsolata)
    date = new Date()
    colors = new colors()
    vars = new vars()
    processScripts()
}

function draw() {
    background(colors.background)
    setDate()
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
    if (vars.timerMode) {
        textAlign(RIGHT, BOTTOM)
        text(floor(millis()/10-vars.timer/10)%10,width - vars.margin,height - vars.margin)                                              //        x
        text(floor(millis()/100-vars.timer/100)%10,width - vars.margin - vars.fontSize/2, height - vars.margin)                         //       x
        text(".",width - vars.margin - (vars.fontSize/2) * 2, height - vars.margin)                                                     //      .
        text((floor(millis()/1000 - vars.timer/1000)%60)%10,width - vars.margin - (vars.fontSize/2) * 3, height - vars.margin)          //     x
        text(floor((floor(millis()/1000 - vars.timer/1000)%60)/10),width - vars.margin - (vars.fontSize/2) * 4, height - vars.margin)   //    x
        text(":",width - vars.margin - (vars.fontSize/2) * 5, height - vars.margin)                                                     //   :
        text(floor(floor(millis()/1000 - vars.timer/1000)/60),width - vars.margin - (vars.fontSize/2) * 6, height - vars.margin)        //  x
    } else {
        textAlign(LEFT, BOTTOM)
        text((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear(), vars.margin, height - vars.margin)                //    Month/Day/Year
        textAlign(RIGHT, BOTTOM)
        text(date.getSeconds()%10,width - vars.margin - (vars.fontSize/2) * 0,height - vars.margin)             //         x
        text(floor(date.getSeconds()/10),width - vars.margin - (vars.fontSize/2) * 1,height - vars.margin)      //        x
        text(":",width - vars.margin - (vars.fontSize/2) * 2,height - vars.margin)                              //       :
        text(date.getMinutes()%10,width - vars.margin - (vars.fontSize/2) * 3,height - vars.margin)             //      x
        text(floor(date.getMinutes()/10),width - vars.margin - (vars.fontSize/2) * 4,height - vars.margin)      //     x
        text(":",width - vars.margin - (vars.fontSize/2) * 5,height - vars.margin)                              //    :
        text(date.getHours(),width - vars.margin - (vars.fontSize/2) * 6,height - vars.margin)                  //  xx
    }
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

function windowResized() {resizeCanvas(innerWidth,innerHeight); processScripts()} // Makes sure all space is covered, and that the scripts are sized correctly.
function setDate() {date = new Date()} // Makes new date, ensures the date is current.

function processScripts() {
    scripts = [] // Clears the current scripts incase we want to reprocess (on resized)
    for (var i = 0; i < preScripts.scripts.length; i++) {
        preScripts.scripts[i].content = preScripts.scripts[i].content.replace("{{fullDate}}",dispDay[date.getDay()] + ", " + dispMonth[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear())
        preScripts.scripts[i].content = preScripts.scripts[i].content.replace("{{quote}}",vars.templateQuote)
        preScripts.scripts[i].content = preScripts.scripts[i].content.replace("{{quoteAuth}}",vars.templateQuoteauth)
        preScripts.scripts[i].content = preScripts.scripts[i].content.replace("{{band}}",vars.templateBand)
        preScripts.scripts[i].content = preScripts.scripts[i].content.replace("{{history}}",vars.templateHistory)
        preScripts.scripts[i].content = preScripts.scripts[i].content.replace("{{birthdays}}",vars.templateBirthdays)
        preScripts.scripts[i].content = preScripts.scripts[i].content.replace("{{word}}",vars.templateWord)
        textSize(vars.fontSize)

        // This little bit of code makes sure that nothing gets cut off screen. It doesn't work too well, though.
        if (textWidth(preScripts.scripts[i].content) >= width - vars.margin * 2) {
            scripts.push( { 
                content:preScripts.scripts[i].content.substring(0, floor((width - vars.margin * 2)/vars.fontSize)*2),
                col:preScripts.scripts[i].col
            } )
            scripts.push( {
                content:preScripts.scripts[i].content.substring(floor((width - vars.margin * 2)/vars.fontSize)*2, preScripts.scripts[i].length),
                col:preScripts.scripts[i].col
            } )
        } else {
            scripts.push(preScripts.scripts[i])
        }
    }
    console.log("Processed the scripts.")
}