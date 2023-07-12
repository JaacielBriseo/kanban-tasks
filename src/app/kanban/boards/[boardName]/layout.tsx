export default function BoardByNameLayout({
	children,
	taskmodal,
}: {
	children: React.ReactNode;
	taskmodal: React.ReactNode;
}) {
	return (
		<>
			{children} {taskmodal}
		</>
	);
}
