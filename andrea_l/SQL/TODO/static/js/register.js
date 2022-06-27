const eta = () => {
    html = "";
    for(var i  = 1; i<100 ; i++){
        html += "<option id='"+ i +"' value='"+ i +"'>"+ i +"</option>";
    }
    document.getElementById("formSelectEtà").innerHTML = html;
    document.getElementById("ShowPassword").innerHTML = "<i class='fa-solid fa-eye'></i>";
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

const checkInsert = (id) => {
    if (document.getElementById(id).value == "") {
        return false;
    }else{
        return true
    }
}

const registrati = () => {
    var username = document.getElementById('Username').value;
    var password = document.getElementById('Password').value;
    var nome = document.getElementById('Nome').value;
    var cognome = document.getElementById('Cognome').value;
    var eta = document.getElementById('formSelectEtà').value;
    var sesso = document.getElementById('formSelectSesso').value;

    fetch("/mysql?" + "cmd=addUser&username=" + username + "&password=" + password + "&nome=" + nome + "&cognome=" + cognome + "&eta=" + eta + "&sesso=" + sesso)
        .then(response => response.json())
        .then(data => {
            if(data[0] == undefined){
                alert("Utente Creato");
            }else{
                alert("Utente già presente");
            }
        });
}
document.onload = eta();