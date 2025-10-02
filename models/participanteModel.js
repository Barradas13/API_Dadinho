import prisma from '../config/prismaClient.js';

export const getParticipante = async (partidaId, userId) => {
  return await prisma.participante.findUnique({
    where: {
      user_id_partida_id: {
        user_id: parseInt(userId, 10),
        partida_id: parseInt(partidaId, 10),
      }
    }
  });
};

export const updateNumeroDeDados = async (partidaId, userId, novoNumero) => {
  return await prisma.participante.update({
    where: {
      user_id_partida_id: {
        user_id: parseInt(userId, 10),
        partida_id: parseInt(partidaId, 10),
      }
    },
    data: { numero_de_dados: novoNumero }
  });
};