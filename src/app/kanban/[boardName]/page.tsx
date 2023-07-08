import { getUserSessionServer } from '@/actions/auth/auth-actions';
import prisma from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';

interface Props {
	params: { boardName: string };
}
export default async function BoardPage({ params }: Props) {
	const user = await getUserSessionServer();

	const board = await prisma.board.findFirst({
		where: { name: params.boardName, userId: user.id },
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
							subtasks: { select: { isCompleted: true } },
						},
					},
				},
			},
		},
	});
	if (!board) {
		notFound();
	}
	return (
		<div className='p-5'>
			<div className='flex gap-5'>
				{board.columns.map(col => (
					<div key={col.id} className='flex flex-col space-y-3 min-w-[300px]'>
						<p className='text-MediumGrey uppercase font-bold text-sm'>
							{col.name} ({col.tasks.length})
						</p>
						<ul className='space-y-5'>
							{col.tasks.map(task => (
								<li
									key={task.id}
									className='flex flex-col gap-2 p-5 shadow-md rounded-lg bg-white w-[280px] min-h-[88px]'>
									<h1 className='font-bold text-[15px]'>{task.title}</h1>
									<p className='font-bold text-xs text-MediumGrey tracking-wide'>
										{task.subtasks.filter(sub => sub.isCompleted).length} of {task.subtasks.length} subtasks
									</p>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
}
