const todoList = () => {
    fetch("/json?" + "cmd=getList")
        .then(response => response.json())
        .then(data => {
            htmlTodo = "<tr><th id='titolo' colspan='3'>To do</th></tr>";
            htmlDone = "<tr><th id='titolo' colspan='2'>Done</th></tr>";
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                if(element.stato == "todo"){
                    htmlTodo += "<tr> <td class='elemento' id="+ element.cosa +">" + element.cosa + "</td>";
                    htmlTodo += "<td ><button class='elimina' id='"+ element.cosa +"' onclick='deleteTodo(this.id)'>✘</button>";
                    htmlTodo += "<button class='sposta' id='" + element.cosa +"' onclick='todoFatto(this.id)'>✓</button>";
                    htmlTodo += "<button class='modifica' id='" + element.cosa +"' onclick='MostraModifica(this.id)'><img src='../src/modify.png' class='imgModify' alt='Modify'></button></td></tr>";
                }
                else{
                    htmlDone += "<tr> <td id="+ element.cosa +">" + element.cosa + "</td>";
                    htmlDone += "<td><button class='elimina' id='"+ element.cosa +"' onclick='deleteTodo(this.id)'>✘</button>";
                    htmlDone += "<button class='modifica' id='" + element.cosa +"' onclick='MostraModifica(this.id)'><img src='../src/modify.png' class='imgModify' alt='Modify'></button></td></tr>";
                }
            }
            document.getElementById("todoList").innerHTML = htmlTodo;
            document.getElementById("doneList").innerHTML = htmlDone;
        })
        .catch(error => console.log(error));
}

/**
 * MODIFICA
 */

const MostraModifica = (modifica) => {
    containerModify = document.getElementById("containerModify");
    containerModify.style.display = "block";
    document.getElementById("LabelDaModifica").textContent = modifica;
    document.getElementById("SelectCosa").placeholder = "Es " + modifica + ".......";
}

const modifyTodo = () =>{
    var cosa = document.getElementById('SelectCosa').value;
    var DaModificare = document.getElementById('LabelDaModifica').textContent;
    var stato = document.getElementById('SelectStato').value;

    fetch("/json?" + "cmd=modifyTodo&cosa=" + cosa + "&stato=" + stato + "&modificare=" + DaModificare)
        .then(response => {
            if (response.status == 200 && response.statusText == "OK") {
                window.location.href = '/home'; //aggiornamento pagina
            }
        })
}

const modifyTodoClose = () =>{
    containerModify = document.getElementById("containerModify");

    containerModify.style.display = "none";
}


/**
 * SPOSTAMENTO
 */

const todoFatto = (cosa) => {
    console.log('todo fatto')
    fetch("/json?" + "cmd=todoFatto&cosa=" + cosa)
        .then(response => {
            if (response.status == 200 && response.statusText == "OK") {
                window.location.href = '/home'; //aggiornamento pagina
            }
        })
        .catch(error => console.log(error));
}

/**
 * ELIMINAZIONE
 */

const deleteTodo = (elimina) => {
    var select = document.getElementById(elimina);
    var cosa = select.textContent;


    fetch("/json?" + "cmd=deleteTodo&cosa=" + cosa)
        .then(response => {
            if(response.status == 200 && response.statusText == "OK"){
                window.location.href = '/home'; //aggiornamento pagina
            }
        })
        .catch(error => console.log(error));
}

/** 
 * AGGIUNTA
*/

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
        fetch("/json?" + "cmd=newTodo&cosa=" + cosa + "&stato=" + stato)
            .then(response => {
                if (response.status == 200 && response.statusText == "OK") {
                    window.location.href = '/home'; //aggiornamento pagina 
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
    rowAdd = document.getElementById("rowAdd");
    rowAdd.style.display = "none";
    rowAggiorna = document.getElementById("rowAggiorna");
    rowAggiorna.style.display = "block";
}

document.onloadeddata = todoList();