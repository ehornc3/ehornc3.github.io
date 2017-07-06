var list = []
var allstar = [
    "Somebody once told me the world is gonna roll me",
    "I aint the sharpest tool in the shed",
    "She was lookin kind of dumb with her finger and her thumb",
    "In the shape of an 'L' on her forehead",
    "Well, the years start coming and they don't stop coming",
    "Fed to the rules and I hit the ground running",
    "Didn't make sense not to live for fun",
    "Your brain gets smart but your head gets dumb",
    "So much to do",
    "So much to see",
    "So what's wrong with taking the back streets",
    "You'll never know if you don't go",
    "You'll never shine if you don't glow",
    "Hey now, you're an all star",
    "Get your game on",
    "Go play",
    "Hey now, you're a rock star",
    "Get your show on",
    "Get paid",
    "And all that glitter is gold",
    "Only shooting stars break the mold",
    "It's a cool place",
    "And they say it gets colder",
    "You're bundled up now wait till you get older",
    "But the meteor man begs to differ",
    "Judging by the hole in the satellite picture",
    "The ice we skate is getting kind of thin",
    "The waters getting warm so you might as well swim",
    "My world's on fire",
    "How bout yours",
    "That's just the way I like it and I'll never get bored",
    "Hey now, you're an all star",
    "Get your game on",
    "Go play",
    "Hey now, you're a rock star",
    "Get your show on",
    "Get paid",
    "And all that glitter is gold",
    "Only shooting stars break the mold",
    "Hey now, you're an all star",
    "Get your game on",
    "Go play",
    "Hey now, you're a rock star",
    "Get your show on",
    "Get paid",
    "And all that glitter is gold",
    "Only shooting staaaaars",
    "Somebody once asked could I spare some change for gas",
    "I need to get myself away from this place",
    "I said yep",
    "What a concept",
    "I could use a little fuel myself",
    "And we could all use a little change",
    "Well the years start coming and they don't stop coming",
    "Fed to the rules and I hit the ground running",
    "Didn't make sense not to live for fun",
    "Your brain gets smart but your head gets dumb",
    "So much to do",
    "So much to see",
    "So what's wrong with taking the back streets",
    "You'll never know if you don't go",
    "You'll never shine if you don't glow",
    "Hey now, you're an all star",
    "Get your game on",
    "Go play",
    "Hey now, you're a rock star",
    "Get your show on",
    "Get paid",
    "And all that glitter is gold",
    "Only shooting stars break the mold",
    "And all that glitter is gold",
    "Only shooting stars break the mold"
]

var total = 0

function setup() {
    noCanvas()
    noLoop()
    getInput()
}
function getInput() {
    var isNull = false
    while(!isNull) {
        var line = prompt("Add a new line. Press cancel to end line adding.")
        if (line == null) {
            isNull = true
        } else if (line == "allstar") {
            for (var i = 0; i < allstar.length; i++) {
                list.push(allstar[i])
            }
            isNull = true
        } else {
            list.push(line)
        }
    }
}
function draw() {
    for (var i = 0; i < list.length; i++) {
        for (var j = 0; j < list[i].length; j++) {
            switch(list[i].charAt(j)) {
                case 'a':
                total += 1
                break;
                case 'b':
                total += 2
                break;
                case 'c':
                total += 3
                break;
                case 'd':
                total += 1
                break;
                case 'e':
                total += 2
                break;
                case 'f':
                total += 3
                break;
                case 'g':
                total += 1
                break;
                case 'h':
                total += 2
                break;
                case 'i':
                total += 3
                break;
                case 'j':
                total += 1
                break;
                case 'k':
                total += 2
                break;
                case 'l':
                total += 3
                break;
                case 'm':
                total += 1
                break;
                case 'n':
                total += 2
                break;
                case 'o':
                total += 3
                break;
                case 'p':
                total += 1
                break;
                case 'q':
                total += 2
                break;
                case 'r':
                total += 3
                break;
                case 's':
                total += 4
                break;
                case 't':
                total += 1
                break;
                case 'u':
                total += 2
                break;
                case 'v':
                total += 3
                break;
                case 'w':
                total += 1
                break;
                case 'x':
                total += 2
                break;
                case 'y':
                total += 3
                break;
                case 'z':
                total += 4
                break;
                case ' ':
                total += 1
                break;
                case ',':
                total += 6
                break;
                case '\'':
                total += 9
                break;
            }
        }
        total += 16
        console.log("Finished line ", i, " with a running total of", total)
        document.writeln("Finished line ", i, " with a running total of ", total, "<br />")
    }






    console.log("And the grand total number of button presses is...")
    console.log(total)
    document.writeln("And the grand total number of buttons pressed is... <br />")
    document.writeln(total)
}