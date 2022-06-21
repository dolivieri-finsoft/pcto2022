function Richiesta(){
    
    const todoList = () => {
    fetch("/request")
        .then(response => response.json())
        .then(data => {
            html = "<tr><th id='titolo' colspan='5'>To do</th></tr>";
              html1 = "<tr><th id='titolo' colspan='5'>Done</th></tr>";

            
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                if(element.stato == "todo"){
                  html += "<tr> <td>" + element.oggetto + "</td>  <td class='elimina' id ='" + element.oggetto + "' onclick='elimina(this.id)'>Delete</td> <td class='cambia' id ='" + element.cosa + "' onclick='cambia(this.id)'>Change </td> </tr>";

                }else{
                  html1 += "<tr> <td>" + element.oggetto + "</td> <td class='elimina' id ='" + element.oggetto + "' onclick='elimina(this.id)'>Delete</td>  </tr>";

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
    fetch("/delete?" + "oggetto=" + id)
    window.location.reload();
    
  }

function cambia(id){
    fetch("/cambia?" + "oggetto=" + id)
    window.location.reload();
    
  }


function aggiungi(){
    let cosa = document.getElementById('oggetto').value;
    var select = document.getElementById("select").value;

    if(oggetto == ""){
      alert("Compila il campo!!!");
    }
    else{
      fetch("/write?" + "cmd=newTodo&oggetto=" + oggetto + "&stato=" + select)
      window.location.reload();
 
  }

}