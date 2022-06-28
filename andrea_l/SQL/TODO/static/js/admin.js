const bothList = () => {
    var titolo = "Lista - ";
    titolo += localStorage.username; 
    document.getElementById("titolo").innerHTML = titolo;

    if(localStorage.username == "admin")
        document.getElementById("AdminButton").style.display = "block";
    else
        document.getElementById("AdminButton").style.display = "none";

    document.getElementById('todoList').style.display = "block";
    document.getElementById('doneList').style.display = "block";
    document.getElementById('DoneButton').style.color = "white";
    document.getElementById('DoneButton').style.fontSize = "";
    document.getElementById('TodoButton').style.color = "white";
    document.getElementById('TodoButton').style.fontSize = "";
    document.getElementById('BothButton').style.color = "black";
    document.getElementById('BothButton').style.fontSize = "20px";
    document.getElementById('inserisciTitoloListaDone').style.display = "flex";
    document.getElementById('inserisciTitoloListaTodo').style.display = "flex";
    fetch("/mysql?" + "cmd=getListDone&IdUtente=" + localStorage.Id)
        .then(response => response.json())
        .then(data => {
            html = "";
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                html += "<tr class='tableRow'>";
                html += "<td class='elemento' id='stato'>" + element.cosa + "</td>";
                html += "<td class='elementoButton'>";
                html += "<button class='elimina' id='ButtonElimina' onclick='deleteTodo(`"+ element.cosa +"`)'>ELIMINA</button>";
                html += "</td></tr>";
            }
            document.getElementById("inserisciDone").innerHTML = html;
        })
        .catch(error => console.log(error));

    fetch("/mysql?" + "cmd=getListTodo&IdUtente=" + localStorage.Id)
        .then(response => response.json())
        .then(data => {
            html = "";
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                html += "<tr class='tableRow'>";
                html += "<td class='elemento' id='cosa'>" + element.cosa + "</td>";
                html += "<td class='elementoButton'>";
                html += "<button class='elimina' id='ButtonElimina' onclick='deleteTodo(`"+ element.cosa +"`)'>ELIMINA</button>";
                html += "<button class='fatto' id='ButtonFatto' onclick='todoFatto(`"+ element.cosa +"`, `"+ element.stato +"`)'>FATTO</button></td></tr>";
            }
            html += "</body></table>"
            document.getElementById("inserisciTodo").innerHTML = html;
        })
        .catch(error => console.log(error));
}