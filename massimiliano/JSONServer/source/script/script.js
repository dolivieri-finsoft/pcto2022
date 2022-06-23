const toggleCheck = {lastOp: null, check: true};

window.onload = fetchLists(); 

function fetchLists(){
    fetch('/requestData')
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

    //Svuota liste
    if(todoDiv.childNodes.length > 1){
        todoDiv.childNodes[2].remove();
    }
    if(doneDiv.childNodes.length > 1){
        doneDiv.childNodes[2].remove();
    }

    const arrayElementi = json;
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
    let taskName = prompt("Inserire nuova task");
    if(taskName == null || taskName == ''){
        return;
    }
    else{
        const send = {value: taskName};
        const json = JSON.stringify(send);
        
        fetch('/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        }).then(()=> fetchLists());
    }
}

function removeTask(elemento){
    if(confirm('Vuoi eliminare questa task?')){
        let taskName = elemento.innerHTML;
        let taskStatus = elemento.parentNode.id.slice(0,-5);
        const send = {value: taskName, type: taskStatus};
        const json = JSON.stringify(send);

        fetch('/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        }).then(()=> fetchLists());

    } else {
        return;
    }
}

function moveTask(elemento){
    let taskName = elemento.innerHTML;
    let tasktype = elemento.parentNode.id.slice(0,-5);
    const send = {value: taskName, type: tasktype};
    const json = JSON.stringify(send);
    
    fetch('/move', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: json
    }).then(()=> fetchLists());
}

function renameTask(elemento){
    let oldName = elemento.innerHTML;
    let tasktype = elemento.parentNode.id.slice(0,-5);
    let newName = prompt('Inserire nuovo nome');
    if(newName == null || newName == ''){
        return;
    } else {
        const send = {oldValue: oldName, value: newName, type: tasktype};
        const json = JSON.stringify(send);

        fetch('/rename', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        }).then(()=> fetchLists());
    }
}

function toggleRemove(){
    listaTodo = document.getElementById('todo-list');
    listaDone = document.getElementById('done-list');

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

function toggleMove(){
    listaTodo = document.getElementById('todo-list');
    listaDone = document.getElementById('done-list');

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

function toggleRename(){
    listaTodo = document.getElementById('todo-list');
    listaDone = document.getElementById('done-list');

    if(toggleCheck.lastOp != 'rename'){
        toggleCheck.check = true;
    }

    for(let x of listaTodo.childNodes){
        if(toggleCheck.check){
            x.setAttribute('onclick','renameTask(this)');
            continue;
        }
        x.setAttribute('onclick','');
    }

    for(let x of listaDone.childNodes){
        if(toggleCheck.check){
            x.setAttribute('onclick','renameTask(this)');
            continue;
        }
        x.setAttribute('onclick','');
    }

    toggleCheck.lastOp = 'rename';
    toggleCheck.check = !toggleCheck.check;
}