const UserList = () => {
    document.getElementById('AdminButton').style.color = "black";
    document.getElementById('AdminButton').style.fontSize = "20px";

    var titolo = "Lista - ";
    titolo += localStorage.username + " ("+ localStorage.ruolo +")"; 
    document.getElementById("titolo").innerHTML = titolo;

    if(localStorage.ruolo == "admin" || localStorage.ruolo == "super admin")
        document.getElementById("AdminButton").style.display = "block";
    else
        document.getElementById("AdminButton").style.display = "none";

    document.getElementById("UserList").style.display = "block";
    fetch("/mysql?" + "cmd=getListUser")
        .then(response => response.json())
        .then(data => {
            html = "<tr class='tableRow tableRowButton' style='color:  black;'>";
            html += "<td class='elemento pulsanti' id='IdUtente'><button class='ButtonAddAdmin' onclick='AddCloseUser()'>AGGIUNGI</button></td>";
            html += "<td class='elemento pulsanti' id='IdUtente'><button class='ButtonModAdmin' onclick='ModifyUser()'>MODIFICA</button></td>";
            html += "<tr class='tableRow' style='color: black;'>";
            html += "<td class='titolo'>USER LIST</td></tr>";   
            html += "<tr class='tableRow' style='color:  black;'>";
            html += "<td class='elemento' id='titoloColonna'> ID UTENTE</td>";
            html += "<td class='elemento' id='titoloColonna'> NOME UTENTE</td>";
            html += "<td class='elemento' id='titoloColonna'> RUOLO</td>";
            html += "<td class='elemento pulsanti' id=''></td></tr>";
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                html += "<tr class='tableRow'>";
                html += "<td class='elemento' id='IdUtente'>" + element.IdUtente + "</td>";
                html += "<td class='elemento' id='NomeUtente'>" + element.Nome_utente + "</td>";
                html += "<td class='elemento' id='RuoloUtente'>"+ element.Ruolo +"</td>";
                if(element.Ruolo != "super admin")
                    html += "<td class='elemento pulsanti' id='ButtoneliminaUser'><button class='ButtonDeleteAdmin' onclick='DeleteUser(`"+ element.IdUtente +"`)'>ELIMINA</button></td>";
                else
                    html += "<td class='elemento pulsanti' style='color: black;'> IMPOSSIBILE ELIMINARE </td>";
                html += "</tr>";
            }
            document.getElementById("inserisciUser").innerHTML = html;
        })
        .catch(error => console.log(error));

    html = "";
    for(var i  = 1; i<100 ; i++){
        html += "<option id='"+ i +"' value='"+ i +"'>"+ i +"</option>";
    }
    document.getElementById("formSelectEtà").innerHTML = html;
    document.getElementById("ShowPassword").innerHTML = "<i class='fa-solid fa-eye'></i>";
}

const AddCloseUser = () => {
    AddUserDiv = document.getElementById("AddUserDiv");

    if(AddUserDiv.style.display == "none")
        AddUserDiv.style.display = "flex";
    else
        AddUserDiv.style.display = "none";
}

const DeleteUser = (IdUtente) => {

    fetch("/mysql?" + "cmd=deleteUser&IdUtente=" + IdUtente)
        .then(response => {
            if(response.status == 200 && response.statusText == "OK"){
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

const AggiungiUtente = () => {
    var username = document.getElementById('Username').value;
    var password = document.getElementById('Password').value;
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

document.onload = UserList();