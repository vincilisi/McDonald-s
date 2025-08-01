/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                mcdBlack: "#333",
                mcdRed: "#d90007",
                mcdYellow: "#ffcc00",

            },
        },
    },
    plugins: [],
};
