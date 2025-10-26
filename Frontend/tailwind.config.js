/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // ✅ เพิ่มบรรทัดนี้ตรงนี้เลย
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
