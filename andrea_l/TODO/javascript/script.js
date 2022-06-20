function Richiedi(){
    const todoList = () => {
    fetch("/request")
     .then(response => response.json())
     .then(data => {
     htmlTodo = "<tr><th id='titolo'>To do</th></tr>";
     htmlDone = "<tr><th id='titolo'>Done</th></tr>";
     for (var i = 0; i < data.length; i++) {
         const element = data[i];
         if(element.stato == "todo"){
            htmlTodo += "<tr> <td>" + element.cosa + "</td> </tr>";

         }
         else{
            htmlDone += "<tr> <td>" + element.cosa + "</td> </tr>";

         }
     }
     document.getElementById("todoList").innerHTML = htmlTodo;
     document.getElementById("doneList").innerHTML = htmlDone;

     })
     .catch(error => console.log(error));
    }

    document.onloadeddata = todoList();
}