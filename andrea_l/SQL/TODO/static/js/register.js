const eta = () => {
    html = "";
    for(var i  = 1; i<100 ; i++){
        html += "<option id='"+ i +"' value='"+ i +"'>"+ i +"</option>";
    }
    document.getElementById("formSelectEtà").innerHTML = html;
    document.getElementById("ShowPassword").innerHTML = "<i class='fa-solid fa-eye'></i>";

    html = "<option value='utente'>utente</option>"

    controlloAdmin();
    controlloSuperAdmin();
}

const controlloSuperAdmin = () =>{
    superAdmin = "super admin";
    fetch("/mysql?" + "cmd=ControlloRuolo&ruolo=" + superAdmin)
        .then(response => {
            if(response.status == 200 && response.statusText == "OK"){
                html += "<option value='super admin'>super admin</option>"
            }
            document.getElementById("formSelectRuolo").innerHTML = html;
        });
}

const controlloAdmin = () =>{
    admin = "admin";
    fetch("/mysql?" + "cmd=ControlloRuolo&ruolo=" + admin)
        .then(response => {
            if(response.status == 200 && response.statusText == "OK"){
                html += "<option value='admin'>admin</option>"
            }
            document.getElementById("formSelectRuolo").innerHTML = html;
        });
}

const ShowPassword = () => {
    inputPassword = document.getElementById("Password");

    if(inputPassword.type == "password"){
        inputPassword.type = "text";
        document.getElementById("ShowPassword").innerHTML = "<i class='fa-solid fa-eye-slash'></i>";
    }else{        
        inputPassword.type = "password";
        document.getElementById("ShowPassword").innerHTML = "<i class='fa-solid fa-eye'></i>";
    }
}

const registrati = () => {
    var username = document.getElementById('Username').value;
    var password = document.getElementById('Password').value;
    var nome = document.getElementById('Nome').value;
    var cognome = document.getElementById('Cognome').value;
    var eta = document.getElementById('formSelectEtà').value;
    var sesso = document.getElementById('formSelectSesso').value;
    var ruolo = document.getElementById("formSelectRuolo").value;
    
    if(password == "")
        alert("Inserire una password");
    else if(username == "")
        alert("Inserire un username");
    else if(username == password)
        alert("Inserire username e password diversi");
    else
        fetch("/mysql?" + "cmd=addUser&username=" + username + "&password=" + password + "&nome=" + nome + "&cognome=" + cognome + "&eta=" + eta + "&sesso=" + sesso + "&ruolo=" + ruolo)
        .then(response => response.json())
        .then(data => {
            if(data[0] == undefined){
                alert("Utente Creato");
                window.location.href = '/';
            }else{
                alert("Utente già presente");
            }
        });
}
document.onload = eta();