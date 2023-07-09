import { getBoardByName } from '@/actions/kanban/kanban-actions';
import { TaskCard } from '@/components';
interface Props {
	params: { boardName: string };
}
export default async function BoardPage({ params }: Props) {
	const board = await getBoardByName(params.boardName);
	return (
		<div className='p-5'>
			<div className='flex gap-5'>
				{board.columns.map(col => (
					<div key={col.id} className='flex flex-col space-y-3 min-w-[300px]'>
						<p className='text-MediumGrey uppercase font-bold text-sm'>
							{col.name} ({col.tasks.length})
						</p>
						<ul className='space-y-5'>
							{col.tasks.map(task => (
								<TaskCard
									key={task.id}
									task={task}
									statusOptions={board.columns.map(col => ({ columnName: col.name, columnId: col.id }))}
								/>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
}
