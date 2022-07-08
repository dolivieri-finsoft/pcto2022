function Accesso(){
    if(sessionStorage.access == "si"){
        window.location.replace("/home");
    }
}


const log = () => {
    var username = document.getElementById("Username").value;
    var password = document.getElementById("Password").value;

    if(username == "" || password == ""){
        alert("Inserire username e password")
    }else{
        fetch("/mysqlPost?" +  "cmd=loginUser&username=" + username,{
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            if(data[0] == undefined){
                alert("Utente non esistente");
            }else if(password == data[0].Password){
                salvaIdUtente();
            }else{
                alert("Password errata");
            }
        });
    }
}

const salvaIdUtente = () =>{
    var username = document.getElementById("Username").value;
    
    fetch("/mysqlPost?" + "cmd=getIdUtente&username="+ username, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        for(var i = 0; i<data.length; i++){
            const user = data[i];
            sessionStorage.username = user.Nome_utente;
            sessionStorage.Id = user.IdUtente;
            sessionStorage.ruolo = user.Ruolo;
            sessionStorage.access = "si";
        }
        if(sessionStorage.access == "si"){
            window.location.href = '/home';
        }
    });
}

const ShowPassword = () => {
    alert("SONO ENTRATO");
    inputPassword = document.getElementById("Password");

    if(inputPassword.type == "password"){
        alert("è PASSWORD");
        inputPassword.type = "text";
        document.getElementById("ShowPassword").innerHTML = "<i class='fa-solid fa-eye-slash'></i>";
    }else{        
        alert("è TEXT");
        inputPassword.type = "password";
        document.getElementById("ShowPassword").innerHTML = "<i class='fa-solid fa-eye'></i>";
    }
}
