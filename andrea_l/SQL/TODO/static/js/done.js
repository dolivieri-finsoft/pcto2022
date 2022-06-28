const doneList = () => {
    var titolo = "Lista - ";
    titolo += localStorage.username; 
    document.getElementById("titolo").innerHTML = titolo;

    if(localStorage.username == "admin")
        document.getElementById("AdminButton").style.display = "block";
    else
        document.getElementById("AdminButton").style.display = "none";
    
    document.getElementById('TodoButton').style.color = "white";
    document.getElementById('TodoButton').style.fontSize = "";
    document.getElementById('DoneButton').style.color = "black";
    document.getElementById('DoneButton').style.fontSize = "20px";
    document.getElementById('BothButton').style.color = "white";
    document.getElementById('BothButton').style.fontSize = "";
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
}

const deleteTodo = async (elimina) => {

    fetch("/mysql?" + "cmd=deleteTodo&cosa=" + elimina + "&IdUtente=" + localStorage.Id)
        .then(response => {
            if(response.status == 200 && response.statusText == "OK"){
                window.location.href = '/home/done.html'; //aggiornamento pagina
            }
        })
        .catch(error => console.log(error));
}

document.onload = doneList();
