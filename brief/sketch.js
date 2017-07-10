/*
 *  Hello, hello, hello!
 *  You must be here because you want to make a new module, isn't that right?
 *  Here's a few things you'll need to know before doing so (pfft there was something inaccurate here so I removed it)
 *      1. Where to put your modules.
 *          Each and every module should be an object kept in the moduleList array.
 *          Each object in that array has two things: A display name (a string (disp)) and a 'draw,' which is the 'draw function' of the module.
 *          The syntax for the module's functions may look a little wonky, so here's a template.
 *              {disp:"Display name!",
 *                  setup:function() {
 *                      moduleVars.example.x = 5
 *                  },
 *                  draw:function() {
 *                      Y o u r  c o d e  g o e s  r i g h t  h e r e !
 *                      rect(x,5,5,5)
 *                      /code
 *                  } 
 *              }
 *      4. I want blahblahblahblahblah
 *          a. More functions
 *              You (hopefully) know how objects work, go and add another function!
 *                 {disp:"blah",draw:function() {moduleList[activeModule].hey()}, hey:function() {rect(5,5,5,5)}}
 *          b. Input
 *              Use the keyIsDown() thing
 *          c. Get rid of the vanilla background bit
 *              Set moduleSkipVanilla to false somewhere in your module's setup function.
 *              Remember, this will cause smearing! (Unless you want that)
 *              This also doesn't get rid of the text. That stays there. And always will.
 *      2. Where do my variables go?
 *          Just to be extra sure that your module doesn't accidently share a variable with the main program, I advise that you keep all your variables in the moduleVars object.
 *          Further from that, keep your variables in a sub-object with the name of your module.
 *              For examble: I want a margin variable! Declare it as so:
 *              moduleVars.myModule.margin = 50
 *      3. How do I get my module on the big screen?
 *          a. Send me a pull request on github.
 *              <superitalics>But oh, I don't know how to!</superitalics>
 *              Learn. That's what we're in school for, isn't it?
 *              This step is just so I make sure you didn't tamper with anything in the program I didn't want you tampering with.
 *          b. Get it approved.
 *              Ask Mrs. Serrechia if it's okay.
 *              Pass? Sweet.
 *          c. Choose the module in the morning.
 *              Your module should now be an available option in the list, so go ahead and pick it!
 *          d. Bask in the glory.
 *          
 *      - Ethan
 */
var fade = 255
var fading = 'false'
var moduleSkipVanilla = false
var colors = {}
var moduleVars = {}
var moduleList = [

    {disp:"Background",
        setup:function() {
            d = new Date()
            moduleVars.vanilla = {}
            moduleVars.vanilla.message1 = "Lafayette Morning Announcements"
            moduleVars.vanilla.message2 = "{{temp}}"
            moduleVars.vanilla.message2 = moduleVars.vanilla.message2.replace("{{temp}}", dispDay[d.getDay()] + ", " + dispMonth[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear())
        },
        draw:function(x) {
            if (x=='bg') {
                if (!moduleSkipVanilla) {
                    background(colors.orangeDark)
                    fill(colors.orange)
                    rect(width/20,height/20,width-width/20*2,height-height/20*2)
                }
            } else if (x=='txt') {
                fill(colors.black)
                textAlign(CENTER, CENTER)
                textSize(floor(width/(moduleVars.vanilla.message1.length * 2) + (width/moduleVars.vanilla.message1.length/2) * 2))
                text(moduleVars.vanilla.message1, width/2, height/2 - height/20)
                textSize(floor(width/(moduleVars.vanilla.message2.length * 2) + (width/moduleVars.vanilla.message2.length/2) * 2))
                text(moduleVars.vanilla.message2, width/2, height/2 + height/20)
            }
        }
    },

    {disp:"Bouncing Balls",
        setup:function() {
            moduleVars.balls = {}
            moduleVars.balls.arr = []
        },
        draw:function() {
            for (var i = 0; i < moduleVars.balls.arr.length; i++) {
                moduleVars.balls.arr[i].tick()
            }
            if (keyIsDown(32)) {
                moduleVars.balls.arr.push(new moduleList[activeModule].ball())
            }
        },
        ball:function() {
            this.x = random(0,width)
            this.y = random(0,height)
            this.xVel = random(2,3)
            this.yVel = random(2,3)
            this.diam = random(10,15)
            this.tick = function() {
                ellipseMode(CENTER)
                fill(colors.white)
                ellipse(this.x,this.y,this.diam,this.diam)
                this.x += this.xVel
                this.y += this.yVel
                if (this.x <= 0 || this.x >= width) {
                    this.xVel *= -1
                }
                if (this.y <= 0 || this.y >= height) {
                    this.yVel *= -1
                }
            }
        }
    },

    {disp:"Collapsing Grid",
        setup:function() {
            moduleVars.cgrid = {}
            moduleVars.cgrid.x = random(0,width)
            moduleVars.cgrid.y = random(0,height)
            moduleVars.cgrid.xVel = random(10,15)
            moduleVars.cgrid.yVel = random(10,15)
            moduleVars.cgrid.frequency = 20
            moduleSkipVanilla = true
        },
        draw:function() {
            background(colors.orangeDark)
            fill(colors.orange)
            ellipseMode(CENTER)
            for (var i = 0; i < ceil(width/moduleVars.cgrid.frequency); i++) {
                for (var j = 0; j < ceil(height/moduleVars.cgrid.frequency); j++) {
                    ellipse(i*moduleVars.cgrid.frequency,j*moduleVars.cgrid.frequency,map(dist(moduleVars.cgrid.x,moduleVars.cgrid.y,i*moduleVars.cgrid.frequency,j*moduleVars.cgrid.frequency),0,width,moduleVars.cgrid.frequency/2,moduleVars.cgrid.frequency*2))
                }
            }
            moduleVars.cgrid.x += moduleVars.cgrid.xVel
            moduleVars.cgrid.y += moduleVars.cgrid.yVel
            if (moduleVars.cgrid.x <= 0 || moduleVars.cgrid.x >= width) {
                moduleVars.cgrid.xVel *= -1
            }
            if (moduleVars.cgrid.y <= 0 || moduleVars.cgrid.y >= height) {
                moduleVars.cgrid.yVel *= -1
            }
        }
    }
]

function setup() {
    createCanvas(innerWidth, innerHeight)
    noStroke()
    ellipseMode(CENTER)
    colors = {
        black:          color(0,0,0),
        white:          color(255,255,255),
        orange:         color('#ff6f00'),
        orangeLight:    color('#ffa040'),
        orangeDark:     color('#c43e00')
    }
}

function draw() {
    if (fading == 'false') {
        background(0)  
        for (var i = 0; i < moduleList.length; i++) {
            fill(colors.orange)
            ellipse(width/(moduleList.length+1) + (moduleList.length - i - 1) * width/(moduleList.length + moduleList.length/3), height/2, floor(width/(moduleList.length + moduleList.length/2)), floor(width/(moduleList.length + moduleList.length/2)))
            textSize(floor(width/(moduleList.length + moduleList.length/30)/moduleList[i].disp.length))
            fill(255)
            textAlign(CENTER, CENTER)
            text(moduleList[i].disp, width/(moduleList.length+1) + (moduleList.length - i - 1) * width/(moduleList.length + moduleList.length/3), height/2)
        }
    } else if (fading == 'out') {
        background(0)  
        for (var i = 0; i < moduleList.length; i++) {
            fill(colors.orange.levels[0],colors.orange.levels[1],colors.orange.levels[2],fade)
            ellipse(width/(moduleList.length+1) + (moduleList.length - i - 1) * width/(moduleList.length + moduleList.length/3), height/2, floor(width/(moduleList.length + moduleList.length/2)), floor(width/(moduleList.length + moduleList.length/2)))
            textSize(floor(width/(moduleList.length + moduleList.length/30)/moduleList[i].disp.length))
            fill(255,255,255,fade)
            textAlign(CENTER, CENTER)
            text(moduleList[i].disp, width/(moduleList.length+1) + (moduleList.length - i - 1) * width/(moduleList.length + moduleList.length/3), height/2)
            fade -= 5
            if (fade <= 0) {
                fading = 'in'
                fade = 255
            }
        }
    } else if (fading == 'in') {
        moduleList[0].draw('bg')
        moduleList[activeModule].draw()
        moduleList[0].draw('txt')
        background(0,0,0,fade)
        fade -= 5
        if (fade <= 0) {
            fading = 'done'
        }
    } else if (fading == 'done') {
        moduleList[0].draw('bg')
        moduleList[activeModule].draw()
        moduleList[0].draw('txt')
    }
}

function mousePressed() {
    if (fading == 'false') {
        for (var i = 0; i < moduleList.length; i++) {
            if(dist(mouseX, mouseY, width/(moduleList.length+1) + (moduleList.length - i - 1) * width/(moduleList.length + moduleList.length/3), height/2) <= floor(width/(moduleList.length + moduleList.length/2)/2)) {
                activeModule = i
                moduleList[activeModule].setup()
                moduleList[0].setup()
                fade = 255
                fading = 'out'
            }
        }
    }
}

// LE GRANDE LIBRARE
// tldr: Window stays the size of the whole screen, dispDay[d.getDay()] and dispMonth[d.getMonth()] work
var dispDay = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];var dispMonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];function windowResized() {resizeCanvas(innerWidth, innerHeight)}