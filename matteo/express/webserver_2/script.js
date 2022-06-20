function initialize(x){
                    
    var list = document.createElement("ul");
    var list2 = document.createElement("ol");
    for(i = 0; i < x.tasks.length; i++){
        if(x.tasks[i].stato == "todo"){
            var str = "" + x.tasks[i].cosa;
            var child = document.createElement("li");
            child.setAttribute("id", str);
            child.innerHTML = x.tasks[i].cosa;
            child.setAttribute("onclick", "elimina(id)");
            list.appendChild(child);
            document.getElementById("todo-location").appendChild(list);
        } else{
            var str = "" + x.tasks[i].cosa;
            var child = document.createElement("l1");
            child.setAttribute("id", str);
            child.innerHTML = x.tasks[i].cosa;
            child.setAttribute("onclick", "elimina(id)");
            list2.appendChild(child);
            document.getElementById("done-location").appendChild(list2);
        }
    }
}

function elimina(x){
let text ="Vuoi eliminare l'elemento?";
if(confirm(text) == true){
    checkName(x);
    window.location.reload();
}
}

function checkName(x){
console.log(x);
fetch('data.json')
.then(response => {
    if(!response.ok){
        throw new Error('Errore fetch ' +response.status);
    }
    return response.json();
})
.then(json => {
    var obj = json;
    var auxvect = [0];
    for(i = 0; i < obj.tasks.length; i++){
        console.log(i);
        if(obj.tasks[i].cosa == x){
            obj.tasks.splice(i,1);
        }

    }
    console.log(obj.tasks);

    

    xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/rewrite', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(obj));


})
.catch(err => console.error('Errore creazione tabella' + err.message));


}

fetch('data.json')
.then(response => {
    if(!response.ok){
        throw new Error('Errore fetch ' +response.status);
    }
    return response.json();
})
.then(json => initialize(json))
.catch(err => console.error('Errore creazione tabella' + err.message));

function addTask(){
const request = new XMLHttpRequest();

var task = prompt("scrivi la roba");


var oggettoDaMandare = {
    cosa : task,
    
}
console.log(oggettoDaMandare.stato);

var oggettoStringato = JSON.stringify(oggettoDaMandare);
console.log(oggettoStringato);
request.open('POST', '/aaaa', true);
request.setRequestHeader('Content-Type', 'application/json');
request.send(oggettoStringato);
window.location.reload();
}