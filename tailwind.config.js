/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				MainPurple: '#635FC7',
				PalePurple: '#A8A4FF',
				Dark: '#000112',
				VeryDarkGrey: '#20212C',
				DarkGrey: '#2B2C37',
				LinesDark: '#3E3F4E',
				MediumGrey: '#828FA3',
				LinesLight: '#E4EBFA',
				LightGrey: '#F4F7FD',
				SoftRed: '#EA5555',
				PaleRed: '#FF9898',
			},
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: false,
	},
};
