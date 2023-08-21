/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
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

  //   daisyui: {
  //     themes: [
  //       {
  //         cupcake:{
  // "primary": "#0171f9",    
  // "secondary": "#F98901",      
  // "accent": "#01EDF9",      
  // "neutral": "#1a1d23",          
  // "base-100": "#e8e4ec",      
  // "info": "#18c2ec",    
  // "success": "#0c5f37",  
  // "warning": "#ad840b",
  // "error": "#ef3c25",
  // "--rounded-btn": "2rem",
  //         }
  //       },
  //       {
  //         forest: {
          
  // "primary": "#0171f9",
  // "secondary": "#F98901",   
  // "accent": "#01EDF9",      
  // "neutral": "#191b24",       
  // "base-100": "#14192c",     
  // "info": "#18c2ec",    
  // "success": "#0c5f37",    
  // "warning": "#ad840b",      
  // "error": "#ef3c25",
  // "--rounded-btn": "2rem",
  // "--rounded-box": "2rem",
  // "--tab-radius": "2rem",
  // "--rounded-badge": "1.9rem",
  
  //         },
          
  //       },
  //     ],
  //   },
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
