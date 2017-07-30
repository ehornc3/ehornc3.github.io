var state
var times
var settings
var setup = function() {
    createCanvas(innerWidth,innerHeight)
    noStroke()
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
            main        :color(63 ,81 ,181,120),
            light       :color(63 ,81 ,181,80 ),
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
}

var windowResized = function() {
    resizeCanvas(innerWidth,innerHeight)
    settings.margin = width/20
} 

var draw = function() {
    background(255)
    background(settings.colors.main)
    fill(settings.colors.main)
    rect(settings.margin,settings.margin,width-settings.margin*2,height-settings.margin*2)
    switch(state.global) {
        case "idle":
        fill(settings.colors.text)
            textAlign(CENTER, BOTTOM)
            textSize((width-settings.margin/2)/settings.idlemessage.length/1.5)
            text(settings.idlemessage,width/2,height/2)
            if (times.recent != null) {
                textAlign(CENTER, TOP)
                textSize(((width-settings.margin/2)/times.recent.toString().length)/2)
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
                    textSize((width-settings.margin/2)/settings.readymessage.length/1.5)
                    text(settings.readymessage,width/2,height/2)
                    break;
                case "inspecting":
                    textAlign(CENTER,BOTTOM)
                    fill(settings.colors.text)
                    textSize((width-settings.margin/2)/8)
                    text(floor((millis()-times.inspectionStart)/10000),width/2 + (((width - settings.margin/2)/8/2) * -2),height/2)
                    text(floor((millis()-times.inspectionStart)/1000)%10,width/2 + (((width - settings.margin/2)/8/2) * -1),height/2)
                    text(".",width/2 + (((width - settings.margin/2)/2/4/2) * 0),height/2)
                    text(floor((millis()-times.inspectionStart)/100)%10,width/2 + (((width - settings.margin/2)/8/2) * 1),height/2)
                    text(floor((millis()-times.inspectionStart)/10)%10,width/2 + (((width - settings.margin/2)/8/2) * 2),height/2)
                    if (millis()-times.inspectionStart >= 8000 && millis()-times.inspectionStart <= 12000) {
                        textAlign(CENTER, TOP)
                        textSize(((width-settings.margin/2)/settings.eightmessage.length)/2)
                        text(settings.eightmessage,width/2,height/2)
                    } else if (millis()-times.inspectionStart > 12000 && millis()-times.inspectionStart <= 15000) {
                        textAlign(CENTER, TOP)
                        textSize(((width-settings.margin/2)/settings.twelvemessage.length)/2)
                        text(settings.twelvemessage,width/2,height/2)
                    } else if (millis()-times.inspectionStart >= 15000) {
                        state.global = "idle"
                        state.timer = "idle"
                        times.recent = "DNS"
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
                    textSize((width-settings.margin/2)/8)
                    text(floor((millis()-times.inspectionStart)/10000),width/2 + (((width - settings.margin/2)/8/2) * -2),height/2)
                    text(floor((millis()-times.inspectionStart)/1000)%10,width/2 + (((width - settings.margin/2)/8/2) * -1),height/2)
                    text(".",width/2 + (((width - settings.margin/2)/2/4/2) * 0),height/2)
                    text(floor((millis()-times.inspectionStart)/100)%10,width/2 + (((width - settings.margin/2)/8/2) * 1),height/2)
                    text(floor((millis()-times.inspectionStart)/10)%10,width/2 + (((width - settings.margin/2)/8/2) * 2),height/2)
                    if (millis()-times.inspectionStart >= 8000 && millis()-times.inspectionStart <= 12000) {
                        textAlign(CENTER, TOP)
                        textSize(((width-settings.margin/2)/settings.eightmessage.length)/2)
                        text(settings.eightmessage,width/2,height/2)
                    } else if (millis()-times.inspectionStart > 12000 && millis()-times.inspectionStart <= 15000) {
                        textAlign(CENTER, TOP)
                        textSize(((width-settings.margin/2)/settings.twelvemessage.length)/2)
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
                    textSize((width-settings.margin/2)/8)
                    text(floor((millis()-times.timerStart)/10000),width/2 + (((width - settings.margin/2)/8/2) * -2),height/2)
                    text(floor((millis()-times.timerStart)/1000)%10,width/2 + (((width - settings.margin/2)/8/2) * -1),height/2)
                    text(".",width/2 + (((width - settings.margin/2)/2/4/2) * 0),height/2)
                    text(floor((millis()-times.timerStart)/100)%10,width/2 + (((width - settings.margin/2)/8/2) * 1),height/2)
                    text(floor((millis()-times.timerStart)/10)%10,width/2 + (((width - settings.margin/2)/8/2) * 2),height/2)
                    break;
            }
            break;
    }
    textSize(12)
    fill(0)
    textAlign(LEFT, TOP)
    text(state.timer,0,0)
}

var keyPressed = function() {
    if (keyCode==32) {
        switch(state.timer) {
            case "idle":
                times.inspectionStart = millis()
                state.timer = "inspectionStartDown"
                state.global = "timing"
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