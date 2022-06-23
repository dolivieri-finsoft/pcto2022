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
    const listaDone = document.createElement("ul");
    listaDone.id = "done-list";

    for(let obj of arrayElementi){
        let text = obj.cosa;
        //Creo elemento 'li' e aggiungo il testo, aggiungo 'li' a 'ul'
        const elementoLista = document.createElement("li");
        elementoLista.setAttribute('onclick', 'moveTask(this)');
        elementoLista.innerHTML = text;
        if(obj.stato == 'todo'){
            listaTodo.appendChild(elementoLista);
            continue;
        }
        listaDone.appendChild(elementoLista);
    }

    todoDiv.appendChild(listaTodo);
    doneDiv.appendChild(listaDone);
    document.getElementById('remove').setAttribute('onclick','toggleRemove(true)');
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

function toggleRemove(bool){
    listaTodo = document.getElementById('todo-list');
    listaDone = document.getElementById('done-list');
    self = document.getElementById('remove');

    for(let x of listaTodo.childNodes){
        if(bool){
            x.setAttribute('onclick','removeTask(this)');
            continue;
        }
        x.setAttribute('onclick','moveTask(this)');
    }

    for(let x of listaDone.childNodes){
        if(bool){
            x.setAttribute('onclick','removeTask(this)');
            continue;
        }
        x.setAttribute('onclick','moveTask(this)');
    }

    if(bool){
        self.setAttribute('onclick','toggleRemove(false)');
    }
    else{
        self.setAttribute('onclick','toggleRemove(true)');
    }
    document.getElementById('rename').setAttribute('onclick', 'toggleRename(true)')
}

function toggleRename(bool){
    listaTodo=document.getElementById('todo-list');
    listaDone=document.getElementById('done-list');
    self = document.getElementById('rename');

    for(let x of listaTodo.childNodes){
        if(bool){
            x.setAttribute('onclick', 'renameTask(this)');
            continue;
        }
        x.setAttribute('onclick', 'moveTask(this)');
    }
    
    for(let x of listaDone.childNodes){
        if(bool){
            x.setAttribute('onclick', 'renameTask(this)');
            continue;
        }
        x.setAttribute('onclick', 'moveTask(this)');
    }

    if(bool){
        self.setAttribute('onclick', 'toggleRename(false)');
    }else{
        self.setAttribute('onclick', 'toggleRename(true)');
    }
    document.getElementById('remove').setAttribute('onclick', 'toggleRemove(true)')
}

function renameTask(elemento){
    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/rename', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    let newTaskName = prompt("Inserisci un nuovo nome per la task: ");
    if(newTaskName == null || newTaskName == ''){
        return;
    }else{
        const send = {value: elemento.innerHTML, newValue: newTaskName};
        xhttp.send(JSON.stringify(send));
        fetchLists();
    }
    document.getElementById('rename').setAttribute('onclick', 'toggleRename(true)');
}