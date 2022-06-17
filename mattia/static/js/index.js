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

const todoList = () => {
    fetch("/json")
        .then(response => response.json())
        .then(data => {
            html = "<ul>";
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                html += "<li>" + element.stato + ": " + element.cosa + "</li>";
            }
            html += "</ul>";
            document.getElementById("todoList").innerHTML = html;
        })
        .catch(error => console.log(error));
}

document.onloadeddata = todoList();