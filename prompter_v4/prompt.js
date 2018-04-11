var colors = {}
var scripts = {}
var words = {}
var quotes = {}
var yMod = 50
var fontSize = 72
var inconsolata
var ticker
var margin
var input
var y
var d
var l
var printWindow
var dispDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var dispMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

var preload = function() {
    weather = loadJSON("https://api.apixu.com/v1/forecast.json?key=866b1ffd985f43ea9ef60915172906&q=07461&days=1")
    scripts = loadJSON("scripts.json")
    words = loadTable("words.csv")
    quotes = loadTable("quotes.csv")
    inconsolata = loadFont("assets/Inconsolata.ttf")
    doneLoading = true
}

var setup = function() {
    createCanvas(innerWidth, innerHeight)
    noStroke()
    d = new Date()
    console.log("Date Updater has interval #", setInterval(function() { d = new Date() }, 1000))
    margin = width / 20
    y = margin
    colors = {
        bg: color(0, 0, 0),
        seat1: color(200, 200, 0),
        seat2: color(0, 200, 0),
        seat3: color(0, 0, 200),
        weather: color(255, 0, 0),
        comment: color(127, 127, 127),
        empty: color(0, 0, 0),
        ticker: color(255, 0, 0, 127),
        text: color(255, 255, 255)
    }
    ticker = {
        mode: false,
        start: millis()
    }
    l = round(random(0,quotes.rows.length))
    input = {
        date: prompt("Give the date of when these scripts will be read."),
        quote: prompt("Give a quote of the day!",quotes.rows[l].arr[0]),
        quoteAuth: prompt("Who is the author of that quote?",quotes.rows[l].arr[1]),
        band: prompt("What are today's band groups?"),
        history: prompt("Give an on this day in history for today!"),
        birthdays: prompt("Whose birthdays are today?"),
        word: prompt("Finally, give a word of the day!",words.rows[round(random(0,words.rows.length))].arr[0])
    }
    if (input.band == null || input.band == "") {input.band = "{{skip}}"}
    if (input.birthdays == null || input.birthdays == "") {input.birthdays = "{{skip}}"}
    textFont(inconsolata)
    textSize(fontSize)
    processScripts()
    document.body.style.display = "flex"
}

var draw = function() {
    checkKeys()
    background(colors.bg)
    textAlign(LEFT, TOP)
    for (var i = 0; i < scripts.final.length; i++) {
        switch (scripts.final[i].col) {
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
        rect(margin, i * (fontSize + fontSize / 4) + y, fontSize / 2 * scripts.final[i].text.length, fontSize)
        if(scripts.final[i].col != "empty") {
            fill(colors.text)
            text(scripts.final[i].text, margin, i * (fontSize + fontSize / 4) + y)
        }
    }
    fill(colors.ticker)
    if (!ticker.mode) {
        textAlign(LEFT, BOTTOM)
        text(d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear(), margin, height - margin)
        textAlign(RIGHT, BOTTOM)
        text(d.getSeconds() % 10, width - margin - (fontSize / 2) * 0, height - margin)
        text(floor(d.getSeconds() / 10), width - margin - (fontSize / 2) * 1, height - margin)
        text(":", width - margin - (fontSize / 2) * 2.25, height - margin - fontSize / 12)
        text(d.getMinutes() % 10, width - margin - (fontSize / 2) * 3, height - margin)
        text(floor(d.getMinutes() / 10), width - margin - (fontSize / 2) * 4, height - margin)
        text(":", width - margin - (fontSize / 2) * 5.25, height - margin - fontSize / 12)
        text(d.getHours() % 10, width - margin - (fontSize / 2) * 6, height - margin)
        text(floor(d.getHours() / 10), width - margin - (fontSize / 2) * 7, height - margin)
    } else {
        textAlign(RIGHT, BOTTOM)
        text(floor(((millis() - ticker.start) % 100) / 10), width - margin - (fontSize / 2) * 0, height - margin)
        text(floor(((millis() - ticker.start) % 1000) / 100), width - margin - (fontSize / 2) * 1, height - margin)
        text(".", width - margin - (fontSize / 2) * 2.25, height - margin)
        text(floor(((millis() - ticker.start) % 10000) / 1000), width - margin - (fontSize / 2) * 3, height - margin)
        text(floor(((millis() - ticker.start) % 100000) / 10000), width - margin - (fontSize / 2) * 4, height - margin)
    }
}

var keyPressed = function() {
    if (keyCode == 77) { ticker.mode = !ticker.mode }
    if (keyCode == 32) { ticker.start = millis() }
    if (keyCode == 80) { printDocument() }
}

var windowResized = function() {
    resizeCanvas(innerWidth, innerHeight)
    margin = width / 20
    processScripts()
}

var checkKeys = function() {
    if (keyIsDown(UP_ARROW)) { y += yMod }
    if (keyIsDown(DOWN_ARROW)) { y -= yMod }
}

var processScripts = function() {
    scripts.templated = []
    for (var i = 0; i < scripts.fresh.length; i++) {
        scripts.templated.push(scripts.fresh[i])
        // scripts.templated[i].text = scripts.templated[i].text.replace("{{date}}", dispDay[d.getDay()] + ", " + dispMonth[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear())
        scripts.templated[i].text = scripts.templated[i].text.replace("{{date}}", input.date)
        scripts.templated[i].text = scripts.templated[i].text.replace("{{quote}}", input.quote)
        scripts.templated[i].text = scripts.templated[i].text.replace("{{quoteAuth}}", input.quoteAuth)
        scripts.templated[i].text = scripts.templated[i].text.replace("{{band}}", input.band)
        scripts.templated[i].text = scripts.templated[i].text.replace("{{weatherCurrentTemp}}", Math.round(weather.current.temp_f) + " degrees")
        scripts.templated[i].text = scripts.templated[i].text.replace("{{weatherCurrentMood}}", weather.current.condition.text)
        scripts.templated[i].text = scripts.templated[i].text.replace("{{weatherLaterTemp}}", round(weather.forecast.forecastday[0].day.maxtemp_f) + " degrees")
        scripts.templated[i].text = scripts.templated[i].text.replace("{{weatherLaterMood}}", weather.forecast.forecastday[0].day.condition.text)
        scripts.templated[i].text = scripts.templated[i].text.replace("{{history}}", input.history)
        scripts.templated[i].text = scripts.templated[i].text.replace("{{birthdays}}", input.birthdays)
        scripts.templated[i].text = scripts.templated[i].text.replace("{{word}}", input.word)
        if (scripts.templated[i].text.includes("{{skip}}")) {scripts.templated[i].col = "empty"}
    }
    scripts.final = []
    for (var i = 0; i < scripts.templated.length; i++) {
        scripts.final.push(scripts.templated[i])              
    }
    for (var i = 0; i < scripts.final.length; i++) {
        if (scripts.final[i].text.length > (width - margin * 2) / (fontSize / 2)) {
            var temp = scripts.final[i]
            scripts.final[i] = {
                col: scripts.final[i].col,
                text: scripts.final[i].text.substr(0, floor((width - margin * 2) / (fontSize / 2)))
            }
            scripts.final.splice(i + 1, 0, {
                col: scripts.final[i].col,
                text: temp.text.substr(floor((width - margin * 2) / (fontSize / 2)), temp.text.length)
            })
        }
    }
}

var printDocument = function() {
    printWindow = open('','printWindow','status=1')
    for (var i = 0; i < scripts.templated.length; i++) {
        let k
        switch (scripts.templated[i].col) {
            case "seat1":
                k = "rgba(200,200,0,.25)"
                break;
            case "seat2":
                k = "rgba(0,200,0,.25)"
                break;
            case "seat3":
                k = "rgba(0,0,200,.25)"
                break;
            case "weather":
                k = "rgba(255,0,0,.25)"
                break;
            case "comment":
                k = "rgba(127,127,127,.25)"
                break;
            case "empty":
                k = "rgba(0,0,0,.25)"
                break;
            default:
                k = "rgba(127,127,127,.25)"
                break;
        }
        printWindow.document.writeln("<p style=\"background-color:" + k + "\">" + scripts.templated[i].text + "<br /></p>")
    }
    printWindow.document.title = "Lafayette Morning Announcements Transcript"
    printWindow.print()
}
