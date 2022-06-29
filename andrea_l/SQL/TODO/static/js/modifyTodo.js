const todoList = () => {
    var titolo = "Lista - ";
    titolo += localStorage.username; 
    document.getElementById("titolo").innerHTML = titolo;

    if(localStorage.ruolo == "admin" || localStorage.ruolo == "super admin")
        document.getElementById("AdminButton").style.display = "block";
    else
        document.getElementById("AdminButton").style.display = "none";
    
    document.getElementById('ModButton').style.color = "black";
    document.getElementById('ModButton').style.fontSize = "20px";
    fetch("/mysql?" + "cmd=getList&IdUtente=" + localStorage.Id + "&Ruolo=" + localStorage.ruolo)
        .then(response => response.json())
        .then(data => {
            html = "<label for='text' class='formLabelModify'>Cosa vuoi modificare? </label>";
            html += "<select class='formSelect' id='formSelectCosa' name='cosa' onclick='aggiungi()'>";
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                html += "<option value ='"+ element.id +"'>"+ element.cosa +"</option>";
            }
            html += "</select>";
            html += "<input id='labelId'></input>";
            document.getElementById("rowModCosa").innerHTML = html;
        })
        .catch(error => console.log(error));

    document.getElementById('todoList').style.display = "block";
    document.getElementById('doneList').style.display = "block";

    fetch("/mysql?" + "cmd=getListDone&IdUtente=" + localStorage.Id + "&Ruolo=" + localStorage.ruolo)
        .then(response => response.json())
        .then(data => {
            html = "";
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                html += "<tr class='tableRow'>";
                html += "<td class='elemento' id='stato'>" + element.cosa + "</td>";
                if(localStorage.ruolo == "admin" || localStorage.ruolo == "super admin"){
                    html += "<td class='autore elemento'>"+ element.Username +"</td>";
                }
                html += "<td class='elementoButton'>";
                html += "<button class='elimina' id='ButtonElimina' onclick='deleteTodo(`"+ element.cosa +"`,`"+ element.id +"`)'>ELIMINA</button>";
                html += "</td></tr>";
            }
            document.getElementById("inserisciDone").innerHTML = html;
        })
        .catch(error => console.log(error));

    fetch("/mysql?" + "cmd=getListTodo&IdUtente=" + localStorage.Id + "&Ruolo=" + localStorage.ruolo)
        .then(response => response.json())
        .then(data => {
            html = "";
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                html += "<tr class='tableRow'>";
                html += "<td class='elemento' id='cosa'>" + element.cosa + "</td>";
                if(localStorage.ruolo == "admin" || localStorage.ruolo == "super admin"){
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

const aggiungi = () =>{
    IdCosa = document.getElementById("formSelectCosa").value;
    fetch("/mysql?" + "cmd=getSpecificoTodo&IdCosa=" + IdCosa)
        .then(response => response.json())
        .then(data => {
            element = data[0];
            document.getElementById("SelectCosa").value = element.cosa;
        });
}

const modifyTodo = () =>{
    var nuovaCosa = document.getElementById('SelectCosa').value;
    var DaModificare = document.getElementById('formSelectCosa').textContent;
    var stato = document.getElementById('SelectStato').value;
    var IdModifica = documen.getElementById('labelId').value;

    fetch("/mysql?" + "cmd=modifyTodo&cosa=" + nuovaCosa + "&stato=" + stato + "&modificare=" + DaModificare + "&IdUtente=" + localStorage.Id + "&Ruolo=" + localStorage.ruolo + "&IdModifica=" + IdModifica)
        .then(response => {
            if (response.status == 200 && response.statusText == "OK") {
                alert("MODIFICATO");
                window.location.href = '/home/modify.html'; //aggiornamento pagina
            }
        })
}

const modifyTodoClose = () =>{
    window.location.href = '/home';
}

const deleteTodo = async (elimina, IdElimina) => {

    fetch("/mysql?" + "cmd=deleteTodo&cosa=" + elimina + "&IdUtente=" + localStorage.Id + "&IdEliminare=" + IdElimina)
        .then(response => {
            if(response.status == 200 && response.statusText == "OK"){
                window.location.href = '/home/modify.html'; //aggiornamento pagina
            }
        })
        .catch(error => console.log(error));
}

const todoFatto = (cosa, IdSposta) => {
    console.log('todo fatto')
    fetch("/mysql?" + "cmd=todoFatto&cosa=" + cosa + "&IdUtente=" + localStorage.Id + "&Ruolo=" + localStorage.ruolo + "&IdSpostare=" + IdSposta)
        .then(response => {
            if (response.status == 200 && response.statusText == "OK") {
                window.location.href = '/home/modify.html'; //aggiornamento pagina
            }
        })
        .catch(error => console.log(error));
}

document.onload = todoList();

