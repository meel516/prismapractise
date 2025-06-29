/*
  Warnings:

  - You are about to drop the column `slotId` on the `Car` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[carId]` on the table `Slot` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_slotId_fkey";

-- DropIndex
DROP INDEX "Car_slotId_key";

-- AlterTable
ALTER TABLE "Car" DROP COLUMN "slotId";

-- AlterTable
ALTER TABLE "Slot" ADD COLUMN     "carId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Slot_carId_key" ON "Slot"("carId");

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE SET NULL ON UPDATE CASCADE;
