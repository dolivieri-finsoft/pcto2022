if (localStorage.length <= 2) {
    localStorage.setItem("IDaccesso",);
    localStorage.setItem("controllo", "no");
    localStorage.setItem("ruolo", "");
}

const checkinput = () => {
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
        fetch("/json?" + "cmd=login&password=" + password + "&username=" + username)
            .then(response => response.json())
            .then(data => {
                if (data[0] == undefined) {
                    alert('QUESTO ACCOUNT NON ESISTE, PER FAVORE REGISTRATI');
                }
                else {
                    let psw = data[0].password;
                    let identificatore = data[0].id;
                    console.log('loggando...');
                    console.log(psw);
                    if (psw == password) {
                        window.location.href = "/home";
                        localStorage.IDaccesso = identificatore;
                        localStorage.controllo="si";
                        localStorage.ruolo = data[0].ruolo;
                        console.log(identificatore);
                        let idaccesso = localStorage.getItem('IDaccesso');
                        let control = localStorage.getItem('controllo');
                        let role = localStorage.getItem('ruolo');
                        console.log('ID:' + idaccesso + ' controllo: ' + control + ' ruolo: ' + role);
                    }
                    else {
                        alert('USERNAME O PASSWORD ERRATI');
                    }
                }
            })
            .catch(error => console.log(error));
    }
}
