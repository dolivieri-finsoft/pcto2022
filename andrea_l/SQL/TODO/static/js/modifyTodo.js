const todoList = () => {
    var titolo = "Lista - ";
    titolo += localStorage.username; 
    document.getElementById("titolo").innerHTML = titolo;

    if(localStorage.username == "admin")
        document.getElementById("AdminButton").style.display = "block";
    else
        document.getElementById("AdminButton").style.display = "none";
    
    document.getElementById('ModButton').style.color = "black";
    document.getElementById('ModButton').style.fontSize = "20px";
    fetch("/mysql?" + "cmd=getList&IdUtente=" + localStorage.Id)
        .then(response => response.json())
        .then(data => {
            html = "<label for='text' class='formLabelModify'>Cosa vuoi modificare? </label>";
            html += "<select class='formSelect' id='formSelectCosa' name='cosa' onclick='aggiungi()'>";
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                html += "<option value = '"+ element.cosa +"'>"+ element.cosa +"</oprion>";
            }
            html += "</select>";
            document.getElementById("rowModCosa").innerHTML = html;
        })
        .catch(error => console.log(error));

    document.getElementById('todoList').style.display = "block";
    document.getElementById('doneList').style.display = "block";
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

const aggiungi = () =>{
    document.getElementById('SelectCosa').value = document.getElementById('formSelectCosa').value;
}

const modifyTodo = () =>{
    var nuovaCosa = document.getElementById('SelectCosa').value;
    var DaModificare = document.getElementById('formSelectCosa').value;
    var stato = document.getElementById('SelectStato').value;

    fetch("/mysql?" + "cmd=modifyTodo&cosa=" + nuovaCosa + "&stato=" + stato + "&modificare=" + DaModificare + "&IdUtente=" + localStorage.Id)
        .then(response => {
            if (response.status == 200 && response.statusText == "OK") {
                window.location.href = '/home/modify.html'; //aggiornamento pagina
            }
        })
}

const modifyTodoClose = () =>{
    window.location.href = '/home';
}

const deleteTodo = async (elimina) => {

    fetch("/mysql?" + "cmd=deleteTodo&cosa=" + elimina + "&IdUtente=" + localStorage.Id)
        .then(response => {
            if(response.status == 200 && response.statusText == "OK"){
                window.location.href = '/home/modify.html'; //aggiornamento pagina
            }
        })
        .catch(error => console.log(error));
}

const todoFatto = (cosa) => {
    console.log('todo fatto')
    fetch("/mysql?" + "cmd=todoFatto&cosa=" + cosa + "&IdUtente=" + localStorage.Id)
        .then(response => {
            if (response.status == 200 && response.statusText == "OK") {
                window.location.href = '/home/modify.html'; //aggiornamento pagina
            }
        })
        .catch(error => console.log(error));
}

document.onload = todoList();

