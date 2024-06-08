function logar(){ 

    var login = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

    if(login == "" && senha == ""){
        alert('Sucesso.');
        location.href = "favoritos.html";
    }else{
        alert('Usuário ou senha incorretos.')
    }
}
