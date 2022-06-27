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
    fetch("/mysql?" + "cmd=controllUser&username=" + username)
    .then(response =>{

    })
   alert("TUTTO OK");
    fetch("/mysql?" + "cmd=addUser&username=" + username + "&password=" + password + "&nome=" + nome + "&cognome=" + cognome + "&eta=" + eta + "&sesso=" + sesso)
        .then(response => {
            if (response.status == 200 && response.statusText == "OK") {
                alert("UTENTE CREATO");
            }else{
                alert("UTENTE NON CREATO")
            }
        })
        .catch(error => console.log(error));
}
document.onload = eta();