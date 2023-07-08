import { Navbar } from '@/components';
import { AddNewBoard } from '@/components/kanban/AddNewBoard';

export default function KanbanLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Navbar />
			<main className='overflow-x-auto min-h-screen'>{children}</main>
			<AddNewBoard />
		</>
	);
}
