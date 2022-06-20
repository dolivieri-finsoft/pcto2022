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

document.onload = Richiedi();