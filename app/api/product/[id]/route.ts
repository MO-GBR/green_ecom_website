import { NextRequest, NextResponse } from "next/server";
import prisma from "@/Lib/prisma";

export const GET = async (
	req: NextRequest,
	context: { params: Promise<{ id: string }> }
) => {
	const { id } = await context.params;

    const product = await prisma.product.findUnique({
        where: {
            id,
        }
    });

	return NextResponse.json({ product });
};