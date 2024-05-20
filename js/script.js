function showMap () {
    html = "<table border='1' cellpadding='2' cellspacing='0'>";
    for (let y = 7; y >= 0; y--)
    {   
        html += "<tr>";
        html += "<td>"+ y +"</td>";
        for (let x = 0; x <= 7; x++)
            {
                color = (x + y) % 2 ? '#eeffee' : '#abcdef';
                html += "<td height=50 width=50 " + "style='background-color: "+color+"'></td>";
            }
            html += "</tr>";
    }
    html += "<tr>";
    html += "<td></td>";
    for (let x = 0; x <= 7; x++) 
        html += "<td style='text-align: center'>"+ x +"</td>";

    document.getElementById ("board").innerHTML = html;
}
showMap();