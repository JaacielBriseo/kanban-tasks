import { slugify } from '@/utils';
import Link from 'next/link';

interface Props {
	boards: {
		id: string;
		name: string;
	}[];
}
export const BoardsListCards = ({ boards }: Props) => {
	return (
		<>
			<h1 className='text-center text-xl font-bold mb-5'>My boards</h1>
			<ul className='flex items-center justify-center flex-wrap gap-5'>
				{boards.map(board => (
					<li
						key={board.id}
						className='card w-32 bg-base-100 shadow-xl hover:scale-110 transition duration-300 ease-in-out'>
						<Link href={`/boards/${board.name}`}>
							<div className='card-body flex items-center'>
								<h3 className='card-title'>{slugify.convertFromSlug(board.name)}</h3>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</>
	);
};
