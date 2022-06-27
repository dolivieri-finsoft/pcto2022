const bothList = () => {

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
    alert(IdUser);
    fetch("/mysql?" + "cmd=getListDone&IdUtente" + IdUser)
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

    fetch("/mysql?" + "cmd=getListTodo&IdUtente=" + IdUser)
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

const todoFatto = (cosa) => {
    console.log('todo fatto')
    fetch("/mysql?" + "cmd=todoFatto&cosa=" + cosa)
        .then(response => {
            if (response.status == 200 && response.statusText == "OK") {
                window.location.href = '/home'; //aggiornamento pagina
            }
        })
        .catch(error => console.log(error));
}

const deleteTodo = async (elimina) => {

    fetch("/mysql?" + "cmd=deleteTodo&cosa=" + elimina)
        .then(response => {
            if(response.status == 200 && response.statusText == "OK"){
                window.location.href = '/home'; //aggiornamento pagina
            }
        })
        .catch(error => console.log(error));
}

const log = () => {
    var username = document.getElementById("Username").value;
    var password = document.getElementById("Password").value;

    if(username == "" || password == ""){
        alert("Inserire username e password")
    }else{
        fetch("/mysql?" +  "cmd=loginUser&username=" + username)
            .then(response => response.json())
            .then(data => {
                if(data[0] == undefined){
                    alert("Utente non esistente");
                }else if(password == data[0].Password){
                    salvaIdUtente();
                }else{
                    alert("Password errata");
                }
            });
    }
}

const salvaIdUtente = () =>{
    var username = document.getElementById("Username").value;
    fetch("/mysql?" + "cmd=getIdUtente&username="+ username)
    .then(response => response.json())
    .then(data => {
        IdUser = data[0].IdUtente;
        window.location.href = "home";
    });
}

document.onload = bothList();
