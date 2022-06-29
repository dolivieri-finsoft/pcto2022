function fun_link() {
    if(localStorage.access == 'admin'){
        document.getElementById('userManagerli').style.display = 'block'
    }
}
    
document.onload = fun_link();