import { getUserSessionServer } from '@/actions/auth/auth-actions';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function KanbanPage() {
	const user = await getUserSessionServer();
	if (!user) {
		redirect('/api/auth/signin');
	}
	const boards = await prisma.board.findMany();
	return (
		<div>
			<h1>Hello Page Kanban</h1>
			{JSON.stringify(boards, null, 2)}
		</div>
	);
}
