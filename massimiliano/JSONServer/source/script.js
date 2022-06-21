const toggleCheck = {lastOp: null, check: true};

function fetchLists(){
    fetch('todo.json')
    .then(response => {
        if(!response.ok){
            throw new Error("Cant fecht " + response.status);
        }
        return response.json();
    })
    .then(json => initialize(json))
    .catch(err => console.error("Fetch error " + err.message));
}

function initialize(json){

    const todoDiv = document.getElementById('todo-content');
    const doneDiv = document.getElementById('done-content');

    if(todoDiv.childNodes.length > 1){
        todoDiv.childNodes[2].remove();
    }
    if(doneDiv.childNodes.length > 1){
        doneDiv.childNodes[2].remove();
    }

    const arrayElementi = json.todoList;
    const listaTodo = document.createElement("ul");
    listaTodo.id = "todo-list";
    listaTodo.style.display = 'none';
    const listaDone = document.createElement("ul");
    listaDone.id = "done-list";
    listaDone.style.display = 'none';

    for(let obj of arrayElementi){
        let text = obj.cosa;
        //Creo elemento 'li' e aggiungo il testo, aggiungo 'li' a 'ul'
        const elementoLista = document.createElement("li");
        elementoLista.innerHTML = text;
        if(obj.stato == 'todo'){
            listaTodo.appendChild(elementoLista);
            continue;
        }
        listaDone.appendChild(elementoLista);
    }
    if(listaTodo.childNodes.length >= 1){
        listaTodo.style.display = 'block';
    }
    if(listaDone.childNodes.length >= 1){
        listaDone.style.display = 'block';
    }
    todoDiv.appendChild(listaTodo);
    doneDiv.appendChild(listaDone);


    toggleCheck.lastOp = null;
    toggleCheck.check = true;
}

function addTask(){
    const xhttp = new XMLHttpRequest();
    xhttp.open('POST','/add',true);
    xhttp.setRequestHeader('Content-Type','application/json');
    let taskName = prompt("Inserire nuova task");
    if(taskName == null || taskName == ''){
        return;
    }
    else{
        const send = {value: taskName};
        const json = JSON.stringify(send);
        xhttp.send(json);
        fetchLists();
    }
}

function removeTask(elemento){
    const xhttp = new XMLHttpRequest();
    xhttp.open('POST','/remove',true);
    xhttp.setRequestHeader('Content-Type','application/json');
    if(confirm('Vuoi eliminare questa task?')){
        let taskName = elemento.innerHTML;
        const send = {value: taskName};
        const json = JSON.stringify(send);
        xhttp.send(json);
        fetchLists();
    } else {
        return;
    }
}

function moveTask(elemento){
    const xhttp = new XMLHttpRequest();
    xhttp.open('POST','/move',true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    let taskName = elemento.innerHTML;
    const send = {value: taskName};
    const json = JSON.stringify(send);
    xhttp.send(json);
    fetchLists();
}

function toggleRemove(button){
    listaTodo = document.getElementById('todo-list');
    listaDone = document.getElementById('done-list');
    self = button;

    if(toggleCheck.lastOp != 'remove'){
        toggleCheck.check = true;
    }

    for(let x of listaTodo.childNodes){
        if(toggleCheck.check){
            x.setAttribute('onclick','removeTask(this)');
            continue;
        }
        x.setAttribute('onclick','');
    }

    for(let x of listaDone.childNodes){
        if(toggleCheck.check){
            x.setAttribute('onclick','removeTask(this)');
            continue;
        }
        x.setAttribute('onclick','');
    }

    toggleCheck.lastOp = 'remove';
    toggleCheck.check = !toggleCheck.check;
}

function toggleMove(button){
    listaTodo = document.getElementById('todo-list');
    listaDone = document.getElementById('done-list');
    self = button;

    if(toggleCheck.lastOp != 'move'){
        toggleCheck.check = true;
    }

    for(let x of listaTodo.childNodes){
        if(toggleCheck.check){
            x.setAttribute('onclick','moveTask(this)');
            continue;
        }
        x.setAttribute('onclick','');
    }

    for(let x of listaDone.childNodes){
        if(toggleCheck.check){
            x.setAttribute('onclick','moveTask(this)');
            continue;
        }
        x.setAttribute('onclick','');
    }

    toggleCheck.lastOp = 'move';
    toggleCheck.check = !toggleCheck.check;
}