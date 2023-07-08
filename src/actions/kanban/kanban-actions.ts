'use server';

import prisma from '@/lib/prisma';
import { getUserSessionServer } from '../auth/auth-actions';
import { revalidatePath } from 'next/cache';
import { slugify } from '@/utils';

export const createBoard = async (boardName: string) => {
	const user = await getUserSessionServer();
	const newBoard = await prisma.board.create({
		data: {
			name: slugify.convertToSlug(boardName),
			userId: user.id,
		},
	});
	revalidatePath('/kanban');
	return newBoard;
};
