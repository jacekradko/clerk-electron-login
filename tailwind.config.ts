import svgToDataUri from 'mini-svg-data-uri'
module.exports = {
	darkMode: ['class'],
	content: ['src/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}', './*.{html,js}'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				transparent: 'transparent',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			boxShadow: {
				'3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
				'inner-md': 'inset 0 8px 16px 1px rgb(255, 255, 255)'
			},
			scale: {
				x: {
					mirror: '-1,1'
				}
			},
			backdropBlur: {
				xs: '2px'
			},
			backgroundImage: {
				'gradient-glow-line-v': 'linear-gradient(to bottom, transparent 0%, #22C55E67 20%, #BBF8D2C5 50%, #22C55E67 80%, transparent 100%)',
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'smallGrid-bg': `url("${svgToDataUri(
					`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="rgba(255,255,255,0.3)"><path d="M0 .5H31.5V32"/></svg>`
				)}")`,
				'dot-bg': `url("${svgToDataUri(
					`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="rgba(255,255,255,0.1)" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
				)}")`,
				'dot-bg-main': `url("${svgToDataUri(
					`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="rgba(255,255,255,0.15)" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
				)}")`,
				'largeGrid-bg': `url("${svgToDataUri(
					`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="white"><path d="M0 .5H31.5V32"/></svg>`
				)}")`
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontSize: {
				xxs: '0.75rem'
			},
			keyframes: {
				spotlight: {
					'0%': {
						opacity: 0,
						transform: 'translate(0%, -105%) scaleY(0.25)'
					},
					'100%': {
						opacity: 0.05,
						transform: 'translate(0%, -10%) scaleY(1.5) scaleX(1.5)'
					}
				},
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 }
				},
				fadeIn: {
					'0%': {
						opacity: 0
					},
					'100%': {
						opacity: 1
					}
				},
				fadeInLogo: {
					'0%': {
						opacity: 0.1
					},
					'100%': {
						opacity: 1
					}
				},
				fadeOutLogo: {
					'0%': {
						opacity: 0.5
					},
					'100%': {
						opacity: 0
					}
				},
				fadeOutLogoStroke: {
					'0%': {
						opacity: 0.1
					},
					'100%': {
						opacity: 0
					}
				},
				backgroundShine: {
					'0%,20%': {
						backgroundPosition: '100% 0',
						opacity: 0
					},
					'40%': {
						backgroundPosition: '50% 0',
						opacity: 1
					},
					'60%': {
						backgroundPosition: '0% 0',
						opacity: 1
					},
					'80%,100%': {
						opacity: 0,
						backgroundPosition: '-50% 0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				spotlight: 'spotlight 3s ease-in-out 0s 1 forwards',
				fadeIn: 'fadeIn 3s ease-in-out 1s 1 forwards',
				fadeInLogo: 'fadeInLogo 3s ease-in-out 1s 1 forwards',
				fadeOutLogoStroke: 'fadeOutLogoStroke 3s ease-in-out 1s 1 forwards',
				fadeOutLogo: 'fadeOutLogo 3s ease-in-out 1s 1 forwards',
				backgroundShine: 'backgroundShine 8s linear infinite'
			},
			containers: {
				xs: '30rem',
				sm: '40rem',
				md: '48rem',
				lg: '64rem',
				xl: '80rem',
				'2xl': '96rem'
			}
		}
	},
	plugins: [
		require('tailwindcss-animate'),
		require('@tailwindcss/typography'),
		require('tailwind-gradient-mask-image'),
		require('@tailwindcss/container-queries')
	]
}
