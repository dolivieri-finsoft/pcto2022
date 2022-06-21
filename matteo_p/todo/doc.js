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
    var ulDone = document.createElement("h2");
    var ulToDo = document.createElement("h2");
    for (var a of arr) {
        if (a.stato == "done") {
            var li = document.createElement("h3");
            const ogg = new String(""+a.oggetto+a.stato);
            li.setAttribute("id", ogg);
            li.innerHTML = a.oggetto;
            ulDone.appendChild(li);
        }
        else{
            var li = document.createElement("h3");
            const ogg = new String(""+a.oggetto+a.stato);
            li.setAttribute("id", ogg);
            li.innerHTML = a.oggetto;
            ulToDo.appendChild(li);
        }

        li.setAttribute("onclick", "functionButton2(id)");
}
    document.getElementById("done").appendChild(ulDone);
    document.getElementById("todo").appendChild(ulToDo);
}

function functionButton1() {
    console.log("add");

    fetch('todoList.json')
    .then( response => {
        if (!response.ok) {
            throw new Error("!: " + response.message);
        }
        return response.json();
    })
    .then( json => askAndCreate(json));

    function askAndCreate(json){
        
        let taskNew = prompt("Nome oggetto: ");

        if (taskNew != null || taskNew != "") {

            var x = {oggetto : taskNew, stato : "todo"};
            console.log(x.oggetto);
        }
        
        var arrJsonAddParse = json.todoList;
        arrJsonAddParse.push(x);
        const arrJsonAddParseKey = {todoList : arrJsonAddParse};
        var roberto = JSON.stringify(arrJsonAddParseKey);

        xhttp = new XMLHttpRequest();
        xhttp.open('POST', '/rewrite', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(roberto);
        location.reload();
    }
    
}

function functionButton2(x) {
    console.log("remove");
    console.log(x);

    fetch('todoList.json')
    .then( response => {
        if (!response.ok) {
            throw new Error("!: " + response.message);
        }
        return response.json();
    })
    .then( json => findTask(json, x) )

    function findTask(json, x) {
        var arrJson = json.todoList;
        var i = 0;
        for (var a of arrJson) {
            var xComp = new String(""+a.oggetto+a.stato)
            if(xComp == x) {
                fetch('todoList.json')
                    .then( response => {
                        if (!response.ok) {
                            throw new Error("!: " + response.message);
                        }
                        return response.json();
                    })
                    .then( json => deleteTask(i, json) )
                break;
            }
            else{
                i++;
            }
        }
    }

    function deleteTask(i, json) {

        var arrJson = json.todoList;
        var arrJsonNew = arrJson;

        if (arrJsonNew[i].stato == "done") {
            const conf = confirm("Rimuovere oggetto?");

            if(conf != null && conf == true) {
                arrJsonNew.splice(i, 1);
            }
            else {
                console.log("null");
            }
            
        }
        else if (arrJsonNew[i].stato == "todo"){
            arrJsonNew[i].stato = "done";
        }

        arrJson = arrJsonNew;
        const obj = {todoList: arrJson};
        var data = JSON.stringify(obj);

        xhttp = new XMLHttpRequest();
        xhttp.open('POST', '/rewrite', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(data);
        location.reload();
    }
}

function functionButton3() {
    console.log("bottone 3");

    const element = document.getElementsByTagName("h3");
    console.log(element.length);

    for (var i = 0; i < element.length; i++) {
        document.getElementsByTagName("h3")[i].style.color = "red";
        
        document.getElementsByTagName("h3")[i].setAttribute("onclick", "functionChange(id)")
    }
}

function functionChange(x) {
    console.log("change");
    console.log(x);

    fetch('todoList.json')
    .then( response => {
        if (!response.ok) {
            throw new Error("!: " + response.message);
        }
        return response.json();
    })
    .then( json => deleteTask(x, json) )

    function deleteTask(i, json) {

        var arrJson = json.todoList;
        var arrJsonNew = arrJson;
        var i = 0;
        for (var a of arrJson) {
            var xComp = new String(""+a.oggetto+a.stato);
            if (x == xComp) {
                arrJsonNew[i].oggetto = prompt("Inserire modifica: ", a.oggetto)
            }
            i++;
        }
        

        arrJson = arrJsonNew;
        const obj = {todoList: arrJson};
        var data = JSON.stringify(obj);

        xhttp = new XMLHttpRequest();
        xhttp.open('POST', '/rewrite', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(data);
        location.reload();
    }
}

function functionBlockScreen() {
    console.log("BlockScreen");
    document.getElementById("blockScreen").style.visibility = "hidden";
    document.getElementById("blockScreen").style.zIndex = "-999";
}

/*
{"todoList":[
    {"oggetto":"task0","stato":"todo"},
    {"oggetto":"task1","stato":"todo"},
    {"oggetto":"task2","stato":"done"},
    {"oggetto":"task3","stato":"todo"},
    {"oggetto":"task4","stato":"todo"},
    {"oggetto":"task5","stato":"done"},
    {"oggetto":"task6","stato":"todo"},
    {"oggetto":"task7","stato":"todo"}]}
*/