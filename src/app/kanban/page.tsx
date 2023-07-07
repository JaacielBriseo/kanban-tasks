import prisma from '@/lib/prisma';

export default async function KanbanPage() {
	const boards = await prisma.board.findMany();
	return (
		<div>
			<h1>Hello Page Kanban</h1>
			{JSON.stringify(boards, null, 2)}
		</div>
	);
}
