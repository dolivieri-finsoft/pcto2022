function createList() {
    fetch("/data")
    .then(response => response.json())
    .then(data => {
        html = "<ul>";
        for (var i = 0; i < data.length; i++) {
            const element = data[i];
            html += "<li>" + element.stato + ": " + element.cosa + "</li>";
        }
        html += "</ul>";
        document.getElementById("todo-content").innerHTML = html;
    })
    .catch(error => console.log(error));
}

document.onloadeddata = createList();

function CreateTab() {
    fetch("/data?" + "cmd=getList")
    .then(response => response.json())
    .then(data => {
        html = "<table>";
        html += "<th>task</th><th>status</th>"
        for (var i = 0; i < data.length; i++) {
            const element = data[i];
            html += "<tr><td>" + element.cosa + "</td><td>" + element.stato + "</td><tr>";
        }
        html += "</table>";
        document.getElementById("todo-content").innerHTML = html;
    })
    .catch(error => console.log(error));
}

document.onloadeddata = CreateTab()