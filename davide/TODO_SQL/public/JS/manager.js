function fun_link() {
    if(localStorage.role == 'admin'){
        document.getElementById('userManagerli').style.display = 'block'
    }
    console.log(localStorage.user);
}
    
document.onload = fun_link();

function fun_tab_user() {
    fetch("/data?" + "cmd=getUser")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            html = '<table>'
            html += '<tr><th>USERNAME</th><th>ROLE</th></tr>';
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                if (element.role == "admin") html += '<tr><td>' + element.username + '</td><td>' + element.role + '</td></tr>';
            }
            for (var i = 0; i < data.length; i++){
                const element = data[i];
                if(element.role == "user") html += '<tr><td>' + element.username + '</td><td>' + element.role + '</td></tr>';
            }
            html += '</table>'
            document.getElementById("tabellauser").innerHTML = html;
        })
        .catch(error => console.log(error));
}