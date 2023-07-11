import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { getUserSessionServer } from '@/actions/auth/auth-actions';
import { ActiveBoardName } from './ActiveBoardName';
import { SelectBoardModal } from './SelectBoardModal';
import { TriggerAddNewTaskModal } from '@/components/kanban/TriggerAddNewTaskModal';

export const Navbar = async () => {
	const user = await getUserSessionServer();
	if (!user) {
		redirect('/api/auth/signin');
	}
	const userBoards = await prisma.board.findMany({ where: { userId: user.id }, select: { name: true } });
	return (
		<nav className='w-full h-16 bg-white p-5 flex items-center justify-between dark:bg-DarkGrey transition-colors duration-700'>
			<Link href={'/kanban'} className='mr-4'>
				<Image src={'/assets/logo-mobile.svg'} alt='Kanban Logo' width={24} height={24} />
			</Link>
			<ActiveBoardName />
			<div className='flex items-center gap-5'>
				<TriggerAddNewTaskModal />
				<Image src={'/assets/icon-vertical-ellipsis.svg'} alt='Elipsis' width={4} height={16} />
			</div>
			<SelectBoardModal boards={userBoards} />
		</nav>
	);
};
