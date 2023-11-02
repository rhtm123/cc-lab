/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
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
          light:{
            "primary": "#0048A4",    
            "secondary": "#E35A01",      
            "accent": "#E08955",      
            "neutral": "#1a1d23",          
            "base-100": "#e5ecf5",      
            "info": "#18c2ec",    
            "success": "#0c5f37",  
            "warning": "#ad840b",
            "error": "#ef3c25",
            "--rounded-btn": "1rem",
            "--rounded-box": "1rem",
            "--tab-radius": "1rem",
            "--rounded-badge": "1rem",
          }
        },
        {
          dark: {
          
            "primary": "#0048A4",    
            "secondary": "#E35A01",      
            "accent": "#E08955",     
            "neutral": "#191b24",       
            "base-100": "#000e20",     
            "info": "#18c2ec",    
            "success": "#0c5f37",    
            "warning": "#ad840b",      
            "error": "#ef3c25",
            "--rounded-btn": "1rem",
            "--rounded-box": "1rem",
            "--tab-radius": "1rem",
            "--rounded-badge": "1rem",
  
          },
          
        },
      ],
    },

  plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
