// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const usersPath = path.join(__dirname, 'users.json');

// Rota de cadastro
app.post('/Cadastro', (req, res) => { 
    const { username, password } = req.body;

    const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));

    const userExists = users.some(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ message: 'Usuário já existe' });
    }

    users.push({ username, password });
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
});

// Rota de login
app.post('/Login', (req, res) => { 
    const { username, password } = req.body;

    const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));

    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Usuário ou senha incorretos' });
    }
    return res.status(200).json({ message: 'Login realizado com sucesso!' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});