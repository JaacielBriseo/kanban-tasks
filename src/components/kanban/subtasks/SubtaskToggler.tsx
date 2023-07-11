'use client';

import { Subtask } from '@prisma/client';
import { useTransition } from 'react';
import { toggleSubtaskCompleted } from '@/actions/kanban/kanban-actions';

export const SubtaskToggler = ({ id, isCompleted, title }: Omit<Subtask, 'taskId'>) => {
	// const [initialCompleted, setInitialCompleted] = useState(isCompleted);
	const [isPending, startTransition] = useTransition();
	const onToggleSubtask = async () => {
		await toggleSubtaskCompleted(id, !isCompleted);
		// setInitialCompleted(!initialCompleted);
	};
	return (
		<label key={id} className='flex w-full bg-LightGrey p-5 items-center gap-5 rounded-lg'>
			<input
				type='checkbox'
				checked={isCompleted}
				onChange={onToggleSubtask}
				className='checkbox checkbox-primary checkbox-xs'
			/>
			<p className={`font-bold text-sm ${isCompleted ? 'line-through text-MediumGrey' : ''}`}>{title}</p>
		</label>
	);
};
