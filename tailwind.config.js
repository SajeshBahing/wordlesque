/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': {'max': '639px'},
    },
    extend: {
      colors: {
        primary: 'var(--color-theme-primary)',
        secondary: 'var(--color-theme-secondary)',
        tertiary: 'var(--color-theme-tertiary)',
        'primary-text': 'var(--color-theme-text-primary)',
        'secondary-text': 'var(--color-theme-text-secondary)',
        background: 'var(--color-theme-background)',
        'primary-button': 'var(--color-theme-button-primary)',
        'primary-button-text': 'var(--color-theme-button-primary-text)',
      },
      fontFamily: {
        'suez-one': ['"Suez One"', 'serif']
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        flip: {
          '0%': { transform: 'rotateX(0deg) scale(1)' },
          '100%': { transform: 'rotateX(180deg) scale(1, -1)' },
        },
        fade: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        jump: {
          '0%': {transform: 'translateY(0)'},
          '10%, 20%': {transform: 'translateY(-25px)'},
          '30%, 40%': {transform: 'translateY(0)'},
          '50%, 60%': {transform: 'translateY(-10px)'},
          '70%, 80%': {transform: 'translateY(0)'},
          '90%': {transform: 'translateY(-5px)'},
          '100%': {transform: 'translateY(0)'},
        },
        dialogShow: {
          '0%': { opacity: 0, transform: 'translateY(50%)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        dialogHide: {
          '0%': { opacity: 1, transform: 'translateY(0)' },
          '100%': { opacity: 0, transform: 'translateY(50%)' },
        }
      },
      animation: {
        pop: 'pop 0.1s ease-in-out',
        shake: 'shake 500ms',
        flip: 'flip 500ms linear reverse',
        fade: 'fade 500ms ease-in-out',
        jump: 'jump 500ms linear',
        dialogShow: 'dialogShow 300ms ease-in-out',
        dialogHide: 'dialogHide 300ms ease-in-out',
      }
    },
  },
  plugins: [],
}

