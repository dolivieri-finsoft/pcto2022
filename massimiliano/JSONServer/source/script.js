fetch('todo.json')
    .then(response => {
        if(!response.ok){
            throw new Error("Cant fecht " + response.status);
        }
        return response.json();
    })
    .then(json => initialize(json))
    .catch(err => console.error("Fetch error " + err.message));


function initialize(json){
    const arrayElementi = json.todoList;
    let listaTodo = document.createElement("ul");
    let listaDone = document.createElement("ul");

    for(let obj of arrayElementi){
        let text = obj.cosa;
        //Creo elemento 'li' e aggiungo il testo, aggiungo 'li' a 'ul'
        let elementoLista = document.createElement("li");
        elementoLista.innerHTML = text;
        if(obj.stato == 'todo'){
            listaTodo.appendChild(elementoLista);
            continue;
        }
        listaDone.appendChild(elementoLista);
    }

    //Aggiungo 'ul' al body del documento
    document.getElementById('todo-content').appendChild(listaTodo);
    document.getElementById('done-content').appendChild(listaDone);
}