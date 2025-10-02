import express from "express";
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env no início de tudo
dotenv.config();

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
// (Futuramente, você adicionará as rotas do jogo aqui)
// import gameRoutes from "./routes/game.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rotas de autenticação (ex: /register, /login)
app.use('/', authRoutes);

// Rotas de usuários (ex: /users, /users/1)
app.use('/users', userRoutes);

// (Futuramente...)
// app.use('/partidas', gameRoutes);


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});