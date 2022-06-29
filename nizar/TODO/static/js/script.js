const { METHODS } = require("http");

var modificare;

if(localStorage.length == 0){
  localStorage.setItem("username", "");
  localStorage.setItem("ruolo", "");

}
function myFunction() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}



function Richiesta(){
  
  if(localStorage.ruolo == "admin"){
    document.getElementById('amministratore').style.display = "inline";
  }
  document.getElementById('h1').innerHTML = "To do / Done List by " + localStorage.username;
    
    const todoList = () => {
      fetch("/request")
          .then(response => response.json())
          .then(data => {
              html = "<tr><th id='titolo' colspan='5'>To Do</th></tr>";
                html1 = "<tr><th id='titolo' colspan='5'>Done</th></tr>";
  
              
              for (var i = 0; i < data.length; i++) {
                  const element = data[i];
                  
                  if(element.username == localStorage.username){
                  if(element.stato == "todo"){
                    html += "<tr> <td>" + element.cosa + "</td>  <td class='elimina' id ='" + element.cosa + "' onclick='elimina(this.id)'>Delete</td> <td class='cambia' id ='" + element.cosa + "' onclick='cambia(this.id)'>Move </td> <td class='modifica' id ='" + element.cosa + "' onclick='modifica(this.id, 0)'>✏️</td> </tr>";
  
                  }else{
                    html1 += "<tr> <td>" + element.cosa + "</td> <td class='elimina' id ='" + element.cosa + "' onclick='elimina(this.id)'>Delete</td> <td class='modifica' id ='" + element.cosa + "' onclick='modifica(this.id, 1)'>✏️</td> </tr>";
  
                  }
                }
              }
              
              document.getElementById("todoList").innerHTML = html;
              document.getElementById("todoList1").innerHTML = html1;
  
          })
          .catch(error => console.log(error));
  }
  
  document.onloadeddata = todoList();
  
    

}
  


function elimina(id){
    fetch("/delete?" + "cosa=" + id)
    window.location.reload();
    
  }

function cambia(id){
    fetch("/sposta?" + "cosa=" + id)
    window.location.reload();
    
  }

  function indietro(id){
    
    window.location.reload();
    
  }

  function indietroUtente(username){
    
    window.location.reload();
    
  }


function aggiungi(){
    let cosa = document.getElementById('cosa').value;
    var select = document.getElementById("select").value;

    let username = localStorage.username;

    if(cosa == ""){
      alert("Compila il campo sottostante!!!");
    }
    else{
      if(document.getElementById("aggiungi").outerHTML.length == 75)
        {
            fetch("/write?" + "cosa=" + cosa + "&stato=" + select + "&username=" + username)
            .then(data => {
              if(data){
                  alert("Elemento già presente nel Database");
              }
          });
        }
        else if (document.getElementById("aggiungi").outerHTML.length == 74)
        {

        fetch("/modifica?" + "modificare=" + modificare + "&cosa=" + cosa + "&stato=" + select)
        .then(data => {
          if(data){
              alert("Elemento già presente nel Database");
          }
      });

        }
      window.location.reload();
  }
}



function modifica(id, numero){
   
  
  document.getElementById('indietro').style.display = "inline";
  document.getElementById('logout').style.display = "none";


  modificare = id;
  let stato;
 
   if(numero == 0)
   {
    stato = "todo";
    document.getElementById('select').value = "todo";

   }
   else if(numero == 1){
    stato = "done";
    document.getElementById('select').value = "done";
   }
  document.getElementById('cosa').value = id;
  document.getElementById('aggiungi').innerHTML = "Modifica";
  document.getElementById('elemento').innerHTML = "Modifica Elemento";


  }


  function Signin(){


   var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

   
  if(username == "" || password == ""){
   alert("Compila i campi sottostanti!!!");
  }
  else{
    fetch("/signin?" + "username=" + username + "&password=" + password + "&ruolo=" + "")
    .then(response => response.json())
    .then(data => {
      if(data[0] == undefined){
        alert("Registrazione Effettuata");
      }
      else{
        alert("Utente già esistente");
      }
      
    });
  }

}

  function Login(){
   
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    if(username == "" || password == ""){
      alert("Compila i campi sottostanti!!!");
    }
    else{
      fetch("/login?" + "username=" + username,{
        method: 'POST',
      })
    .then(response => response.json())
    .then(data => {
      
    if(data[0] == undefined){
        alert("Utente inesistente. Registrati");
    }
    else if(password == data[0].password){
      localStorage.username = username;
      localStorage.ruolo = data[0].ruolo;
      

      window.location.replace("/home");

      
  }
    else{
      alert("Email o Username Errati");
    }

    });
}

}

function logout(){
  window.location.replace("/");
  localStorage.username = "";

}

function deleteAccount(){
   
  var valore = localStorage.username;

    
  fetch("/deleteAccount?" + "username=" + valore) 
  .then(response => response.json())
    .then(data => {  
    if(data[0] == undefined){
        alert("Account eliminato correttamente");
        window.location.href = "../index.html";

    }
    
    
  });

}

function admin(){
  window.location.replace("/admin");
}

function Exit(){
  window.location.replace("/home");
}

function Richiesta2(){
  document.getElementById('Exit').style.display = "inline";

      const todoList = () => {
          fetch("/request")
           .then(response => response.json())
           .then(data => {
           html = "<tr><th id='autore' colspan='1'>Autore</th><th id='titolo' colspan='8'>To do</th></tr>";
           html1 = "<tr><th id='autore' colspan='1'>Autore</th><th id='titolo' colspan='8'>Done</th></tr>";
           for (var i = 0; i < data.length; i++) {
               const element = data[i];
                  if(element.stato == "todo"){
                    html += "<tr> <td id='user'>" + element.username + "</td> <td>" + element.cosa + "</td>  <td class='elimina' id ='" + element.cosa + "' onclick='elimina(this.id)'>Delete</td> <td class='cambia' id ='" + element.cosa + "' onclick='cambia(this.id)'>Move </td> <td class='modifica' id ='" + element.cosa + "' onclick='modifica(this.id, 0)'>✏️</td> </tr>";
                   }
                   else{
                    html1 += "<tr> <td id='user'>" + element.username + "</td> <td>" + element.cosa + "</td> <td class='elimina' id ='" + element.cosa + "' onclick='elimina(this.id)'>Delete</td> <td class='modifica' id ='" + element.cosa + "' onclick='modifica(this.id, 1)'>✏️</td> </tr>";
                   }
           }
           document.getElementById("todoList").innerHTML = html;
          document.getElementById("todoList1").innerHTML = html1;
      
           })
           .catch(error => console.log(error));
          }
      
          document.onloadeddata = todoList();

          const utenti = () => {
            fetch("/lista")
             .then(response => response.json())
             .then(data => {
                 lista = "<tr><th id='titolo' colspan='8'>Autori</th></tr><tr><td id='lis'>Username</td><td id='lis'>Password</td><td id='lis'>Ruolo</td></tr>";
                 for (var i = 0; i < data.length; i++) {
                    const element = data[i]; 
                    lista += "<tr> <td>" + element.username + "</td> <td>" + element.password + "</td> <td>" + element.ruolo + "</td> <td class='elimina' id ='" + element.username + "' onclick='eliminaAutore(this.id)'>Delete</td> <td class='modifica' id ='" + element.username + "' onclick='modificaAutore(this.id)'>✏️</td>";    
                 }
                 document.getElementById("utenti").innerHTML = lista;
            
             })
             .catch(error => console.log(error));
             }
            
            document.onloadeddata = utenti();    
    }    

function eliminaAutore(id){

  if(id == localStorage.username){
  fetch("/deleteAccount?" + "username=" + id) 
  alert("Utente eliminato correttamente");
      window.location.replace("/");
  }
  else{
    fetch("/deleteAccount?" + "username=" + id) 
  alert("Utente eliminato correttamente");
      window.location.reload();   
  }
      

  };

  function aggiungiUtente(){

    let username = document.getElementById('userUtente').value;
    var password = document.getElementById("passUtente").value;
    var ruolo = document.getElementById("selectUtenti").value;
    

    if(username == "" || password == ""){
      alert("Compila i campi sottostanti!!!");
    }
    else if(document.getElementById("elemento1").outerHTML.length == 63)
        {
            fetch("/writeUtente?" + "username=" + username + "&password=" + password + "&ruolo=" + ruolo)
            .then(data => {
              if(data){
                  alert("Utente già registrato");
              }
          });
        }
        else if (document.getElementById("elemento1").outerHTML.length == 66)
        {

        fetch("/modificaUtente?" + "username=" + username + "&password=" + password + "&ruolo=" + ruolo + "&usernameVecchio=" + modificare)
        .then(data => {
          if(data){
              alert("Utente già registrato");
          }
      });
}
window.location.reload();

  }


function modificaAutore(id){

  document.getElementById('indietroUtente').style.display = "inline";


  document.getElementById('aggiungiUtente').innerHTML = "Modifica";
  document.getElementById('elemento1').innerHTML = "Modifica Utente"
  document.getElementById('userUtente').value = id;

 

  modificare = id;


  fetch("/trova?" + "username=" + id) 
  .then(response => response.json())
  .then(data => {
    document.getElementById('passUtente').value = data[0].password;
    
   if(data[0].ruolo == "admin"){
  document.getElementById('selectUtenti').value = "admin";
   }
   else{
  document.getElementById('selectUtenti').value = "utente";

}

  });



  }

  

 
  
