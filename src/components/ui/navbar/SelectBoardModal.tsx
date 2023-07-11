'use client';
import Image from 'next/image';
import { useSelectedLayoutSegment } from 'next/navigation';
import { BoardNameListItem } from './BoardNameListItem';
import { ThemeSwitch } from './ThemeSwitch';
import { ValidModalsEnum } from '@/interfaces';

interface Props {
	boards: {
		name: string;
	}[];
}
export const SelectBoardModal = ({ boards }: Props) => {
	const activeBoard = useSelectedLayoutSegment();

	return (
		<dialog id={ValidModalsEnum.SelectBoardModal} className='modal transition-none'>
			<form method='dialog' className='modal-box space-y-5 dark:bg-DarkGrey transition-colors duration-700'>
				<h3 className='font-bold text-sm uppercase tracking-widest text-MediumGrey'>All boards ({boards.length})</h3>
				<ul className='flex flex-col'>
					{boards.map(({ name }) => {
						const isActive = name === activeBoard;
						return <BoardNameListItem isActive={isActive} name={name} key={name} />;
					})}
				</ul>
				<button
					type='button'
					className='flex items-center gap-3'
					onClick={() => {
						window[ValidModalsEnum.SelectBoardModal].close();
						window[ValidModalsEnum.AddNewBoardModal].showModal();
					}}>
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
