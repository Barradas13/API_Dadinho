import prisma from '../config/prismaClient.js';
import bcrypt from 'bcryptjs';

export const createUser = async (data) => {
  const hashedPassword = bcrypt.hashSync(data.senha, 10);
  return await prisma.user.create({
    data: {
      nome: data.nome,
      email: data.email,
      senha: hashedPassword,
    },
    select: { id: true, nome: true, email: true }
  });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: { id: true, nome: true, email: true }
  });
};

export const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id: parseInt(id, 10) },
    select: { id: true, nome: true, email: true }
  });
};

export const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email: email }
  });
};

export const updateUser = async (id, data) => {
  return await prisma.user.update({
    where: { id: parseInt(id, 10) },
    data: {
      nome: data.nome,
      email: data.email,
    },
    select: { id: true, nome: true, email: true }
  });
};

export const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id: parseInt(id, 10) }
  });
};