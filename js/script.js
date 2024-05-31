let map = [];
let inf = [];

// Color of chess
//      which side (black/white) now go on table
let moveColor = "white";
let moveFromX;
let moveFromY;

function initMap () {
    //                      map [x] [y]
    //              initialized array for chess table
    //              in 8x8 'x ---> y' coordinate form
    // where in Array map we record the initial (start) position of the figures
    map = [
    //   y0   y1   y2   y3   y4   y5   y6   y7
        ["R", "P", " ", " ", " ", " ", "p", "r",], // x = 0
        ["N", "P", " ", " ", " ", " ", "p", "n",], // x = 1
        ["B", "P", " ", " ", " ", " ", "p", "b",], // x = 2
        ["Q", "P", " ", " ", " ", " ", "p", "q",], // x = 3
        ["K", "P", " ", " ", " ", " ", "p", "k",], // x = 4
        ["B", "P", " ", " ", " ", " ", "p", "b",], // x = 5
        ["N", "P", " ", " ", " ", " ", "p", "n",], // x = 6
        ["R", "P", " ", " ", " ", " ", "p", "r",]  // x = 7
    ]
}
function initInf () {
    //                  Dynamic array 
    // where we record result postion of the figures in game and show where figure can go
    inf = [
        [" ", " ", " ", " ", " ", " ", " ", " ",],
        [" ", " ", " ", " ", " ", " ", " ", " ",],
        [" ", " ", " ", " ", " ", " ", " ", " ",],
        [" ", " ", " ", " ", " ", " ", " ", " ",],
        [" ", " ", " ", " ", " ", " ", " ", " ",],
        [" ", " ", " ", " ", " ", " ", " ", " ",],
        [" ", " ", " ", " ", " ", " ", " ", " ",],
        [" ", " ", " ", " ", " ", " ", " ", " ",]
    ];
}

function marksMoveFrom () {
    // map the cells on chessboard
    initInf ();
    for (let x = 0; x <= 7; x++) {
        for (let y = 0; y <= 7; y++) {
            if (canMoveFrom (x, y)) {
                inf [x] [y] = 1;
            }
        }
    }
}

function marksMoveTo () {
    // check the coordinate on which we can to go
    initInf ();
    for (let x = 0; x <= 7; x++) {
        for (let y = 0; y <= 7; y++) {
            if (canMoveTo (x, y)) {
                inf [x] [y] = 2;
            }
        }
    }
}

function canMoveFrom (x, y) {
    // function which check what we can go from cell which user choose on table
    return getColor (x, y) == moveColor;
}

function canMoveTo (x, y) {
    if (map [x] [y] == " ") {
        return true;
    }
    return getColor (x, y) != moveColor; // white can go to black
}

function getColor (x, y) {
    // define, which figure now go on table
    let figure = map [x] [y];
    if (figure == " ") 
        return "";
    return (figure.toUpperCase() == figure) ? "white" : "black";
}

function clickBox (x, y) {
    // This function determines on which box user click
    //      For this operation she use 2 functions 
    //          which determines from which location to where go figure 
    if (inf [x] [y] == '1') {
        clickBoxFrom(x, y);
    } else if (inf [x] [y] == '2') {
        clickBoxTo(x, y);
    }
}

function clickBoxFrom (x, y) {
    // Function determines from which location step will be started
    //      using for this x ---> y coordinates
    moveFromX = x;
    moveFromY = y;
    marksMoveTo();
    showMap();
}

function clickBoxTo (x, y) {
    // Function determines final step of figure
    map [x] [y] = map [moveFromX] [moveFromY];
    map [moveFromX] [moveFromY] = " ";
    turnMove();
    marksMoveFrom();
    showMap();
}

function turnMove () {
    // Function which turn move beetween black & white figures
    moveColor = moveColor == "white" ? "black" : "white"; 
}

function figureToHTML (figure) {
    //             From 'value' to 'Figure' 
    // This function change value from 'switch/case function' 
    //      to real picture of figure on chess table
    //           accepting value from Array
    switch (figure) {
        case "K" : return "&#9812;"; case "k" : return "&#9818;";
        case "Q" : return "&#9813;"; case "q" : return "&#9819;";
        case "R" : return "&#9814;"; case "r" : return "&#9820;";
        case "B" : return "&#9815;"; case "b" : return "&#9821;";
        case "N" : return "&#9816;"; case "n" : return "&#9822;";
        case "P" : return "&#9817;"; case "p" : return "&#9823;";
        default : return "&nbsp;";
    }
}
function showMap () {
    //                    Table Map HTML + CSS
    // function 'showMap' show chess table on the screen with 'tr' & 'td', 
    //          with using  CSS with construnctions 'for' & 'if/else';
    html = "<table border='1' cellpadding='2' cellspacing='0'>";
    for (let y = 7; y >= 0; y--)
    {   
        html += "<tr>";
        html += "<td>"+ y +"</td>";
        for (let x = 0; x <= 7; x++)
            {
                if (inf [x] [y] == " ") {
                color = (x + y) % 2 ? '#eeffee' : '#abcdef';
                }
                else {
                    color = inf [x] [y] == "1" ? "#aaffaa" : "#ffaaaa";
                }
                html += "<td height=50 width=50 " + 
                        "style='background-color: "+color+";" + 
                        "text-align: center;" + 
                        "font-size: 40px; " +
                        "color: #000000; " +
                        "'onclick='clickBox("+ x +", "+ y +");'>";
                html += figureToHTML (map [x] [y]);
                html +="</td>";
            }
            html += "</tr>";
    }
    html += "<tr>";
    html += "<td></td>";
    for (let x = 0; x <= 7; x++) 
        html += "<td style='text-align: center'>"+ x +"</td>";

    document.getElementById ("board").innerHTML = html;
}
initMap();
marksMoveFrom();
showMap();