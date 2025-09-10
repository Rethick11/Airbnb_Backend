/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Booking` ADD COLUMN `key` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Booking_key_key` ON `Booking`(`key`);
