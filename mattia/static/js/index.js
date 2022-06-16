const checkinput = () => {
    console.log("checkinput");

    username = document.getElementById("Username").value;
    password = document.getElementById("Password").value;
    
    errorUsername = document.getElementById("errorUsername");
    errorPassword = document.getElementById("errorPassword");

    if (username == "") {
        errorUsername.textContent = "Inserire l'username";
        errorUsername.style.display = "block";
    }else{
        errorUsername.textContent = "";
        errorUsername.style.display = "none";
    }

    if (password == "") {
        errorPassword.textContent = "Inserire la password";
        errorPassword.style.display = "block";
    }else{
        errorPassword.textContent = "";
        errorPassword.style.display = "none";
    }
}