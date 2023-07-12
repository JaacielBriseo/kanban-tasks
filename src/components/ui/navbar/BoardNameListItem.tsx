import Link from 'next/link';
import Image from 'next/image';
import { slugify } from '@/utils';

interface Props {
	name: string;
	isActive: boolean;
}

export const BoardNameListItem = ({ isActive, name }: Props) => {
	return (
		<li key={name} className={`relative h-12 flex items-center ${isActive ? 'text-white' : ' text-MediumGrey'}`}>
			<div
				className={`bg-MainPurple absolute top-0 w-full h-full -z-10 -translate-x-12 rounded-full ${
					isActive ? 'block' : 'hidden'
				}`}
			/>
			<Link href={`/kanban/board/${name}`} className='flex items-center gap-5'>
				<Image
					src={isActive ? '/assets/icon-board-white.svg' : '/assets/icon-board.svg'}
					alt='Board Icon'
					width={16}
					height={16}
				/>
				<p className='font-bold text-[15px]'>{slugify.convertFromSlug(name)}</p>
			</Link>
		</li>
	);
};
