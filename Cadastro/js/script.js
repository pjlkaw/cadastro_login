document.getElementById('btn-icon').addEventListener('click', function(){
    window.location.href = '../index.html'
})

document.getElementById('btn-send').addEventListener('click', function(event){
    event.preventDefault(); // Previne o comportamento padrão do botão (se for um submit)
    const username = document.getElementById('input-username').value.trim();
    const password = document.getElementById('input-pass').value.trim();

    if (!username || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const userData = { username, password };

    // Enviar os dados para o backend via fetch
    fetch('http://localhost:3000/cadastro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Usuário cadastrado com sucesso') {
            alert('Cadastro realizado com sucesso!');
            // limpar o formulário
            document.getElementById('form').reset();
            window.location.href = '../index.html'; // Redireciona após o sucesso
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao cadastrar usuário');
    });
});


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