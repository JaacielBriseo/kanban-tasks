import Image from 'next/image';

export const TriggerAddNewTaskModal = () => {
	return (
		<div className='bg-MainPurple w-12 h-8 rounded-full flex items-center justify-center'>
			<Image src={'/assets/icon-add-task-mobile.svg'} alt='Add Task Cross' width={15} height={15} />
		</div>
	);
};
