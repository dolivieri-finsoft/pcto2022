const todoList = () => {
    fetch("/json?" + "cmd=getList")
        .then(response => response.json())
        .then(data => {
            html = '<tr class="tr th"><th>STATO</th><th>COSA</th></tr>';
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                if (element.stato == "Todo") html += '<tr class="tr td"><td class="td">' + element.stato + '</td><td class="td">' + element.cosa + '</td><td class="td10"><button type="button" class="btn btn-outline-success" onclick="todoFatto(`' + element.cosa + '`)">Fatto</button><button type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#modaleModifica" onclick="apriModale(`' + element.cosa + '`)">Modifica</button></td></tr>';
                else html += '<tr class="tr td"><td class="td">' + element.stato + '</td><td class="td">' + element.cosa + '</td><td class="td10"><button type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#modaleModifica" onclick="apriModale(`' + element.cosa + '`)">Modifica</button></td></tr>';
            }
            document.getElementById("todoList").innerHTML = html;
        })
        .catch(error => console.log(error));
}

function aggiornaLista() {
    todoList();
}

const apriModale = (cosa) => {
    console.log(`apri modale ${cosa}`);
    document.getElementById("inputModaleCosa").value = cosa;
}

const todoModifica = (cosa) => {
    console.log(`todo modifica ${cosa}`)


}

const todoFatto = (cosa) => {
    console.log(`todo fatto ${cosa}`)

    fetch("/json?" + "cmd=todoFatto&cosa=" + cosa)
        .then(response => {
            if (response.status == 200 && response.statusText == "OK") {
                aggiornaLista();
            }
        })
        .catch(error => console.log(error));
}

document.onloadeddata = todoList();