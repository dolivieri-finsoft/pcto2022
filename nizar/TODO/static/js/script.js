
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
                  html += "<tr> <td>" + element.cosa + "</td>  <td class='elimina' id ='" + element.cosa + "' onclick='elimina(this.id)'>Delete</td> <td class='cambia' id ='" + element.cosa + "' onclick='cambia(this.id)'>Change </td> </tr>";

                }else{
                  html1 += "<tr> <td>" + element.cosa + "</td> <td class='elimina' id ='" + element.cosa + "' onclick='elimina(this.id)'>Delete</td>  </tr>";

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
    fetch("/cambia?" + "cosa=" + id)
    window.location.reload();
    
  }


function aggiungi(){
    let cosa = document.getElementById('cosa').value;
    var select = document.getElementById("select").value;

    if(cosa == ""){
      alert("Compila il campo!!!");
    }
    else{
      fetch("/write?" + "cmd=newTodo&cosa=" + cosa + "&stato=" + select)
      window.location.reload();
 
  }

}