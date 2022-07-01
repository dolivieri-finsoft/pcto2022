function fun_link() {
    if(localStorage.role == 'admin'){
        document.getElementById('userManagerli').style.display = 'block'
    }
    console.log(localStorage.user);
}

const UserList = () => {
    fetch("/data?" + "cmd=getUser")
        .then(response => response.json())
        .then(data => {
            html = '';
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                html += '<option value="' + element.username + '">' + element.username + '</option>';
            }
            document.getElementById("WhatUserDelete").innerHTML = html;
            document.getElementById("WhatUserModify").innerHTML = html;
        })
        .catch(error => console.log(error));
}

function fun_tab_user() {
    fetch("/data?" + "cmd=getUser")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            html = '<table>'
            html += '<tr><th>USERNAME</th><th>ROLE</th></tr>';
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                if (element.role == "admin") html += '<tr><td>' + element.username + '</td><td>' + element.role + '</td></tr>';
            }
            for (var i = 0; i < data.length; i++){
                const element = data[i];
                if(element.role == "user") html += '<tr><td>' + element.username + '</td><td>' + element.role + '</td></tr>';
            }
            html += '</table>'
            document.getElementById("tabellauser").innerHTML = html;
        })
        .catch(error => console.log(error));
    
}

const checkInsert = (id) => {
    if (document.getElementById(id).value == "") return false;
    return true;
}
    
document.onload = fun_link();

$(document).ready(function(){

    $("#AddUser").click(function(){
      $("#aggiunta_user").fadeIn(700)
      $("#pop_user").fadeOut(700)
      $("#modify_user").fadeOut(700)
    });

    $("#nascondiinuser").click(function () {
      $("#aggiunta_user").fadeOut(700)
    });

    $("#PopUser").click(function(){
        $("#pop_user").fadeIn(700)
        $("#aggiunta_user").fadeOut(700)
        $("#modify_user").fadeOut(700)
      });

    $("#none_delete_user").click(function(){
        $("#pop_user").fadeOut(700)
    });

    $("#ModifyUser").click(function(){
        $("#modify_user").fadeIn(700)
        $("#aggiunta_user").fadeOut(700)
        $("#pop_user").fadeOut(700)
    });

    $("#none_modify_user").click(function(){
        $("#modify_user").fadeOut(700)
    });
}); //animazione dei menu

const newUser = () => {
    let user = document.getElementById("add_user").value
    let password = document.getElementById("add_password").value
    let role = document.getElementById("role_In").value

    console.log(`user: ${user}, password: ${password}, role ${role}`);

    if (checkInsert('add_user') && checkInsert('add_password') && checkInsert('role_In')) {
        fetch("/data?" + "cmd=add_user&user=" + user + "&password=" + password + "&role=" + role)
            .then(response => {
                if (response.status == 200 && response.statusText == "OK") {
                    console.log('eseguito correttamente');
                    window.location.reload();
                }
            })
            .catch(error => console.log(error));
            
    }
    else alert("ERRORE: compilare tutti i campi");
}

const deleteUser = () => {
    var select = document.getElementById("WhatUserDelete").value;
    fetch("/data?" + "cmd=delete_user&user=" + user)
        .then(response => {
            if (response.status == 200 && response.statusText == "OK") {
                window.location.reload();
            }
        })
        .catch(error => console.log(error));
}

const modifyUser = () => {
    var whatUser = document.getElementById("WhatUserModify").value;
    var role = document.getElementById("role_modify").value;
    var user = document.getElementById('user_modify').value;
    var pass = document.getElementById('pass_modify').value;
    
    if (checkInsert('WhatUserModify') && checkInsert('user_modify') && checkInsert('pass_modify')) {
        fetch("/data?" + "cmd=modifyUser&whatUser=" + whatUser + "&role=" + role + "&user=" + user + "&pass=" + pass)
        .then(response => {
            if (response.status == 200 && response.statusText == "OK") {
                window.location.reload();
            }
        })
        .catch(error => console.log(error));
    } else {
        alert("Compilare con i dati richiesti");
    }
}