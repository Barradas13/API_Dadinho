import prisma from '../config/prismaClient.js';

export const createJogada = async (data) => {
  return await prisma.jogada.create({
    data: {
      rodada_id: data.rodadaId,
      jogador_id: data.jogadorId,
      quantidade_declarada: data.quantidade,
      valor_do_dado: data.valor,
    }
  });
};

export const getJogadasByRodadaId = async (rodadaId) => {
  return await prisma.jogada.findMany({
    where: { rodada_id: parseInt(rodadaId, 10) },
    include: { jogador: { select: { id: true, nome: true } } }
  });
};