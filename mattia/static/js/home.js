const todoList = () => {
    fetch("/mysql?" + "cmd=getList")
        .then(response => response.json())
        .then(data => {
            console.log(data)

            if (data.status == 200) {
                html = '<tr class="tr th"><th>ID</th><th>STATO</th><th>COSA</th></tr>';
                for (var i = 0; i < data.response.length; i++) {
                    const element = data.response[i];
                    if (element.stato == "todo") html += '<tr class="tr td"><td class="td">' + element.id + '</td><td class="td">' + element.stato + '</td><td class="td">' + element.cosa + '</td><td class="td10"><button type="button" class="btn btn-outline-success" onclick="todoFatto(`' + element.id + '`)">Fatto</button><button type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#modaleModifica" onclick="apriModale(' + element.id + ', `' + element.cosa + '`)">Modifica</button></td></tr>';
                    else html += '<tr class="tr td"><td class="td">' + element.id + '</td><td class="td">' + element.stato + '</td><td class="td">' + element.cosa + '</td><td class="td10"><button type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#modaleModifica" onclick="apriModale(' + element.id + ', `' + element.cosa + '`)">Modifica</button></td></tr>';
                }
                document.getElementById("todoList").innerHTML = html;
            } else if (data.status == 500) {
                console.log(`ERROR: ${data.error}`);
            }
        })
        .catch(error => console.log(`ERROR: ${error}`));
}

function aggiornaLista() {
    todoList();
}

const apriModale = (id, cosa) => {
    document.getElementById('inputModaleID').value = id;
    document.getElementById("inputModaleCosa").value = cosa;
}

const todoModifica = () => {
    let id = document.getElementById('inputModaleID').value;
    let cosa = document.getElementById('inputModaleCosa').value;
    console.log(`todo modifica ${id}, ${cosa}`);

    fetch(`/mysql?cmd=updateTodo&id=${id}&cosa=${cosa}`)
        .then(response => response.json())
        .then(data => {
            if (data.status == 200) {
                aggiornaLista();
                $('#modaleModifica').modal('hide');
            } else if (data.status == 500) {
                console.log(data.error);
            }
        })
        .catch(error => console.log(error));
}

const todoFatto = (id) => {
    console.log(`todo fatto ${id}`)

    fetch(`/mysql?cmd=todoFatto&id=${id}`)
        .then(response => response.json())
        .then(data => {
            if (data.status == 200) {
                aggiornaLista();
            } else if (data.status == 500) {
                console.log(data.error);
            }
        })
        .catch(error => console.log(error));
}

document.onloadeddata = todoList();