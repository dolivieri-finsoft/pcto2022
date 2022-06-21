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
                    htmlTodo += "<button class='modifica' id='" + element.cosa +"' onclick='modifica(this.id)'><img src='../src/modify.png' class='ImgModify' alt='Modify'></button></td></tr>";
                }
                else{
                    htmlDone += "<tr> <td id="+ element.cosa +">" + element.cosa + "</td>";
                    htmlDone += "<td><button class='elimina' id='"+ element.cosa +"' onclick='deleteTodo(this.id)'>✘</button>";
                    htmlDone += "<button class='modifica' id='" + element.cosa +"' onclick='modifica(this.id)'><img src='../src/modify.png' class='ImgModify' alt='Modify'></button></td></tr>";
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

 function modifica (modifica){
    html = "<label for='Cosa' class='formLabel' >Modifica </label><label for='cosa' class='formLabelModify' id='modifica'>" + modifica + "</label><br>";
    html += "<label class='formLabelModify' for='cosa'> Cosa </label><input class='formInput' type='text' id='cosa' name='cosa' placeholder='Es Spesa....'>";
    html += "<label class='formLabelModify' for='stato'> Stato </label> <select class='formSelect' id='stato' name='stato'><option value='todo'>todo</option><option value='Done'>Done</option></select>";
    html += "<button class='AddButton' type='button' id='addTodo' onclick='modifyTodo();'>Aggiungi</button>";
    document.getElementById("rowModify").innerHTML = html; 
    document.getElementById("rowModify").style.display = "block"; 
}

const modifyTodo = () => {
    var cosa = document.getElementById('cosa').value;
    var select = document.getElementById('stato');
    var stato = select.value;
    var modifica = document.getElementById('modifica').textContent;

    alert("modficare= " + modifica + " nuovo= " + cosa + "stato= " + stato);

    fetch("/json?" + "cmd=modifyTodo&cosa=" + cosa + "&stato=" + stato + "&modifica=" + modificare)
        .then(response => {
            if (response.status == 200 && response.statusText == "OK") {
                window.location.href = '/home'; //aggiornamento pagina 
            }
        })
        .catch(error => console.log(error));
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

document.onloadeddata = todoList();