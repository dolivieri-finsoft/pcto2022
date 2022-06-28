var modificare;

function Richiesta(){
    
    const todoList = () => {
    fetch("/request")
        .then(response => response.json())
        .then(data => { 
          console.log(data)
            html = "<tr><th>To Do</th></tr>";
              html1 = "<tr><th>Done</th></tr>";

            
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                if(element.stato == "todo"){
                  html += '<tr><td>' +element.cosa + '</td><td><button type="button" onclick="elimina( `'+element.id+'`);">Delete</button></td><td><button type="button" onclick="cambia( `'+element.id+'`);">Move</button></td></tr>';
                }
                else if (element.stato== "done"){
                  html1 += '<tr><td>' +element.cosa + '</td><td><button type="button" onclick="elimina(`'+element.id+'`);">Delete</button></td></tr>';
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
    fetch("/delete?" + "id=" + id)
    window.location.reload();
    
  }

function cambia(id){
    fetch("/sposta?" + "id=" + id)
    window.location.reload();
    
  }

  function indietro(id){
    
    window.location.href = "../index.html";
    
  }


function aggiungi(){
    var cosa = document.getElementById('cosa').value;
    var stato = document.getElementById('select').value;

    if(cosa == ""){
      alert("Compila il campo sottostante!!!");
    }
    else{
        {
            fetch("/write?" + "cosa=" + cosa + "&stato=" + stato)
        }window.location.reload();
  }
}

document.onloadedmetadata=Richiesta();



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
  //    fetch("/login?" + "username=" + username+"&password=" + password)
  //  .then(response => response.json())
  //  .then(data => {
     
     
  //  if(data[0] == undefined){
  //      alert("Utente inesistente. Registrati");
  //  }
  //  else if(data[0].password == password){
     window.location.href = "LISTASPESA/home/index.html";
  //  }
  //  else{
  //    alert("Email o Username Errati");
  //  }
   

//  });
}
}

function logout(){
 window.location.href = "LISTASPESA/index.html";
}
