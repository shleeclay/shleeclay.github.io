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
          'carbon-black':  '#0d1a14',
          'carbon':        '#14241b',
          'carbon-deep':   '#0f2218',
          'green-deep':    '#1e3a2f',
          'green':         '#2d5340',
          'green-mid':     '#3d6855',
          'mint':          '#6fbf94',
          'mint-soft':     '#a0d8b8',
          'honey':         '#e0b941',
          'honey-deep':    '#b89020',
          'honey-soft':    '#f2d272',
          'paper':         '#f5f3ed',
          'paper-deep':    '#e6e2d4',
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
          "primary":           "#1e3a2f",
          "primary-content":   "#ffffff",
          "secondary":         "#3d6855",
          "secondary-content": "#ffffff",
          "accent":            "#e0b941",
          "accent-content":    "#0f2218",
          "neutral":           "#1e3a2f",
          "neutral-content":   "#f5f3ed",
          "base-100":          "#ffffff",
          "base-200":          "#f5f3ed",
          "base-300":          "#dcd6c2",
          "base-content":      "#0f2218",
          "info":              "#3d6855",
          "success":           "#3d6855",
          "warning":           "#b89020",
          "error":             "#ef4444",
        },
      },
      {
        "shlee-dark": {
          "primary":           "#6fbf94",
          "primary-content":   "#0d1a14",
          "secondary":         "#3d6855",
          "secondary-content": "#e2e8e0",
          "accent":            "#e0b941",
          "accent-content":    "#0d1a14",
          "neutral":           "#14241b",
          "neutral-content":   "#e2e8e0",
          "base-100":          "#0d1a14",
          "base-200":          "#14241b",
          "base-300":          "#243a2b",
          "base-content":      "#e2e8e0",
          "info":              "#3d6855",
          "success":           "#6fbf94",
          "warning":           "#e0b941",
          "error":             "#ef4444",
        },
      },
    ],
    darkTheme: "shlee-dark",
    logs: false,
  }
}
