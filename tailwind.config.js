/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0B0F14",
        surface: "#111827",
        panel: "#161E2C",
        accent: "#1EE3CF",
        violet: "#8B7CFF",
        amber: "#F3B34D",
        line: "rgba(255,255,255,0.12)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(30, 227, 207, 0.25)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
}

