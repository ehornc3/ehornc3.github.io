var state
var times
var settings
var margin
var bg
var bodies = []
var setup = function() {
    createCanvas(innerWidth,innerHeight)
    noStroke()
    angleMode(RADIANS)
    times = {
        recent:null,
        history:[]
    }
    state = {
        global:"idle",
        timer:"idle",
        timerStart:0
    }
    settings = {
        colors:{
            main        :color(33 ,149,242,255),
            light       :color(110,198,255,255),
            text        :color(0  ,0  ,0  ,255),
            textRed     :color(255,40 ,40 ,255),
            textOrange  :color(255,109,0  ,255),
            textGreen   :color(40 ,255,40 ,255)
        },
        margin:width/20,
        idlemessage:"idle",
        readymessage:"ready",
        eightmessage:"8 Seconds!",
        twelvemessage:"12 Seconds!"
    }
    margin = {
        left:   new Body('rect',0,0,settings.margin,height,settings.colors.light),
        right:  new Body('rect',width-settings.margin,0,settings.margin,height,settings.colors.light),
        top:    new Body('rect',0,0,width,settings.margin,settings.colors.light),
        bottom: new Body('rect',0,height-settings.margin,width,settings.margin,settings.colors.light),
        fadeAllIn:function(s) {
            this.left.fadeIn(s)
            this.right.fadeIn(s)
            this.top.fadeIn(s)
            this.bottom.fadeIn(s)
        },
        renderAll:function() {
            this.left.render()
            this.right.render()
            this.top.render()
            this.bottom.render()
        },
        shrinkOut:function() {
            margin.left.translate(0-settings.margin,0,15)
            margin.right.translate(width,0,15)
            margin.top.translate(0,0-settings.margin,15)
            margin.bottom.translate(0,height,15)
        },
        shrinkIn:function() {
            margin.left.translate(0,0,15)
            margin.right.translate(width-settings.margin,0,15)
            margin.top.translate(0,0,15)
            margin.bottom.translate(0,height-settings.margin,15)
        }
    }
    leftArrow = {
        leftArrowA: new Body('line',settings.margin/4,height/2-10,settings.margin-settings.margin/4,height/2,color(0,0,0),5),
        leftArrowB: new Body('line',settings.margin/4,height/2+11,settings.margin-settings.margin/4,height/2+1,color(0,0,0),5),
        renderAll:function() {
            this.leftArrowA.render()
            this.leftArrowB.render()
        },
        fadeAllIn:function(s) {
            this.leftArrowA.fadeIn(s)
            this.leftArrowB.fadeIn(s)
        },
        fadeAllOut:function(s) {
            this.leftArrowA.fadeOut(s)
            this.leftArrowB.fadeOut(s)
        }
    }
    margin.left.state = "normal"
    bg = new Body('rect',0,0,width,height,settings.colors.main)
    margin.fadeAllIn(50)
    bg.fadeIn(50)
    leftArrow.fadeAllIn(100)
}

var windowResized = function() {
    resizeCanvas(innerWidth,innerHeight)
    settings.margin = width/20
} 

var draw = function() {
    background(255)
    bg.render()
    margin.renderAll()
    leftArrow.renderAll()
    mouseCheck()
    switch(state.global) {
        case "idle":
        fill(settings.colors.text)
            textAlign(CENTER, BOTTOM)
            textSize((width-margin.left.w-margin.right.w)/settings.idlemessage.length/1.5)
            text(settings.idlemessage,width/2,height/2)
            if (times.recent != null) {
                textAlign(CENTER, TOP)
                textSize(((width-margin.left.w-margin.right.w)/times.recent.toString().length)/2)
                text(times.recent,width/2,height/2)
            }
            break;
        case "timing":
            switch(state.timer) {
                case "inspectionStartDown":
                    if (millis() - times.inspectionStart <= 125) {
                        fill(settings.colors.textRed)
                    } else if (millis() - times.inspectionStart < 249) {
                        fill(settings.colors.textOrange)
                    } else {
                        fill(settings.colors.textGreen)
                    }
                    textAlign(CENTER, BOTTOM)
                    textSize((width-margin.left.w-margin.right.w)/settings.readymessage.length/1.5)
                    text(settings.readymessage,width/2,height/2)
                    break;
                case "inspecting":
                    textAlign(CENTER,BOTTOM)
                    fill(settings.colors.text)
                    textSize((width-margin.left.w-margin.right.w)/8)
                    if (floor((millis()-times.inspectionStart)/10000) != 0) {
                        text(floor((millis()-times.inspectionStart)/10000),width/2 + (((width - settings.margin/2)/8/2) * -2),height/2)
                    }
                    text(floor((millis()-times.inspectionStart)/1000)%10,width/2 + (((width - settings.margin/2)/8/2) * -1),height/2)
                    text(".",width/2 + (((width - settings.margin/2)/2/4/2) * 0),height/2)
                    text(floor((millis()-times.inspectionStart)/100)%10,width/2 + (((width - settings.margin/2)/8/2) * 1),height/2)
                    text(floor((millis()-times.inspectionStart)/10)%10,width/2 + (((width - settings.margin/2)/8/2) * 2),height/2)
                    if (millis()-times.inspectionStart >= 8000 && millis()-times.inspectionStart <= 12000) {
                        textAlign(CENTER, TOP)
                        textSize(((width-margin.left.w-margin.right.w)/settings.eightmessage.length)/2)
                        text(settings.eightmessage,width/2,height/2)
                    } else if (millis()-times.inspectionStart > 12000 && millis()-times.inspectionStart <= 15000) {
                        textAlign(CENTER, TOP)
                        textSize(((width-margin.left.w-margin.right.w)/settings.twelvemessage.length)/2)
                        text(settings.twelvemessage,width/2,height/2)
                    } else if (millis()-times.inspectionStart >= 15000) {
                        state.global = "idle"
                        state.timer = "idle"
                        times.recent = "DNS"
                        margin.shrinkIn()
                    }
                    break;
                case "timerStart":
                    textAlign(CENTER,BOTTOM)
                    if (times.timerStart == 0) {
                        fill(settings.colors.text)
                    } else if (millis()-times.timerStart >= 0 && millis()-times.timerStart <= 300) {
                        fill(settings.colors.textRed)
                    } else if (millis()-times.timerStart > 300 && millis()-times.timerStart < 550) {
                        fill(settings.colors.textOrange)
                    } else if (millis()-times.timerStart >= 550) {
                        fill(settings.colors.textGreen)
                    }
                    textSize((width-margin.left.w-margin.right.w)/8)
                    if (floor((millis()-times.inspectionStart)/10000) != 0) {
                        text(floor((millis()-times.inspectionStart)/10000),width/2 + (((width - settings.margin/2)/8/2) * -2),height/2)
                    }
                    text(floor((millis()-times.inspectionStart)/1000)%10,width/2 + (((width - settings.margin/2)/8/2) * -1),height/2)
                    text(".",width/2 + (((width - settings.margin/2)/2/4/2) * 0),height/2)
                    text(floor((millis()-times.inspectionStart)/100)%10,width/2 + (((width - settings.margin/2)/8/2) * 1),height/2)
                    text(floor((millis()-times.inspectionStart)/10)%10,width/2 + (((width - settings.margin/2)/8/2) * 2),height/2)
                    if (millis()-times.inspectionStart >= 8000 && millis()-times.inspectionStart <= 12000) {
                        textAlign(CENTER, TOP)
                        textSize(((width-margin.left.w-margin.right.w)/settings.eightmessage.length)/2)
                        text(settings.eightmessage,width/2,height/2)
                    } else if (millis()-times.inspectionStart > 12000 && millis()-times.inspectionStart <= 15000) {
                        textAlign(CENTER, TOP)
                        textSize(((width-margin.left.w-margin.right.w)/settings.twelvemessage.length)/2)
                        text(settings.twelvemessage,width/2,height/2)
                    } else if (millis()-times.inspectionStart >= 15000) {
                        state.global = "idle"
                        state.timer = "idle"
                        times.recent = "DNS"
                    }
                    break;
                case "timing":
                    textAlign(CENTER, BOTTOM)
                    fill(settings.colors.text)
                    textSize((width-margin.left.w-margin.right.w)/8)
                    if (floor((millis()-times.timerStart)/10000) != 0) {
                        text(floor((millis()-times.timerStart)/10000),width/2 + (((width - settings.margin/2)/8/2) * -2),height/2)
                    }
                    text(floor((millis()-times.timerStart)/1000)%10,width/2 + (((width - settings.margin/2)/8/2) * -1),height/2)
                    text(".",width/2 + (((width - settings.margin/2)/2/4/2) * 0),height/2)
                    text(floor((millis()-times.timerStart)/100)%10,width/2 + (((width - settings.margin/2)/8/2) * 1),height/2)
                    text(floor((millis()-times.timerStart)/10)%10,width/2 + (((width - settings.margin/2)/8/2) * 2),height/2)
                    break;
            }
            break;
    }
}

var keyPressed = function() {
    if (keyCode==32) {
        switch(state.timer) {
            case "idle":
                times.inspectionStart = millis()
                state.timer = "inspectionStartDown"
                state.global = "timing"
                leftArrow.fadeAllOut(15)
                margin.left.resize(settings.margin,height,15)
                margin.shrinkOut()
                break;
            case "inspecting":
                times.timerStart = millis()
                state.timer = "timerStart"
                break;
            case "timing":
                times.recent = floor(millis() - times.timerStart)/1000
                times.history.push(times.recent)
                state.global = "idle"
                state.timer = "buffer"
                margin.shrinkIn()
                break;
        }
    }
}

var keyReleased = function() {
    if (keyCode==32) {
        switch(state.timer) {
            case "inspectionStartDown":
                if(millis() - times.inspectionStart >= 250) {
                    state.timer = "inspecting"
                    times.inspectionStart = millis()
                } else {
                    state.timer = "idle"
                    state.global = "idle"
                    times.inspectionStart = 0
                    margin.shrinkIn()
                }
                break;
            case "timerStart":
                if(millis() - times.timerStart >= 550) {
                    state.timer = "timing"
                    times.timerStart = millis()
                } else {
                    state.timer = "inspecting"
                    state.timerStart = 0
                }
                break;
            case "buffer":
                state.timer = "idle"    
                break;
        }
    }
}

var mousePressed = function() {
    switch(state.global) {
        case "timing":
            break;
        case "idle":
            break;
    }
}

var Body = function(method,x,y,w,h,col,r) {
    this.method = method
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.col = col
    this.opacity = 0
    this.toRemove = false
    this.r = 0
    this.r = r

    this.translateFrames = 0
    this.resizeFrames = 0
}

Body.prototype.render = function() {
    switch (this.method) {
        case 'rect':
            push()
            translate(this.x,this.y)
            rotate(this.r)
            fill(this.col.levels[0],this.col.levels[1],this.col.levels[2],this.opacity)
            rect(0,0,this.w,this.h)
            pop()
            break;
        
        case 'ellipse':
            fill(this.col.levels[0],this.col.levels[1],this.col.levels[2],this.opacity)
            ellipse(this.x,this.y,this.w,this.h)
            break;
        case "line":
            stroke(this.col.levels[0],this.col.levels[1],this.col.levels[2],this.opacity)
            strokeWeight(this.r)
            line(this.x,this.y,this.w,this.h)
            noStroke()
            break;
        default:
            console.warn("Body with invalid method found")
            break;
    }
}

Body.prototype.fadeIn = function(speed) {
    this.fadeTo(255,speed)
}

Body.prototype.fadeOut = function(speed) {
    this.fadeTo(0,speed)
}

Body.prototype.fadeTo = function(t,s) {
    clearInterval(this.fadeInterval)
    console.log("Reset fadeTo interval",this.fadeInterval)
    var fadeInt = (t - this.opacity) / s
    this.fadeFrames = 0
    this.fadeInterval = setInterval(_fadeTo, 1000/60, this, t, fadeInt, s)
    console.log("Created fadeTo interval",this.fadeInterval)
}

_fadeTo = function(obj,t,fI,frEx) {
    obj.opacity += fI
    if (obj.fadeFrames == frEx) {
        obj.opacity = t
        clearInterval(obj.fadeInterval)
        console.log("Cleared fadeTo interval",this.fadeInterval)
        obj.fadeFrames = 0
    }
    obj.fadeFrames++
}


Body.prototype.translate = function(x,y,speed) {
    clearInterval(this.translateInterval)
    console.log("Reset Interval",this.translateInterval)
    this.translateFrames = 0
    var xSpeed = (x - this.x) / speed
    var ySpeed = (y - this.y) / speed
    this.translateInterval = setInterval(_translate,1000/60,this,x,y,xSpeed,ySpeed,speed)
    console.log("Set Interval",this.translateInterval)
}

_translate = function(obj,bx,by,xs,ys,framesTo) {
    obj.x += xs;
    obj.y += ys;
    obj.translateFrames++
    if (obj.translateFrames == framesTo) {
        obj.x = bx
        obj.y = by
        clearInterval(obj.translateInterval);
        console.log("Cleared Interval", obj.translateInterval);
        obj.translateFrames = 0
    }
}

Body.prototype.remove = function() {
    this.toRemove = true
}

Body.prototype.resize = function(w,h,speed) {
    clearInterval(this.resizeInterval)
    console.log("Reset Interval",this.translateInterval)
    var wSpeed = (w - this.w) / speed
    var hSpeed = (h - this.h) / speed
    this.resizeInterval = setInterval(_resize,1000/60,this,w,h,wSpeed,hSpeed,speed)
}

_resize = function(obj,w,h,ws,hs,s) {
    obj.w += ws
    obj.h += hs
    obj.resizeFrames++
    if (obj.resizeFrames == s) {
        obj.w = w
        obj.h = h
        clearInterval(obj.resizeInterval)
        console.log("Cleared Interval",obj.resizeInterval)
        obj.resizeFrames = 0
    }
}

var mouseCheck = function() {
    switch(state.global) {
        case "idle":
            switch(state.timer) {
                case "idle":
                    if (margin.left.state != "extended" && mouseX <= margin.left.w) {
                        margin.left.resize(settings.margin*2,height,20)
                        margin.left.state = "extended"
                        leftArrow.fadeAllOut(20)
                    } else if (margin.left.state == "extended" && mouseX >= margin.left.w) {
                        margin.left.resize(settings.margin,height,20)
                        margin.left.state = "normal"
                        leftArrow.fadeAllIn(20)
                    }
                    break;
            }
            break;
    }
}