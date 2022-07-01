var data = new Date();
var g, m, a, h, m, s;
g = data.getDate() + "/";
m = data.getMonth() + 1 + "/";
a = data.getFullYear();
document.write("Oggi è il " + g + m + a + ", e sarebbe anche l'ora che tu facessi qualcosa");

const controllazione = () => {
    let idaccesso = localStorage.getItem('IDaccesso');
    let control = localStorage.getItem('controllo');
    let role = localStorage.getItem('ruolo');
    if (control == "no") {
        alert('Loggati bastardo');
        window.location.href = '/';
    }
    else if (role == 'admin'||role == 'creator') {
        admin = document.getElementById("adminSpace");
        admin.style.display = "block";
    }
}
document.onloadeddata = controllazione();

const out = () => {
    let idaccesso = localStorage.getItem('IDaccesso');
    let control = localStorage.getItem('controllo');
    let role = localStorage.getItem('ruolo');
    localStorage.controllo = "no";
}