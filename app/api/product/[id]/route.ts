import prisma from "@/Lib/prisma";

export const GET = async (
	req: Request,
	{ params }: { params: { id: string } }
) => {
	const res = Response;
	const routeParams = await params;
    const { id } = routeParams;

    const product = await prisma.product.findUnique({
        where: {
            id,
        }
    });

	return res.json({ product });
};