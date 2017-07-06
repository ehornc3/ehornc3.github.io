function setSet(param) {
    switch(param) {
        case 0:
            colors = {
                background:   color(0  ,0  ,  0,255),
                text:         color(255,255,255,255),
                timer:        color(255,25 ,25 ,100),
                seat1:        color(255,255,0  ,100),
                seat2:        color(0  ,255,0  ,100),
                seat3:        color(0  ,0  ,255,100),
                weather:      color(255,0  ,0  ,100),
                blank:        color(0  ,0  ,0  ,0  )
            }
        break;
        case 1:
            vars = {
                loc: 0,
                fontSize: 72,
                margin: 50,
                timerMode: false,
                timer: millis(),
                speed: 5,
                templateQuote     : prompt("(1/6) Give a quote of the day!"),
                templateQuoteauth : prompt("(2/6) Who is the author of that quote?"),
                templateBand      : prompt("(3/6) What are today's band groups? Hit cancel to remove band from the scripts."),
                templateHistory   : prompt("(4/6) Give an on this day in history."),
                templateBirthdays : prompt("(5/6) Whose birthdays are today? Hit cancel to remove birthdays from the scripts."),
                templateWord      : prompt("(6/6) Finally, give a word of the day!")
            }
        break;
    }
}


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