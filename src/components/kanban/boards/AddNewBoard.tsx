'use client';
import { useState } from 'react';
import { createBoard } from '@/actions/kanban/kanban-actions';
import { useRouter } from 'next/navigation';

export const AddNewBoard = () => {
	const router = useRouter();
	const [boardName, setBoardName] = useState('');
	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBoardName(e.target.value);
	};
	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await createBoard(boardName);

		router.back(); // This is to close the modal
		router.refresh(); // This is to update UI
	};
	return (
		<>
			<form onSubmit={onSubmit} className='flex flex-col gap-5'>
				<h1 className='font-bold text-lg tracking-wide'>Add New Board</h1>
				<div className='flex flex-col gap-2'>
					<label htmlFor='board_name' className='font-bold text-sm text-MediumGrey dark:text-white'>
						Board Name
					</label>
					<input
						id='board_name'
						type='text'
						value={boardName}
						onChange={onInputChange}
						className='border py-2 px-4 rounded-lg border-LinesLight focus-visible:outline-none'
						placeholder='e.g. Web Design'
					/>
				</div>
				<button
					className='w-full bg-MainPurple text-white py-2 rounded-full font-bold text-sm tracking-wide'
					type='submit'>
					Create New Board
				</button>
			</form>
		</>
	);
};
