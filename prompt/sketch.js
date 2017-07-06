var date
var vars
var colors
var weather
var scripts             = []
var templatedScripts    = []
var preScripts          = []
var Inconsolata
function preload() {
    Inconsolata = loadFont("assets/Inconsolata.ttf")
    preScripts = loadJSON("scripts.json")
    weather = loadJSON("https://api.apixu.com/v1/forecast.json?key=866b1ffd985f43ea9ef60915172906&q=07461&days=1")
}

function setup() {
    createCanvas(innerWidth,innerHeight)
    noStroke()
    textFont(Inconsolata)
    setSet(0)
    setSet(1)
    date = new Date()
    processScriptsTemplate()
    processScriptsSize()
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
            case "weather":
                fill(colors.weather)
            break;
            case "void":
                fill(colors.blank)
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

function windowResized() {resizeCanvas(innerWidth,innerHeight); processScriptsSize()} // Makes sure all space is covered, and that the scripts are sized correctly.
function setDate() {date = new Date()} // Makes new date, ensures the date is current.

function processScriptsTemplate() {
    templatedScripts = []
    for (var i = 0; i < preScripts.scripts.length; i++) {
        var futuretime;
        templatedScripts.push({content:"temp",col:"void"})
        templatedScripts[i].col     = preScripts.scripts[i].col
        templatedScripts[i].content = preScripts.scripts[i].content.replace("{{fullDate}}",dispDay[date.getDay()] + ", " + dispMonth[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear())
        templatedScripts[i].content = preScripts.scripts[i].content.replace("{{quote}}",vars.templateQuote)
        templatedScripts[i].content = preScripts.scripts[i].content.replace("{{quoteAuth}}",vars.templateQuoteauth)
        templatedScripts[i].content = preScripts.scripts[i].content.replace("{{band}}",vars.templateBand)
        templatedScripts[i].content = preScripts.scripts[i].content.replace("{{history}}",vars.templateHistory)
        templatedScripts[i].content = preScripts.scripts[i].content.replace("{{birthdays}}",vars.templateBirthdays)
        templatedScripts[i].content = preScripts.scripts[i].content.replace("{{word}}",vars.templateWord)
        templatedScripts[i].content = preScripts.scripts[i].content.replace("{{currentTemp}}",weather.current.temp_f)
        templatedScripts[i].content = preScripts.scripts[i].content.replace("{{currentMood}}",weather.current.condition.text)
        if (date.getHours() + 4 >= 23) {
            templatedScripts[i].content = preScripts.scripts[i].content.replace("{{laterTemp}}","Future Temperature Unavailable")
            templatedScripts[i].content = preScripts.scripts[i].content.replace("{{laterMood}}","Future Condition Unavailable")
        } else {
            templatedScripts[i].content = preScripts.scripts[i].content.replace("{{laterTemp}}",weather.forecast.forecastday[0].hour[date.getHours()+4].temp_f)
            templatedScripts[i].content = preScripts.scripts[i].content.replace("{{laterMood}}",weather.forecast.forecastday[0].hour[date.getHours()+4].condition.text)
        }
    }
    console.log("Templated the scripts.")
}

function processScriptsSize() {
    scripts = []
    var k = templatedScripts.length
    for (var i = 0; i < k; i++) {
        if (templatedScripts[i].content.length > floor((width - vars.margin * 2)/vars.fontsize)*2) {
            k++
            scripts.push( {
                content:templatedScripts[i].content.substring(0, floor((width - vars.margin * 2)/vars.fontsize)*2),
                col    :templatedScripts[i].col
            })
        } else {
            scripts.push ( {
                content:templatedScripts[i].content,
                col    :templatedScripts[i].col
            })
        }
    }
}