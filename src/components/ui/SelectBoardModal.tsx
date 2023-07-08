'use client';

import { slugify } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { ThemeSwitch } from './ThemeSwitch';

interface Props {
	boards: {
		name: string;
	}[];
}
export const SelectBoardModal = ({ boards }: Props) => {
	const activeBoard = useSelectedLayoutSegment();
	console.log({ activeBoard });
	return (
		<dialog id='select_board_modal' className='modal w-[375px] mx-auto'>
			<form method='dialog' className='modal-box space-y-5'>
				<h3 className='font-bold text-sm uppercase tracking-widest text-MediumGrey'>All boards ({boards.length})</h3>
				<ul className='flex flex-col'>
					{boards.map(({ name }) => {
						const imgSrc = name === activeBoard ? '/assets/icon-board-white.svg' : '/assets/icon-board.svg';
						return (
							<li
								key={name}
								className={`border h-12 flex items-center ${
									activeBoard === name ? 'bg-MainPurple text-white' : ' text-MediumGrey'
								}`}>
								<Link href={`/kanban/${name}`} className='flex items-center gap-5'>
									<Image src={imgSrc} alt='Board Icon' width={16} height={16} />
									<p className='font-bold text-[15px]'>{slugify.convertFromSlug(name)}</p>
								</Link>
							</li>
						);
					})}
				</ul>
				<button type='button' className='flex items-center gap-3'>
					<Image src={'/assets/icon-board-purple.svg'} alt='Board Icon' width={16} height={16} />
					<p className='font-extrabold text-base text-MainPurple'>+ Create new board</p>
				</button>
				<ThemeSwitch />
			</form>
			<form method='dialog' className='modal-backdrop'>
				<button>close</button>
			</form>
		</dialog>
	);
};
