import prisma from '@/Lib/prisma';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
    const products = await prisma.product.findMany();

	return NextResponse.json({ products });
};