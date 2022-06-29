
if(localStorage.length <= 2){
    localStorage.setItem("access", "no");
    localStorage.setItem("user", "");
    localStorage.setItem("role", "");
}

function Accesso(){
    if(localStorage.access == "si"){
        window.location.replace("/home");
    }
}

function Richiedi(){
    if(localStorage.access == "si"){
        document.getElementById("benvenuto").innerHTML += "HI, " + localStorage.user;
        if(localStorage.role == "admin"){
            document.getElementById("adminPage").style.display = "inline";
        }
        const todoList = () => {
            fetch("/request")
             .then(response => response.json())
             .then(data => {
             htmlTodo = "<tr><th class='titolo' colspan='4'>To do</th></tr>";
             htmlDone = "<tr><th class='titolo' colspan='3'>Done</th></tr>";
             for (var i = 0; i < data.length; i++) {
                 const element = data[i];
                 if(element.user == localStorage.user){
                    if(element.state == "todo"){
                        htmlTodo += "<tr> <td>" + element.what + "</td> <td class='opzioni rossa' id='" + element.what + "' onclick='Elimina(this.id)'>✘</td> <td class='opzioni verde' id='" + element.what + "' onclick='Sposta(this.id)'>✔</td> <td class='opzioni blu' id='" + element.what + "' onclick='Modifica(this.id, false)'>↻</td> </tr>";
                     }
                     else{
                        htmlDone += "<tr> <td>" + element.what + "</td> <td class='opzioni rossa' id='" + element.what + "' onclick='Elimina(this.id)'>✘</td> <td class='opzioni blu' id='" + element.what + "' onclick='Modifica(this.id, true)'>↻</td> </tr>";
                     }

                 } 
             }
             document.getElementById("todoList").innerHTML = htmlTodo;
             document.getElementById("doneList").innerHTML = htmlDone;
        
             })
             .catch(error => console.log(error));
            }
        
            document.onloadeddata = todoList();
    }
    else{
        window.location.replace("/");
    }
}

function Elimina(id){
    fetch("/delete?" + "cosa=" + id)
    Back();
}
function Sposta(id){
    fetch("/change?" + "cosa=" + id)
    Back();
}
function Add(){
    let cosa = document.getElementById("what").value;
    let stato;
    let user = localStorage.user;
     if(cosa == ""){
        document.getElementById("errore").innerHTML = "Fill in te field 'What'";
     }
     else{
        if(document.getElementById("todo").checked == true){
            stato = "todo";
        }
        else{
            stato = "done";
        }

        if(document.getElementById("testoR").outerHTML.length == 57)
        {
            fetch("/modify?" + "cosaDaMo=" + cosaDaModificare + "&cosa=" + cosa + "&stato=" + stato)
            .then(data => {
                alert("Element already present in the lists");
            });
            
        }
        else{
            fetch("/write?" + "cosa=" + cosa + "&stato=" + stato + "&user=" + user)
            .then(data => {
                alert("Element already present in the lists");
            });
           
        }

        Back();
     }
    
}

function Modifica(id, stato){
    cosaDaModificare = id;
    document.getElementById("testoR").innerHTML = "<b>Modify Element</b>";
    document.getElementById("what").value = id;
    document.getElementById("button").innerHTML = "Modify";
    document.getElementById("buttonB").style.display = "inline";

    if(stato == false){
        document.getElementById("todo").checked = true;
    }
    else{
        document.getElementById("done").checked = true;

    }
}

function Back(){
    window.location.reload();
}

function Log(){
    document.getElementById("errore").style.color = "rgb(255, 30, 0)";
    let user = document.getElementById("username").value; 
    let pass = document.getElementById("password").value; 

    if( user == "" || pass == ""){
        document.getElementById("errore").innerHTML = "Please fill in all the required data";
    }
    else{
        fetch("/login?" + "user=" + user, {method: "POST"})
        .then(response => response.json())
        .then(data => {
            if(data[0] == undefined){
                document.getElementById("errore").innerHTML = "The user does not exist, please sign in";
            }
            else if(pass == data[0].password){
                localStorage.access = "si";
                localStorage.user = user;
                localStorage.role = data[0].role;
                window.location.replace("/home");
            }
            else{
                document.getElementById("errore").innerHTML = "Incorrect password";
            }
        });

    }
}

function Sign(){
    document.getElementById("errore").style.color = "rgb(255, 30, 0)";
    let user = document.getElementById("username").value; 
    let pass = document.getElementById("password").value; 

    if( user == "" || pass == ""){
        document.getElementById("errore").innerHTML = "Please fill in all the required data";
    }
    else{
        fetch("/sign?" + "user=" + user + "&pass=" + pass)
        .then(response => response.json())
        .then(data => {
            if(data[0] == undefined){
                document.getElementById("errore").style.color = "rgb(51, 255, 0)";
                document.getElementById("errore").innerHTML = "Registration was successful, please log in";
            }
            else{
                document.getElementById("errore").innerHTML = "User already registered, please log in";
            }
        });
    }
}

function Logout(){
    Reset();
    Back();
}

function Delete(user){
    fetch("/deleteAccount?" + "user=" + user)
    alert("Account '" + user + "' deleted");
    
    if(user == localStorage.user){
        Reset();
    }
    Back();
}

function Reset(){
    localStorage.access = "no";
    localStorage.user = "";
}

function RichiediAdmin(){
    if(localStorage.access == "si" && localStorage.role == "admin"){
        document.getElementById("benvenuto").innerHTML += "HI, " + localStorage.user;
        const todoList = () => {
            fetch("/request")
             .then(response => response.json())
             .then(data => {
             htmlTodo = "<tr><th class='titolo' colspan='5'>To do</th></tr><tr><td id='user'>User</td><td id='user'>What</td></tr>";
             htmlDone = "<tr><th class='titolo' colspan='4'>Done</th></tr><tr><td id='user'>User</td><td id='user'>What</td></tr>";
             for (var i = 0; i < data.length; i++) {
                 const element = data[i];
                     if(element.state == "todo"){
                        if(element.user == localStorage.user){
                            htmlTodo += "<tr> <td id='my'>" + element.user + "</td> <td id='my'>" + element.what + "</td> <td class='opzioni rossa' id='" + element.what + "' onclick='Elimina(this.id)'>✘</td> <td class='opzioni verde' id='" + element.what + "' onclick='Sposta(this.id)'>✔</td> <td class='opzioni blu' id='" + element.what + "' onclick='Modifica(this.id, false)'>↻</td> </tr>";

                        }
                        else{
                            htmlTodo += "<tr> <td>" + element.user + "</td> <td>" + element.what + "</td> <td class='opzioni rossa' id='" + element.what + "' onclick='Elimina(this.id)'>✘</td> <td class='opzioni verde' id='" + element.what + "' onclick='Sposta(this.id)'>✔</td> <td class='opzioni blu' id='" + element.what + "' onclick='Modifica(this.id, false)'>↻</td> </tr>";
                        }
                     }
                     else{
                        if(element.user == localStorage.user){
                            htmlDone += "<tr> <td id='my'>" + element.user + "</td> <td id='my'>" + element.what + "</td> <td class='opzioni rossa' id='" + element.what + "' onclick='Elimina(this.id)'>✘</td> <td class='opzioni blu' id='" + element.what + "' onclick='Modifica(this.id, true)'>↻</td> </tr>";
                        }
                        else{
                            htmlDone += "<tr> <td>" + element.user + "</td> <td>" + element.what + "</td> <td class='opzioni rossa' id='" + element.what + "' onclick='Elimina(this.id)'>✘</td> <td class='opzioni blu' id='" + element.what + "' onclick='Modifica(this.id, true)'>↻</td> </tr>";
                        }
                     }
             }
             document.getElementById("todoList").innerHTML = htmlTodo;
             document.getElementById("doneList").innerHTML = htmlDone;
        
             })
             .catch(error => console.log(error));
            }
        
            document.onloadeddata = todoList();

        const usersList = () => {
            fetch("/requestUsers")
             .then(response => response.json())
             .then(data => {
                 htmlUsers = "<tr><th class='titolo' colspan='5'>Users</th></tr><tr><td id='user'>Username</td><td id='user'>Password</td><td id='user'>Role</td></tr>";
                 for (var i = 0; i < data.length; i++) {
                    const element = data[i]; 
                    if(element.username == localStorage.user){
                        htmlUsers += "<tr> <td id='my'>" + element.username + "</td> <td id='my'>" + element.password + "</td> <td id='my'>" + element.role + "</td> <td class='opzioni rossa' id='" + element.username + "' onclick='EliminaUser(this.id)'>✘</td> <td class='opzioni blu' id='" + element.username + "§" + element.password + "§" + element.role + "' onclick='ModificaUser(this.id)'>↻</td> </tr>";    
                    }
                    else{
                        htmlUsers += "<tr> <td>" + element.username + "</td> <td>" + element.password + "</td> <td>" + element.role + "</td> <td class='opzioni rossa' id='" + element.username + "' onclick='EliminaUser(this.id)'>✘</td> <td class='opzioni blu' id='" + element.username + "§" + element.password + "§" + element.role + "' onclick='ModificaUser(this.id)'>↻</td> </tr>";    
                    }
                 }
                 document.getElementById("usersList").innerHTML = htmlUsers;
            
             })
             .catch(error => console.log(error));
             }
            
            document.onloadeddata = usersList();    
    }
    else{
        window.location.replace("/");
    }
}

function Admin(){
    window.location.replace("/admin");
}

function List(){
    window.location.replace("/home");
}

function EliminaUser(id){
    Delete(id);
}

function DeleteAccount(){
    let id = localStorage.user;
    Delete(id);
}

function ModificaUser(id){

    const dati = id.split("§");
    let username = dati[0];
    let password = dati[1];
    let role = dati[2];

    userDaModificare = username;
    document.getElementById("testoUser").innerHTML = "<b>Modify User</b>";
    document.getElementById("username").value = username;
    document.getElementById("password").value = password;
    document.getElementById("buttonUser").innerHTML = "Modify";
    document.getElementById("buttonBack").style.display = "inline";

    if(role == "user"){
        document.getElementById("user").checked = true;
    }
    else{
        document.getElementById("admin").checked = true;

    }
}

function AddUser(){
     let user = document.getElementById("username").value;
     let pass = document.getElementById("password").value;
     let role;
     if(user == "" || pass == ""){
        alert("Fill in te field 'Username' or 'Password'");
     }
     else{
        if(document.getElementById("userRole").checked == true){
            role = "user";
        }
        else{
            role = "admin";
        }

        if(document.getElementById("testoUser").outerHTML.length == 57)
        {
            fetch("/modifyUser?" + "userDaMo=" + userDaModificare + "&username=" + user + "&password=" + pass + "&role=" + role)
            .then(data => {
                    alert("User already registered");
            });
            if(userDaModificare == localStorage.user){
                Logout();
            }
        }
        else{
            fetch("/writeUser?" + "username=" + user + "&password=" + pass + "&role=" + role)
            .then(data => {
                    alert("User already registered");
            });
            
        }
        Back();
     }
}