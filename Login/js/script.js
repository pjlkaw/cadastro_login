document.getElementById('btn-icon').addEventListener('click', function(){
    window.location.href = '../index.html';
});

document.getElementById('btn-send').addEventListener('click', function(event){
    event.preventDefault(); // Previne o comportamento padrão do botão (se for um submit)
    const username = document.getElementById('input-name').value.trim();
    const password = document.getElementById('input-pass').value.trim();

    if (!username || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const userData = { username, password };

    // Enviar os dados para o backend via fetch para a rota de LOGIN
    fetch('http://localhost:3000/Login', { // Alterado para /Login
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        if (response.status === 200 && data.message === 'Login realizado com sucesso!') { // Verifica o status e a mensagem
            alert('Login realizado com sucesso!');
            // Redirecionar para a página principal 
            window.location.href = '../index.html'; 
        } else {
            alert(data.message || 'Falha ao fazer login. Verifique suas credenciais.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao tentar fazer login.');
    });
})


function pass_icon() {
    const passInput = document.getElementById('input-pass');
    const icon = document.getElementById('pass-icon');

    if (passInput.type === 'password') {
        passInput.type = 'text';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    } else {
        passInput.type = 'password';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    }
}