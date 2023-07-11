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
						{
							name: slugify.convertToSlug('Lanzar portfolio'),
							columns: {
								create: [
									{
										name: 'Todo',
										tasks: {
											create: [
												{
													title: 'Build UI for onboarding flow',
													description: 'Not Empty Description',
													status: 'Todo',
													subtasks: { create: [{ isCompleted: true, title: 'Subtask1' }] },
												},
												{
													title: 'Build UI for search',
													description: 'Not Empty Description',
													status: 'Todo',
													subtasks: { create: [{ isCompleted: false, title: 'Subtask2' }] },
												},
												{
													title: 'Build settings UI',
													description: 'Not Empty Description',
													status: 'Todo',
													subtasks: { create: [{ isCompleted: false, title: 'Subtask3' }] },
												},
											],
										},
									},
									{
										name: 'Done',
									},
									{
										name: 'Doing',
									},
								],
							},
						},
						{
							name: slugify.convertToSlug('Diseñar UI'),
						},
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
