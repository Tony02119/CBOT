/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
	content: [
		'src/components/**/*.{vue,js,ts}',
		'src/layouts/**/*.vue',
		'src/pages/**/*.vue',
		'src/composables/**/*.{js,ts}',
		'src/plugins/**/*.{js,ts}',
		'src/utils/**/*.{js,ts}',
		'src/App.{js,ts,vue}',
		'src/app.{js,ts,vue}',
		'src/Error.{js,ts,vue}',
		'src/error.{js,ts,vue}',
		'src/app.config.{js,ts}',
		'./node_modules/preline/preline.js',
	],
	theme: {
		extend: {
			colors: {
				primary: colors.red,
				gray: colors.zinc,
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'slide-up': 'slideUp 0.3s ease-out',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				slideUp: {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
			},
		},
	},
	plugins: [
		require('preline/plugin'),
	],
};
