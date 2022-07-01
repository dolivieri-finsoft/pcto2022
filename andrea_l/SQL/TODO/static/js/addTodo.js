const checkInsert = (id) => {
    if (document.getElementById(id).value == "") {
        return false;
    }else{
        return true
    }
}

const saveTodo = () => {
    var cosa = document.getElementById('cosa').value;
    var stato = document.getElementById('stato').value;
    console.log(`Cosa: ${cosa}, Stato: ${stato}`);

    if (checkInsert('cosa') && checkInsert('stato')) {
        fetch("/mysql?" + "cmd=newTodo&cosa=" + cosa + "&stato=" + stato + "&IdUtente=" + sessionStorage.Id + "&username=" + sessionStorage.username + "&Ruolo=" + sessionStorage.ruolo)
            .then(response => {
                if (response.status == 200 && response.statusText == "OK") {
                    window.location.href = '/home/add.html'
                }
            })
            .catch(error => console.log(error));
    }
    else alert("Inserire tutti i campi prima di confermare");
}

const showAdd = () => {
    rowAdd = document.getElementById("rowAdd");
    rowAdd.style.display = "block";
    rowAggiorna = document.getElementById("rowAggiorna");
    rowAggiorna.style.display = "none";
}

const ADDTodoClose = () =>{
    window.location.href = '/home';
}

const AddGrafica = () => {
    var titolo = "Lista - ";
    titolo += sessionStorage.username; 
    document.getElementById("titolo").innerHTML = titolo;

    if(sessionStorage.ruolo == "admin" || sessionStorage.ruolo == "super admin")
        document.getElementById("AdminButton").style.display = "block";
    else
        document.getElementById("AdminButton").style.display = "none";
    
    document.getElementById('AddButton').style.color = "black";
    document.getElementById('AddButton').style.fontSize = "20px";
    document.getElementById('todoList').style.display = "block";
    document.getElementById('doneList').style.display = "block";

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
                html += "<td class='elemento' id='stato'>" + element.cosa + "</td>";
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

const deleteTodo = async (elimina, IdElimina) => {

    fetch("/mysql?" + "cmd=deleteTodo&cosa=" + elimina + "&IdUtente=" + sessionStorage.Id + "&Ruolo=" + sessionStorage.ruolo + "&IdEliminare=" + IdElimina)
        .then(response => {
            if(response.status == 200 && response.statusText == "OK"){
                window.location.href = '/home/add.html'; //aggiornamento pagina
            }
        })
        .catch(error => console.log(error));
}

const todoFatto = (cosa, IdSposta) => {
    console.log('todo fatto')
    fetch("/mysql?" + "cmd=todoFatto&cosa=" + cosa + "&IdUtente=" + sessionStorage.Id + "&Ruolo=" + sessionStorage.ruolo + "&IdSpostare=" + IdSposta)
        .then(response => {
            if (response.status == 200 && response.statusText == "OK") {
                window.location.href = '/home/add.html'; //aggiornamento pagina
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
        AddGrafica();
    else{
        alert("Accesso vietato");
        window.location.href = '/'; //aggiornamento pagina
    }
}

document.onload = ControlloAccesso();