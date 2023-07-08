import { Navbar } from '@/components';

export default function KanbanLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Navbar />
			<main>{children}</main>
		</>
	);
}
