import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { slugify } from '@/utils';

export async function GET(request: Request) {
	await prisma.board.deleteMany();
	await prisma.user.deleteMany();

	try {
		await prisma.user.create({
			data: {
				email: 'test1@google.com',
				password: bcrypt.hashSync('abc123'),
				name: 'test1',
				boards: {
					create: [
						{ name: slugify.convertToSlug('Lanzar portfolio') },
						{ name: slugify.convertToSlug('Diseñar UI') },
						{ name: slugify.convertToSlug('Elegir CSS') },
					],
				},
			},
		});
	} catch (error) {
		return NextResponse.error();
	}

	return new Response(
		JSON.stringify({
			message: 'SEED',
		}),
		{ status: 200 }
	);
}
