function vars() {
    this.loc = 0
    this.fontSize = 72
    this.margin = 50
    this.timerMode = false
    this.timer = millis()
    this.speed = 5
    this.templateQuote      = prompt("(1/6) Give a quote of the day!")
    this.templateQuoteauth  = prompt("(2/6) Who is the author of that quote?")
    this.templateBand       = prompt("(3/6) What are today's band groups? Hit cancel to remove band from the scripts.")
    this.templateHistory    = prompt("(4/6) Give an on this day in history.")
    this.templateBirthdays  = prompt("(5/6) Whose birthdays are today? Hit cancel to remove birthdays from the scripts.")
    this.templateWord       = prompt("(6/6) Finally, give a word of the day!")
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