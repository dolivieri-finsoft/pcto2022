const doneList = () => {
    var titolo = "Lista - ";
    titolo += sessionStorage.username; 
    document.getElementById("titolo").innerHTML = titolo;

    if(sessionStorage.ruolo == "admin" || sessionStorage.ruolo == "super admin")
        document.getElementById("AdminButton").style.display = "block";
    else
        document.getElementById("AdminButton").style.display = "none";
    
    document.getElementById('TodoButton').style.color = "white";
    document.getElementById('TodoButton').style.fontSize = "";
    document.getElementById('DoneButton').style.color = "black";
    document.getElementById('DoneButton').style.fontSize = "20px";
    document.getElementById('BothButton').style.color = "white";
    document.getElementById('BothButton').style.fontSize = "";

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
}

const deleteTodo =  (elimina, IdElimina) => {

    fetch("/mysql?" + "cmd=deleteTodo&cosa=" + elimina + "&IdUtente=" + sessionStorage.Id + "&Ruolo=" + sessionStorage.ruolo + "&IdEliminare=" + IdElimina)
        .then(response => {
            if(response.status == 200 && response.statusText == "OK"){
                window.location.href = '/home/done.html'; //aggiornamento pagina
            }
        })
        .catch(error => console.log(error));
}


const chiudiSessione = () => {
    sessionStorage.clear();
    window.location.href = '/'; //aggiornamento pagina
}

const ControlloAccesso = () => {

    if(sessionStorage.access == "si"){
        doneList();
        let today = new Date();
        let dateTime = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear();
        document.getElementById("Data").innerHTML = dateTime;
    }

    else{
        alert("Accesso vietato");
        window.location.href = '/'; //aggiornamento pagina
    }
}

document.onload = ControlloAccesso();
