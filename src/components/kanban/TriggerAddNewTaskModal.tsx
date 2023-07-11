'use client';

import { ValidModalsEnum } from '@/interfaces';
import Image from 'next/image';

export const TriggerAddNewTaskModal = () => {
	const onOpenModal = () => {
		//* For some reason I'm getting multiple dialog elements
		//* So if it's the case where an dialog id is repeated
		//* Just take the first and open the modal
		// if (Array.isArray(window[ValidModalsEnum.AddNewTaskModal])) {
		window[ValidModalsEnum.AddNewTaskModal][0].showModal();
		// } else {
		// 	window[ValidModalsEnum.AddNewTaskModal].showModal();
		// }
	};
	return (
		<div onClick={() => onOpenModal()} className='bg-MainPurple w-12 h-8 rounded-full flex items-center justify-center'>
			<Image src={'/assets/icon-add-task-mobile.svg'} alt='Add Task Cross' width={15} height={15} />
		</div>
	);
};
