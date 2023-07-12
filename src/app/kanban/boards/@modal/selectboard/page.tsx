import { getUserBoards } from '@/actions/kanban/kanban-actions';
import { Modal } from '@/components';
import { ThemeSwitch } from '@/components/ui/navbar/ThemeSwitch';
import Image from 'next/image';
import Link from 'next/link';

export default async function SelectBoardModalPage() {
	const boards = await getUserBoards();
	return (
		<Modal>
			<h3 className='font-bold text-sm uppercase tracking-widest text-MediumGrey'>All boards ({boards.length})</h3>
			<ul className='flex flex-col'>
				{boards.map(({ name }) => {
					// const isActive = name === activeBoard;
					return (
						<h1 key={name}>Hola</h1>
						// <BoardNameListItem isActive={isActive} name={name} key={name} />
					);
				})}
			</ul>
			<Link href={'/kanban/boards/addnewboard'} replace className='flex items-center gap-3'>
				<Image src={'/assets/icon-board-purple.svg'} alt='Board Icon' width={16} height={16} />
				<p className='font-extrabold text-base text-MainPurple'>+ Create new board</p>
			</Link>
			<ThemeSwitch />
		</Modal>
	);
}
