const todoList = () => {
    fetch("/json/data.json")
        .then(response => response.json())
        .then(data => {
            html = '<tr><th id="tt"></th></tr>';
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                // url=window.location.href;
                if(element.stato=="done" && window.location.href=="http://localhost:3000/fatte")
                {
                    document.getElementById("tt")=element.stato;
                    html += '<tr><td>' + element.cosa + '</td><td></td></tr>';
                }
                else if(element.stato=="todo" && window.location.href =="http://localhost:3000/dafare")
                {
                    document.getElementById("tt")=element.stato;
                    html += '<tr><td>' + element.cosa + '</td><td></td></tr>';                }
              
            }
            document.getElementById("todoList").innerHTML = html;
        })
        .catch(error => console.log(error));
}
document.onloadeddata = todoList();