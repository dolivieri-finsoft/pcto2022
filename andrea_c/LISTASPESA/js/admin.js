const check = () => {
    let idaccesso = localStorage.getItem('IDaccesso');
    let control = localStorage.getItem('controllo');
    let role = localStorage.getItem('ruolo');
    if (control == "no") {
        alert('Loggati bastardo');
        window.location.href = '/';
    }
    else if (role != 'admin' && role != 'creator') {
        alert('Non sei un admin, bastardo');
        window.location.href = '/home';
    }
}
document.onloadeddata = check();


const utenti = () => {
    let idaccesso = localStorage.getItem('IDaccesso');
    let control = localStorage.getItem('controllo');
    let role = localStorage.getItem('ruolo');
    fetch("/json?" + "cmd=tabUtenti")
        .then(response => response.json())
        .then(data => {
            if (role == 'creator') {
                html = '<tr><th>Username&nbsp&nbsp&nbsp&nbsp&nbsp</th><th>ID&nbsp&nbsp&nbsp&nbsp&nbsp</th><th>Ruolo&nbsp&nbsp&nbsp&nbsp&nbsp</th><th>Cambia ruolo</th></tr>';
                for (var i = 0; i < data.length; i++) {
                    const element = data[i];
                    if (element.ruolo == 'none' || element.ruolo == 'admin') {
                        html += '<tr><td>' + element.username + '</td><td>' + element.id + '</td><td>' + element.ruolo + '</td><td><button type="button" onclick="adminizza(`' + element.id + '`);">Cambia</button></td></tr>';
                    }
                    else if (element.ruolo == 'creator') {
                        html += '<tr><td>' + element.username + '</td><td>' + element.id + '</td><td>' + element.ruolo + '</td><td class="trattino">-</td></tr>';
                    }
                }
            }
            else if (role == 'admin') {
                html = '<tr><th>Username&nbsp&nbsp&nbsp&nbsp&nbsp</th><th>ID&nbsp&nbsp&nbsp&nbsp&nbsp</th><th>Ruolo&nbsp&nbsp&nbsp&nbsp&nbsp</th></tr>';
                for (var i = 0; i < data.length; i++) {
                    const element = data[i];
                    html += '<tr><td>' + element.username + '</td><td>' + element.id + '</td><td>' + element.ruolo + '</td></tr>';

                }
            }
            document.getElementById("utenti").innerHTML = html;
        })
        .catch(error => console.log(error));
}

document.onloadeddata = utenti();
function aggiornaLista() {
    utenti();
    console.log('aggiornata');
    let idaccesso = localStorage.getItem('IDaccesso');
    console.log(idaccesso);
}
const adminizza = (id) => {
    let idaccesso = localStorage.getItem('IDaccesso');
    let control = localStorage.getItem('controllo');
    let role = localStorage.getItem('ruolo');

    fetch("/json?" + "cmd=controlRole&id=" + id)
        .then(response => response.json())
        .then(data => {
            if (data[0].ruolo == 'none') {
                fetch("/json?" + "cmd=adminizzaN&id=" + id)
                    .then(response => {
                        if (response.status == 200 && response.statusText == "OK") {
                            aggiornaLista();
                        }
                    })
            }
            else if (data[0].ruolo == 'admin') {
                fetch("/json?" + "cmd=adminizzaA&id=" + id)
                    .then(response => {
                        if (response.status == 200 && response.statusText == "OK") {
                            aggiornaLista();
                        }
                    })
            }
        }).catch (error => console.log(error));
}