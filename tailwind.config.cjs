/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['class', '[data-theme="shlee-dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Pretendard Variable"', 'Pretendard', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', '"Helvetica Neue"', '"Segoe UI"', '"Apple SD Gothic Neo"', '"Noto Sans KR"', '"Malgun Gothic"', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        shlee: {
          'teal-deep':  '#2d5050',
          'teal':       '#3d6e6e',
          'sage':       '#4a8a6e',
          'mint':       '#6fbf94',
          'mint-soft':  '#a0d8b8',
          'navy-deep':  '#0a1929',
          'navy':       '#1e3a5f',
          'bg-mist':    '#f4f7f5',
        },
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out',
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        "shlee-light": {
          "primary":           "#2d5050",
          "primary-content":   "#ffffff",
          "secondary":         "#4a8a6e",
          "secondary-content": "#ffffff",
          "accent":            "#6fbf94",
          "accent-content":    "#0a1929",
          "neutral":           "#1e3a5f",
          "neutral-content":   "#ffffff",
          "base-100":          "#ffffff",
          "base-200":          "#f4f7f5",
          "base-300":          "#dbe5de",
          "base-content":      "#1e3a5f",
          "info":              "#3d5a85",
          "success":           "#4a8a6e",
          "warning":           "#d97706",
          "error":             "#ef4444",
        },
      },
      {
        "shlee-dark": {
          "primary":           "#6fbf94",
          "primary-content":   "#0a1929",
          "secondary":         "#4a8a6e",
          "secondary-content": "#e2e8f0",
          "accent":            "#a0d8b8",
          "accent-content":    "#0a1929",
          "neutral":           "#1e293b",
          "neutral-content":   "#e2e8f0",
          "base-100":          "#0a1929",
          "base-200":          "#0f1e35",
          "base-300":          "#1e3a5f",
          "base-content":      "#e2e8f0",
          "info":              "#3d5a85",
          "success":           "#6fbf94",
          "warning":           "#f7931e",
          "error":             "#ef4444",
        },
      },
    ],
    darkTheme: "shlee-dark",
    logs: false,
  }
}
