var cosaDaModificare;

function Richiedi(){
    const todoList = () => {
    fetch("/request")
     .then(response => response.json())
     .then(data => {
     htmlTodo = "<tr><th class='titolo' colspan='4'>To do</th></tr>";
     htmlDone = "<tr><th class='titolo' colspan='3'>Done</th></tr>";
     for (var i = 0; i < data.length; i++) {
         const element = data[i];
         if(element.stato == "todo"){
            htmlTodo += "<tr> <td>" + element.cosa + "</td> <td class='elimina' id='" + element.cosa + "' onclick='Elimina(this.id)'>✘</td> <td class='sposta' id='" + element.cosa + "' onclick='Sposta(this.id)'>✔</td> <td class='modifica' id='" + element.cosa + "' onclick='Modifica(this.id, false)'>↻</td> </tr>";

         }
         else{
            htmlDone += "<tr> <td>" + element.cosa + "</td> <td class='elimina' id='" + element.cosa + "' onclick='Elimina(this.id)'>✘</td> <td class='modifica' id='" + element.cosa + "' onclick='Modifica(this.id, true)'>↻</td> </tr>";

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
        alert("Fill in te field 'What'");
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
                if(data){
                    alert("Element already present in the lists");
                }
            });
        }
        else{
            fetch("/write?" + "cosa=" + cosa + "&stato=" + stato)
            .then(data => {
                if(data){
                    alert("Element already present in the lists");
                }
            });
            
        }
        window.location.reload();
     }
}

function Modifica(id, stato){
    cosaDaModificare = id;
    document.getElementById("testoR").innerHTML = "<b>Modify Element</b>";
    document.getElementById("cosa").value = id;
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