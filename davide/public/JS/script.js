const CreateTab = () => {
    fetch("/data?" + "cmd=getList")
        .then(response => response.json())
        .then(data => {
            html = '<table>'
            html += '<tr><th>STATUS</th><th colspan="2">TASK</th></tr>';
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                if (element.stato == "to do") html += '<tr><td>' + element.stato + '</td><td>' + element.cosa + '</td><td><button class="bottoni" type="button" onclick="todoFatto(`' + element.cosa + '`)">Done</button></td></tr>';
                else html += '<tr><td>' + element.stato + '</td><td>' + element.cosa + '</td><td></td></tr>';
            }
            html += '</table>'
            document.getElementById("todo-table").innerHTML = html;
        })
        .catch(error => console.log(error));
}

const todoList = () => {
    fetch("/data?" + "cmd=getList")
        .then(response => response.json())
        .then(data => {
            html = '';
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                html += '<option value="' + element.cosa + '">' + element.cosa + '</option>';
            }
            document.getElementById("WhatTaskDelete").innerHTML = html;
            document.getElementById("WhatTaskModify").innerHTML = html;
        })
        .catch(error => console.log(error));
}

document.onloadeddata = RefreshList();

function RefreshList() {
    CreateTab();
    todoList();
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

$(document).ready(function(){

    $("#AddMenu").click(function(){
      $("#aggiunta_task").fadeIn(700)
      $("#pop_task").fadeOut(700)
      $("#modify_task").fadeOut(700)
    });

    $("#nascondiinsert").click(function () {
      $("#aggiunta_task").fadeOut(700)
    });

    $("#PopTask").click(function(){
        $("#pop_task").fadeIn(700)
        $("#aggiunta_task").fadeOut(700)
        $("#modify_task").fadeOut(700)
      });

    $("#none_delete").click(function(){
        $("#pop_task").fadeOut(700)
      });

    $("#ModifyTask").click(function(){
        $("#modify_task").fadeIn(700)
        $("#aggiunta_task").fadeOut(700)
        $("#pop_task").fadeOut(700)
      });

    $("#none_modify").click(function(){
        $("#modify_task").fadeOut(700)
      });
});

const checkInsert = (id) => {
    if (document.getElementById(id).value == "") return false;
    return true;
}

const saveTodo = () => {
    var task = document.getElementById('task').value;
    var status = document.getElementById('status').value;

    console.log(`task: ${task}, Stato: ${status}`);

    if (checkInsert('task') && checkInsert('status')) {
        fetch("/data?" + "cmd=newTodo&cosa=" + task + "&stato=" + status )
            .then(response => {
                if (response.status == 200 && response.statusText == "OK") {
                    window.location.href = '/todo';
                }
            })
            .catch(error => console.log(error));
    }
    else alert("ERRORE: compilare tutti i campi");
}

const deleteTodo = () => {
    var select = document.getElementById("selectCosa");
    var cosa = select.value;
    fetch("/data?" + "cmd=deleteTodo&cosa=" + cosa)
        .then(response => {
            if (response.status == 200 && response.statusText == "OK") {
                window.location.href = '/todo';
            }
        })
        .catch(error => console.log(error));
}