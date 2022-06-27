const log = () => {
    var username = document.getElementById("Username").value;
    var password = document.getElementById("Password").value;

    if(username == "" || password == ""){
        alert("Inserire username e password")
    }else{
        fetch("/mysql?" +  "cmd=loginUser&username=" + username)
            .then(response => response.json())
            .then(data => {
                if(data[0] == undefined){
                    alert("Utente non esistente");
                }else if(password == data[0].Password){
                    salvaIdUtente();
                }else{
                    alert("Password errata");
                }
            });
    }
}

const salvaIdUtente = () =>{
    var username = document.getElementById("Username").value;
    fetch("/mysql?" + "cmd=getIdUtente&username="+ username)
    .then(response => response.json())
    .then(data => {
        localStorage.Id = data[0].IdUtente;
        localStorage.username = username;
        window.location.href = '/home';
    });
}
