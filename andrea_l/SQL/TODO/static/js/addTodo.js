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
        fetch("/mysql?" + "cmd=newTodo&cosa=" + cosa + "&stato=" + stato )
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
    document.getElementById('AddButton').style.color = "black";
    document.getElementById('AddButton').style.fontSize = "20px";
    document.getElementById('todoList').style.display = "block";
    document.getElementById('doneList').style.display = "block";
    fetch("/mysql?" + "cmd=getListDone")
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

    fetch("/mysql?" + "cmd=getListTodo")
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

const deleteTodo = async (elimina) => {

    fetch("/mysql?" + "cmd=deleteTodo&cosa=" + elimina)
        .then(response => {
            if(response.status == 200 && response.statusText == "OK"){
                window.location.href = '/home/add.html'; //aggiornamento pagina
            }
        })
        .catch(error => console.log(error));
}

document.onload = AddGrafica();