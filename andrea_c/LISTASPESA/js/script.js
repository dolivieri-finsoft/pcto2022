const todoList = () => {
    fetch("/json?" + "cmd=getList")
        .then(response => response.json())
        .then(data => {
            if (window.location.href == "http://localhost:3000/fatte") {
                html = '<tr><th>QUEST COMPLETATE</th><th>DELETE QUEST</th></tr>';
            }
            else if (window.location.href == "http://localhost:3000/dafare") {
                html = '<tr><th>QUEST IN CORSO</th><th>CHANGE STATUS</th><th>DELETE QUEST</th></tr>';
            }
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                var id= element.cosa;
                if (element.stato == "done" && window.location.href == "http://localhost:3000/fatte") {
                    html += '<tr><td>' + element.cosa + '</td><td><button type="button" class="btn btn-outline-danger" id="' + id + '" onclick="deleteTodo(`' + element.cosa + '`)";">Delete</button></td></tr>';
                }
                else if (element.stato == "todo" && window.location.href == "http://localhost:3000/dafare") {
                    html += '<tr><td>' + element.cosa + '</td><td><button type="button" class="btn btn-outline-success" onclick="changeStatus(`' + element.cosa + '`)">Done</button></td><td><button type="button" class="btn btn-outline-danger" id="' + id + '" onclick="deleteTodo(`' + element.cosa + '`)";">Delete</button></td></tr>';
                }

            }
            document.getElementById("todoList").innerHTML = html;
        })
        .catch(error => console.log(error));
}





function aggiornaLista () {
    todoList();
    console.log('aggiornata');
}

const changeStatus = (cosa) => {
    fetch("/json?" + "cmd=changeStatus&cosa=" + cosa)
        .then(response => {
            if (response.status == 200 && response.statusText == "OK") {
                aggiornaLista();
                console.log('cesono');
            }
        })
        .catch(error => console.log(error));
}





const add = () => {
    var cosa = document.getElementById('chore').value;
    var stato = 'todo';
    console.log(`Cosa: ${cosa}, Stato: ${stato}`);

    if (cosa=="")
    {
        alert("ERRORE: compilare correttamente");
    } 
    else
    {
        fetch("/json?" + "cmd=newchore&cosa=" + cosa + "&stato=" + stato)
            .then(response => {
                if (response.status == 200 && response.statusText == "OK") {
                    console.log('added');
                    // window.location.href='/dafare';
                }
                else
                {
                    console.log('error');
                }
                   aggiornaLista();
            })
    }
}

const deleteTodo = (cosa) => {
    // var cosa = document.getElementById(cosa);
    fetch("/json?" + "cmd=deleteTodo&cosa=" + cosa)
        .then(response => {
            if (response.status == 200 && response.statusText == "OK") {
                aggiornaLista();
                
            }
        })
        .catch(error => console.log(error));
}


document.onloadeddata = todoList();