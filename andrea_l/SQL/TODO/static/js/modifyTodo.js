const todoList = () => {
    var titolo = "Lista - ";
    titolo += sessionStorage.username; 
    document.getElementById("titolo").innerHTML = titolo;

    if(sessionStorage.ruolo == "admin" || sessionStorage.ruolo == "super admin")
        document.getElementById("AdminButton").style.display = "block";
    else
        document.getElementById("AdminButton").style.display = "none";
    
    document.getElementById('ModButton').style.color = "black";
    document.getElementById('ModButton').style.fontSize = "20px";

    if(sessionStorage.ruolo == "utente"){
        fetch("/mysql?" + "cmd=getList&IdUtente=" + sessionStorage.Id + "&Ruolo=" + sessionStorage.ruolo)
        .then(response => response.json())
        .then(data => {
            html = "<label for='text' class='formLabelModify'>Cosa vuoi modificare? </label>";
            html += "<select class='formSelect' id='formSelectCosa' name='cosa' onclick='aggiungi()'>";
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                html += "<option value ='"+ element.id +"'>"+ element.cosa +"</option>";
            }
            html += "</select>";
            html += "<input id='labelId' style='display: none;'></input>";
            document.getElementById("rowModCosa").innerHTML = html;
        })
        .catch(error => console.log(error));
    }else{
        getListAdmin();
    }

    document.getElementById('todoList').style.display = "block";
    document.getElementById('doneList').style.display = "block";

    getList();
}

const getListAdmin = () => {

    fetch("/mysql?" + "cmd=getListUser")
        .then(response => response.json())
        .then(data => {
            html = "<label for='text' class='formLabelModify'>Cosa vuoi modificare? </label>";
            html += "<select class='formSelect' id='formSelectCosa' name='cosa' onclick='aggiungi()'>";
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                html += "<optgroup value="+ element.Nome_utente +" id='"+ element.Nome_utente +"'label='"+ element.Nome_utente +"'>";
                optionList(element.Nome_utente);
                html += "</optgroup>";
            }
            html += "</select>";
            html += "<input id='labelId' style='display: none;'></input>";
            document.getElementById("rowModCosa").innerHTML = html;
        });
}

const optionList = (username) => {
    fetch("/mysql?" + "cmd=getList&Ruolo=" + sessionStorage.ruolo)
        .then(response => response.json())
        .then(data => {
            html1 = "";
            for(var i = 0; i<data.length; i++){
                const element = data[i];
                if(element.Username == username)
                    html1 += "<option value ='"+ element.id +"'>"+ element.cosa +"</option>";
            }
            document.getElementById(username).innerHTML = html1;
        })
}

const getList = () => {
    fetch("/mysql?" + "cmd=getListDone&IdUtente=" + sessionStorage.Id + "&Ruolo=" + sessionStorage.ruolo)
    .then(response => response.json())
    .then(data => {
        html = "";
        for (var i = 0; i < data.length; i++) {
            const element = data[i];
            if(i%2 == 0){
                html += "<tr class='tableRow'  style='background-color: #F7F7F7;'>";
                html += "<td class='elemento' id='stato'>" + element.cosa + "</td>";
                if(sessionStorage.ruolo == "admin" || sessionStorage.ruolo == "super admin"){
                    html += "<td class='autore elemento'>"+ element.Username +"</td>";
                }
                html += "<td class='elementoButton'>";
                html += "<button class='elimina' id='ButtonElimina' onclick='deleteTodo(`"+ element.cosa +"`,`"+ element.id +"`)'>ELIMINA</button>";
                html += "</td></tr>";
            }else{
                html += "<tr class='tableRow'>";
                html += "<td class='elemento' id='stato'>" + element.cosa + "</td>";
                if(sessionStorage.ruolo == "admin" || sessionStorage.ruolo == "super admin"){
                    html += "<td class='autore elemento'>"+ element.Username +"</td>";
                }
                html += "<td class='elementoButton'>";
                html += "<button class='elimina' id='ButtonElimina' onclick='deleteTodo(`"+ element.cosa +"`,`"+ element.id +"`)'>ELIMINA</button>";
                html += "</td></tr>";
            }     
        }
        document.getElementById("inserisciDone").innerHTML = html;
    })
    .catch(error => console.log(error));

    fetch("/mysql?" + "cmd=getListTodo&IdUtente=" + sessionStorage.Id + "&Ruolo=" + sessionStorage.ruolo)
    .then(response => response.json())
    .then(data => {
        html = "";
        for (var i = 0; i < data.length; i++) {
            const element = data[i];
            if(i%2 == 0){
                html += "<tr class='tableRow' style='background-color: #F7F7F7;'>";
                html += "<td class='elemento' id='cosa'>" + element.cosa + "</td>";
                if(sessionStorage.ruolo == "admin" || sessionStorage.ruolo == "super admin"){
                    html += "<td class='autore elemento'>"+ element.Username +"</td>";
                }
                html += "<td class='elementoButton'>";
                html += "<button class='elimina' id='ButtonElimina' onclick='deleteTodo(`"+ element.cosa +"`,`"+ element.id +"`)'>ELIMINA</button>";
                html += "<button class='fatto' id='ButtonFatto' onclick='todoFatto(`"+ element.cosa +"`, `"+ element.id +"`)'>FATTO</button></td></tr>";
            }else{
                html += "<tr class='tableRow'>";
                html += "<td class='elemento' id='cosa'>" + element.cosa + "</td>";
                if(sessionStorage.ruolo == "admin" || sessionStorage.ruolo == "super admin"){
                    html += "<td class='autore elemento'>"+ element.Username +"</td>";
                }
                html += "<td class='elementoButton'>";
                html += "<button class='elimina' id='ButtonElimina' onclick='deleteTodo(`"+ element.cosa +"`,`"+ element.id +"`)'>ELIMINA</button>";
                html += "<button class='fatto' id='ButtonFatto' onclick='todoFatto(`"+ element.cosa +"`, `"+ element.id +"`)'>FATTO</button></td></tr>";
            }
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
            document.getElementById("labelId").value = IdCosa;
            document.getElementById("SelectStato").value = element.stato;
        });
}

const modifyTodo = () =>{
    var nuovaCosa = document.getElementById('SelectCosa').value;
    var DaModificare = document.getElementById('formSelectCosa').value;
    var stato = document.getElementById('SelectStato').value;
    var IdModifica = document.getElementById("labelId").value

    fetch("/mysql?" + "cmd=modifyTodo&cosa=" + nuovaCosa + "&stato=" + stato + "&modificare=" + DaModificare + "&IdUtente=" + sessionStorage.Id + "&Ruolo=" + sessionStorage.ruolo + "&IdModifica=" + IdModifica)
        .then(response => {
            if (response.status == 200 && response.statusText == "OK") {
                window.location.href = '/home/modify.html'; //aggiornamento pagina
            }
        })
}

const modifyTodoClose = () =>{
    window.location.href = '/home';
}

const deleteTodo = async (elimina, IdElimina) => {

    fetch("/mysql?" + "cmd=deleteTodo&cosa=" + elimina + "&IdUtente=" + sessionStorage.Id + "&IdEliminare=" + IdElimina)
        .then(response => {
            if(response.status == 200 && response.statusText == "OK"){
                window.location.href = '/home/modify.html'; //aggiornamento pagina
            }
        })
        .catch(error => console.log(error));
}

const todoFatto = (cosa, IdSposta) => {
    console.log('todo fatto')
    fetch("/mysql?" + "cmd=todoFatto&cosa=" + cosa + "&IdUtente=" + sessionStorage.Id + "&Ruolo=" + sessionStorage.ruolo + "&IdSpostare=" + IdSposta)
        .then(response => {
            if (response.status == 200 && response.statusText == "OK") {
                window.location.href = '/home/modify.html'; //aggiornamento pagina
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
    todoList();
    else{
        alert("Accesso vietato");
        window.location.href = '/'; //aggiornamento pagina
    }
}

document.onload = ControlloAccesso();

