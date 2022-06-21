const todoList = () => {
    fetch("/json?" + "cmd=getList")
        .then(response => response.json())
        .then(data => {
            html = '<tr class="tr th"><th>STATO</th><th>COSA</th></tr>';
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                if (element.stato == "Todo") html += '<tr class="tr td"><td class="td">' + element.stato + '</td><td class="td">' + element.cosa + '</td><td class="td10"><button type="button" class="btn btn-outline-warning" onclick="todoFatto(`' + element.cosa + '`)">Fatto</button></td></tr>';
                else html += '<tr class="tr td"><td class="td">' + element.stato + '</td><td class="td">' + element.cosa + '</td><td class="td10"></td></tr>';
            }
            document.getElementById("todoList").innerHTML = html;
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

document.onloadeddata = todoList();