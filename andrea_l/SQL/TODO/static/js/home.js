const bothList = () => {
    document.getElementById("InputSearch").value = "";

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
                html += "<td class='elemento' id='data'>" + element.data + "</td>";
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
                html += "<td class='elemento' id='data'>" + element.data + "</td>";
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

/**
 * ELIMINA ACCOUNT
 */

const DeleteUser = () => {
    var IdUtente = sessionStorage.Id;

    fetch("/mysql?" + "cmd=deleteUser&IdUtente=" + IdUtente)
        .then(response => {
            if(response.status == 200 && response.statusText == "OK"){
                if(sessionStorage.Id == IdUtente)
                    chiudiSessione();
                else
                    window.location.href = '/home'; //aggiornamento pagina
            }
        });
}

const DeleteUserShow = () => {
    document.getElementById("confermaP").innerText += sessionStorage.username + " ?";
    document.getElementById("confermaDiv").style.display = "flex";
    document.getElementById("containerElement").style.display = "none";
    document.getElementById
}

const annulla = () => {
    window.location.href = '/home'; //aggiornamento pagina
}

/**
 * CHIUSURA SESSIONE
 */

const chiudiSessione = () => {
    sessionStorage.clear();
    window.location.href = '/'; //aggiornamento pagina
}

const ControlloAccesso = () => {

    if(sessionStorage.access == "si"){
        bothList();
        let today = new Date();
        let mese = today.getMonth() + 1;
        let dateTime = today.getDate() + "/" + mese + "/" + today.getFullYear();       
        document.getElementById("Data").innerHTML = dateTime;
    } 
    else{
        alert("Accesso vietato");
        window.location.href = '/'; //aggiornamento pagina
    }
}

document.onload = ControlloAccesso();

/**
 * FUNZIONE DI RICERCA
 */

const ricerca = () => {
    searchInput = document.getElementById("InputSearch").value;
    console.log(searchInput);

    fetch("/mysql?" + "cmd=searchList&cosa=" + searchInput + "&IdUtente=" + sessionStorage.Id + "&Ruolo=" + sessionStorage.ruolo)
        .then(response => response.json())
        .then(data => {
            var contTodo = 0;
            var contDone = 0;
            var htmlDone = "";
            var htmlTodo = "";
            for(var i = 0; i<data.length; i++){
                element = data[i];
                if(element.stato == "todo"){
                    if(contTodo%2 == 0){
                        htmlTodo += "<tr class='tableRow'  style='background-color: lightgray;'>";
                    }else{
                        htmlTodo += "<tr class='tableRow'>";
                    }

                    htmlTodo += "<td class='elemento' id='stato' name='"+ element.cosa +"'>" + element.cosa + "</td>";
                    htmlTodo += "<td class='elemento' id='data'>" + element.data + "</td>";
                    if(sessionStorage.ruolo == "admin" || sessionStorage.ruolo == "super admin"){
                        htmlTodo += "<td class='autore elemento'>"+ element.Username +"</td>";
                    }
                    contTodo ++;
                    htmlTodo += "<td class='elementoButton'>";
                    htmlTodo += "<button class='elimina' id='ButtonElimina' onclick='deleteTodo(`"+ element.cosa +"`,`"+ element.id +"`)'>ELIMINA</button>";
                    htmlTodo += "<button class='fatto' id='ButtonFatto' onclick='todoFatto(`"+ element.cosa +"`, `"+ element.id +"`)'>FATTO</button></td></tr>";

                }else{
                    if(contDone%2 == 0){
                        htmlDone += "<tr class='tableRow'  style='background-color: lightgray;'>";
                    }else{
                        htmlDone += "<tr class='tableRow'>";
                    }

                    htmlDone += "<td class='elemento' id='stato' name='"+ element.cosa +"'>" + element.cosa + "</td>";
                    htmlDone += "<td class='elemento' id='data'>" + element.data + "</td>";
                    if(sessionStorage.ruolo == "admin" || sessionStorage.ruolo == "super admin"){
                        htmlDone += "<td class='autore elemento'>"+ element.Username +"</td>";
                    }
                    contDone ++;
                    htmlDone += "<td class='elementoButton'>";
                    htmlDone += "<button class='elimina' id='ButtonElimina' onclick='deleteTodo(`"+ element.cosa +"`,`"+ element.id +"`)'>ELIMINA</button>";
                    htmlDone += "</td></tr>";
                }

            }
            document.getElementById("inserisciDone").innerHTML = htmlDone;
            document.getElementById("inserisciTodo").innerHTML = htmlTodo;
    });
}
 