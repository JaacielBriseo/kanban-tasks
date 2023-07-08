'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type ValidThemes = 'dark' | 'light';

export const ThemeSwitch = () => {
	const [theme, setTheme] = useState<ValidThemes>(() => {
		const themeInStorage = localStorage.getItem('theme') as ValidThemes;
		if (!themeInStorage) return 'light';
		return themeInStorage;
	});

	useEffect(() => {
		const root = document.documentElement;
		root.classList.add(theme);
		localStorage.setItem('theme', theme);
		return () => root.classList.remove(theme);
	}, [theme]);

	return (
		<div className='w-full bg-LightGrey flex items-center justify-center gap-2 h-12 dark:bg-DarkGrey'>
			<Image src={'/assets/icon-light-theme.svg'} alt='Sun Icon' width={20} height={20} />
			<div
				onClick={() => setTheme(current => (current === 'dark' ? 'light' : 'dark'))}
				className='bg-MainPurple w-12 h-6 rounded-xl flex items-center px-1'>
				<div
					className={`bg-white h-5 w-5 rounded-full transition duration-200 ${theme === 'dark' ? 'translate-x-5' : ''}`}
				/>
			</div>
			<Image src={'/assets/icon-dark-theme.svg'} alt='Moon Icon' width={18} height={18} />
		</div>
	);
};
