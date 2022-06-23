const todoList = () => {
    fetch("/json?" + "cmd=getList")
        .then(response => response.json())
        .then(data => {
            htmlTodo = "<tr><th id='titolo' colspan='3'>To do</th></tr>";
            htmlDone = "<tr><th id='titolo' colspan='2'>Done</th></tr>";
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                if(element.stato == "todo"){
                    htmlTodo += "<tr> <td class='elemento' id='cosa'>" + element.cosa + "</td>";
                    htmlTodo += "<td ><button class='elimina' id='ButtonElimina' onclick='deleteTodo(`"+ element.cosa +"`)'>✘</button>";
                    htmlTodo += "<button class='sposta' id='ButtonFatto' onclick='todoFatto(`"+ element.cosa +"`)'>✓</button>";
                    htmlTodo += "<button class='modifica' id='ButtonMostraModifica' onclick='MostraModifica(`"+ element.cosa +"`)'><img src='../src/modify.png' class='imgModify' alt='Modify'></button>";
                   // htmlTodo += "<button class='sposta' id='ButtonFatto' onclick='Controllo()'><img src='../src/check.jpg' class='imgCheck' alt='Modify'></button>"; // Pulsante per il controllo
                    htmlTodo += "</td></tr>";
                }
                else{
                    htmlDone += "<tr> <td id="+ element.cosa +">" + element.cosa + "</td>";
                    htmlDone += "<td><button class='elimina' id='ButtonElimina' onclick='deleteTodo(`"+ element.cosa +"`)'>✘</button>";
                    htmlDone += "<button class='modifica' id='ButtonMostraModifica' onclick='MostraModifica(`"+ element.cosa +"`)'><img src='../src/modify.png' class='imgModify' alt='Modify'></button>";
                 //   htmlDone += "<button class='sposta' id='ButtonFatto' onclick='Controllo()'><img src='../src/check.jpg' class='imgCheck' alt='Modify'></button>";
                    htmlDone += "</td></tr>"
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
    document.getElementById("SelectCosa").value = modifica;
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

    fetch("/json?" + "cmd=deleteTodo&cosa=" + elimina)
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

/**
 * CONTROLLO
 */
/*
const Controllo = () => {
    var cosa = document.getElementById('cosa').value;
    var stato = document.getElementById('stato').value;
    alert(`Cosa: ${cosa}, Stato: ${stato}`);
    fetch("/Json?" + "cmd=Controllo&cosa=" + cosa + "&stato" + stato)
        .then(response => {
            if (response.status == 200 && response.statusText == "OK") {
                window.location.href = '/home'; //aggiornamento pagina 
            }
        })
        .catch(error => console.log(error));
}
*/
document.onloadeddata = todoList();