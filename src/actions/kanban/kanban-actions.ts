'use server';

import prisma from '@/lib/prisma';
import { getUserSessionServer } from '../auth/auth-actions';
import { revalidatePath } from 'next/cache';
import { slugify } from '@/utils';
import { notFound } from 'next/navigation';

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

export const toggleSubtaskCompleted = async (subtaskId: string, complete: boolean) => {
	const subtask = await prisma.subtask.update({
		where: { id: subtaskId },
		data: {
			isCompleted: complete,
		},
	});

	revalidatePath('/kanban');
	return subtask;
};

export const changeTaskStatus = async (taskId: string, newColumnId: string, newStatus: string) => {
	const task = await prisma.task.update({
		where: { id: taskId },
		data: { columnId: newColumnId, status: newStatus },
	});
	revalidatePath('/kanban');
	return task;
};

export const getBoardByName = async (boardName: string) => {
	const user = await getUserSessionServer();

	const board = await prisma.board.findFirst({
		where: { name: boardName, userId: user.id },
		select: {
			columns: {
				select: {
					id: true,
					name: true,
					tasks: {
						select: {
							description: true,
							id: true,
							status: true,
							title: true,
							subtasks: { select: { isCompleted: true, title: true, id: true } },
						},
					},
				},
			},
		},
	});
	if (!board) {
		notFound();
	}
	return board;
};
