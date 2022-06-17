function createList() {
    console.log('eseguito')
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