//#region animazioni menu
$("#menu_login").click(function(){
    console.log('prova')
    $("#logIN").fadeIn(700)
    $("#signIN").hide()
});
$("#menu_signin").click(function(){
    console.log('prova')
    $("#signIN").fadeIn(700)
    $("#logIN").hide()
});
//#endregion
const checkInsert = (id) => {
    if (document.getElementById(id).value == "") return false;
    return true;
}

var currentUser;

//#region funzioni log e sign
const fun_log_IN = () =>{
    var user = document.getElementById('user_log').value;
    var password = document.getElementById('password_log').value;

    console.log(`user: ${user}, password: ${password}`);

    if (checkInsert('user_log') && checkInsert('password_log')) {
        fetch("/data?" + "cmd=check_user&user=" + user + "&password=" + password )
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if(data != 0){
                    window.location.replace("/home");
                    currentUser = data;
                    console.log(currentUser);
                }
                else{
                    document.getElementById("error").innerText = "ERRORE!!!";
                }
            })
            .catch(error => console.log(error));
    }
    else alert("ERRORE: compilare tutti i campi");
}



const fun_sign_IN = () =>{
    var user = document.getElementById('user_sign').value;
    var password = document.getElementById('password_sign').value;

    console.log(`user: ${user}, password: ${password}`);

    if (checkInsert('user_sign') && checkInsert('password_sign')) {
        fetch("/data?" + "cmd=add_user&user=" + user + "&password=" + password )
            .then(response => {
                if (response.status == 200 && response.statusText == "OK") {
                    console.log('eseguito correttamente');
                    document.getElementById("error").innerText = "Registrazione effettuata, logga";
                }
            })
            .catch(error => console.log(error));
            
    }
    else alert("ERRORE: compilare tutti i campi");
}
//#endregion