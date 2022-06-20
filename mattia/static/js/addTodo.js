const checkInsert = (id) => {
    if (document.getElementById(id).value == "") return false;
    return true;
}

const saveTodo = () => {
    var cosa = document.getElementById('cosa').value;
    var stato = document.getElementById('stato').value;

    console.log(`Cosa: ${cosa}, Stato: ${stato}`);

    if (checkInsert('cosa') && checkInsert('stato')) {
        fetch("/json?" + "cmd=newTodo&cosa=" + cosa + "&stato=" + stato)
            .then(response => {
                if (response.status == 200 && response.statusText == "OK") {
                    window.location.href = '/home';
                }
            })
            .catch(error => console.log(error));
    }
    else alert("ERRORE: compilare tutti i campi");
}