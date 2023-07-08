import { getUserSessionServer } from '@/actions/auth/auth-actions';
import { BoardsListCards } from '@/components';
import prisma from '@/lib/prisma';

export default async function KanbanPage() {
	const user = await getUserSessionServer();
	const boards = await prisma.board.findMany({ where: { userId: user.id }, select: { name: true, id: true } });
	return <div className='p-5'>{boards.length > 0 ? <BoardsListCards boards={boards} /> : 'No hay boards'}</div>;
}
