import prisma from '../config/prismaClient.js';

export const createPartida = async (userIds, dadosIniciais = 5) => {
  return await prisma.partida.create({
    data: {
      status: "AGUARDANDO",
      participantes: {
        create: userIds.map((userId, index) => ({
          user_id: userId,
          numero_de_dados: dadosIniciais,
          ordem_no_turno: index + 1,
        }))
      }
    },
    include: {
        participantes: { include: { user: { select: { id: true, nome: true } } } }
    }
  });
};

export const getPartidaById = async (id) => {
  return await prisma.partida.findUnique({
    where: { id: parseInt(id, 10) },
    include: {
      vencedor: { select: { id: true, nome: true } },
      participantes: { include: { user: { select: { id: true, nome: true } } } },
      rodadas: { include: { jogadas: true } }
    }
  });
};

export const updatePartidaStatus = async (id, status) => {
  return await prisma.partida.update({
    where: { id: parseInt(id, 10) },
    data: { status: status }
  });
};

export const setVencedorPartida = async (id, vencedorId) => {
  return await prisma.partida.update({
    where: { id: parseInt(id, 10) },
    data: {
      status: "FINALIZADA",
      vencedor_id: vencedorId,
    }
  });
};