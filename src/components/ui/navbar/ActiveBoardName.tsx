'use client';

import Image from 'next/image';
import { useSelectedLayoutSegments } from 'next/navigation';
import { slugify } from '@/utils';
import { ValidModalsEnum } from '@/interfaces';

export const ActiveBoardName = () => {
	const [value] = useSelectedLayoutSegments();
	const label = slugify.convertFromSlug(value || 'No active board');

	return (
		<div className='flex items-center gap-2 w-full'>
			<h1 className='text-xl font-bold capitalize truncate dark:text-white'>{label}</h1>
			<button type='button' onClick={() => window[ValidModalsEnum.SelectBoardModal].showModal()}>
				<Image src={'/assets/icon-chevron-down.svg'} alt='Chevron' width={12} height={12} />
			</button>
		</div>
	);
};
