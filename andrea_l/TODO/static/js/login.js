const checkinputUsername = () => {
    username = document.getElementById("Username").value;
    errorUsername = document.getElementById("errorUsername");

    usOK = false;

    if (username == "") {
        errorUsername.textContent = "Inserire l'username";
        errorUsername.style.display = "block";
    } else if(username != "finsoft" && username != ""){
        errorUsername.textContent = "Inserire l'username corretto";
        errorUsername.style.display = "block";
    }else{
        errorUsername.textContent = "";
        errorUsername.style.display = "none";
        usOK = true;
    }

    if(username != "")
        document.getElementById("Password").disabled = false;
    else
        document.getElementById("Password").disabled = true;

    

    return usOK;
}

const checkinputPassword = () => {
    password = document.getElementById("Password").value;
    errorPassword = document.getElementById("errorPassword");

    pwOK = false;

    if (password == "") {
        errorPassword.textContent = "Inserire la password";
        errorPassword.style.display = "block";
    } else if(password != "finsoft" && password != ""){
        errorPassword.textContent = "Inserire la password corretta";
        errorPassword.style.display = "block";
    } else {
        errorPassword.textContent = "";
        errorPassword.style.display = "none";
        pwOK = true;
    }

    return pwOK;
}   

const login = () => {
    if (checkinputUsername() && checkinputPassword()){
        window.location.href = "home";
    }else if (checkinputUsername() == false && checkinputPassword() == false){
        alert("Inserire nome utente e password corretti");
        document.getElementById("Username").value = "";
        document.getElementById("Password").value = "";
        document.getElementById("Password").disabled = true;
    }else if(checkinputUsername() == false && checkinputPassword() != false){
        alert("Inserire nome utente corretto");
        document.getElementById("Username").value = "";
        document.getElementById("Password").disabled = true;
    }else if(checkinputUsername() != false && checkinputPassword() == false){
        alert("Inserire una password corretta");
        document.getElementById("Password").value = "";
    }
}