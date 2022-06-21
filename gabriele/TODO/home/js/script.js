function Richiedi(){
    const todoList = () => {
    fetch("/request")
     .then(response => response.json())
     .then(data => {
     htmlTodo = "<tr><th id='titolo' colspan='3'>To do</th></tr>";
     htmlDone = "<tr><th id='titolo' colspan='2'>Done</th></tr>";
     for (var i = 0; i < data.length; i++) {
         const element = data[i];
         if(element.stato == "todo"){
            htmlTodo += "<tr> <td>" + element.cosa + "</td> <td class='elimina' id='" + element.cosa + "' onclick='Elimina(this.id)'>✘</td> <td class='sposta' id='" + element.cosa + "' onclick='Sposta(this.id)'>✔</td> </tr>";

         }
         else{
            htmlDone += "<tr> <td>" + element.cosa + "</td> <td class='elimina' id='" + element.cosa + "' onclick='Elimina(this.id)'>✘</td> </tr>";

         }
     }
     document.getElementById("todoList").innerHTML = htmlTodo;
     document.getElementById("doneList").innerHTML = htmlDone;

     })
     .catch(error => console.log(error));
    }

    document.onloadeddata = todoList();
}

function Elimina(id){
    fetch("/delete?" + "cosa=" + id)
    window.location.reload();
}
function Sposta(id){
    fetch("/change?" + "cosa=" + id)
    window.location.reload();
}
function Add(){
    let cosa = document.getElementById("cosa").value;
    let stato;
     if(cosa == ""){
        alert("Compilare il campo 'Cosa'");
     }
     else{
        if(document.getElementById("todo").checked == true){
            stato = "todo";
        }
        else{
            stato = "done";
        }
        fetch("/write?" + "cosa=" + cosa + "&stato=" + stato)
        window.location.reload();
     }

     
     document.getElementById("cosa").value = "";
     document.getElementById("todo").checked = true;

}