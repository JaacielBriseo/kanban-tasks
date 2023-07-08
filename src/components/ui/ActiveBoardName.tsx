'use client';

import Image from 'next/image';
import { useSelectedLayoutSegments } from 'next/navigation';
import { slugify } from '@/utils';

export const ActiveBoardName = () => {
	const [value] = useSelectedLayoutSegments();
	const boardName = slugify.convertFromSlug(value);

	return (
		<div className='flex items-center gap-2 w-full'>
			<h1 className='text-xl font-bold capitalize truncate dark:text-white'>{boardName ?? 'No active board'}</h1>
			<button type='button' onClick={() => (window as any).select_board_modal.showModal()}>
				<Image src={'/assets/icon-chevron-down.svg'} alt='Chevron' width={20} height={20} />
			</button>
		</div>
	);
};
