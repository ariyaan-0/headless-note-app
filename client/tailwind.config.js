/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				rosepink: "#F43E58",
				darkblue: "#102E50",
			},
		},
	},
	plugins: [],
};
