import { PRODUCTS } from "@/constants";
import prisma from "@/Lib/prisma";

export const main = async () => {
    // CRUD
    // await prisma.product.createMany({
    //     data: PRODUCTS
    // });
    console.log('Prisma Process Done !!!');
};

main()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });