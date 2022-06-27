const todoList = () => {
    document.getElementById('TodoButton').style.color = "black";
    document.getElementById('TodoButton').style.fontSize = "20px";
    document.getElementById('DoneButton').style.color = "white";
    document.getElementById('DoneButton').style.fontSize = "";
    document.getElementById('BothButton').style.color = "white";
    document.getElementById('BothButton').style.fontSize = "";
    fetch("/json?" + "cmd=getListTodo")
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

    fetch("/json?" + "cmd=deleteTodo&cosa=" + elimina)
        .then(response => {
            if(response.status == 200 && response.statusText == "OK"){
                window.location.href = '/home/todo.html'; //aggiornamento pagina
            }
        })
        .catch(error => console.log(error));
}

const todoFatto = (cosa) => {
    console.log('todo fatto')
    fetch("/json?" + "cmd=todoFatto&cosa=" + cosa)
        .then(response => {
            if (response.status == 200 && response.statusText == "OK") {
                window.location.href = '/home/todo.html'; //aggiornamento pagina
            }
        })
        .catch(error => console.log(error));
}


document.onload = todoList();