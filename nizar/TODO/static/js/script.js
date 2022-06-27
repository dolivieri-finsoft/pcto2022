var modificare;

function myFunction() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function Richiesta(){
    
    const todoList = () => {
      fetch("/request")
          .then(response => response.json())
          .then(data => {
              html = "<tr><th id='titolo' colspan='5'>To Do</th></tr>";
                html1 = "<tr><th id='titolo' colspan='5'>Done</th></tr>";
  
              
              for (var i = 0; i < data.length; i++) {
                  const element = data[i];
                  if(element.stato == "todo"){
                    html += "<tr> <td>" + element.cosa + "</td>  <td class='elimina' id ='" + element.cosa + "' onclick='elimina(this.id)'>Delete</td> <td class='cambia' id ='" + element.cosa + "' onclick='cambia(this.id)'>Move </td> <td class='modifica' id ='" + element.cosa + "' onclick='modifica(this.id, 0)'>✏️</td> </tr>";
  
                  }else{
                    html1 += "<tr> <td>" + element.cosa + "</td> <td class='elimina' id ='" + element.cosa + "' onclick='elimina(this.id)'>Delete</td> <td class='modifica' id ='" + element.cosa + "' onclick='modifica(this.id, 1)'>✏️</td> </tr>";
  
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
    
    window.location.href = "../home/index.html";
    
  }


function aggiungi(){
    let cosa = document.getElementById('cosa').value;
    var select = document.getElementById("select").value;

    if(cosa == ""){
      alert("Compila il campo sottostante!!!");
    }
    else{
      if(document.getElementById("aggiungi").outerHTML.length == 75)
        {
            fetch("/write?" + "cosa=" + cosa + "&stato=" + select)
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
    fetch("/signin?" + "username=" + username + "&password=" + password)
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
      fetch("/login?" + "username=" + username)
    .then(response => response.json())
    .then(data => {
      
      
    if(data[0] == undefined){
        alert("Utente inesistente. Registrati");
    }
    else if(data[0].password == password){
      window.location.href = "../home/index.html";
    }
    else{
      alert("Email o Username Errati");
    }
    

  });
 }
}

function logout(){
  window.location.href = "../index.html";
}

 
  
