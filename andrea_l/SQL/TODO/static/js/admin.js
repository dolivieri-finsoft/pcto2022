const UserList = () => {
    document.getElementById('AdminButton').style.color = "black";
    document.getElementById('AdminButton').style.fontSize = "20px";

    var titolo = "Lista - ";
    titolo += sessionStorage.username + " ("+ sessionStorage.ruolo +")"; 
    document.getElementById("titolo").innerHTML = titolo;

    if(sessionStorage.ruolo == "admin" || sessionStorage.ruolo == "super admin")
        document.getElementById("AdminButton").style.display = "block";
    else
        document.getElementById("AdminButton").style.display = "none";

    document.getElementById("UserList").style.display = "block";
    fetch("/mysql?" + "cmd=getListUser")
        .then(response => response.json())
        .then(data => {
            html = "<tr class='tableRow tableRowButton' style='color:  black;'>";
            html += "<td class='elemento pulsanti' id='IdUtente'><button class='ButtonAddAdmin' onclick='AddCloseUser()'>AGGIUNGI</button></td>";
            html += "<td class='elemento pulsanti' id='IdUtente'><button class='ButtonModAdmin' onclick='OpenCloseModUser()'>MODIFICA</button></td>";
            html += "<tr class='tableRow' style='color: black;'>";
            html += "<td class='titolo'>USER LIST</td></tr>";   
            html += "<tr class='tableRow' style='color:  black;'>";
            html += "<td class='elemento IdElemento' id='titoloColonna'> ID UTENTE</td>";
            html += "<td class='elemento' id='titoloColonna'> NOME UTENTE</td>";
            html += "<td class='elemento' id='titoloColonna'> NOME</td>";
            html += "<td class='elemento' id='titoloColonna'> COGNOME </td>";
            html += "<td class='elemento' id='titoloColonna'> RUOLO</td>";
            html += "<td class='elemento pulsanti' id=''></td></tr>";
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                html += "<tr class='tableRow'>";
                html += "<td class='elemento IdElemento' id='IdUtente'>" + element.IdUtente + "</td>";
                html += "<td class='elemento' id='NomeUtente'>" + element.Nome_utente + "</td>";
                if(element.Nome == "")
                    html += "<td class='elemento' id='NomeUtente'> // </td>";
                else
                    html += "<td class='elemento' id='NomeUtente'>"+ element.Nome +"</td>";

                if(element.Cognome == "")
                    html += "<td class='elemento' id='NomeUtente'> // </td>";
                else
                    html += "<td class='elemento' id='CognomeUtente'>"+ element.Cognome +"</td>";

                html += "<td class='elemento' id='RuoloUtente'>"+ element.Ruolo +"</td>";
                
                if(sessionStorage.ruolo == "admin" && element.Ruolo == "admin")
                    html += "<td class='elemento pulsanti' style='color: black;'> IMPOSSIBILE ELIMINARE </td>";
                else if(element.Ruolo == "super admin" && sessionStorage.ruolo == "admin")
                    html += "<td class='elemento pulsanti' style='color: black;'> IMPOSSIBILE ELIMINARE </td>";
                else
                    html += "<td class='elemento pulsanti' id='ButtoneliminaUser'><button class='ButtonDeleteAdmin' onclick='DeleteUser(`"+ element.IdUtente +"`)'>ELIMINA</button></td>";
                html += "</tr>";
            }
            document.getElementById("inserisciUser").innerHTML = html;
        })
        .catch(error => console.log(error));
    document.getElementById("ShowPassword").innerHTML = "<i class='fa-solid fa-eye'></i>";
}

const DeleteUser = (IdUtente) => {

    fetch("/mysql?" + "cmd=deleteUser&IdUtente=" + IdUtente)
        .then(response => {
            if(response.status == 200 && response.statusText == "OK"){
                if(sessionStorage.Id == IdUtente)
                    window.location.href = '/';
                else
                    window.location.href = '/home/admin.html'; //aggiornamento pagina
            }
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

/**
 * AGGIUNGI
 */

const AggiungiUtente = () => {
    var username = document.getElementById('Username').value;
    var password = document.getElementById('PasswordAdd').value;
    var nome = document.getElementById('Nome').value;
    var cognome = document.getElementById('Cognome').value;
    var eta = document.getElementById('formSelectEtà').value;
    var sesso = document.getElementById('formSelectSesso').value;
    var ruolo = document.getElementById("formSelectRuolo").value;

    fetch("/mysql?" + "cmd=addUser&username=" + username + "&password=" + password + "&nome=" + nome + "&cognome=" + cognome + "&eta=" + eta + "&sesso=" + sesso + "&ruolo=" + ruolo)
        .then(response => response.json())
        .then(data => {
            if(data[0] == undefined){
                alert("Utente Creato");
                window.location.href = '/home/admin.html';
            }else{
                alert("Utente già presente");
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
        document.getElementById("formSelectEtà").innerHTML = html1;

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

        fetch("/mysql?" + "cmd=getListUser")
        .then(response => response.json())
        .then(data => {
            html = "";
            for(var i = 0; i<data.length; i++){
                const element  = data[i];
                if(element.Ruolo != "super admin")
                    html +=" <option value='"+element.Nome_utente+"'>"+ element.Nome_utente +"</option>";
            }

            document.getElementById("SelectUsername").innerHTML = html;
        });

        html1 = "";
        for(var i = 1; i<100 ; i++){
            html1 += "<option id='"+ i +"' value='"+ i +"'>"+ i +"</option>";
        }
        document.getElementById("formSelectEtàMod").innerHTML = html1;

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
    fetch("/mysql?" + "cmd=getIdUtente&username="+ username)
        .then(response => response.json())
        .then(data => {
            const element = data[0];
            document.getElementById("UsernameMod").value = element.Nome_utente;
            document.getElementById("Password").value = element.Password;
            document.getElementById("NomeMod").value = element.Nome;
            document.getElementById("CognomeMod").value = element.Cognome;
            document.getElementById("formSelectEtàMod").value = element.Anni;
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
    var anni = document.getElementById("formSelectEtàMod").value;
    var sesso = document.getElementById("formSelectSessoMod").value;
    var ruolo = document.getElementById("formSelectRuoloMod").value;
    var IdUtente = document.getElementById("ID").textContent;

    fetch("/mysql?" + "cmd=ModifyUser&username="+ username +"&password="+ password +"&nome="+ nome +"&cognome="+  cognome +"&anni="+ anni +"&sesso="+ sesso + "&ruolo="+ ruolo +"&oldusername="+ oldusername + "&IdUtente="+ IdUtente)
    .then(response => response.json())
        .then(data => {
            if(data[0] == undefined){
                window.location.href = '/home/admin.html';
            }else{
                alert("Esiste già un utente con quel User");
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
    if(sessionStorage.access == "si")
    UserList();
    else{
        alert("Accesso vietato");
        window.location.href = '/'; //aggiornamento pagina
    }
}

document.onload = ControlloAccesso();