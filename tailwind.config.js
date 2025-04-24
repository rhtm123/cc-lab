/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              marginTop: '0.5rem',  // Adjust as needed to half the default margin
              marginBottom: '0.5rem', // Adjust as needed to half the default margin
            },
            h2: {
              marginTop: '0.5rem',  // Adjust as needed to half the default margin
              marginBottom: '0.5rem', // Adjust as needed to half the default margin
            },
            h3: {
              marginTop: '0.5rem',  // Adjust as needed to half the default margin
              marginBottom: '0.5rem', // Adjust as needed to half the default margin
            },
            h4: {
              marginTop: '0.5rem',  // Adjust as needed to half the default margin
              marginBottom: '0.5rem', // Adjust as needed to half the default margin
            },
            h5: {
              marginTop: '0.5rem',  // Adjust as needed to half the default margin
              marginBottom: '0.5rem', // Adjust as needed to half the default margin
            },
            h6: {
              marginTop: '0.5rem',  // Adjust as needed to half the default margin
              marginBottom: '0.5rem', // Adjust as needed to half the default margin
            },
            p: {
              marginTop: '0.5rem',  // Adjust as needed to half the default margin
              marginBottom: '0.5rem', // Adjust as needed to half the default margin
            },
            li: {
              marginTop: '0.05rem',  // Adjust as needed to half the default margin
              marginBottom: '0.05rem', // Adjust as needed to half the default margin
            },
            pre: {
              marginTop: '0.1rem', // Adjust as needed to half the
              marginBottom: '0.1rem', // Adjust as needed to half the
            }
          },
        },
      },
    },
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular', 'monospace'],
      'display': ['Oswald'],
      'body': ['"Open Sans"'],
    },
    container: {
      margin: "auto",
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },

  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['[data-theme=light]'],
          "primary": "#0048A4",       // Your brand blue
          "secondary": "#7C3AED",     // Purple (from Tailwind's violet-600)
          "accent": "#059669",        // Emerald green (from Tailwind's emerald-600)
          "neutral": "#1F2937",      // Gray-800
          "base-100": "#FFFFFF",     // White
          "base-200": "#F3F4F6",     // Gray-100
          "base-300": "#E5E7EB",     // Gray-200
          "info": "#0284C7",         // Sky-600
          "success": "#059669",      // Emerald-600
          "warning": "#D97706",      // Amber-600
          "error": "#DC2626"         // Red-600
        }
      },
      {
        dark: {
          ...require('daisyui/src/theming/themes')['[data-theme=dark]'],
          "primary": "#0048A4",       // Your brand blue
          "secondary": "#7C3AED",     // Purple
          "accent": "#10B981",        // Emerald green (lighter for dark mode)
          "neutral": "#1E293B",      // Slate-800
          "base-100": "#0F172A",     // Slate-900
          "base-200": "#1E293B",     // Slate-800
          "base-300": "#334155",     // Slate-700
          "info": "#0EA5E9",         // Sky-500
          "success": "#10B981",      // Emerald-500
          "warning": "#F59E0B",      // Amber-500
          "error": "#EF4444"         // Red-500
        }
      }
    ]
  },

  plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
