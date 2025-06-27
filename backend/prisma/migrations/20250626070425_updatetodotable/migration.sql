/*
  Warnings:

  - You are about to alter the column `priority` on the `Todos` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `Todos` MODIFY `date` VARCHAR(191) NOT NULL,
    MODIFY `priority` ENUM('must', 'should', 'remind') NOT NULL DEFAULT 'must';
