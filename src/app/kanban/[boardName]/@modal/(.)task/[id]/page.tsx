import { Modal, SubtaskToggler } from '@/components';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

interface Props {
	params: { boardName: string; id: string };
}
export default async function TaskByIdModalPage({ params }: Props) {
	//TODO:create on a separate file getCompleteTask()
	const task = await prisma.task.findFirst({
		where: { id: params.id },
		select: { subtasks: true, title: true, description: true, status: true },
	});
	if (!task) {
		console.log('No se encontro este task ', params.id);
		notFound();
	}
	return (
		<Modal>
			<h3 className='font-bold text-lg'>{task.title}</h3>
			<p className='font-medium text-MediumGrey'>{task.description}</p>
			<div className='flex flex-col gap-2'>
				<h5 className='font-bold text-sm text-MediumGrey'>
					Subtasks ({task.subtasks.filter(sub => sub.isCompleted).length} of {task.subtasks.length})
				</h5>
				<div className='flex flex-col gap-5'>
					{task.subtasks.map(sub => (
						<SubtaskToggler key={sub.id} {...sub} />
					))}
				</div>
				<div>
					<p className='font-bold text-MediumGrey text-sm'>Current Status</p>
					<select
						//  onChange={onSelectNewStatus}
						className='select select-bordered w-full max-w-xs'>
						<option>{task.status}</option>
						{/* {statusOptions
									.filter(col => col.columnName !== task.status)
									.map(col => (
										<option key={col.columnId}>{col.columnName}</option>
									))} */}
					</select>
				</div>
			</div>
		</Modal>
	);
}
