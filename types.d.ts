import { ValidModalsEnum } from '@/interfaces';

interface Modal {
	close: () => void;
	showModal: () => void;
}
type ModalMapping = {
	[modalName in ValidModalsEnum]: Modal;
};

// Augment the global Window interface
declare global {
	interface Window extends ModalMapping {}
}
