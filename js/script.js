let map = [];
let inf = [];

// Color of chess
//      which side (black/white) now go on table
let moveColor = "white";
let moveFromX;
let moveFromY;
let pawnAttackX;
let pawnAttackY; // coordinates of the broken field
let fromFigure;
let toFigure;
let possibleMoves;
let savePawnX = -1;
let savePawnY = -1;
let savePawnFigure = " ";
let canWhiteCastleLeft = true;
let canWhiteCastleRight = true;
let canBlackCastleLeft = true;
let canBlackCastleRight = true;



function initMap () {
    //                      map [x] [y]
    //              initialized array for chess table
    //              in 8x8 'x ---> y' coordinate form
    // where in Array map we record the initial (start) position of the figures
canWhiteCastleLeft = true;
canWhiteCastleRight = true;
canBlackCastleLeft = true;
canBlackCastleRight = true;
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

function canMove (sx, sy, dx, dy) {
    // this function check what figure can to go how its drawed
    // sx, sy - source xy, dx, dy - destination
    if (!canMoveFrom(sx, sy)) {
        return false;
    }
    if (!canMoveTo(dx, dy)){
        return false;
    }
    if (!isCorrectMove(sx, sy, dx, dy)) {
        return false;
    }
    if (!isCheckAfterMove (sx, sy, dx, dy)) {
        return true;
    } return false;
}

function isCheckAfterMove (sx, sy, dx, dy) {
    moveFigure (sx, sy, dx, dy);
    // 1. make step with figure

    // map [king.x] [king.y] = "P";
    // 3. Turn move
    let check = isCheck ();
    // 6. Give step back
    backFigure (sx, sy, dx, dy);
    // 7. Return step
    return check;
}

function isCheck () {
    king = findFigure (moveColor == "white" ? "K" : "k");
    // 2. found king
    for (let x = 0; x <= 7; x ++) {
        for (let y = 0; y <= 7; y ++) {
            if (getColor (x, y) != moveColor) {
    // 4. Sort all black (or white) figures 
                if (isCorrectMove (x, y, king.x, king.y)) {
    // 5. check, what can black (white) figure go to the cell of white (black) king.
                    return true;
                }
            }
        }
    }
    return false;
}

function isCheckmate () {
    if (!isCheck ()) return false;
    return possibleMoves == 0;
}

function isStalemate () {
    if (isCheck ()) return false;
    return possibleMoves == 0;
}

function findFigure (figure) {
        for (let x = 0; x <= 7; x ++) {
        for (let y = 0; y <= 7; y ++) {
            if (map [x] [y] == figure) {
                return {x:x, y:y};
            }
        }
    }
    return {x:-1, y:-1};
}

function isCorrectMove (sx, sy, dx, dy) {

    let figure = map [sx] [sy];
    
    if (isKing (figure)) {
        return isCorrectKingMove (sx, sy, dx, dy);
    }
    if (isQueen (figure)) {
        return isCorrectQueenMove (sx, sy, dx, dy);
    }
    if (isBishop (figure)) {
        return isCorrectBishopMove (sx, sy, dx, dy);
    }
    if (isKnight (figure)) {
        return isCorrectKnightMove (sx, sy, dx, dy);
    }
    if (isRook (figure)) {
        return isCorrectRookMove (sx, sy, dx, dy);
    }
    if (isPawn (figure)) {
        return isCorrectPawnMove (sx, sy, dx, dy);
    }
    return false;
}

function isKing (figure) {return figure.toUpperCase() == "K";}
function isQueen (figure) {return figure.toUpperCase() == "Q";}
function isBishop (figure) {return figure.toUpperCase() == "B";}
function isKnight (figure) {return figure.toUpperCase() == "N";}
function isRook (figure) {return figure.toUpperCase() == "R";}
function isPawn (figure) {return figure.toUpperCase() == "P";}

function isCorrectKingMove (sx, sy, dx, dy) {
    if (Math.abs (dx - sx) <= 1 && Math.abs (dy - sy) <= 1) {
        return true;
    }
    return canCastle (sx, sy, dx, dy);
}

function canCastle (sx, sy, dx, dy) {
    // if (dy != sy) return false;
    // if (Math.abs (dx - sx) != 2) return false;
    // if (isCheck()) return false;
    // // if (sx != 4) return false;
    // // if (sy != 0 && sy != 7) return false;
    // if (map [sx] [sy] == 'K' && sx == 4 && sy == 0) {
    //     return canWhiteCastle (dx, dy);
    // }
    // if (map [sx] [sy] == 'K' && sx == 4 && sy == 7) {
    //     return canBlackCastle (dx, dy);
    // }
    let figure = map [sx] [sy];
    if (figure = "K" 
            && sx == 4 && sy == 0 
            && dx == 6 && dy == 0) return canWhiteCRight ();
    if (figure = "K" 
        && sx == 4 && sy == 0 
        && dx == 2 && dy == 0) return canWhiteCLeft ();
    if (figure = "k" 
            && sx == 4 && sy == 7 
            && dx == 6 && dy == 7) return canBlackCRight ();
    if (figure = "k" 
        && sx == 4 && sy == 7 
        && dx == 6 && dy == 7) return canBlackCLeft ();
    
    return false;
}

function canWhiteCRight () {
    if (!canWhiteCastleRight) return false;
    if (isCheck ()) return false;
    if (isCheckAfterMove (4, 0, 5, 0)) return false;
    if (!isEmpty (5, 0)) return false;
    if (!isEmpty (6, 0)) return false; 
    if (map [7] [0] != "R") return false;
    return true;
}

function canWhiteCLeft () {
    if (!canWhiteCastleLeft) return false;
    if (isCheck ()) return false;
    if (isCheckAfterMove (4, 0, 3, 0)) return false;
    if (!isEmpty (3, 0)) return false;
    if (!isEmpty (2, 0)) return false; 
    if (!isEmpty (1, 0)) return false; 
    if (map [0] [0] != "R") return false;
    return true;
}

function canBlackCRight () {
    if (!canBlackCastleRight) return false;
    if (isCheck ()) return false;
    if (isCheckAfterMove (4, 7, 5, 7)) return false;
    if (!isEmpty (5, 7)) return false;
    if (!isEmpty (6, 7)) return false; 
    if (map [7] [7] != "r") return false;
    return true;
}

function canBlackCLeft () {
    if (!canBlackCastleLeft) return false;
    if (isCheck ()) return false;
    if (isCheckAfterMove (4, 7, 3, 7)) return false;
    if (!isEmpty (3, 7)) return false;
    if (!isEmpty (2, 7)) return false; 
    if (!isEmpty (1, 7)) return false; 
    if (map [0] [7] != "r") return false;
    return true;
}


function isCorrectLineMove (sx, sy, dx, dy, figure) {
    let deltaX = Math.sign (dx - sx);
    let deltaY = Math.sign (dy - sy);
    if (!isCorrectLineDelta (deltaX, deltaY, figure)) {
        return false;   
    }
    do {
        sx += deltaX;
        sy += deltaY;
        if (sx == dx && sy == dy) {
            return true;
        }
    } while (isEmpty (sx, sy));
    return false;
}

function isCorrectLineDelta (deltaX, deltaY, figure) {
    if (isRook (figure)) {
        return isCorrectRookDelta (deltaX, deltaY);
    }
    if (isBishop (figure)) {
        return isCorrectBishopDelta (deltaX, deltaY);
    }
    if (isQueen (figure)) {
        return isCorrectQueenDelta (deltaX, deltaY);
    }
    return false;
}

function isCorrectRookDelta (deltaX, deltaY) {
    return Math.abs (deltaX) + Math.abs (deltaY) == 1;
}

function isCorrectBishopDelta (deltaX, deltaY) {
    return Math.abs (deltaX) + Math.abs (deltaY) == 2;
}

function isCorrectQueenDelta (deltaX, deltaY) {
    return true;
}

function isCorrectQueenMove (sx, sy, dx, dy) {
    return isCorrectLineMove (sx, sy, dx, dy, "Q");
}

function isCorrectBishopMove (sx, sy, dx, dy) {
    return isCorrectLineMove (sx, sy, dx, dy, "B");
}
function isCorrectKnightMove (sx, sy, dx, dy) {
    if (Math.abs (dx - sx) == 1 && Math.abs (dy - sy) == 2) {
        return true;
    }
    if (Math.abs (dx - sx) == 2 && Math.abs (dy - sy) == 1) {
        return true;
    }
    return false;
}
function isCorrectRookMove (sx, sy, dx, dy) {
    return isCorrectLineMove (sx, sy, dx, dy, "R");
}

function isEmpty (x, y) {
    if (!onMap (x, y)) return false;
    return map [x] [y] == " ";
}

function onMap (x, y) {
    return (x >= 0 && x <= 7 && y >= 0 && y <= 7);
}

function isCorrectPawnMove (sx, sy, dx, dy) {
    if (sy < 1 || sy > 6) {
        return false;
    }
    if (getColor(sx, sy) == "white") {
        return isCorrectSignPawnMove (sx, sy, dx, dy, +1)
    }
    if (getColor(sx, sy) == "black") {
        return isCorrectSignPawnMove (sx, sy, dx, dy, -1)
    }
    return false;
}

function isCorrectSignPawnMove (sx, sy, dx, dy, sign) {
    if (isPawnPassant (sx, sy, dx, dy, sign)) {
        return true;
    }
    if (!isEmpty (dx, dy)) {
        // its passant?
        if (Math.abs (dx - sx) != 1) {
            // step left/right
            return false;
        }
        return dy - sy == sign;
    }
    if (dx != sx) {
        return false;
    }
    if (dy - sy == sign) {
        return true;
    }
    if (dy - sy == sign * 2) {
        if (sy != 1 && sy != 6) {
            return false;
        }
        return isEmpty (sx, sy + sign);
    }
    return false;
}

function isPawnPassant (sx, sy, dx, dy, sign) {
    if (!(dx == pawnAttackX && dy == pawnAttackY)) {
        return false;
    }
    if (sign == +1 && sy != 4) {
        return false;
    }
    if (sign == -1 && sy != 3) {
        return false;
    }
    if (dy - sy != sign) {
        return false;
    }
    return (Math.abs (dx - sx) == 1);
}

function marksMoveFrom () {
    // map the cells on chessboard
    possibleMoves == 0;
    initInf ();
    for (let sx = 0; sx <= 7; sx++) {
        for (let sy = 0; sy <= 7; sy++) {
            for (let dx = 0; dx <= 7; dx++) {
                for (let dy = 0; dy <= 7; dy++) {
                    if (canMove (sx, sy, dx, dy)) {
                        inf [sx] [sy] = 1;
                        possibleMoves ++;
                    }
                }
            }
        }
    }
}

function marksMoveTo () {
    // check the coordinate on which we can to go
    initInf ();
    for (let x = 0; x <= 7; x++) {
        for (let y = 0; y <= 7; y++) {
            if (canMove (moveFromX, moveFromY, x, y)) {
                inf [x] [y] = 2;
            }
        }
    }
}

function canMoveFrom (x, y) {
    // function which check what we can go from cell which user choose on table
    if (!onMap (x, y)) return false;
    return getColor (x, y) == moveColor;
}

function canMoveTo (x, y) {
    if (!onMap (x, y)) return false;
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

function moveFigure (sx, sy, dx, dy) {
    fromFigure =  map [sx] [sy];
    toFigure = map [dx] [dy];
    // map [toX] [toY] = pawnFigure == " " ? fromFigure : pawnFigure;
    map [dx] [dy] = fromFigure;
    map [sx] [sy] = " ";
    movePawnAttack (fromFigure, dx, dy);

}

function backFigure (sx, sy, dx, dy) {
    map [sx] [sy] = fromFigure;
    map [dx] [dy] = toFigure;
    backPawnAttack (fromFigure, dx, dy);
}

function clickBoxTo (toX, toY) {
    // Function determines final step of figure
    moveFigure (moveFromX, moveFromY, toX, toY);

    promotePawn (fromFigure, toX, toY);
    checkPawnAttack (fromFigure, toX, toY);
    
    updateCastleFlags (moveFromX, moveFromY, toX, toY);
    moveCastlingRook (moveFromX, moveFromY, toX, toY);

    turnMove();
    marksMoveFrom();
    showMap();
}

function updateCastleFlags (fromX, fromY, toX, toY) {

    let figure = map [toX] [toY];
    
    if (figure == "K") {
        canWhiteCastleRight == false;
        canWhiteCastleLeft == false;
    }
    if (figure == "k") {
        canBlackCastleRight == false;
        canBlackCastleLeft == false;
    }

    if (figure == "K") {
        canWhiteCastleRight == false;
        canWhiteCastleLeft == false;
    }
    if (figure == "k") {
        canBlackCastleRight == false;
        canBlackCastleLeft == false;
    }

    if (figure == "R" && fromX == 0 && fromY == 0) {
        canWhiteCastleLeft = false;
    }
    if (figure == "R" && fromX == 7 && fromY == 0) {
        canWhiteCastleRight = false;
    }
    if (figure == "r" && fromX == 0 && fromY == 7) {
        canBlackCastleLeft = false;
    }
    if (figure == "r" && fromX == 7 && fromY == 7) {
        canBlackCastleRight = false;
    }
}

function moveCastlingRook (fromX, fromY, toX, toY) {
    if (!isKing (map [toX] [toY])) return;
    if (Math.abs (toX - fromX) != 2) return;
    if (toX == 6 && toY == 0) { map [7] [0] = ' '; map [5] [0] = 'R'; }
    if (toX == 2 && toY == 0) { map [0] [0] = ' '; map [3] [0] = 'R'; }
    if (toX == 6 && toY == 7) { map [7] [7] = ' '; map [5] [7] = 'r'; }
    if (toX == 2 && toY == 7) { map [0] [7] = ' '; map [3] [7] = 'r'; }
}

function promotePawn (fromFigure, toX, toY) {
    if (!isPawn (fromFigure)) {
        return;
    }
    if (!(toY == 7 || toY == 0)) {
        return;
    }
    do {
        figure = prompt ("Select figure to Promote: Q R B N", "Q");
    } while (!(
        isQueen (figure) ||
        isRook (figure) ||
        isBishop (figure) ||
        isKnight (figure)));
    if (moveColor == "white") {
        figure.toUpperCase();
    } else {
        figure.toLowerCase();
    }
    map [toX] [toY] = figure;
}

function movePawnAttack (fromFigure, toX, toY) {
    if (isPawn (fromFigure)) {
        if (toX == pawnAttackX && toY == pawnAttackY) {
            let y = moveColor == "white" ? toY - 1 : toY + 1;
            savePawnFigure = map [toX] [y];
            savePawnX = toX;
            savePawnY = Y;
            map [toX] [y] = " ";
        }
    }
}

function backPawnAttack () {
    if (savePawnX == -1) {
        return;
    }
    map [savePawnX] [savePawnY] = savePawnFigure;
}

function checkPawnAttack (fromFigure, toX, toY) {
    pawnAttackX = -1;
    pawnAttackY = -1;
    savePawnX = -1;
    if (isPawn (fromFigure)) {
        if (Math.abs (toY - moveFromY)) {
            pawnAttackX = moveFromX;
            pawnAttackY = (moveFromY + toY) / 2;
        }
    }
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
                        "font-size: 35px; " +
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
    showInfo ();
}

function showInfo () {
    let html = "Turns: " + moveColor + " ";
    if (isCheckmate ()) {
        html += "CHECKMATE";
    } else if (isStalemate ()) {
        html += "STALEMATE";
    } else if (isCheck ()) {
        html += "CHECK";
    }
    html +=
        (canWhiteCastleLeft ? ' WCL' : '') + 
        (canWhiteCastleRight ? ' WCR' : '') + 
        (canBlackCastleLeft ? ' BCL' : '') + 
        (canWhiteCastleRight ? ' BCR' : '');
    document.getElementById("info").innerHTML = html;
}

initMap();
marksMoveFrom();
showMap();