import { AddNewTask } from '@/components/kanban/AddNewTask';

export default function BoardByNameLayout(props: { children: React.ReactNode; modal: React.ReactNode }) {
	return (
		<>
			<AddNewTask />
			{props.children}
			{props.modal}
		</>
	);
}
