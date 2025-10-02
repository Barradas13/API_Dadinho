import prisma from '../config/prismaClient.js';

export const createRodada = async (partidaId, numero) => {
  return await prisma.rodada.create({
    data: {
      partida_id: partidaId,
      numero_da_rodada: numero,
    }
  });
};

export const getRodadasByPartidaId = async (partidaId) => {
  return await prisma.rodada.findMany({
    where: { partida_id: parseInt(partidaId, 10) },
    include: { jogadas: true }
  });
};