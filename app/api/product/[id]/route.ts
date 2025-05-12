import { NextRequest, NextResponse } from "next/server";
import prisma from "@/Lib/prisma";

export const GET = async (
	req: NextRequest,
	{ params }: { params: { id: string } }
) => {
	const routeParams = await params;
    const { id } = routeParams;

    const product = await prisma.product.findUnique({
        where: {
            id,
        }
    });

	return NextResponse.json({ product });
};