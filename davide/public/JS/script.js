const CreateTab = () => {
    fetch("/data?" + "cmd=getList")
        .then(response => response.json())
        .then(data => {
            html = '<table>'
            html += '<tr><th>STATUS</th><th colspan="2">TASK</th></tr>';
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                if (element.stato == "to do") html += '<tr><td>' + element.stato + '</td><td>' + element.cosa + '</td><td><button class="bottoni" type="button" onclick="todoFatto('+ element.cosa +')">Fatto</button></td></tr>';
                else html += '<tr><td>' + element.stato + '</td><td>' + element.cosa + '</td><td></td></tr>';
            }
            html += '</table>'
            document.getElementById("todo-table").innerHTML = html;
        })
        .catch(error => console.log(error));
}

document.onloadeddata = CreateTab();

function RefreshList() {
    CreateTab();
}

const todoFatto = (cosa) => {
    console.log('todo fatto')
    fetch("/data?" + "cmd=todoFatto&cosa=" + cosa)
        .then(response => {
            if (response.status == 200 && response.statusText == "OK") {
                RefreshList();
            }
        })
        .catch(error => console.log(error));
}