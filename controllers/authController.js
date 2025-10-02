import bcrypt from 'bcryptjs';
import { createUser, getUserByEmail } from "../models/userModel.js";
import { generateToken } from "../middleware/auth.js";

export const registerUser = async (req, res) => {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'Este e-mail já está em uso.' });
        }
        const newUser = await createUser({ nome, email, senha });
        const token = generateToken(newUser);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao registrar usuário.', error: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }
        const isPasswordCorrect = bcrypt.compareSync(senha, user.senha);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }
        const token = generateToken(user);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao fazer login.', error: error.message });
    }
};
