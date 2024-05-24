let map = [];
function initMap () {
    // map [x] [y]
    map = [
    //   y0   y1   y2
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
function showMap () {
    html = "<table border='1' cellpadding='2' cellspacing='0'>";
    for (let y = 7; y >= 0; y--)
    {   
        html += "<tr>";
        html += "<td>"+ y +"</td>";
        for (let x = 0; x <= 7; x++)
            {
                color = (x + y) % 2 ? '#eeffee' : '#abcdef';
                html += "<td height=50 width=50 " + "style='background-color: "+color+"; text-align: center'>";
                html += map [x] [y]
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
showMap();