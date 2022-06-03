
const TILESIZE = 25
const TILESEPERATION = 0

var p1X = 180
var p1Y = 240
var pDir = 0
var pS = 4

var updates = 0

// 0,0 is 240, 180

var position_log = [[240, 180]]

var orb_log = []

for (var i = 0; i < pS; i++) {
    console.log("setup")
    logpos(i * TILESIZE);
};

//Canvas Setup
var box = jQuery('.box');	// reference to the HTML .box element
var board = jQuery('.board');	// reference to the HTML .board element
var boardWidth = board.width();	// the maximum X-Coordinate of the screen
var boardHeight = board.innerHeight(); // the maximum Y-Coordinate of the screen
console.log(boardWidth + ", " + boardHeight)

var c = document.getElementById("CanvasTest");
var ctx = c.getContext("2d");
const context = c.getContext('2d');


var map = {}; // maps all buttons being currently pressed

//Common Func Setup

function roundToTileset(pos) {
    if (pos % TILESIZE != 0) {
        return Math.round(pos / TILESIZE) * TILESIZE
    };


};

function randi(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

document.addEventListener('keydown', myKeyPress);

function myKeyPress(e) {
    var keynum;

    if (window.event) { // IE                  
        keynum = e.keyCode;
    } else if (e.which) { // Netscape/Firefox/Opera                 
        keynum = e.which;
    }

};


function stamp() {

    


    for (var i = 0; i <= pS; i++) { // render snake limbs. Z:-1


        rect((roundToTileset(position_log[i][0]) ?? 404) - (TILESIZE / 2), (roundToTileset(position_log[i][1]) ?? 404) - (TILESIZE / 2), TILESIZE, TILESIZE, "Red")

    };

    rect(roundToTileset(p1X) - (TILESIZE / 2), roundToTileset(p1Y) - (TILESIZE / 2), TILESIZE, TILESIZE, "Blue") // render snake head. Z:0

    if (orb_log.length > 0) { // render food(?) orbs. Z:1
        for (var i = 0; i <= orb_log.length; i++) {

            elipses((orb_log[i][0] ?? 404), (orb_log[i][1] ?? 404), 1, "Green");

        };
    }

};


function getpress() {
    onkeydown = onkeyup = function (e) {
        e = e || event; // to deal with IE
        map[e.keyCode] = e.type == 'keydown';
    };

    if (map[38]) { //p1up

        pDir = 0
    } else if (map[40]) { //p1down

        pDir = 180
    } else if (map[39]) { //p1left

        pDir = -90
    } else if (map[37]) { //p1right
        pDir = 90
    } else if (map[68]) { //debug value

        debug()
    };

};

function rect(rX, rY, sX, sY, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.rect(rX, rY, sX, sY);
    ctx.stroke();
};

function elipses(eX, eY, size, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.ellipse(eX, eY, 12 * size, 12 * size, Math.PI / 4, 0, 2 * Math.PI);
    ctx.stroke();
};

function clear() {

    ctx.clearRect(0, 0, c.width, c.height);

}

function draw(text, tX, tY, px) {
    var c = document.getElementById("CanvasTest");
    var ctx = c.getContext("2d");
    ctx.font = px + "px " + "Courier New";
    ctx.strokeText(text, tX, tY);
};

// starts here.

//Process Setup
var lastUpdate = Date.now(); //deltatime handler
var now = Date.now();
var dt = now - lastUpdate;
setInterval(process, dt)
setInterval(update, 375)

function update() {

    if (pDir === 0) {
        p1Y -= TILESIZE
    } else if (pDir === 90) {
        p1X -= TILESIZE
    } else if (pDir === -90) {
        p1X += TILESIZE
    } else if (pDir === 180) {
        p1Y += TILESIZE
    }


    updates += 1

    checkcoll()

    logpos(0)

    if (position_log.length >= pS) {
        position_log.shift()
        //position_log.pop()
    }

    //console.log(position_log)

};

function checkcoll() {

    if (orb_log.length > 0) {
        for (var i = 0; i < orb_log.length; i++) {
            if (roundToTileset(p1X) === (orb_log[i][0] ?? 404) && roundToTileset(p1Y) === (orb_log[i][1] ?? 404)) {

                pS += 1
                orbQueueFree()
                console.log("pickup!")


            };
        }
    }


    for (var i = 0; i < position_log.length; i++) {
        if ((p1X === position_log[i][0] ?? 404) && p1Y === (position_log[i][1] ?? 404)) {

            console.log("hit!")
            loss()
        }
    };

}

function playerprocess() {


}

function process() {
   try {
        clear()
        getpress()
        playerprocess()
        stamp()
    }
    catch (err) {
        document.getElementById("dt").innerHTML = err.toString() + " at: " // + err.lineNumber
    };
};

function logpos(offset) {
    var pos = []
    pos.push(p1X)
    pos.push(p1Y + offset)
    position_log.push(pos)

    console.log(position_log)
}

function loss() {
    debugger

};

function createorb() {
    var orbx = roundToTileset(randi(200, -200))
    var orby = roundToTileset(randi(200, -200)) //hehe orby 
    var orbpos = [orbx, orby]
    orb_log.push(orbpos)
};

function orbQueueFree() {
    delete orb_log[orb_log.indexOf([p1X, p1Y])]
}

function debug() {
    createorb()
}