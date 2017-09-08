var colors
var active
var list = []

var core = {
    framerate: 60,
    fontsize: 72,
    loop: false,
    date: new Date(),
    updatedate: function() {
        core.date = new Date()
    },
    tick: function() {
        textAlign(CENTER, TOP)
        textSize(core.fontsize)
        fill(colors.text)
        text("TODO: Date",width/2,height/2-core.fontsize/3)
    },
    setup: function() {
        core.canvas = createCanvas(innerWidth, innerHeight)
        colors = {
            text: color(255,255,255)
        }
        frameRate(core.framerate)
        console.log("Date updater with interval #", setInterval(core.updatedate, 1000))
    },
    setactive: function(id) {
        active = list[id]
        document.body.textContent = ""
        document.body.style.margin = "0px" // I don't know who it is, but either HTML, CSS, or JavaScript, is being really, really, really stupid here. It ignores what I want the margin for the body should be n the style.css file, so I redeclare it here. </rant>
        core.setup()
        core.loop = true
    },
    selectSkin: function() {
        noCanvas()
        for (var i = 0; i < list.length; i++) {
            document.write("<a onclick=\" core.setactive("+ i +")\" href=\"#\">" + list[i].name + "<a>")
        }
    }
}

var setup = function() {
    core.selectSkin()
}

var draw = function() {
    if(core.loop) {
        if(vanilla.do) { vanilla.tick() }
        active.tick()
        core.tick()
        console.log("Rendered a frame")
    }
}
    
var windowResized = function() {
    resizeCanvas(innerWidth, innerHeight)
}
