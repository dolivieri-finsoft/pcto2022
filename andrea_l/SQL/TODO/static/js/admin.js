const UserList = () => {
    document.getElementById('AdminButton').style.color = "black";
    document.getElementById('AdminButton').style.fontSize = "20px";
    document.getElementById("InputSearch").value = "";

    var titolo = "Lista - ";
    titolo += sessionStorage.username + " ("+ sessionStorage.ruolo +")"; 
    document.getElementById("titolo").innerHTML = titolo;

    if(sessionStorage.ruolo == "admin" || sessionStorage.ruolo == "super admin")
        document.getElementById("AdminButton").style.display = "block";
    else
        document.getElementById("AdminButton").style.display = "none";

    document.getElementById("UserList").style.display = "block";
    
    fetch("/mysqlPost?" + "cmd=getListUser" ,{
        method: 'POST'
    })
        .then(response => response.json())
        .then(data => {
            html = "<tr class='tableRow tableRowButton' style='color:  black;'>";
            html += "<td class='elemento pulsanti' id='IdUtente'><button class='ButtonAddAdmin' onclick='AddCloseUser()'>AGGIUNGI</button></td>";
            html += "<td class='elemento pulsanti' id='IdUtente'><button class='ButtonModAdmin' onclick='OpenCloseModUser()'>MODIFICA</button></td></tr>";
            html += "<tr class='tableRow' style='color: black;'>";
            html += "<td class='titolo'>USER LIST</td></tr>";   
            html += "<tr class='tableRow' style='color:  black;'>";
            html += "<td class='elemento IdElemento' id='titoloColonna'> ID UTENTE</td>";
            html += "<td class='elemento' id='titoloColonna'> NOME UTENTE</td>";
            html += "<td class='elemento' id='titoloColonna'> PASSWORD </td>";
            html += "<td class='elemento'></td>"
            html += "</tr>";
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                html += "<tr class='tableRow'>";
                html += "<td class='elemento IdElemento' id='IdUtente'>" + element.IdUtente + "</td>";
                html += "<td class='elemento' id='NomeUtente'>" + element.Nome_utente + "</td>";                
                html += "<td class='elemento' id='RuoloUtente'>"+ element.Ruolo +"</td>";

                html += "<td class='elemento pulsantielimina' id='ButtoneliminaUser'>";
                html += "<div class='drop_down' onclick='openCloseUser(`"+ element.Nome_utente +"`)'><i class='fa-solid fa-caret-down freccia'></i></div>";
                if(sessionStorage.ruolo == "admin" && element.Ruolo == "admin")
                    html += "<button class='notDelete'>IMPOSSIBILE ELIMINARE</button>";
                else if(element.Ruolo == "super admin" && sessionStorage.ruolo == "admin")
                    html += "<button class='notDelete'>IMPOSSIBILE ELIMINARE</button>";
                else
                html += "<button class='ButtonDeleteAdmin' onclick='DeleteUser("+ element.IdUtente +")'>ELIMINA</button>";
                html += "</td></tr>";
                html += "<div class='sottoElemento' id='"+ element.Nome_utente +"' style='display: none;'>";
                html += "<div class='pelement'> <b>Username</b>: "+ element.Nome_utente +"</div>";
                html += "<div class='pelement'> <b>Password</b>: "+ element.Password +"</div>";
                if(element.Nome == "")
                    html += "<div class='pelement'> <b>Nome</b>: //</div>";
                else
                    html += "<div class='pelement'> <b>Nome</b>: "+ element.Nome +"</div>";
                
                if(element.Cognome == "")
                    html += "<div class='pelement'> <b>Cognome</b>: //</div>";
                else
                    html += "<div class='pelement'> <b>Cognome</b>: "+ element.Cognome +"</div>";
                html += "<div class='pelement'> <b>Anni</b>: "+ element.Anni +"</div>";
                html += "<div class='pelement'> <b>Sesso</b>: "+ element.Sesso +"</div>";
                html += "<div class='pelement'> <b>Ruolo</b>: "+ element.Ruolo +"</div>";
                html += "</div>";
                }
                
            document.getElementById("inserisciUser").innerHTML = html;
        })
        .catch(error => console.log(error));
    document.getElementById("ShowPassword").innerHTML = "<i class='fa-solid fa-eye'></i>";
}

const openCloseUser = (IdUtente) => {
    if(document.getElementById(IdUtente).style.display == "none"){
        document.getElementById(IdUtente).style.display = "block";
    }
    else{
        document.getElementById(IdUtente).style.display = "none";
    }
        

}

/**
 * DELETE USER
 */

const DeleteUser = (IdUtente) => {

    fetch("/mysql?" + "cmd=deleteUser&IdUtente=" + IdUtente)
        .then(response => {
            if(response.status == 200 && response.statusText == "OK"){
                if(sessionStorage.Id == IdUtente)
                    chiudiSessione();
                else
                    window.location.href = '/home/admin.html'; //aggiornamento pagina
            }
        });
}

/**
 * ELIMINA ACCOUNT ENTRATO
 */

 const DeleteActuallyUser = () => {
    var IdUtente = sessionStorage.Id;

    fetch("/mysql?" + "cmd=deleteUser&IdUtente=" + IdUtente)
        .then(response => {
            if(response.status == 200 && response.statusText == "OK"){
                if(sessionStorage.Id == IdUtente)
                    chiudiSessione();
                else
                    window.location.href = '/home/admin.html'; //aggiornamento pagina
            }
        });
}

const DeleteUserShow = () => {
    document.getElementById("confermaP").innerText += sessionStorage.username + " ?";
    document.getElementById("confermaDiv").style.display = "flex";
    document.getElementById("containerElement").style.display = "none";
    document.getElementById("containerAdd").style.display = "none";
}

const annulla = () => {
    window.location.href = '/home'; //aggiornamento pagina
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

/**
 * AGGIUNGI
 */

const AggiungiUtente = () => {
    var username = document.getElementById('Username').value;
    var password = document.getElementById('PasswordAdd').value;
    var nome = document.getElementById('Nome').value;
    var cognome = document.getElementById('Cognome').value;
    var eta = document.getElementById('formSelectEt??').value;
    var sesso = document.getElementById('formSelectSesso').value;
    var ruolo = document.getElementById("formSelectRuolo").value;

    if(password == "")
        alert("Inserire una password");
    else if(username == "")
        alert("Inserire un username");
    else if(username == password)
        alert("Inserire username e password diversi");
    else
        fetch("/mysqlPost?" + "cmd=addUser&username=" + username + "&password=" + password + "&nome=" + nome + "&cognome=" + cognome + "&eta=" + eta + "&sesso=" + sesso + "&ruolo=" + ruolo, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            if(data[0] == undefined){
                alert("Utente Creato");
                window.location.href = '/home/admin.html';
            }else{
                alert("Utente gi?? presente");
            }
        });
}

const AddCloseUser = () => {
    AddUserDiv = document.getElementById("AddUserDiv");
    ModDiv = document.getElementById("ModUserDiv");

    if(ModDiv.style.display == "flex"){
        ModDiv.style.display = "none";
    }

    if(AddUserDiv.style.display == "none"){
        AddUserDiv.style.display = "flex";

        html1 = "";
        for(var i = 1; i<100 ; i++){
            html1 += "<option id='"+ i +"' value='"+ i +"'>"+ i +"</option>";
        }
        document.getElementById("formSelectEt??").innerHTML = html1;

        html = "<option value='utente'>utente</option>";
        if(sessionStorage.ruolo != "admin")
            html += "<option value='admin'>admin</option>";
        document.getElementById("formSelectRuolo").innerHTML = html;
    }
    else
        AddUserDiv.style.display = "none";
}

/**
 * MODIFICA
 */

const OpenCloseModUser = () =>{
    ModDiv = document.getElementById("ModUserDiv");
    AddUserDiv = document.getElementById("AddUserDiv");

    if(AddUserDiv.style.display == "flex"){
        AddUserDiv.style.display = "none";
    }

    if(ModDiv.style.display == "none"){
        ModDiv.style.display = "flex";

        fetch("/mysqlPost?" + "cmd=getListUser", {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            html = "";
            for(var i = 0; i<data.length; i++){
                const element  = data[i];
                if(sessionStorage.ruolo == "super admin" && element.Ruolo != "super admin")
                    html +=" <option value='"+element.Nome_utente+"'>"+ element.Nome_utente +"</option>";
                else if(sessionStorage.ruolo == "admin" && element.Ruolo != "admin" && element.Ruolo != "super admin")
                    html +=" <option value='"+element.Nome_utente+"'>"+ element.Nome_utente +"</option>";
            }

            document.getElementById("SelectUsername").innerHTML = html;
        });

        html1 = "";
        for(var i = 1; i<100 ; i++){
            html1 += "<option id='"+ i +"' value='"+ i +"'>"+ i +"</option>";
        }
        document.getElementById("formSelectEt??Mod").innerHTML = html1;

        html = "<option value='utente'>utente</option>";
        if(sessionStorage.ruolo != "admin")
            html += "<option value='admin'>admin</option>";
        document.getElementById("formSelectRuoloMod").innerHTML = html;

    }else{
        ModDiv.style.display = "none";
    }
}

const CompilaForm = () => {
    const username = document.getElementById("SelectUsername").value;
    fetch("/mysqlPost?" + "cmd=getIdUtente&username="+ username, {
        method: 'POST'
    })
        .then(response => response.json())
        .then(data => {
            const element = data[0];
            document.getElementById("UsernameMod").value = element.Nome_utente;
            document.getElementById("Password").value = element.Password;
            document.getElementById("NomeMod").value = element.Nome;
            document.getElementById("CognomeMod").value = element.Cognome;
            document.getElementById("formSelectEt??Mod").value = element.Anni;
            document.getElementById("formSelectSessoMod").value = element.Sesso;
            document.getElementById("formSelectRuoloMod").value = element.Ruolo; 
            document.getElementById("ID").textContent = element.IdUtente;
 
        })
}

const ModificaUtente = () => {
    var oldusername = document.getElementById("SelectUsername").value;
    var username = document.getElementById("UsernameMod").value;
    var password = document.getElementById("Password").value;
    var nome = document.getElementById("NomeMod").value;
    var cognome = document.getElementById("CognomeMod").value;
    var anni = document.getElementById("formSelectEt??Mod").value;
    var sesso = document.getElementById("formSelectSessoMod").value;
    var ruolo = document.getElementById("formSelectRuoloMod").value;
    var IdUtente = document.getElementById("ID").textContent;

    if(password == "")
        alert("Inserire una password");
    else if(username == "")
        alert("Inserire un username");
    else if(username == password)
        alert("Inserire username e password diversi");
    else
        fetch("/mysqlPost?" + "cmd=ModifyUser&username="+ username +"&password="+ password +"&nome="+ nome +"&cognome="+  cognome +"&anni="+ anni +"&sesso="+ sesso + "&ruolo="+ ruolo +"&oldusername="+ oldusername + "&IdUtente="+ IdUtente, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            if(data[0] == undefined){
                window.location.href = '/home/admin.html';
            }else{
                alert("Esiste gi?? un utente con quel User");
            }
        });
}

/**
 * LOG OUT
 */

const chiudiSessione = () => {
    sessionStorage.clear();
    window.location.href = '/'; //aggiornamento pagina
}

const ControlloAccesso = () => {

    if(sessionStorage.access == "si" && sessionStorage.ruolo == "admin" || sessionStorage.ruolo == "super admin"){
        UserList();
        let today = new Date();
        let mese = today.getMonth() + 1;
        let dateTime = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear();
        document.getElementById("Data").innerHTML = dateTime;
    }
    else{
        alert("Accesso vietato");
        window.location.href = '/'; //aggiornamento pagina
    }
}

const ricerca = () => {
    searchInput = document.getElementById("InputSearch").value;
    console.log(searchInput);

    fetch("/mysqlPost?" + "cmd=getIdUtente&username=" + searchInput, {
        method: 'POST'
    })
        .then(response => response.json())
        .then(data => {
            html = "";
            element = data[0];
            html += "<tr class='tableRow'>";
            html += "<td class='elemento IdElemento' id='IdUtente'>" + element.IdUtente + "</td>";
            html += "<td class='elemento' id='NomeUtente'>" + element.Nome_utente + "</td>";                
            html += "<td class='elemento' id='RuoloUtente'>"+ element.Ruolo +"</td>";

            html += "<td class='elemento pulsantielimina' id='ButtoneliminaUser'>";
            html += "<div class='drop_down' onclick='openCloseUser(`"+ element.Nome_utente +"`)'><i class='fa-solid fa-caret-down freccia'></i></div>";

            if(sessionStorage.ruolo == "admin" && element.Ruolo == "admin")
                html += "<button class='notDelete'>IMPOSSIBILE ELIMINARE</button>";
            else if(element.Ruolo == "super admin" && sessionStorage.ruolo == "admin")
                html += "<button class='notDelete'>IMPOSSIBILE ELIMINARE</button>";
            else
                html += "<button class='ButtonDeleteAdmin' onclick='DeleteUser("+ element.IdUtente +")'>ELIMINA</button>";

            html += "</td></tr>";
            html += "<div class='sottoElemento' id='"+ element.Nome_utente +"' style='display: none;'>";
            html += "<div class='pelement'> <b>Username</b>: "+ element.Nome_utente +"</div>";
            html += "<div class='pelement'> <b>Password</b>: "+ element.Password +"</div>";

            if(element.Nome == "")
                html += "<div class='pelement'> <b>Nome</b>: //</div>";
            else
                html += "<div class='pelement'> <b>Nome</b>: "+ element.Nome +"</div>";
                
            if(element.Cognome == "")
                html += "<div class='pelement'> <b>Cognome</b>: //</div>";
            else
                html += "<div class='pelement'> <b>Cognome</b>: "+ element.Cognome +"</div>";

            html += "<div class='pelement'> <b>Anni</b>: "+ element.Anni +"</div>";
            html += "<div class='pelement'> <b>Sesso</b>: "+ element.Sesso +"</div>";
            html += "<div class='pelement'> <b>Ruolo</b>: "+ element.Ruolo +"</div>";
            html += "</div>";
            document.getElementById("inserisciUser").innerHTML = html;
    });
}

document.onload = ControlloAccesso();