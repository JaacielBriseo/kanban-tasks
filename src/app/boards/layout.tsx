import { Navbar } from '@/components';

export default function BoardsDashboardLayout({
	children,
	modal,
}: {
	children: React.ReactNode;
	modal: React.ReactNode;
}) {
	return (
		<>
			{modal}
			<Navbar />
			<main className='overflow-x-auto min-h-screen p-5'>{children}</main>
		</>
	);
}
