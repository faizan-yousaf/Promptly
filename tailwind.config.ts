import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', 'class'],
  theme: {
  	extend: {
  		colors: {
  			'electric-blue': 'var(--color-electric-blue)',
  			'neon-purple': 'var(--color-neon-purple)',
  			'lime-green': 'var(--color-lime-green)',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'SF Pro Display',
  				'SF Pro Text',
  				'Helvetica Neue',
  				'Helvetica',
  				'Arial',
  				'sans-serif'
  			],
  			display: [
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'SF Pro Display',
  				'Helvetica Neue',
  				'Helvetica',
  				'Arial',
  				'sans-serif'
  			],
  			body: [
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'SF Pro Text',
  				'Helvetica Neue',
  				'Helvetica',
  				'Arial',
  				'sans-serif'
  			]
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.6s ease-in-out',
  			'slide-up': 'slideUp 0.5s ease-out',
  			'slide-down': 'slideDown 0.5s ease-out',
  			'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
  			float: 'float 3s ease-in-out infinite',
  			'glow-pulse': 'glowPulse 2s ease-in-out infinite',
  			'gradient-shift': 'gradientShift 4s ease infinite',
  			'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
  			'star-movement-top': 'star-movement-top linear infinite alternate'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			slideUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(100px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			slideDown: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(-100px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			pulseGlow: {
  				'0%, 100%': {
  					boxShadow: '0 0 20px rgba(0, 191, 255, 0.3)'
  				},
  				'50%': {
  					boxShadow: '0 0 40px rgba(0, 191, 255, 0.6)'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0px)'
  				},
  				'50%': {
  					transform: 'translateY(-10px)'
  				}
  			},
  			glowPulse: {
  				'0%, 100%': {
  					boxShadow: '0 0 20px rgba(0, 191, 255, 0.3), 0 0 40px rgba(155, 93, 229, 0.2)'
  				},
  				'50%': {
  					boxShadow: '0 0 40px rgba(0, 191, 255, 0.6), 0 0 80px rgba(155, 93, 229, 0.4)'
  				}
  			},
  			gradientShift: {
  				'0%': {
  					backgroundPosition: '0% 50%'
  				},
  				'50%': {
  					backgroundPosition: '100% 50%'
  				},
  				'100%': {
  					backgroundPosition: '0% 50%'
  				}
  			},
  			'star-movement-bottom': {
  				'0%': {
  					transform: 'translate(0%, 0%)',
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'translate(-100%, 0%)',
  					opacity: '0'
  				}
  			},
  			'star-movement-top': {
  				'0%': {
  					transform: 'translate(0%, 0%)',
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'translate(100%, 0%)',
  					opacity: '0'
  				}
  			}
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  			'gradient-brand': 'linear-gradient(135deg, #00BFFF, #9B5DE5, #B9FF66)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
export default config