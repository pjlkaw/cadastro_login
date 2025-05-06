document.getElementById('btn-icon').addEventListener('click', function(){
    window.location.href = '../index.html';
});

document.addEventListener('DOMContentLoaded', function() {
    const btnSend = document.getElementById('btn-send');
    if (btnSend) {
        btnSend.addEventListener('click', function(event) {
            event.preventDefault();
            const usernameInput = document.getElementById('input-username');
            const passwordInput = document.getElementById('input-pass');

            if (!usernameInput || !passwordInput || !usernameInput.value.trim() || !passwordInput.value.trim()) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            const userData = { username: usernameInput.value.trim(), password: passwordInput.value.trim() };

            fetch('http://localhost:3000/Cadastro', { 
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
                    const form = document.getElementById('form');
                    if (form) {
                        form.reset();
                    }
                    window.location.href = '../index.html';
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Erro ao cadastrar usuário');
            });
        });
    }

    const passIcon = document.getElementById('pass-icon');
    if (passIcon) {
        passIcon.addEventListener('click', function() {
            const passInput = document.getElementById('input-pass');
            if (passInput) {
                if (passInput.type === 'password') {
                    passInput.type = 'text';
                    passIcon.classList.remove('fa-eye-slash');
                    passIcon.classList.add('fa-eye');
                } else {
                    passInput.type = 'password';
                    passIcon.classList.remove('fa-eye');
                    passIcon.classList.add('fa-eye-slash');
                }
            }
        });
    }
});
