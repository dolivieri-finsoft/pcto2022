

fetch('todoList.json')
.then( response => {
    if (!response.ok) {
        throw new Error("!: " + response.message);
    }
    return response.json();
})
.then( json => initialize(json) )
.catch( err => console.error("!!!: " + err.message) );

function initialize(json) {
    var arr = json.todoList;
    var ulDone = document.createElement("ul");
    var ulToDo = document.createElement("ul");
    for (var a of arr) {
        if (a.stato == "done") {
            var li =document.createElement("li");
            li.innerHTML = a.oggetto;
            ulDone.appendChild(li);
        }
        else{
            var li =document.createElement("li");
            li.innerHTML = a.oggetto;
            ulToDo.appendChild(li);
        }
        document.getElementById("done").appendChild(ulDone);
        document.getElementById("todo").appendChild(ulToDo);
    }
}