'use client';
import { changeTaskStatus, toggleSubtaskCompleted } from '@/actions/kanban/kanban-actions';
import { ITask } from '@/interfaces';

interface Props {
	task: ITask;
	isOpen: boolean;
	closeModalHandler: () => void;
	statusOptions: { columnId: string; columnName: string }[];
}
export const ViewTaskModal = ({ task, isOpen, closeModalHandler, statusOptions }: Props) => {
	const onSelectNewStatus = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (e.target.value === task.status) return;

		const column = statusOptions.find(col => col.columnName === e.target.value);
		if (!column) return;
		await changeTaskStatus(task.id, column.columnId, column.columnName);
	};

	const onToggleSubtask = async (subtaskId: string, currentComplete: boolean) => {
		await toggleSubtaskCompleted(subtaskId, !currentComplete);
	};
	return (
		<>
			<dialog id={'add_new_task_modal'} open={isOpen} className='modal'>
				<div className='modal-box flex flex-col gap-5'>
					<h3 className='font-bold text-lg'>{task.title}</h3>
					<p className='font-medium text-MediumGrey'>{task.description}</p>
					<div className='flex flex-col gap-2'>
						<h5 className='font-bold text-sm text-MediumGrey'>
							Subtasks ({task.subtasks.filter(sub => sub.isCompleted).length} of {task.subtasks.length})
						</h5>
						<div className='flex flex-col gap-5'>
							{task.subtasks.map(sub => (
								<label
									onClick={() => onToggleSubtask(sub.id, sub.isCompleted)}
									key={sub.id}
									className='flex w-full bg-LightGrey p-5 items-center gap-5 rounded-lg'>
									<input
										type='checkbox'
										checked={sub.isCompleted}
										onChange={() => {}}
										className='checkbox checkbox-primary checkbox-xs'
									/>
									<p className={`font-bold text-sm ${sub.isCompleted ? 'line-through text-MediumGrey' : ''}`}>
										{sub.title}
									</p>
								</label>
							))}
						</div>
						<div>
							<p className='font-bold text-MediumGrey text-sm'>Current Status</p>
							<select onChange={onSelectNewStatus} className='select select-bordered w-full max-w-xs'>
								<option>{task.status}</option>
								{statusOptions
									.filter(col => col.columnName !== task.status)
									.map(col => (
										<option key={col.columnId}>{col.columnName}</option>
									))}
							</select>
						</div>
					</div>
				</div>
				<form method='dialog' onClick={closeModalHandler} className='modal-backdrop bg-black/20 fixed inset-0'>
					<button>close</button>
				</form>
			</dialog>
		</>
	);
};
