var colors  = {}
var scripts = {}
var yMod = 10
var fontSize = 72
var inconsolata
var y
var margin
var input
var d
var dispDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]
var dispMonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

var preload = function() {
    weather = loadJSON("https://api.apixu.com/v1/forecast.json?key=866b1ffd985f43ea9ef60915172906&q=07461&days=1")
    scripts = loadJSON("scripts.json")
    inconsolata = loadFont("assets/Inconsolata.ttf")
}

var setup = function() {
    createCanvas(innerWidth,innerHeight)
    noStroke()
    resetDate()
    setInterval(resetDate, 60000)
    margin = width/20
    y = margin
    colors = {
        bg:     color(0  ,0  ,0  ),
        seat1:  color(200,200,0  ),
        seat2:  color(0  ,200,0  ),
        seat3:  color(0  ,0  ,200),
        weather:color(255,0  ,0  ),
        comment:color(127,127,127),
        empty:  color(0  ,0  ,0  ),
        ticker: color(255,0  ,0  ,127),
        text:   color(255,255,255)
    }
    input = {
        quote:prompt("Give a quote of the day!"),
        quoteAuth:prompt("Who is the author of that quote?"),
        band:prompt("What are today's band groups?"),
        history:prompt("Give an on this day in history for today!"),
        birthdays:prompt("Whose birthdays are today?"),
        word:prompt("Finally, give a word of the day!")
    }
    textFont(inconsolata)
    textSize(fontSize)
    processScripts()
    document.body.style.display = "flex"
}

var draw = function() {
    checkKeys()
    background(colors.bg)
    textAlign(LEFT,TOP)
    for (var i = 0; i < scripts.final.length; i++) {
        switch(scripts.final[i].col) {
            case "seat1":
                fill(colors.seat1)
                break;
            case "seat2":
                fill(colors.seat2)
                break;
            case "seat3":
                fill(colors.seat3)
                break;
            case "empty":
                fill(colors.empty)
                break;
            case "comment":
                fill(colors.comment)
                break;
            case "weather":
                fill(colors.weather)
                break;
            default:
                fill(colors.comment)
                break;
        }
        rect(margin,i * (fontSize + fontSize/4) + y, fontSize/2 * scripts.final[i].text.length,fontSize)
        fill(colors.text)
        text(scripts.final[i].text,margin,i * (fontSize + fontSize/4) + y)
    }
}

var windowResized = function() {
    resizeCanvas(innerWidth,innerHeight)
    margin = width/20
    processScripts()
}

var checkKeys = function() {
    if (keyIsDown(UP_ARROW)) {
        y += yMod
    }
    if (keyIsDown(DOWN_ARROW)) {
        y -= yMod
    }
}

var resetDate = function() {
    d = new Date()
}

var processScripts = function() {
    scripts.templated = []
    for (var i = 0; i < scripts.fresh.length; i++) {
        scripts.templated[i] = scripts.fresh[i]
        scripts.templated[i].text = scripts.templated[i].text.replace("{{date}}",dispDay[d.getDay()] + ", " + dispMonth[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear())
        scripts.templated[i].text = scripts.templated[i].text.replace("{{quote}}",input.quote)
        scripts.templated[i].text = scripts.templated[i].text.replace("{{quoteAuth}}",input.quoteAuth)
        scripts.templated[i].text = scripts.templated[i].text.replace("{{band}}",input.band)
        scripts.templated[i].text = scripts.templated[i].text.replace("{{weatherCurrentTemp}}",Math.round(weather.current.temp_f) + " degrees")
        scripts.templated[i].text = scripts.templated[i].text.replace("{{weatherCurrentMood}}",weather.current.condition.text)
        if (d.getHours()+4 >= 24) {
            scripts.templated[i].text = scripts.templated[i].text.replace("{{weatherLaterTemp}}", "Forecast Temperature Unavailable")
            scripts.templated[i].text = scripts.templated[i].text.replace("{{weatherLaterMood}}", "Forecast Mood Unavailable")
        } else {
            scripts.templated[i].text = scripts.templated[i].text.replace("{{weatherLaterTemp}}",round(weather.forecast.forecastday[0].hour[d.getHours()+4].temp_f) + " degrees")
            scripts.templated[i].text = scripts.templated[i].text.replace("{{weatherLaterMood}}",weather.forecast.forecastday[0].hour[d.getHours()+4].condition.text)
        }
        scripts.templated[i].text = scripts.templated[i].text.replace("{{history}}",input.history)
        scripts.templated[i].text = scripts.templated[i].text.replace("{{birthdays}}",input.birthdays)
        scripts.templated[i].text = scripts.templated[i].text.replace("{{word}}",input.word)
    }
    console.log("Scripts Templated")
    scripts.final = scripts.templated
    sizeScripts()
}

var sizeScripts = function() {
    for (var i = 0; i < scripts.final.length; i++) {
        if (scripts.final[i].text.length > (width - margin * 2)/(fontSize/2)) {
            var temp = scripts.final[i]
            scripts.final[i] = {
                col:scripts.final[i].col,
                text:scripts.final[i].text.substr(0,floor((width - margin * 2)/(fontSize/2)))
            }
            scripts.final.splice(i+1,0,{
                col:scripts.final[i].col,
                text:temp.text.substr(floor((width - margin * 2)/(fontSize/2)),temp.text.length)
            })
        }
    }
    console.log("Scripts Fitted")
}