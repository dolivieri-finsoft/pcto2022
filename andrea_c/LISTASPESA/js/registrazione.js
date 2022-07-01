const registration = () => {
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    errname = document.getElementById("errorUsername");
    errpsw = document.getElementById("errorPassword");
    usOK = false;
    pwOK = false;
    if (username == "") {
        errname.textContent = "Inserire l'username";
        errname.style.display = "block";
    }
    else {
        errname.textContent = "";
        errname.style.display = "none";
        usOK = true;
    }
    if (password == "") {
        errpsw.textContent = "Inserire la password";
        errpsw.style.display = "block";
    }
    else {
        errpsw.textContent = "";
        errpsw.style.display = "none";
        pwOK = true;
    }

    if (usOK && pwOK) {
        fetch("/json?" + "cmd=controlAccount&username=" + username)
            .then(response => response.json())
            .then(data => {
                data.push({ "username": "Fanculo" });
                console.log(data[0]);
                if (data[0].username != 'Fanculo') {
                    let uname = data[0].username;
                    console.log('controllando...');
                    console.log(uname);
                    if (uname == username) {
                        errname.textContent = "Nome utente non disponibile";
                        errname.style.display = "block";
                    }
                }
                else if (data[0].username == 'Fanculo') {
                    fetch("/json?" + "cmd=createAccount&password=" + password + "&username=" + username)
                        .then(response => {
                            console.log('registrato');
                            creatabella();
                        })
                }
            })
            .catch(error => console.log(error));
    }
}

const creatabella = () => {
    fetch("/json?" + "cmd=controlAccount&username=" + username)
        .then(response => response.json())
        .then(data => {
            var iD=data[0].id;
            fetch("/json?" + "cmd=createTable&tabella=" + iD)
            .then(response => {
                console.log('tabella creata');
            })
        })
}