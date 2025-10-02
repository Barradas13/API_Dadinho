import { getAllUsers, getUserById, updateUser, deleteUser } from "../models/userModel.js";

export const listAllUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuários.' });
    }
};

export const findUserById = async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "Usuário não encontrado." });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuário.' });
    }
};

export const updateUserData = async (req, res) => {
    const targetUserId = parseInt(req.params.id, 10);
    if (req.user.id !== targetUserId) {
        return res.status(403).json({ message: 'Acesso negado. Você só pode atualizar seus próprios dados.' });
    }
    try {
        const updatedUser = await updateUser(req.params.id, req.body);
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar usuário.' });
    }
};

export const deleteUserData = async (req, res) => {
    const targetUserId = parseInt(req.params.id, 10);
    if (req.user.id !== targetUserId) {
        return res.status(403).json({ message: 'Acesso negado. Você só pode deletar sua própria conta.' });
    }
    try {
        await deleteUser(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar usuário.' });
    }
};