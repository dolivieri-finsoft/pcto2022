const todoList = () => {
    fetch("/json/data.json")
        .then(response => response.json())
        .then(data => {
            if (window.location.href == "http://localhost:3000/fatte") {
                html = '<tr><th>QUEST COMPLETATE</th><th>DELETE QUEST</th></tr>';
            }
            else if (window.location.href == "http://localhost:3000/dafare") {
                html = '<tr><th>QUEST IN CORSO</th><th>CHANGE STATUS</th><th>DELETE QUEST</th></tr>';
            }
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                if (element.stato == "done" && window.location.href == "http://localhost:3000/fatte") {
                    html += '<tr><td>' + element.cosa + '</td><td></td></tr>';
                }
                else if (element.stato == "todo" && window.location.href == "http://localhost:3000/dafare") {
                    html += '<tr><td>' + element.cosa + '</td><td></td><td></td></tr>';
                }

            }
            document.getElementById("todoList").innerHTML = html;
        })
        .catch(error => console.log(error));
}
document.onloadeddata = todoList();

const saveTodo = () => {
    var cosa = document.getElementById('chore').value;
    var stato = 'todo';

    console.log(`Cosa: ${cosa}, Stato: ${stato}`);

    if (cosa=="")
    {
        alert("ERRORE: compilare correttamente");
    } 
    else
    {
        fetch("/json/data.json" + "cmd=newTodo&cosa=" + cosa + "&stato=" + stato)
            .then(response => {
                if (response.status == 200 && response.statusText == "OK") {
                    console.log('added');
                }
                else
                {
                    console.log('error');
                }
            })
            window.location.reload();
    }
}