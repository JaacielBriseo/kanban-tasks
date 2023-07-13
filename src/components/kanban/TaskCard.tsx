'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ITask } from '@/interfaces';

interface Props {
	task: ITask;
	statusOptions: { columnId: string; columnName: string }[];
}
export const TaskCard = ({ task, statusOptions }: Props) => {
	const pathname = usePathname();

	return (
		<>
			<Link
				href={`${pathname}/task/${task.id}`}
				className='flex flex-col gap-2 p-5 shadow-md rounded-lg bg-white w-[280px] min-h-[88px] relative'>
				<h1 className='font-bold text-[15px]'>{task.title}</h1>
				<p className='font-bold text-xs text-MediumGrey tracking-wide'>
					{task.subtasks.filter(sub => sub.isCompleted).length} of {task.subtasks.length} subtasks
				</p>
			</Link>
		</>
	);
};
