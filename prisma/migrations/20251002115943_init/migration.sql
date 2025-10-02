-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `partidas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_inicio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL,
    `vencedor_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `participantes` (
    `user_id` INTEGER NOT NULL,
    `partida_id` INTEGER NOT NULL,
    `numero_de_dados` INTEGER NOT NULL,
    `ordem_no_turno` INTEGER NOT NULL,

    PRIMARY KEY (`user_id`, `partida_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rodadas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero_da_rodada` INTEGER NOT NULL,
    `partida_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jogadas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantidade_declarada` INTEGER NOT NULL,
    `valor_do_dado` INTEGER NOT NULL,
    `foi_duvidada` BOOLEAN NOT NULL DEFAULT false,
    `rodada_id` INTEGER NOT NULL,
    `jogador_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `partidas` ADD CONSTRAINT `partidas_vencedor_id_fkey` FOREIGN KEY (`vencedor_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `participantes` ADD CONSTRAINT `participantes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `participantes` ADD CONSTRAINT `participantes_partida_id_fkey` FOREIGN KEY (`partida_id`) REFERENCES `partidas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rodadas` ADD CONSTRAINT `rodadas_partida_id_fkey` FOREIGN KEY (`partida_id`) REFERENCES `partidas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jogadas` ADD CONSTRAINT `jogadas_rodada_id_fkey` FOREIGN KEY (`rodada_id`) REFERENCES `rodadas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jogadas` ADD CONSTRAINT `jogadas_jogador_id_fkey` FOREIGN KEY (`jogador_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
