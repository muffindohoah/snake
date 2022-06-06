
console.log($)
var button = $("rollSubmit")

function randi(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function randc() {
    var colors = ["#262626", "#979797", "#474747", "#00ff00", "#ff0000", "#0000ff"]
    return String(colors[randi(0, colors.length)])
}

function Int(input) {

    return Number(input)
}

//setup

//$(document).ready(function () {
$("#rollSubmit").on("click", rollProcess);
//});



// /setup

function rollProcess() {
    console.log($("#rollCount").val())
    var rollcount = $("rollCount").val()

    logRoll("123")
    for (var i = 0; i < rollcount; i++) {

        roll()


    };

    logRoll("456")

};

function roll() {

    try {
        console.log("rolling")
        var sidedDie = Int($("sidedDie").text)
        var rollNumber = randi(0, sidedDie)

        clear()
        Dot()
        //logRoll()
        setTimeout(roll, 500)

    } catch (err) {
        alert(err.message);

    }
}

function getRoll() {
    return randi()
}

function logRoll(roll) {
    console.log("texti")
   
    $("#p").add(String(roll)).appendTo("#log");
};


function clear() {

    $('<div>')
    $("#die").empty()
}

function Dot(dots) {
    clear()
    for (var i = 0; i < dots; i++) {
        $('<div>')
            .css("height", randi(12, 20))
            .css("width", randi(12, 20))
            .css("background-color", randc())
            .css("position", "absolute")
            .css('top', randi(0, 80))
            .css('left', randi(0, 80))
            .appendTo("#die");

    };
}

Dot(3)






