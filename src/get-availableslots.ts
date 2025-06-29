import dotenv from "dotenv";
import { PrismaClient } from "../shared/generated/prisma";
dotenv.config();
const prisma = new PrismaClient();
async function main() {
  const res = await prisma.slot.findFirst({
    where: {
      isAvailable: false,
    },
    include: {
      floor: {
        include: {
          building: {},
        },
      },
    },
  });
  console.log(res);
}
async function parkCar({ registrationNumber, ownerName }: any) {
  let res;
  res = await prisma.car.findUnique({
    where: {
      registrationNumber: registrationNumber,
    },
  });
  if (!res?.registrationNumber) {
    res = await prisma.car.create({
      data: {
        registrationNumber,
        ownerName,
      },
    });
  }
  let res2 = await prisma.slot.findFirst({
    where: {
      isAvailable: true,
    },
  });
  await prisma.slot.update({
    where: {
      id: res2?.id,
    },
    data: {
      isAvailable: false,
      carId: res?.id,
    },
  });

  console.log(res2);
}
async function getComments({ userId, parentId }: any) {
  const res = await prisma.chat.findMany({
    where: {
      parentId: parentId,
      userId: userId,
    },
    include: {
      comments: true,
    },
  });
  console.log(res);
}
getComments({ userId: "saleem", parentId: null })
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
