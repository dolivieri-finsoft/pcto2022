const bothList = () => {
    var titolo = "Lista - ";
    titolo += sessionStorage.username; 
    document.getElementById("titolo").innerHTML = titolo;

    if(sessionStorage.ruolo == "admin" || sessionStorage.ruolo == "super admin")
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
    
    var stato = "Done";

    fetch("/mysql?" + "cmd=getList&IdUtente=" + sessionStorage.Id + "&Ruolo=" + sessionStorage.ruolo + "&stato=" + stato)
        .then(response => response.json())
        .then(data => {
            html = "";
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                if(i%2 == 0){
                    html += "<tr class='tableRow'  style='background-color: lightgray;'>";
                }else{
                    html += "<tr class='tableRow'>";
                }
                html += "<td class='elemento' id='stato' name='"+ element.cosa +"'>" + element.cosa + "</td>";
                if(sessionStorage.ruolo == "admin" || sessionStorage.ruolo == "super admin"){
                    html += "<td class='autore elemento'>"+ element.Username +"</td>";
                }
                html += "<td class='elementoButton'>";
                html += "<button class='elimina' id='ButtonElimina' onclick='deleteTodo(`"+ element.cosa +"`,`"+ element.id +"`)'>ELIMINA</button>";
                html += "</td></tr>";
            }
            document.getElementById("inserisciDone").innerHTML = html;
        })
        .catch(error => console.log(error));

    var stato = "todo";

    fetch("/mysql?" + "cmd=getList&IdUtente=" + sessionStorage.Id + "&Ruolo=" + sessionStorage.ruolo + "&stato=" + stato)
        .then(response => response.json())
        .then(data => {
            html = "";
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                if(i%2 == 0){
                    html += "<tr class='tableRow'  style='background-color: lightgray;'>";
                }else{
                    html += "<tr class='tableRow'>";
                }
                html += "<td class='elemento' id='cosa'>" + element.cosa + "</td>";
                if(sessionStorage.ruolo == "admin" || sessionStorage.ruolo == "super admin"){
                    html += "<td class='autore elemento'>"+ element.Username +"</td>";
                }
                html += "<td class='elementoButton'>";
                html += "<button class='elimina' id='ButtonElimina' onclick='deleteTodo(`"+ element.cosa +"`,`"+ element.id +"`)'>ELIMINA</button>";
                html += "<button class='fatto' id='ButtonFatto' onclick='todoFatto(`"+ element.cosa +"`, `"+ element.id +"`)'>FATTO</button></td></tr>";
            }
            html += "</body></table>"
            document.getElementById("inserisciTodo").innerHTML = html;
        })
        .catch(error => console.log(error));
}

const todoFatto = (cosa, IdSposta) => {
    console.log('todo fatto')
    fetch("/mysql?" + "cmd=todoFatto&cosa=" + cosa + "&IdUtente=" + sessionStorage.Id + "&Ruolo=" + sessionStorage.ruolo + "&IdSpostare=" + IdSposta)
        .then(response => {
            if (response.status == 200 && response.statusText == "OK") {
                window.location.href = '/home'; //aggiornamento pagina
            }
        })
        .catch(error => console.log(error));
}

const deleteTodo = (elimina, IdElimina) => {

    fetch("/mysql?" + "cmd=deleteTodo&cosa=" + elimina + "&IdUtente=" + sessionStorage.Id + "&Ruolo=" + sessionStorage.ruolo + "&IdEliminare=" + IdElimina)
        .then(response => {
            if(response.status == 200 && response.statusText == "OK"){
                window.location.href = '/home'; //aggiornamento pagina
            }
        })
        .catch(error => console.log(error));
}

const chiudiSessione = () => {
    sessionStorage.clear();
    window.location.href = '/'; //aggiornamento pagina
}

const ControlloAccesso = () => {

    if(sessionStorage.access == "si")
        bothList();
    else{
        alert("Accesso vietato");
        window.location.href = '/'; //aggiornamento pagina
    }
}

document.onload = ControlloAccesso();
