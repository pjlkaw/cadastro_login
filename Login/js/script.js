document.getElementById('btn-icon').addEventListener('click', function() {
    window.location.href = '../index.html';
});

document.addEventListener('DOMContentLoaded', function() {
    const btnSend = document.getElementById('btn-send');
    if (btnSend) {
        btnSend.addEventListener('click', function(event) {
            event.preventDefault();
            const inputUsername = document.getElementById('input-username');
            const inputPassword = document.getElementById('input-pass');

            if (!inputUsername || !inputPassword || !inputUsername.value.trim() || !inputPassword.value.trim()) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            const userData = { username: inputUsername.value.trim(), password: inputPassword.value.trim() };

            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            })
            .then(response => {
                if (!response.ok) { 
                    return response.json().then(errData => {
                        throw new Error(errData.message || 'Falha na requisição');
                    });
                }
                return response.json(); 
            })
            .then(data => {
                if (data.message === 'Login realizado com sucesso!') {
                    alert('Login realizado com sucesso!');
                    window.location.href = '../index.html';
                } else {
                    alert(data.message || 'Falha ao fazer login. Verifique suas credenciais.');
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                alert(error.message || 'Erro ao tentar fazer login.');
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