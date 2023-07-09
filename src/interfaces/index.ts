export enum ValidModalsEnum {
	AddNewBoardModal = 'add_new_board_modal',
	SelectBoardModal = 'select_board_modal',
	ViewTaskModal = 'view_task_modal',
}

export interface ITask {
	id: string;
	description: string;
	title: string;
	status: string;
	subtasks: ISubtask[];
}

interface ISubtask {
	id: string;
	isCompleted: boolean;
	title: string;
}
