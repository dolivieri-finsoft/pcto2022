const checkInsert = (id) => {
    if (document.getElementById(id).value == "") return false;
    return true;
}

const saveTodo = () => {
    cosa = document.getElementById('cosa').value;
    stato = document.getElementById('stato').value;

    console.log(`Cosa: ${cosa}, Stato: ${stato}`);

    if (checkInsert('cosa') && checkInsert('stato')) {
        fetch(`/mysql?cmd=newTodo&cosa=${cosa}&stato=${stato}`)
            .then(response => response.json())
            .then(data => {
                if (data.status == 200) {
                    window.location.href = '/home';
                } else if (data.status == 500) {
                    console.log(data.error);
                    alert(data.error);
                }
            })
            .catch(error => console.log(error));
    }
    else alert("ERRORE: compilare tutti i campi");
}