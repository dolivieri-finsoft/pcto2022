function rolefrontend() {
    if(role == 'admin'){
        console.log("<%= role %>");
        document.getElementById("userManagerli").style.display = "none";
    }
}
document.onload(rolefrontend());