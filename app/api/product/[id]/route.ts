import { NextRequest, NextResponse } from "next/server";
import prisma from "@/Lib/prisma";

export const GET = async (
	req: NextRequest,
	context: { params: { id: string } }
) => {
	const { id } = context.params;

    const product = await prisma.product.findUnique({
        where: {
            id,
        }
    });

	return NextResponse.json({ product });
};