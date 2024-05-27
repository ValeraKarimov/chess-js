let map = [];
let inf = [];

let moveColor = "white";

function initMap () {
    // map [x] [y]
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
    initInf ();
    for (let x = 0; x <= 7; x++) {
        for (let y = 0; y <= 7; y++) {
            if (canMoveFrom (x, y)) {
                inf [x] [y] = 1;
            }
        }
    }
}

function canMoveFrom (x, y) {
    return getColor (x, y) == moveColor;
}

function getColor (x, y) {
    let figure = map [x] [y];
    if (figure == " ") 
        return "";
    return (figure.toUpperCase() == figure) ? "white" : "black";
}

function figureToHTML (figure) {
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
                        "color: #000000'>";
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