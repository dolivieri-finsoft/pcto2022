const todoList = () => {
    fetch("/json?" + "cmd=getList")
        .then(response => response.json())
        .then(data => {
            htmlTodo = "<tr><th id='titolo' colspan='3'>To do</th></tr>";
            htmlDone = "<tr><th id='titolo' colspan='2'>Done</th></tr>";
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                if(element.stato == "todo"){
                    htmlTodo += "<tr> <td id="+ element.cosa +">" + element.cosa + "</td>";
                    htmlTodo += "<td><button class='elimina' id='"+ element.cosa +"' onclick='deleteTodo(this.id)'>✘</button></td></tr>";
                    htmlTodo += ""
                }
                else{
                    htmlDone += "<tr> <td id="+ element.cosa +">" + element.cosa + "</td>";
                    htmlDone += "<td><button class='elimina' id='"+ element.cosa +"' onclick='deleteTodo(this.id)'>✘</button></td></tr>";
                }
            }
            document.getElementById("todoList").innerHTML = htmlTodo;
            document.getElementById("doneList").innerHTML = htmlDone;
        })
        .catch(error => console.log(error));
}

function aggiornaLista () {
    todoList();
}

const todoFatto = (cosa) => {
    console.log('todo fatto')
    fetch("/json?" + "cmd=todoFatto&cosa=" + cosa)
        .then(response => {
            if (response.status == 200 && response.statusText == "OK") {
                aggiornaLista();
            }
        })
        .catch(error => console.log(error));
}

const deleteTodo = (elimina) => {
    var select = document.getElementById(elimina);
    var cosa = select.textContent;


    fetch("/json?" + "cmd=deleteTodo&cosa=" + cosa)
        .then(response => {
            if(response.status == 200 && response.statusText == "OK"){
                window.location.href = '/home';
            }
        })
        .catch(error => console.log(error));
}

document.onloadeddata = todoList();