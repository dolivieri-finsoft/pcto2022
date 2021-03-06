const todoList = () => {
    fetch("/mysql?" + "cmd=getList")
        .then(response => response.json())
        .then(data => {
            if (data.status == 200 && data.response == 0) {
                html = '<select id="selectCosa" class="formSelect" name="cosa" disabled>';
                html += '<option>No data</option>';
                html += '</select>';
                document.getElementById("selectContent").innerHTML = html;
                document.getElementById("btnElimina").disabled = true;
            } else {
                html = '<select id="selectCosa" class="formSelect" name="cosa">';
                for (var i = 0; i < data.response.length; i++) {
                    const element = data.response[i];
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

    fetch("/mysql?" + "cmd=deleteTodo&cosa=" + cosa)
        .then(response => response.json())
        .then(data => {
            if (data.status == 200) {
                window.location.href = '/home';
            }else if (data.status == 500){
                alert(data.error);
            }
        })
        .catch(error => console.log(error));
}

document.onloadeddata = todoList();