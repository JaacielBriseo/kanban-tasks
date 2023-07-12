import { getUserBoards } from '@/actions/kanban/kanban-actions';
import { BoardsListCards } from '@/components';

export default async function BoardsPage() {
	const boards = await getUserBoards();
	return <>{boards.length > 0 ? <BoardsListCards boards={boards} /> : 'No hay boards'}</>;
}
