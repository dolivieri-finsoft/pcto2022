const checkinput = () => {
    username = document.getElementById("Username").value;
    password = document.getElementById("Password").value;

    errorUsername = document.getElementById("errorUsername");
    errorPassword = document.getElementById("errorPassword");

    usOK = false;
    pwOK = false;
    if (username == "") {
        errorUsername.textContent = "Inserire l'username";
        errorUsername.style.display = "block";
    } else {
        errorUsername.textContent = "";
        errorUsername.style.display = "none";
        usOK = true;
    }

    if (password == "") {
        errorPassword.textContent = "Inserire la password";
        errorPassword.style.display = "block";
    } else {
        errorPassword.textContent = "";
        errorPassword.style.display = "none";
        pwOK = true;
    }

    if (usOK && pwOK) return true;
    else return false;
}

const login = () => {
    if (checkinput()) window.location.href = "home";
}

function rgb(r, g, b) {
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);
    color = ["rgb(", r, ",", g, ",", b, ")"].join("");

    console.log(color)
    return color;
}

const cambiacolore = () => {
    var bg = document.body;
    bg.style.backgroundColor = rgb();
}