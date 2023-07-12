'use server';

import prisma from '@/lib/prisma';
import { getUserSessionServer } from '../auth/auth-actions';
import { revalidatePath } from 'next/cache';
import { slugify } from '@/utils';
import { notFound } from 'next/navigation';
import { Board, Task } from '@prisma/client';

export const getUserBoards = async (): Promise<Omit<Board, 'userId'>[]> => {
	const user = await getUserSessionServer();
	return await prisma.board.findMany({ where: { userId: user.id }, select: { id: true, name: true } });
};

export const createBoard = async (boardName: string) => {
	const user = await getUserSessionServer();
	const newBoard = await prisma.board.create({
		data: {
			name: slugify.convertToSlug(boardName),
			userId: user.id,
		},
	});
	revalidatePath('/kanban/boards');
	return newBoard;
};

export const getTaskById = async (taskId: string) => {
	const task = await prisma.task.findFirst({
		where: { id: taskId },
		select: { subtasks: true, title: true, description: true, status: true },
	});
	if (!task) {
		notFound();
	}

	return task;
};

export const toggleSubtaskCompleted = async (subtaskId: string, complete: boolean) => {
	const subtask = await prisma.subtask.update({
		where: { id: subtaskId },
		data: {
			isCompleted: complete,
		},
	});

	// TODO: This is throwing not found when using in SubtaskToggler client component
	revalidatePath('/kanban/boards/[boardName]');
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
