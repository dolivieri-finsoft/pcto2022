const todoList = () => {
    fetch("/json?" + "cmd=getList")
        .then(response => response.json())
        .then(data => {
            if (data.length == 0) {
                html = '<select id="selectCosa" class="formSelect" name="cosa" disabled>';
                html += '<option>No data</option>';
                html += '</select>';
                document.getElementById("selectContent").innerHTML = html;
                document.getElementById("btnElimina").disabled = true;
            } else {
                html = '<select id="selectCosa" class="formSelect" name="cosa">';
                for (var i = 0; i < data.length; i++) {
                    const element = data[i];
                    html += '<option value="' + element.cosa + '">' + element.cosa + '</option>';
                }
                html += '</select>';
                document.getElementById("selectContent").innerHTML = html;
            }
        })
        .catch(error => console.log(error));
}

const aggiornaLista = () => {
    todoList();
}

const deleteTodo = () => {
    var select = document.getElementById("selectCosa");
    var cosa = select.value;
    fetch("/json?" + "cmd=deleteTodo&cosa=" + cosa)
        .then(response => {
            if (response.status == 200 && response.statusText == "OK") {
                window.location.href = '/todo';
            }
        })
        .catch(error => console.log(error));
}

document.onloadeddata = todoList();