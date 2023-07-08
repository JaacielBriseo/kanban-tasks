import { getUserSessionServer } from '@/actions/auth/auth-actions';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

interface Props {
	params: { boardName: string };
}
export default async function BoardPage({ params }: Props) {
	const user = await getUserSessionServer();
	if (!user) {
		redirect('/api/auth/signin');
	}
	const board = await prisma.board.findFirst({ where: { name: params.boardName, userId: user.id } });
	console.log({ board });
	return (
		<div>
			<h1>Hello Page Board</h1>
		</div>
	);
}
