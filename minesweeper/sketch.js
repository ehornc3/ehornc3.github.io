var setupComplete = false
var w
var h
var mines
var board = []
var fade = 255
var fadeDown = false
var cellWidth = 20
function setup() {
    createCanvas(innerWidth,innerHeight)
}

var presets = {
    beginner:{w:9,h:9,mines:10},
    intermediate:{w:16,h:16,mines:40},
    expert:{w:30,h:16,mines:99}
}

function draw() {
    if (!setupComplete) {
        background(0)
        fill(255,255,255,fade)
        textSize(72)
        textAlign(CENTER, CENTER)
        text("Select a difficulty!",width/2,height/2-36)
        fill(50,50,50,fade)
        ellipseMode(CENTER)
        ellipse(width/2 - width/10, height/2 + 36, 80, 80)
        ellipse(width/2, height/2 + 36, 80, 80)
        ellipse(width/2 + width/10, height/2 + 36, 80, 80)
        fill(255,255,255,fade)
        textSize(60)
        text("B",width/2 - width/10, height/2 + 36)
        text("M",width/2, height/2 + 36)
        text("E",width/2 + width/10, height/2 + 36)
        if (fade <= 0) {
            setupComplete = true
        }
        if (fadeDown == true) {
            fade -= 10
        }
    } else {
        background(0)
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[i].length; j++) {
                board[i][j].show()
            }
        }
    }
}

function mousePressed() {
    if (mouseButton == LEFT) {
        if (!setupComplete) {
            if (dist(mouseX, mouseY, width/2 - width/10, height/2 + 36) <= 40) {
                w = presets.beginner.w
                h = presets.beginner.h
                mines = presets.beginner.mines
                fadeDown = true
                newBoard()
            }
            if (dist(mouseX, mouseY, width/2, height/2 + 36) <= 40) {
                w = presets.intermediate.w
                h = presets.intermediate.h
                mines = presets.intermediate.mines
                fadeDown = true
                newBoard()
            }
            if (dist(mouseX, mouseY, width/2 + width/10, height/2 + 36) <= 40) {
                w = presets.expert.w
                h = presets.expert.h
                mines = presets.expert.mines
                fadeDown = true
                newBoard()
            }
        } else {
            if (mouseX <= cellWidth * w && mouseY <= cellWidth * h) {
                board[floor(mouseX/cellWidth)][floor(mouseY/cellWidth)].hit()
            }
        }
    } else if (mouseButton == RIGHT) {
            if (mouseX <= cellWidth * w && mouseY <= cellWidth * h) {
                board[floor(mouseX/cellWidth)][floor(mouseY/cellWidth)].flag()
            }
    }
}

function newBoard() {
    board = []
    for (var i = 0; i < w; i++) {
        board[i] = []
        for (var j = 0; j < h; j++) {
            board[i][j] = new cell(i, j)
        }
    }
}

function cell(x,y) {
    this.x       = x
    this.y       = y
    this.shown   = false
    this.bomb    = floor(random(0,1.1)) //TODO!
    this.flagged = false
}

cell.prototype.show = function() {
    if (this.shown) {
        if (this.bomb) {
            console.log("Kaboom! You failed.")
            for (var i = 0; i < board.length; i++) {
                for (var j = 0; j <board[i].length; j++) {
                    board[i][j].shown = true
                }
            }
            fill(255,0,0)
            rect(this.x*cellWidth,this.y*cellWidth,cellWidth,cellWidth)
        } else {
            fill(100)
            rect(this.x*cellWidth,this.y*cellWidth,cellWidth,cellWidth)
            fill(0)
            textSize(12)
            textAlign(CENTER, CENTER)
            text(this.getNeighbors(),this.x * cellWidth + cellWidth/2, this.y * cellWidth + cellWidth/2)
        }
    } else if (this.flagged) {
        fill(255,0,0)
        rect(this.x*cellWidth,this.y*cellWidth,cellWidth,cellWidth)
    } else {
        fill(255)
        rect(this.x*cellWidth,this.y*cellWidth,cellWidth,cellWidth)
    }
}

cell.prototype.hit = function() {
    this.shown = true
    if (this.getNeighbors() == 0) {
        if (this.x != 0 && this.y != 0) { 
            board[this.x-1][this.y-1].hit()
        }
        if (this.x != 0) {
            board[this.x-1][this.y].hit()
        }
        if (this.x != 0 && this.y != h) {
            board[this.x-1][this.y+1].hit()
        }
        if (this.y != 0) {
            board[this.x][this.y-1].hit()
        }
        if (this.y != h) {
            board[this.x][this.y+1].hit()
        }
        if (this.x != w && this.y != 0) {
            board[this.x+1][this.y-1].hit()
        }
        if (this.x != w) {
            board[this.x+1][this.y].hit()
        }
        if (this.x != w && this.y != h) {
            board[this.x+1][this.y+1].hit()
        }
    }
}


cell.prototype.flag = function() {
    this.flagged = !this.flagged
}
cell.prototype.getNeighbors = function() {
    var neighbors = 0
    if (this.x != 0 && this.y != 0) {
        if (board[this.x-1][this.y-1].bomb) {neighbors++}
    }
    if (this.x != 0) {
        if (board[this.x-1][this.y].bomb) {neighbors++}
    }
    if (this.x != 0 && this.y != h) {
        if (board[this.x-1][this.y+1].bomb) {neighbors++}
    }
    if (this.y != 0) {
        if (board[this.x][this.y-1].bomb) {neighbors++}
    }
    if (this.y != h) {
        if (board[this.x][this.y+1].bomb) {neighbors++}
    }
    if (this.x != w && this.y != 0) {
        if (board[this.x+1][this.y-1].bomb) {neighbors++}
    }
    if (this.x != w) {
        if (board[this.x+1][this.y].bomb) {neighbors++}
    }
    if (this.x != w && this.y != h) {
        if (board[this.x+1][this.y+1].bomb) {neighbors++}
    }
    return neighbors
}