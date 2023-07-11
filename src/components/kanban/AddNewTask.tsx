'use client';

import { ValidModalsEnum } from '@/interfaces';

export const AddNewTask = () => {
	return (
		<dialog id={ValidModalsEnum.AddNewTaskModal} className='modal'>
			<form method='dialog' className='modal-box'>
				<h3 className='font-bold text-lg'>Hello!</h3>
				<p className='py-4'>Press ESC key or click outside to close</p>
			</form>
			<form method='dialog' className='modal-backdrop'>
				<button>close</button>
			</form>
		</dialog>
	);
};
