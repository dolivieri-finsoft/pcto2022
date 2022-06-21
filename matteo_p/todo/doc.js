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
            var li = document.createElement("li");
            const ogg = new String(""+a.oggetto);
            li.setAttribute("id", ogg);
            li.innerHTML = a.oggetto;
            ulDone.appendChild(li);
        }
        else{
            var li =document.createElement("li");
            const ogg = new String(""+a.oggetto);
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
        var txt;
            var arrJson = json.todoList;
            var i = 0;
            for (var a of arrJson) {
                if(a.oggetto == x) {
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


        console.log(txt);
    }

    function deleteTask(i, json) {
        console.log(i)

        var arrJson = json.todoList;
        var arrJsonNew = arrJson;

        if (arrJsonNew[i].stato == "done") {
            arrJsonNew.splice(i, 1);
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