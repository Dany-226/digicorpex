import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces (backgrounds)
        'surface': '#f6fafe',
        'surface-bright': '#f6fafe',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#eef4fa',
        'surface-container': '#e5eff7',
        'surface-container-high': '#ddeaf3',
        'surface-container-highest': '#d5e5ef',
        'surface-variant': '#d5e5ef',
        'surface-dim': '#cadde9',

        // Brand colors
        'primary': '#5f5e5e',
        'primary-dim': '#535252',
        'primary-container': '#e5e2e1',
        'secondary': '#47617c',
        'secondary-dim': '#3b5570',
        'secondary-container': '#cfe5ff',
        'tertiary': '#47627b',
        'tertiary-container': '#bbd7f6',

        // Text
        'on-surface': '#26343d',
        'on-surface-variant': '#52616a',
        'on-secondary': '#f7f9ff',
        'on-tertiary': '#f6f9ff',
        'on-tertiary-container': '#304c64',

        // Outlines
        'outline': '#6e7d86',
        'outline-variant': '#a4b4be',

        // Utilities
        'background': '#f6fafe',
        'inverse-surface': '#0a0f12',
        'inverse-on-surface': '#999da1',
      },
      fontFamily: {
        headline: ['var(--font-manrope)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        label: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        sm: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        full: '0.75rem',
      },
      boxShadow: {
        'editorial': '0 48px 48px -12px rgba(38, 52, 61, 0.06)',
      },
    },
  },
  plugins: [],
}

export default config
