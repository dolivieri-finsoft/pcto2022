const todoList = () => {
    let idaccesso = localStorage.getItem('IDaccesso');
    let control = localStorage.getItem('controllo');
    let role = localStorage.getItem('ruolo');
    if (control == "no") {
        alert('Loggati bastardo');
        window.location.href = '/';
    }
    else {
        if (role == 'admin'||role == 'creator') {
            admin = document.getElementById("adminSpace");
            admin.style.display = "block";
        }
        fetch("/json?" + "cmd=getList&tabella=" + idaccesso)
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
                    var id = element.cosa;
                    if (element.stato == "done" && window.location.href == "http://localhost:3000/fatte") {
                        html += '<tr><td>' + element.cosa + '</td><td><button type="button" class="btn btn-outline-danger" id="' + id + '" onclick="deleteTodo(`' + element.id + '`)";">Delete</button></td></tr>';
                    }
                    else if (element.stato == "todo" && window.location.href == "http://localhost:3000/dafare") {
                        html += '<tr><td>' + element.cosa + '</td><td><button type="button" class="btn btn-outline-success" onclick="changeStatus(`' + element.id + '`)">Done</button></td><td><button type="button" class="btn btn-outline-danger" id="' + id + '" onclick="deleteTodo(`' + element.id + '`)";">Delete</button></td></tr>';
                    }

                }
                document.getElementById("todoList").innerHTML = html;
            })
            .catch(error => console.log(error));
    }
}





function aggiornaLista() {
    todoList();
    console.log('aggiornata');
    let idaccesso = localStorage.getItem('IDaccesso');
    console.log(idaccesso);
}

const changeStatus = (id) => {
    let idaccesso = localStorage.getItem('IDaccesso');
    let control = localStorage.getItem('controllo');
    let role = localStorage.getItem('ruolo');
    fetch("/json?" + "cmd=changeStatus&id=" + id + "&tabella=" + idaccesso)
        .then(response => {
            if (response.status == 200 && response.statusText == "OK") {
                aggiornaLista();
                console.log('cesono');
            }
        })
        .catch(error => console.log(error));
}





const add = () => {
    let idaccesso = localStorage.getItem('IDaccesso');
    let control = localStorage.getItem('controllo');
    let role = localStorage.getItem('ruolo');
    var cosa = document.getElementById('chore').value;
    var stato = 'todo';
    console.log(`Cosa: ${cosa}, Stato: ${stato}`);

    if (cosa == "") {
        alert("ERRORE: compilare correttamente");
    }
    else {
        fetch("/json?" + "cmd=newchore&cosa=" + cosa + "&stato=" + stato + "&tabella=" + idaccesso)
            .then(response => {
                if (response.status == 200 && response.statusText == "OK") {
                    console.log('added');
                    // window.location.href='/dafare';
                }
                else {
                    console.log('error');
                }
                aggiornaLista();
            })
    }
}

const deleteTodo = (id) => {
    let idaccesso = localStorage.getItem('IDaccesso');
    let control = localStorage.getItem('controllo');
    let role = localStorage.getItem('ruolo');
    fetch("/json?" + "cmd=deleteTodo&id=" + id + "&tabella=" + idaccesso)
        .then(response => {
            if (response.status == 200 && response.statusText == "OK") {
                aggiornaLista();

            }
        })
        .catch(error => console.log(error));
}


document.onloadeddata = todoList();

